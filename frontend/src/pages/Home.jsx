import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from "sonner";

function Home() {
  const [query, setQuery] = useState('');
  const [numRecs, setNumRecs] = useState(5);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter a description first.");
      return;
    }

    navigate(`/results?query=${encodeURIComponent(query)}&num_recs=${numRecs}`);
  };

return (
  <div
    className="flex flex-col items-center justify-center min-h-screen p-8"
    style={{ backgroundColor: '#f4f3ed', color: '#3d3a2a' }}
  >
    <h1 className="text-7xl font-bold mb-6" style={{ color: '#3d3a2a' }}>
      Sagashite
    </h1>
    <p className="text-3xl mb-10" style={{ color: '#3d3a2a' }}>
      Anime search thingy using FAISS
    </p>

    <form onSubmit={handleSearch} className="w-full max-w-xl flex gap-6">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe the anime you're looking for..."
        className="text-xl px-6 py-4 border border-[#3d3a2a] bg-white text-[#3d3a2a] placeholder-[#3d3a2a]"
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Input
              type="number"
              min={1}
              max={12}
              value={numRecs}
              onChange={(e) => setNumRecs(e.target.value)}
              className="w-20 text-xl border border-[#3d3a2a] bg-white text-[#3d3a2a]"
            />
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-lg">Number of recommendations</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button
        type="submit"
        className="text-xl px-8 py-4 bg-[#3d3a2a] hover:bg-[#2f2d21] text-white"
      >
        Search
      </Button>
    </form>
  </div>
);

}

export default Home;
