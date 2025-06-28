import { useEffect, useState } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner"; 


function Results(){
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const num_recs=searchParams.get('num_recs')
    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecommendations = async ()=>{
        try {
            const response = await fetch(`http://localhost:8000/search?description=${encodeURIComponent(query)}&num_recs=${num_recs}`);
            if (!response.ok) throw new Error("Request failed");

            const data = await response.json();

            const withImages = await Promise.all(
              data.map(async (anime) => {
                const image = await fetchAnimeImage(anime.anime_id);
                return { ...anime, image };
              })
            );



            setResults(withImages)
            console.log("Recommendations:", data);
        } catch (err) {
            toast.error("Failed to get recommendations. Try again.");
            navigate("/");
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchRecommendations()
    },[query])

    const fetchAnimeImage=async(id)=>{
      try{
            const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            const data=await res.json()

            return data?.data?.images?.jpg?.image_url || null
      }catch{
        return null
      }
    }


return (
  <div
    className="min-h-screen py-10 px-4 flex flex-col items-center"
    style={{ backgroundColor: '#f4f3ed', color: '#3d3a2a' }}
  >
    <div className="w-full max-w-3xl mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-2" style={{ color: '#3d3a2a' }}>
        Here are your anime recommendations
      </h2>
      <p className="text-sm" style={{ color: '#3d3a2a' }}>
        based on: "{query}"
      </p>
      <div className="mt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="border-[#3d3a2a] text-[#3d3a2a] hover:bg-[#e0dfd9]"
        >
          ← Back to Home
        </Button>
      </div>
    </div>

    {loading ? (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin h-10 w-10 border-4 border-[#3d3a2a] border-t-transparent rounded-full" />
      </div>
    ) : (
      <div className="w-full max-w-3xl space-y-4">
        {results.map((anime) => (
          <Card
            key={anime.anime_id}
            className="relative overflow-hidden max-w-4xl w-full p-4 min-h-[200px] border border-[#3d3a2a] bg-white"
          >
            {anime.image && (
              <img
                src={anime.image}
                alt={anime.title}
                className="absolute top-4 right-4 w-32 h-44 object-cover rounded-md shadow-md"
              />
            )}

            <div className="pr-40">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-xl font-bold" style={{ color: '#3d3a2a' }}>
                  {anime.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-1 text-sm" style={{ color: '#3d3a2a' }}>
                <p>
                  <span className="font-medium">Type:</span> {anime.anime_type} •
                  <span className="font-medium ml-1">Rating:</span> {anime.rating}
                </p>
                <p><span className="font-medium">Genres:</span> {anime.genres}</p>
                <p>
                  <span className="font-medium">Episodes:</span> {anime.episodes} •
                  <span className="font-medium ml-1">Score:</span> {anime.score}
                </p>
                <p>{anime.synopsis}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    )}
  </div>
);


}

export default Results