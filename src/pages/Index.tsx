
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MovieList from '@/components/MovieList';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">CineTicket</h1>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="nowShowing" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2">
            <TabsTrigger value="nowShowing" className="data-[state=active]:bg-red-600">Now Showing</TabsTrigger>
            <TabsTrigger value="comingSoon" className="data-[state=active]:bg-red-600">Coming Soon</TabsTrigger>
          </TabsList>
          <TabsContent value="nowShowing">
            <MovieList type="nowShowing" />
          </TabsContent>
          <TabsContent value="comingSoon">
            <MovieList type="comingSoon" />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 CineTicket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
