// Form Validation Utilities

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation
export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
}

// Password validation
export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  return null;
}

// Phone validation (Nigerian format)
export function validatePhone(phone: string): string | null {
  const phoneRegex = /^(\+234|0)[789][01][0-9]{8}$/;
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    return "Please enter a valid Nigerian phone number";
  }
  return null;
}

// Amount validation
export function validateAmount(amount: number | string, min?: number, max?: number): string | null {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return "Please enter a valid amount";
  if (numAmount <= 0) return "Amount must be greater than zero";
  if (min && numAmount < min) return `Minimum amount is ₦${min.toLocaleString()}`;
  if (max && numAmount > max) return `Maximum amount is ₦${max.toLocaleString()}`;
  
  return null;
}

// Required field validation
export function validateRequired(value: any, fieldName: string = "Field"): string | null {
  if (!value || (typeof value === "string" && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
}

// Name validation
export function validateName(name: string): string | null {
  if (!name) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (name.length > 100) return "Name must be less than 100 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return "Name contains invalid characters";
  return null;
}

// File validation
export function validateFile(
  file: File | null,
  maxSizeMB: number = 5,
  allowedTypes: string[] = ["image/jpeg", "image/png", "application/pdf"]
): string | null {
  if (!file) return "File is required";
  
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > maxSizeMB) {
    return `File size must be less than ${maxSizeMB}MB`;
  }
  
  if (!allowedTypes.includes(file.type)) {
    return `File type must be one of: ${allowedTypes.join(", ")}`;
  }
  
  return null;
}

// Form data validation
export function validateFormData(
  data: Record<string, any>,
  rules: Record<string, (value: any) => string | null>
): ValidationResult {
  const errors: ValidationError[] = [];

  for (const [field, validator] of Object.entries(rules)) {
    const error = validator(data[field]);
    if (error) {
      errors.push({ field, message: error });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Password strength calculator
export function calculatePasswordStrength(password: string): number {
  let strength = 0;
  
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 20;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[a-z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^A-Za-z0-9]/.test(password)) strength += 15;
  
  return Math.min(strength, 100);
}

// Get password strength label
export function getPasswordStrengthLabel(strength: number): string {
  if (strength >= 80) return "Very Strong";
  if (strength >= 60) return "Strong";
  if (strength >= 40) return "Medium";
  if (strength >= 20) return "Weak";
  return "Very Weak";
}

// Get password strength color
export function getPasswordStrengthColor(strength: number): string {
  if (strength >= 80) return "text-emerald-600";
  if (strength >= 60) return "text-teal-600";
  if (strength >= 40) return "text-amber-600";
  if (strength >= 20) return "text-orange-600";
  return "text-red-600";
}
