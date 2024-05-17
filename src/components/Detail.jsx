import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getTimeNotation from '../utils/getTimeNotation';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export default function Detail({ videoId }) {
  const {
    data: videoSnippet,
    isLoading: videoLoading,
    isError: videoError,
  } = useQuery({
    queryKey: ['video', videoId],
    queryFn: async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/data/one-video.json`);
      const data = await res.json();
      return data.items[0].snippet;
    },
  });

  let title, description, channelTitle, channelId, publishedAt, timeNotation;

  if (videoSnippet) {
    ({ title, description, channelTitle, channelId, publishedAt } =
      videoSnippet);
    timeNotation = getTimeNotation(publishedAt);
  }

  const {
    data: channelSnippet,
    isLoading: channelLoading,
    isError: channelError,
  } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log('channel fetched');
      return data.items[0].snippet;
    },
    enabled: !!channelId, // Only run this query if channelId is available
  });

  if (videoLoading || channelLoading) return <div>Loading...</div>;
  if (videoError || channelError) return <div>Error loading data</div>;
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
