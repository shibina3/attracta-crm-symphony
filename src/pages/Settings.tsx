
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { users, currentUser } from "@/lib/data";
import { Pencil, PlusCircle, Save, Trash2, UserPlus } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Profile updated successfully");
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Settings updated successfully");
    setIsSaving(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1">
          <div className="container max-w-screen-2xl py-6 space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Your Profile</CardTitle>
                        <CardDescription>
                          Manage your personal information
                        </CardDescription>
                      </div>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        disabled={isSaving}
                      >
                        {isEditing ? (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            {isSaving ? "Saving..." : "Save Changes"}
                          </>
                        ) : (
                          <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                          <AvatarFallback className="text-2xl">
                            {currentUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            Change Photo
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              defaultValue={currentUser.name}
                              readOnly={!isEditing}
                              className={!isEditing ? "bg-secondary/50" : ""}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue={currentUser.email}
                              readOnly={!isEditing}
                              className={!isEditing ? "bg-secondary/50" : ""}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input
                              id="role"
                              defaultValue={currentUser.role.replace('_', ' ')}
                              readOnly
                              className="bg-secondary/50"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="team">Team</Label>
                            <Input
                              id="team"
                              defaultValue={currentUser.team}
                              readOnly
                              className="bg-secondary/50"
                            />
                          </div>
                        </div>
                        
                        {isEditing && (
                          <div className="space-y-2">
                            <Label htmlFor="password">Change Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter new password"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about lead updates and assignments
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">In-App Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications within the application
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive text messages for urgent updates
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>
                          View and manage team members
                        </CardDescription>
                      </div>
                      <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Member
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.role.replace('_', ' ')} • {user.team}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            {currentUser.role === "super_admin" && (
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {currentUser.role === "super_admin" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Roles</CardTitle>
                      <CardDescription>
                        Manage team roles and permissions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tele-Sales Team</Label>
                          <Select defaultValue="view_edit">
                            <SelectTrigger>
                              <SelectValue placeholder="Select permissions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="view_only">View Only</SelectItem>
                              <SelectItem value="view_edit">View & Edit</SelectItem>
                              <SelectItem value="full_access">Full Access</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Quotation Team</Label>
                          <Select defaultValue="view_edit">
                            <SelectTrigger>
                              <SelectValue placeholder="Select permissions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="view_only">View Only</SelectItem>
                              <SelectItem value="view_edit">View & Edit</SelectItem>
                              <SelectItem value="full_access">Full Access</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Design Team</Label>
                          <Select defaultValue="view_edit">
                            <SelectTrigger>
                              <SelectValue placeholder="Select permissions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="view_only">View Only</SelectItem>
                              <SelectItem value="view_edit">View & Edit</SelectItem>
                              <SelectItem value="full_access">Full Access</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Production Teams</Label>
                          <Select defaultValue="view_edit">
                            <SelectTrigger>
                              <SelectValue placeholder="Select permissions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="view_only">View Only</SelectItem>
                              <SelectItem value="view_edit">View & Edit</SelectItem>
                              <SelectItem value="full_access">Full Access</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Accounts Team</Label>
                          <Select defaultValue="view_only">
                            <SelectTrigger>
                              <SelectValue placeholder="Select permissions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="view_only">View Only</SelectItem>
                              <SelectItem value="view_edit">View & Edit</SelectItem>
                              <SelectItem value="full_access">Full Access</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button onClick={handleSaveSettings} disabled={isSaving}>
                          {isSaving ? "Saving..." : "Save Permission Changes"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Settings</CardTitle>
                    <CardDescription>
                      Customize your application experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dashboard Auto-Refresh</p>
                          <p className="text-sm text-muted-foreground">
                            Automatically refresh dashboard data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Show Lead Details Expanded</p>
                          <p className="text-sm text-muted-foreground">
                            Show all lead details expanded by default
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label>Default Lead View</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select default view" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Leads</SelectItem>
                            <SelectItem value="assigned">Assigned to Me</SelectItem>
                            <SelectItem value="created">Created by Me</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label>Dashboard Timeframe</Label>
                        <Select defaultValue="month">
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="week">Last Week</SelectItem>
                            <SelectItem value="month">Last Month</SelectItem>
                            <SelectItem value="quarter">Last Quarter</SelectItem>
                            <SelectItem value="year">Last Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button onClick={handleSaveSettings} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Settings"}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
