
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Printer, CheckCircle, Clock, DollarSign, PieChart } from "lucide-react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    toast.success("Logged in successfully");
    navigate("/dashboard");
  };

  const features = [
    {
      title: "Lead Management",
      description: "Track and manage customer leads throughout their lifecycle",
      icon: CheckCircle,
    },
    {
      title: "Real-time Updates",
      description: "Get instant updates on lead status and team assignments",
      icon: Clock,
    },
    {
      title: "Payment Tracking",
      description: "Monitor advance and final payments from customers",
      icon: DollarSign,
    },
    {
      title: "Performance Analytics",
      description: "View detailed reports on team performance and lead conversion",
      icon: PieChart,
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Hero section */}
      <div className="flex-1 bg-gradient-to-br from-attracta-50 to-white p-6 md:p-12 flex flex-col justify-center items-center text-center md:text-left md:items-start">
        <div className="animate-fade-in max-w-xl">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
            <Printer className="h-8 w-8 text-attracta-500" />
            <h1 className="text-3xl font-bold text-attracta-500">Attracta</h1>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Printing CRM System
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            Streamline your printing workflow from quote to delivery
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center md:items-start p-4 bg-white rounded-lg shadow-subtle transition-transform duration-300 hover:translate-y-[-4px]"
              >
                <feature.icon className="h-8 w-8 text-attracta-500 mb-3" />
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Login form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-6 animate-scale-in">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Login to Your Account</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your credentials to access the CRM system
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@attracta.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Login with credentials provided by your administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
