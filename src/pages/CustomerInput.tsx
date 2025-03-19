
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerForm from "@/components/ui/CustomerForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";

const CustomerInput = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Simulate API call to get customer data
    const fetchCustomerData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Mock data - in a real app, this would come from an API
      if (customerId) {
        setCustomerName("Acme Corporation");
      } else {
        toast.error("Invalid customer link");
        navigate("/");
      }
      
      setIsLoading(false);
    };
    
    fetchCustomerData();
  }, [customerId, navigate]);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
        <Card className="w-full max-w-md animate-scale-in">
          <CardHeader>
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center mt-4">Submission Successful</CardTitle>
            <CardDescription className="text-center">
              Thank you for providing your information. Your request is now in progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Our team will review your submission and contact you shortly if needed.
            </p>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <Card className="w-full max-w-xl animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-attracta-500">Attracta</span>
          </div>
          <CardTitle className="text-center">Customer Information Form</CardTitle>
          <CardDescription className="text-center">
            Please provide the required information and upload any necessary files for your order
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="loader"></div>
            </div>
          ) : (
            <CustomerForm 
              customerId={customerId || ""} 
              customerName={customerName}
              onSubmitSuccess={handleSubmitSuccess}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerInput;
