
export interface Show {
  id: number;
  movieId: number;
  showDateTime: string; // ISO date string
  availableSeats: number;
  totalSeats: number;
  price: number;
}

// Helper function to generate shows for the next 7 days
const generateShowsForMovie = (movieId: number, isReleased: boolean): Show[] => {
  if (!isReleased) return [];
  
  const shows: Show[] = [];
  const today = new Date();
  
  // Generate shows for the next 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Generate 3-4 shows per day
    const numShows = Math.floor(Math.random() * 2) + 3; // 3-4 shows
    for (let j = 0; j < numShows; j++) {
      // Showtimes between 1pm and 10pm
      const hour = 13 + Math.floor(Math.random() * 9);
      const minute = Math.random() > 0.5 ? 30 : 0;
      
      const showTime = `${dateStr}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
      
      shows.push({
        id: movieId * 100 + i * 10 + j,
        movieId,
        showDateTime: showTime,
        availableSeats: Math.floor(Math.random() * 30) + 50, // 50-80 seats available
        totalSeats: 100,
        price: Math.floor(Math.random() * 5) + 8 // $8-$12
      });
    }
  }
  
  return shows;
};

// Generate shows for all released movies
import { moviesData } from './movies';

export const showsData: Show[] = moviesData.flatMap(movie => 
  generateShowsForMovie(movie.id, movie.isReleased)
);
