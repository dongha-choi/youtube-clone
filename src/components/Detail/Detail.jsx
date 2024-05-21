import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getTimeNotation from '../../utils/getTimeNotation';
import styles from './Detail.module.css';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export default function Detail({ videoSnippet }) {
  const { title, description, channelTitle, channelId, publishedAt } =
    videoSnippet;
  const timeNotation = getTimeNotation(publishedAt);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const {
    data: channelSnippet,
    isLoading: channelLoading,
    isError: channelError,
  } = useQuery({
    queryKey: ['channelSnippet', channelId],
    queryFn: async () => {
      // const url = `${process.env.PUBLIC_URL}/data/one-channel.json`;
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
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.channelInfo}>
        <img
          src={channelSnippet.thumbnails.default.url}
          alt={channelTitle}
          className={styles.channelLogo}
        />
        <p className={styles.channelTitle}> {channelTitle}</p>
      </div>
      <div className={styles.moreInfo}>
        <p className={styles.timeNotation}>{timeNotation}</p>
        <p
          className={`${styles.description} ${
            isExpanded ? styles.expanded : ''
          }`}
        >
          {description}
        </p>
        <button className={styles.button} onClick={toggleDescription}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
}
