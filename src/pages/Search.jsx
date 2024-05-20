import React from 'react';
import { useParams } from 'react-router-dom';
import Video from '../components/Video';
import { useQuery } from '@tanstack/react-query';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export default function Search() {
  const { q } = useParams();
  const { data: searchedVideos, isLoading } = useQuery({
    queryKey: ['searchedVideos', q],
    queryFn: async () => {
      const url = process.env.PUBLIC_URL + '/data/search-videos.json';
      // const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${q}&type=video&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.items;
    },
    staleTime: 5 * 60 * 1000,
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <ul>
      {searchedVideos.map((item) => {
        return <Video key={item.id.videoId} item={item} />;
      })}
    </ul>
  );
}
