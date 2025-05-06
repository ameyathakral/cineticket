
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Define form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Handle form submission
  function onSubmit(data: LoginFormValues) {
    // In a real app, you'd call an API here
    console.log("Login data:", data);
    
    // For now, just pretend we logged in successfully
    toast({
      title: "Login successful",
      description: "Welcome back to CineTicket!",
    });
    
    // Navigate to home page
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-red-600 hover:text-red-500">
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-red-600">CineTicket</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-400">Log in to your account to continue</p>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    Log In
                  </Button>
                </div>
                
                <div className="text-center text-sm">
                  <p className="text-gray-400">
                    Don't have an account? {" "}
                    <Link to="/register" className="text-red-600 hover:underline">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
