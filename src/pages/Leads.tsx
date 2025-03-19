
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import LeadCard from "@/components/ui/LeadCard";
import { Link } from "react-router-dom";
import { leads, getLeadsForUser, currentUser } from "@/lib/data";
import { Lead, LeadStatus } from "@/lib/types";

// All possible lead statuses for filtering
const statuses: LeadStatus[] = [
  "Initiated",
  "Confirmed",
  "On Hold",
  "Closed",
  "Rejected",
  "Waiting for Advance Payment",
  "Waiting for Customer Input",
  "In Progress",
  "Out for Production",
  "Production Completed",
  "Waiting for Full Payment",
  "Dispatched",
  "Delivered",
];

const Leads = () => {
  const [userLeads, setUserLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "amount">("newest");

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const leadsData = getLeadsForUser(currentUser);
      setUserLeads(leadsData);
      setFilteredLeads(leadsData);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let results = [...userLeads];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (lead) =>
          lead.customerName.toLowerCase().includes(query) ||
          lead.customerPhone.toLowerCase().includes(query) ||
          lead.requirements.toLowerCase().includes(query)
      );
    }
    
    // Filter by status
    if (statusFilter !== "All") {
      results = results.filter((lead) => lead.status === statusFilter);
    }
    
    // Apply sorting
    results.sort((a, b) => {
      if (sortOrder === "newest") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortOrder === "oldest") {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        return b.totalAmount - a.totalAmount;
      }
    });
    
    setFilteredLeads(results);
  }, [userLeads, searchQuery, statusFilter, sortOrder]);

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
                <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
                <p className="text-muted-foreground">
                  Manage and track all customer leads
                </p>
              </div>
              <Button asChild>
                <Link to="/leads/new" className="inline-flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Lead
                </Link>
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as LeadStatus | "All")}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <SlidersHorizontal className="h-4 w-4" />
                      Sort
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className={sortOrder === "newest" ? "bg-accent text-accent-foreground" : ""}
                      onClick={() => setSortOrder("newest")}
                    >
                      Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={sortOrder === "oldest" ? "bg-accent text-accent-foreground" : ""}
                      onClick={() => setSortOrder("oldest")}
                    >
                      Oldest First
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className={sortOrder === "amount" ? "bg-accent text-accent-foreground" : ""}
                      onClick={() => setSortOrder("amount")}
                    >
                      Amount (High to Low)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Lead Cards */}
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <div className="loader"></div>
              </div>
            ) : filteredLeads.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-muted/30 rounded-lg">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">No leads found</h3>
                <p className="text-muted-foreground mt-1 mb-4 text-center">
                  {searchQuery || statusFilter !== "All" 
                    ? "Try adjusting your search or filters"
                    : "Create your first lead to get started"
                  }
                </p>
                {!(searchQuery || statusFilter !== "All") && (
                  <Button asChild>
                    <Link to="/leads/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Lead
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leads;
