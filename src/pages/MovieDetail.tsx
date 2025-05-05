import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { moviesData } from '@/data/movies';
import { showsData } from '@/data/shows';
import { format } from 'date-fns';
import { ChevronLeft } from "lucide-react";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  
  // Find the movie from our data
  const movie = moviesData.find(m => m.id === Number(id));
  
  // If movie not found
  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Movie not found</h2>
          <Link to="/">
            <Button className="bg-red-600 hover:bg-red-700">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Movies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get shows for this movie on the selected date
  const movieShows = showsData.filter(show => 
    show.movieId === movie.id && 
    show.showDateTime.startsWith(selectedDate)
  );
  
  // Generate dates for the next 7 days
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      label: format(date, 'E, MMM d'),
      value: format(date, 'yyyy-MM-dd')
    };
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-red-600 hover:text-red-500">
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span className="font-semibold">Back to Movies</span>
          </Link>
          <h1 className="text-2xl font-bold text-red-600">CineTicket</h1>
        </div>
      </header>

      {/* Movie Hero */}
      <div className="w-full h-[40vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-2 text-white">{movie.title}</h2>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-2 py-1 border border-white rounded text-sm">{movie.rating}</span>
              <span>{movie.duration}</span>
              <span>{format(new Date(movie.releaseDate), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Synopsis</h3>
            <p className="text-gray-300 mb-8">{movie.description}</p>
            
            <h3 className="text-xl font-bold mb-4">Showtimes</h3>
            
            {/* Date selector */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
              {dateOptions.map(date => (
                <Button 
                  key={date.value}
                  variant={selectedDate === date.value ? "default" : "outline"} 
                  className={selectedDate === date.value ? "bg-red-600" : "border-red-600 text-red-600"}
                  onClick={() => setSelectedDate(date.value)}
                >
                  {date.label}
                </Button>
              ))}
            </div>
            
            {/* Show times */}
            {movieShows.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movieShows.map(show => (
                  <Link to={`/select-seats/${show.id}`} key={show.id}>
                    <Card className="cursor-pointer hover:bg-gray-800 bg-gray-900 border border-gray-700">
                      <CardContent className="p-4 text-center">
                        <p className="font-bold mb-2">{format(new Date(show.showDateTime), 'h:mm a')}</p>
                        <p className="text-sm text-gray-400">{show.availableSeats} seats left</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No showtimes available for this date</p>
              </div>
            )}
          </div>
          
          <div>
            <Card className="bg-gray-900 border border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Movie Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400">Director</p>
                    <p>Christopher Nolan</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Cast</p>
                    <p>Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Genre</p>
                    <p>Action, Sci-Fi, Thriller</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
