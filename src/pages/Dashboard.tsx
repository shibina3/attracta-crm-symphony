
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Phone,
  PlusCircle,
  Printer,
  User,
} from "lucide-react";
import LeadCard from "@/components/ui/LeadCard";
import { leads, getLeadsForUser, currentUser } from "@/lib/data";
import { Lead, LeadStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [userLeads, setUserLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUserLeads(getLeadsForUser(currentUser));
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Calculate dashboard metrics
  const totalLeads = userLeads.length;
  const pendingLeads = userLeads.filter(
    (lead) => 
      lead.status !== "Delivered" && 
      lead.status !== "Closed" && 
      lead.status !== "Rejected"
  ).length;
  const inProgressLeads = userLeads.filter(
    (lead) => lead.status === "In Progress"
  ).length;
  const completedLeads = userLeads.filter(
    (lead) => lead.status === "Delivered"
  ).length;
  const recentLeads = [...userLeads]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 3);

  // Get status distribution
  const getStatusDistribution = () => {
    const statusCounts: Record<LeadStatus, number> = {
      "Initiated": 0,
      "Confirmed": 0,
      "On Hold": 0,
      "Closed": 0,
      "Rejected": 0,
      "Waiting for Advance Payment": 0,
      "Waiting for Customer Input": 0,
      "In Progress": 0,
      "Out for Production": 0,
      "Production Completed": 0,
      "Waiting for Full Payment": 0,
      "Dispatched": 0,
      "Delivered": 0,
    };
    
    userLeads.forEach((lead) => {
      statusCounts[lead.status]++;
    });
    
    return statusCounts;
  };

  const statusCounts = getStatusDistribution();
  
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1">
          <div className="container max-w-screen-2xl py-6 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {currentUser.name}
                </p>
              </div>
              <Button asChild>
                <Link to="/leads/new" className="inline-flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Lead
                </Link>
              </Button>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="hover:shadow-elevation transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Leads
                      </CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalLeads}</div>
                      <p className="text-xs text-muted-foreground">
                        All time leads in the system
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-elevation transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pending
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{pendingLeads}</div>
                      <p className="text-xs text-muted-foreground">
                        Leads awaiting action
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-elevation transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        In Progress
                      </CardTitle>
                      <Printer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{inProgressLeads}</div>
                      <p className="text-xs text-muted-foreground">
                        Leads in active production
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-elevation transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Completed
                      </CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{completedLeads}</div>
                      <p className="text-xs text-muted-foreground">
                        Successfully delivered orders
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-full lg:col-span-3 hover:shadow-elevation transition-all">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isLoading ? (
                        <div className="flex justify-center p-4">
                          <div className="loader"></div>
                        </div>
                      ) : recentLeads.length > 0 ? (
                        recentLeads.map((lead) => (
                          <div key={lead.id} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-attracta-500 mr-3"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{lead.customerName}</p>
                              <p className="text-xs text-muted-foreground">
                                Status changed to <span className="font-medium">{lead.status}</span>
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/leads/${lead.id}`}>View</Link>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-2">
                          No recent activity found
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-full lg:col-span-4 hover:shadow-elevation transition-all">
                    <CardHeader>
                      <CardTitle>Upcoming Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {isLoading ? (
                          <div className="flex justify-center p-4">
                            <div className="loader"></div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start gap-4">
                              <div className="rounded-full p-2 bg-attracta-100">
                                <Phone className="h-4 w-4 text-attracta-500" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">Call TechStart Inc. for payment confirmation</p>
                                <p className="text-xs text-muted-foreground">Due today</p>
                              </div>
                              <Button size="sm" variant="outline">Mark Complete</Button>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-start gap-4">
                              <div className="rounded-full p-2 bg-attracta-100">
                                <DollarSign className="h-4 w-4 text-attracta-500" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">Process payment for Luxe Hotels</p>
                                <p className="text-xs text-muted-foreground">Due tomorrow</p>
                              </div>
                              <Button size="sm" variant="outline">Mark Complete</Button>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-start gap-4">
                              <div className="rounded-full p-2 bg-attracta-100">
                                <Calendar className="h-4 w-4 text-attracta-500" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">Schedule delivery for Green Gardens</p>
                                <p className="text-xs text-muted-foreground">Due in 3 days</p>
                              </div>
                              <Button size="sm" variant="outline">Mark Complete</Button>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Leads</h2>
                  {isLoading ? (
                    <div className="flex justify-center p-8">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {userLeads.slice(0, 6).map((lead) => (
                        <LeadCard key={lead.id} lead={lead} />
                      ))}
                    </div>
                  )}
                  
                  {userLeads.length > 6 && (
                    <div className="mt-6 text-center">
                      <Button variant="outline" asChild>
                        <Link to="/leads">View All Leads</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="hover:shadow-elevation transition-all">
                    <CardHeader>
                      <CardTitle>Lead Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(statusCounts)
                        .filter(([_, count]) => count > 0)
                        .map(([status, count]) => (
                          <div key={status} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{status}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                            <Progress 
                              value={(count / totalLeads) * 100} 
                              className="h-2" 
                            />
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-elevation transition-all">
                    <CardHeader>
                      <CardTitle>Team Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Sales Team</span>
                          </div>
                          <span className="font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Design Team</span>
                          </div>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Production Team</span>
                          </div>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      
                      <div className="pt-2 text-xs text-muted-foreground">
                        Based on on-time delivery and customer satisfaction
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-elevation transition-all lg:col-span-1 md:col-span-2">
                    <CardHeader>
                      <CardTitle>Monthly Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <BarChart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p>Analytics data visualization would go here</p>
                        <p className="text-xs mt-1">Connect to real data sources for actual metrics</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
