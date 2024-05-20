import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from '../components/Detail/Detail';
import RelatedVideos from '../components/RelatedVideos/RelatedVideos.jsx';
import { useQuery } from '@tanstack/react-query';
import styles from './Watch.module.css';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export default function Watch() {
  const { videoId } = useParams();

  // load Youtube video player
  useEffect(() => {
    let player;
    const createPlayer = () => {
      player = new window.YT.Player('player', {
        height: '429',
        width: '704',
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
        },
      });
    };
    const onPlayerReady = () => {
      // Add the border-radius class to the iframe
      const iframe = document.querySelector('#player');
      iframe.classList.add('rounded-iframe');
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.id = 'youtube-iframe-api';
      document.body.appendChild(tag);
    }
    return () => {
      if (player) {
        player.destroy();
      }
      const scriptElement = document.getElementById('youtube-iframe-api');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
      delete window.onYouTubeIframeAPIReady;
    };
  }, [videoId]);

  const { data: videoSnippet, isLoading: videoLoading } = useQuery({
    queryKey: ['videoSnippet', videoId],
    queryFn: async () => {
      const url = `${process.env.PUBLIC_URL}/data/one-video.json`;
      // const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.items[0].snippet;
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className={styles.container}>
      <div>
        <div id='player'></div>
        {videoLoading ? (
          <p>Loading...</p>
        ) : (
          <Detail videoSnippet={videoSnippet} />
        )}
      </div>
      {videoLoading ? (
        <p>Loading...</p>
      ) : (
        <RelatedVideos videoId={videoId} videoSnippet={videoSnippet} />
      )}
    </div>
  );
}
