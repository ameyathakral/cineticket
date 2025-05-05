
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from 'date-fns';

// Mock booking data (in a real app, you'd fetch from API)
const bookings = [
  {
    id: 1001,
    movieTitle: "Inception",
    showTime: "2023-07-15T14:30:00",
    seats: ["A5", "A6", "A7"],
    status: "Confirmed",
    totalPrice: 36.00
  },
  {
    id: 1002,
    movieTitle: "Interstellar",
    showTime: "2023-07-20T19:00:00",
    seats: ["C10", "C11"],
    status: "Confirmed",
    totalPrice: 24.00
  },
  {
    id: 1003,
    movieTitle: "The Dark Knight",
    showTime: "2023-06-30T17:15:00",
    seats: ["E4"],
    status: "Expired",
    totalPrice: 12.00
  }
];

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-red-600 hover:text-red-500">
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-red-600">MovieSeat Serenade</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">My Dashboard</h2>
            <Button className="bg-red-600 hover:bg-red-700">
              <Link to="/">Browse Movies</Link>
            </Button>
          </div>
          
          {/* User Info Card */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center">
                  <span className="text-2xl">JD</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-gray-400">john.doe@example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Bookings Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">My Bookings</h3>
            
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <Card key={booking.id} className={`bg-gray-900 border-gray-800 ${booking.status === 'Expired' ? 'opacity-70' : ''}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{booking.movieTitle}</CardTitle>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <CardDescription className="text-gray-400">
                        {format(new Date(booking.showTime), 'EEEE, MMMM d, yyyy')} at {format(new Date(booking.showTime), 'h:mm a')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Seats</p>
                          <p>{booking.seats.join(', ')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                          <p className="font-bold">${booking.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      {booking.status === 'Confirmed' && (
                        <Button variant="outline" className="w-full mt-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                          View Ticket
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-900 rounded-lg border border-gray-800">
                <p className="text-gray-400 mb-4">You haven't made any bookings yet</p>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Link to="/">Browse Movies</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
