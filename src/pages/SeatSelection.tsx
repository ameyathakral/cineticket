
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showsData } from '@/data/shows';
import { moviesData } from '@/data/movies';
import { format } from 'date-fns';
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Seat row labels (A-J)
const rows = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i));
// Number of seats per row
const seatsPerRow = 10;

const SeatSelection = () => {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for selected seats and group booking
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isGroupBooking, setIsGroupBooking] = useState<boolean>(false);
  const [groupSize, setGroupSize] = useState<number>(2);
  
  // Find the show from our data
  const show = showsData.find(s => s.id === Number(showId));
  
  // If show not found
  if (!show) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Show not found</h2>
          <Link to="/">
            <Button className="bg-red-600 hover:bg-red-700">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Movies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find the movie for this show
  const movie = moviesData.find(m => m.id === show.movieId);
  
  // Handle seat click
  const handleSeatClick = (seatId: string) => {
    if (isGroupBooking) {
      // In group booking mode, we don't allow individual selection
      return;
    }
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        // Deselect the seat
        return prev.filter(id => id !== seatId);
      } else {
        // Select the seat
        return [...prev, seatId];
      }
    });
  };
  
  // Handle group size change
  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size >= 1 && size <= 20) {
      setGroupSize(size);
    }
  };
  
  // Handle group seating selection
  const handleGroupSeating = () => {
    // For simplicity, select seats in the middle rows
    const middleRowIndex = Math.floor(rows.length / 2);
    const selectedRow = rows[middleRowIndex];
    
    // Try to find consecutive seats in the middle of the row
    const startSeatIndex = Math.floor((seatsPerRow - groupSize) / 2) + 1;
    const newSelectedSeats = [];
    
    for (let i = 0; i < groupSize; i++) {
      newSelectedSeats.push(`${selectedRow}${startSeatIndex + i}`);
    }
    
    setSelectedSeats(newSelectedSeats);
  };
  
  // Handle booking submission
  const handleBookSeats = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would send this to the backend
    const booking = {
      id: Math.floor(Math.random() * 10000),
      showId: show.id,
      seats: selectedSeats,
      totalPrice: selectedSeats.length * show.price,
      isGroupBooking,
      groupSize: isGroupBooking ? groupSize : undefined
    };
    
    console.log("Booking:", booking);
    
    // Navigate to payment page
    navigate(`/payment/${booking.id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to={`/movie/${show.movieId}`} className="flex items-center text-red-600 hover:text-red-500">
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span className="font-semibold">Back to Movie</span>
          </Link>
          <h1 className="text-2xl font-bold text-red-600">CineTicket</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Show Info */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">{movie?.title}</h2>
            <p className="text-xl text-gray-400 mb-1">
              {format(new Date(show.showDateTime), 'EEEE, MMMM d, yyyy')} at {format(new Date(show.showDateTime), 'h:mm a')}
            </p>
            <p className="text-lg">Ticket Price: ${show.price.toFixed(2)} each</p>
          </div>
          
          {/* Group Booking Option */}
          <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant={isGroupBooking ? "default" : "outline"} 
                className={isGroupBooking ? "bg-red-600" : "border-red-600 text-red-600"}
                onClick={() => {
                  setIsGroupBooking(true);
                  setSelectedSeats([]);
                }}
              >
                Group Booking
              </Button>
              <Button 
                variant={isGroupBooking ? "outline" : "default"} 
                className={!isGroupBooking ? "bg-red-600" : "border-red-600 text-red-600"}
                onClick={() => {
                  setIsGroupBooking(false);
                  setSelectedSeats([]);
                }}
              >
                Individual Seats
              </Button>
            </div>
            
            {isGroupBooking && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <Label htmlFor="group-size" className="text-white">Group Size:</Label>
                  <Input
                    id="group-size"
                    type="number"
                    min={1}
                    max={20}
                    value={groupSize}
                    onChange={handleGroupSizeChange}
                    className="w-20 text-black"
                  />
                  <Button onClick={handleGroupSeating} className="ml-auto bg-red-600 hover:bg-red-700">
                    Find Group Seats
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  We'll find the best available seats for your group to sit together.
                </p>
              </div>
            )}
          </div>
          
          {/* Screen */}
          <div className="relative mb-12">
            <div className="h-10 bg-gray-700 rounded-t-full mx-auto max-w-md"></div>
            <p className="text-center text-sm mt-2 text-gray-400">SCREEN</p>
          </div>
          
          {/* Seat Map */}
          <div className="mb-8">
            {rows.map(row => (
              <div key={row} className="flex justify-center mb-2">
                <div className="w-8 flex items-center justify-center">{row}</div>
                <div className="flex gap-2">
                  {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map(seat => {
                    const seatId = `${row}${seat}`;
                    const isSelected = selectedSeats.includes(seatId);
                    // Randomly determine if seat is available
                    const isAvailable = Math.random() > 0.2;
                    
                    return (
                      <button
                        key={seatId}
                        className={`w-8 h-8 rounded-t-lg flex items-center justify-center text-xs ${
                          isSelected
                            ? 'bg-red-600 text-white'
                            : isAvailable
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-900 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={() => isAvailable && handleSeatClick(seatId)}
                        disabled={!isAvailable || isGroupBooking}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-700"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-600"></div>
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-900"></div>
              <span className="text-sm">Unavailable</span>
            </div>
          </div>
          
          {/* Booking Summary */}
          <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Movie:</span>
                <span>{movie?.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span>{format(new Date(show.showDateTime), 'MMM d, yyyy')} at {format(new Date(show.showDateTime), 'h:mm a')}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Seats:</span>
                <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${(selectedSeats.length * show.price).toFixed(2)}</span>
              </div>
            </div>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700" 
              disabled={selectedSeats.length === 0}
              onClick={handleBookSeats}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeatSelection;
