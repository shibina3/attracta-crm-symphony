
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import FileUpload from "./FileUpload";

interface CustomerFormProps {
  customerId: string;
  customerName?: string;
  onSubmitSuccess?: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customerId,
  customerName,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState(customerName || "");
  const [mobile, setMobile] = useState("");
  const [alternativeMobile, setAlternativeMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !mobile) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Information submitted successfully!");
    setIsSubmitting(false);
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
          <Input
            id="mobile"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="alternativeMobile">Alternative Mobile (optional)</Label>
          <Input
            id="alternativeMobile"
            placeholder="Enter alternative mobile number"
            value={alternativeMobile}
            onChange={(e) => setAlternativeMobile(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="files">Upload Files <span className="text-red-500">*</span></Label>
          <div className="border border-border rounded-md p-4 bg-background">
            <FileUpload onFilesSelected={handleFilesSelected} />
          </div>
          <p className="text-xs text-muted-foreground">
            Upload design files, reference materials, or any other documents needed for your order.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes (optional)</Label>
          <Textarea
            id="notes"
            placeholder="Enter any additional information or special requirements"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting || !name || !mobile || files.length === 0}
      >
        {isSubmitting ? "Submitting..." : "Submit Information"}
      </Button>
    </form>
  );
};

export default CustomerForm;
