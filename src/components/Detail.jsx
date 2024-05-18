import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getTimeNotation from '../utils/getTimeNotation';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export default function Detail({ videoSnippet }) {
  const { title, description, channelTitle, channelId, publishedAt } =
    videoSnippet;
  const timeNotation = getTimeNotation(publishedAt);

  const {
    data: channelSnippet,
    isLoading: channelLoading,
    isError: channelError,
  } = useQuery({
    queryKey: ['channelSnippet', channelId],
    queryFn: async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.items[0].snippet;
    },
    enabled: !!channelId, // Only run this query if channelId is available
    staleTime: 5 * 60 * 1000,
  });

  if (channelLoading) return <div>Loading...</div>;
  if (channelError) return <div>Error loading data</div>;
  return (
    <div>
      <p>{title}</p>
      <img src={channelSnippet.thumbnails.default.url} alt={channelTitle} />
      <p>{channelTitle}</p>
      <p>{timeNotation}</p>
      <p>{description}</p>
    </div>
  );
}
