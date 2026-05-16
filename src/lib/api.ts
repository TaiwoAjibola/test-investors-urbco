// API Helper Utilities for Backend Integration

import { APP_CONFIG, API_ENDPOINTS } from "./config";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiRequestConfig extends RequestInit {
  timeout?: number;
  retry?: number;
}

// Base API client
export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(baseURL: string = "", timeout: number = 30000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Clear authentication token
  clearAuthToken() {
    delete this.defaultHeaders["Authorization"];
  }

  // Build URL
  private buildURL(endpoint: string): string {
    const url = endpoint.startsWith("http") ? endpoint : `${this.baseURL}${endpoint}`;
    return url;
  }

  // Create timeout promise
  private createTimeout(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout")), timeout);
    });
  }

  // Generic request method
  async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { timeout = this.timeout, retry = 1, headers = {}, ...restConfig } = config;

    const url = this.buildURL(endpoint);
    const requestConfig: RequestInit = {
      ...restConfig,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < retry; attempt++) {
      try {
        const response = await Promise.race([
          fetch(url, requestConfig),
          this.createTimeout(timeout),
        ]);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
      } catch (error) {
        lastError = error as Error;
        if (attempt < retry - 1) {
          // Wait before retry (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }
    }

    return {
      success: false,
      error: lastError?.message || "Unknown error occurred",
    };
  }

  // HTTP methods
  async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

// Create API instances
export const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "");

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: any }>(API_ENDPOINTS.auth.login, { email, password }),

  signup: (data: any) =>
    api.post<{ token: string; user: any }>(API_ENDPOINTS.auth.signup, data),

  logout: () => api.post(API_ENDPOINTS.auth.logout),

  verifyOTP: (email: string, otp: string) =>
    api.post(API_ENDPOINTS.auth.verifyOTP, { email, otp }),

  forgotPassword: (email: string) =>
    api.post(API_ENDPOINTS.auth.forgotPassword, { email }),

  resetPassword: (token: string, password: string) =>
    api.post(API_ENDPOINTS.auth.resetPassword, { token, password }),
};

// Properties API
export const propertiesAPI = {
  list: (params?: Record<string, any>) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
    return api.get<any[]>(`${API_ENDPOINTS.properties.list}${queryString}`);
  },

  detail: (id: string) =>
    api.get<any>(API_ENDPOINTS.properties.detail.replace("[id]", id)),

  search: (query: string) =>
    api.get<any[]>(`${API_ENDPOINTS.properties.search}?q=${encodeURIComponent(query)}`),
};

// Investments API
export const investmentsAPI = {
  list: () => api.get<any[]>(API_ENDPOINTS.investments.list),

  create: (data: any) =>
    api.post<any>(API_ENDPOINTS.investments.create, data),

  detail: (id: string) =>
    api.get<any>(API_ENDPOINTS.investments.detail.replace("[id]", id)),
};

// Dividends API
export const dividendsAPI = {
  list: () => api.get<any[]>(API_ENDPOINTS.dividends.list),

  history: () => api.get<any[]>(API_ENDPOINTS.dividends.history),
};

// Wallet API
export const walletAPI = {
  balance: () => api.get<{ balance: number }>(API_ENDPOINTS.wallet.balance),

  deposit: (amount: number, method: string) =>
    api.post<any>(API_ENDPOINTS.wallet.deposit, { amount, method }),

  withdraw: (amount: number, bankAccount: string) =>
    api.post<any>(API_ENDPOINTS.wallet.withdraw, { amount, bankAccount }),

  transactions: (params?: Record<string, any>) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
    return api.get<any[]>(`${API_ENDPOINTS.wallet.transactions}${queryString}`);
  },
};

// User API
export const userAPI = {
  profile: () => api.get<any>(API_ENDPOINTS.user.profile),

  updateProfile: (data: any) =>
    api.put<any>(API_ENDPOINTS.user.profile, data),

  kyc: () => api.get<any>(API_ENDPOINTS.user.kyc),

  submitKYC: (data: FormData) =>
    api.post<any>(API_ENDPOINTS.user.kyc, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  referrals: () => api.get<any>(API_ENDPOINTS.user.referrals),
};

// Helper functions
export function handleApiError(error: any): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (error?.message) return error.message;
  return "An unexpected error occurred";
}

export function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { data: T } {
  return response.success && response.data !== undefined;
}

// Local storage utilities for auth
export const authStorage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  },

  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth_token", token);
  },

  removeToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
  },

  getUser: (): any | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: any): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },
};

// Initialize API with stored token
if (typeof window !== "undefined") {
  const token = authStorage.getToken();
  if (token) {
    api.setAuthToken(token);
  }
}
