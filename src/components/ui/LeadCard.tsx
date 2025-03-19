
import React from "react";
import { Lead } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/data";
import StatusBadge from "./StatusBadge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarClock, DollarSign, User } from "lucide-react";
import { Link } from "react-router-dom";

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevation animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg truncate">{lead.customerName}</h3>
          <StatusBadge status={lead.status} />
        </div>
        <p className="text-sm text-muted-foreground truncate">{lead.requirements}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center text-sm">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Assigned to: {lead.assignedTo.name}</span>
          </div>
          <div className="flex items-center text-sm">
            <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {lead.expectedDeliveryDate
                ? `Due: ${formatDate(lead.expectedDeliveryDate)}`
                : "No deadline set"}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {formatCurrency(lead.totalAmount)} ({lead.pendingAmount > 0
                ? `${formatCurrency(lead.pendingAmount)} pending`
                : "Fully paid"}
              )
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Created: {formatDate(lead.createdAt)}
        </span>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link to={`/leads/${lead.id}`}>
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeadCard;
