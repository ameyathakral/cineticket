
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { moviesData } from '@/data/movies';

interface MovieListProps {
  type: 'nowShowing' | 'comingSoon';
}

const MovieList = ({ type }: MovieListProps) => {
  // Filter movies based on type
  const movies = moviesData.filter(movie => 
    type === 'nowShowing' ? movie.isReleased : !movie.isReleased
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map(movie => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <Card className="overflow-hidden transition-transform hover:scale-105 bg-gray-900 border border-gray-800">
            <div className="aspect-[2/3] overflow-hidden">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold truncate">{movie.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-400">{movie.rating}</span>
                <span className="text-sm text-gray-400">{movie.duration}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
