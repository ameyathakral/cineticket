
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";

// Payment form schema
const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
  cardName: z.string().min(2, { message: "Cardholder name is required" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3-4 digits" })
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const Payment = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Countdown timer state (15 minutes = 900 seconds)
  const [timeLeft, setTimeLeft] = useState(900);
  
  // Booking details (in a real app, you'd fetch this from the API)
  const booking = {
    id: bookingId,
    movieTitle: "Inception",
    showTime: "2023-07-15T14:30:00",
    seats: ["A5", "A6", "A7"],
    totalPrice: 36.00
  };

  // Start countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Redirect to timeout page or show message
          toast({
            title: "Payment session expired",
            description: "Your booking has been released. Please try again.",
            variant: "destructive"
          });
          navigate('/');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate, toast]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Define form
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: ""
    }
  });

  // Handle form submission
  function onSubmit(data: PaymentFormValues) {
    console.log("Payment data:", data);
    
    // In a real app, you'd call an API here to process the payment
    
    // Show success message
    toast({
      title: "Payment successful",
      description: "Your booking has been confirmed!",
    });
    
    // Navigate to dashboard/confirmation
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-red-600 hover:text-red-500">
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span className="font-semibold">Cancel Booking</span>
          </Link>
          <h1 className="text-2xl font-bold text-red-600">MovieSeat Serenade</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Countdown Timer */}
          <div className="mb-8 text-center">
            <p className="text-lg mb-2">Complete payment before your seats are released:</p>
            <div className={`text-3xl font-bold ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {/* Payment Form */}
            <div className="md:col-span-3">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription className="text-gray-400">
                    Enter your card information to complete your booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                        Pay ${booking.totalPrice.toFixed(2)}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div className="md:col-span-2">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-lg">{booking.movieTitle}</p>
                      <p className="text-gray-400">{new Date(booking.showTime).toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Seats</p>
                      <p>{booking.seats.join(', ')}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800">
                      <div className="flex justify-between mb-2">
                        <span>Ticket Price</span>
                        <span>${(booking.totalPrice - 2).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Booking Fee</span>
                        <span>$2.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-800">
                        <span>Total</span>
                        <span>${booking.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
