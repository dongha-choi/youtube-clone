import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Video from './Video';

export default function RelatedVideos({ videoId, videoSnippet }) {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const { title, channelTitle } = videoSnippet;
  const { data: relatedVideos, isLoading } = useQuery({
    queryKey: ['relatedVideos', videoId],
    queryFn: async () => {
      const url = `${process.env.PUBLIC_URL}/data/search-videos.json`;
      // const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${channelTitle}&type=video&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.items.filter((item) => {
        const itemTitle = decodeHtmlEntities(item.snippet.title);
        const videoTitle = decodeHtmlEntities(title);
        return itemTitle !== videoTitle;
      });
    },
    staleTime: 5 * 60 * 1000,
  });
  if (isLoading) return <div>Loading Related Videos...</div>;
  return (
    <ul>
      {relatedVideos.map((item) => {
        return <Video key={item.id.videoId} item={item} />;
      })}
    </ul>
  );
}
function decodeHtmlEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}
