import React from 'react';
import Video from '../components/Video';
import { useQuery } from '@tanstack/react-query';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export default function Home() {
  const { data: homeVideos, isLoading } = useQuery({
    queryKey: ['homeVideos'],
    queryFn: async () => {
      // const url = 'data/home-videos.json';
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&regionCode=US&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.items;
    },
    staleTime: 5 * 60 * 1000,
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {homeVideos.map((item) => {
        return <Video key={item.id} item={item} />;
      })}
    </>
  );
}
