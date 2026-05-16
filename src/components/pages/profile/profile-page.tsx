"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/stores/appStore";
import { currentUser } from "@/data/mockData";

export default function ProfilePage() {
  const { user } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500">Manage your personal information</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={user?.avatar || currentUser.avatar}
                  alt={user?.fullName || currentUser.fullName}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-emerald-100"
                />
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{user?.fullName || currentUser.fullName}</h2>
              <p className="text-slate-500 mb-4">{user?.email || currentUser.email}</p>
              
              <Badge variant={user?.kycStatus === "verified" ? "success" : "warning"} className="mb-6">
                {user?.kycStatus === "verified" ? (
                  <><CheckCircle className="h-3 w-3 mr-1" /> KYC Verified</>
                ) : (
                  <><AlertCircle className="h-3 w-3 mr-1" /> KYC Pending</>
                )}
              </Badge>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{user?.email || currentUser.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{user?.phone || currentUser.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{user?.country || currentUser.country}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Joined {new Date(user?.createdAt || currentUser.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 className="h-4 w-4 mr-2" /> {isEditing ? "Cancel" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  defaultValue={user?.fullName || currentUser.fullName}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input
                  defaultValue={user?.email || currentUser.email}
                  disabled
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  defaultValue={user?.phone || currentUser.phone}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  defaultValue={user?.country || currentUser.country}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <Button variant="premium" className="mt-4">
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Investment Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-slate-500">Investment Experience</Label>
              <div className="mt-2 p-4 bg-slate-50 rounded-xl">
                <p className="font-semibold text-slate-900 capitalize">{user?.investmentExperience || currentUser.investmentExperience}</p>
                <p className="text-sm text-slate-500">
                  {user?.investmentExperience === "beginner" ? "0-2 years of experience" :
                   user?.investmentExperience === "intermediate" ? "2-5 years of experience" :
                   "5+ years of experience"}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-slate-500">Risk Appetite</Label>
              <div className="mt-2 p-4 bg-slate-50 rounded-xl">
                <p className="font-semibold text-slate-900 capitalize">{user?.riskAppetite || currentUser.riskAppetite}</p>
                <p className="text-sm text-slate-500">
                  {user?.riskAppetite === "low" ? "Capital preservation focused" :
                   user?.riskAppetite === "medium" ? "Balanced growth approach" :
                   "Maximum returns focused"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Upload className="h-4 w-4 mr-2" /> Upload Documents
            </Button>
            <Button variant="outline" className="justify-start">
              <User className="h-4 w-4 mr-2" /> Change Password
            </Button>
            <Button variant="outline" className="justify-start">
              <AlertCircle className="h-4 w-4 mr-2" /> Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
