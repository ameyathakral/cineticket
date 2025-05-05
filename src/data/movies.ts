
export interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: string;
  duration: string;
  description: string;
  releaseDate: string;
  isReleased: boolean;
}

export const moviesData: Movie[] = [
  {
    id: 1,
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=3925&auto=format&fit=crop",
    rating: "PG-13",
    duration: "2h 28m",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseDate: "2023-05-15",
    isReleased: true
  },
  {
    id: 2,
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?q=80&w=3987&auto=format&fit=crop",
    rating: "PG-13",
    duration: "2h 49m",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: "2023-04-21",
    isReleased: true
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=3987&auto=format&fit=crop",
    rating: "PG-13",
    duration: "2h 32m",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: "2023-06-02",
    isReleased: true
  },
  {
    id: 4,
    title: "Avatar 3",
    poster: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=3987&auto=format&fit=crop",
    rating: "PG-13",
    duration: "3h 10m",
    description: "The third installment in the Avatar franchise, continuing the story of Pandora's exploration and conflict.",
    releaseDate: "2025-12-20",
    isReleased: false
  },
  {
    id: 5,
    title: "Blade Runner 2099",
    poster: "https://images.unsplash.com/photo-1604159129655-ff44eb561b49?q=80&w=3972&auto=format&fit=crop",
    rating: "R",
    duration: "2h 45m",
    description: "The next installment in the Blade Runner franchise, set 50 years after Blade Runner 2049.",
    releaseDate: "2025-10-15",
    isReleased: false
  },
  {
    id: 6,
    title: "Dune: Part Two",
    poster: "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=3840&auto=format&fit=crop",
    rating: "PG-13",
    duration: "2h 46m",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    releaseDate: "2023-03-01",
    isReleased: true
  }
];
