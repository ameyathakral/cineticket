
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
    poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw",
    rating: "PG-13",
    duration: "2h 28m",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseDate: "2023-05-15",
    isReleased: true
  },
  {
    id: 2,
    title: "Interstellar",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngBJ0B7UDrLUkDlp6DCQLsEYuWR-DiHwbnxFFCniB3HiP3f3NZmR1-lKSC34ge6YXu4LX",
    rating: "PG-13",
    duration: "2h 49m",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: "2023-04-21",
    isReleased: true
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA",
    rating: "PG-13",
    duration: "2h 32m",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: "2023-06-02",
    isReleased: true
  },
  {
    id: 4,
    title: "Avatar 3",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiNNat0KtsNdn_enDKomQ_Uc4UsrUUBGzNBQ&s",
    rating: "PG-13",
    duration: "3h 10m",
    description: "The third installment in the Avatar franchise, continuing the story of Pandora's exploration and conflict.",
    releaseDate: "2025-12-20",
    isReleased: false
  },
  {
    id: 5,
    title: "Blade Runner 2099",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0-eKwIoSqYQYj-3y9K9TM3-vshCXvkBYgw&s",
    rating: "R",
    duration: "2h 45m",
    description: "The next installment in the Blade Runner franchise, set 50 years after Blade Runner 2049.",
    releaseDate: "2025-10-15",
    isReleased: false
  },
  {
    id: 6,
    title: "Dune: Part Two",
    poster: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "PG-13",
    duration: "2h 46m",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    releaseDate: "2023-03-01",
    isReleased: true
  }
];
