import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Video from './Video';

export default function RelatedVideos({ videoSnippet }) {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const { title } = videoSnippet;
  const { data: relatedVideos, isLoading } = useQuery({
    queryKey: ['title'],
    queryFn: async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${title}&type=video&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.items.filter((item) => item.snippet.title !== title);
    },
  });
  if (isLoading) return <div>Loading Related Videos...</div>;
  return (
    <>
      {relatedVideos.map((item) => {
        return <Video key={item.id.videoId} item={item} />;
      })}
    </>
  );
}
