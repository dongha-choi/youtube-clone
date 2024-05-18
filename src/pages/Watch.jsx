import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from '../components/Detail';
import RelatedVideos from '../components/RelatedVideos';
import { useQuery } from '@tanstack/react-query';

export default function Watch() {
  const { videoId } = useParams();

  // load Youtube video player
  useEffect(() => {
    let player;
    const createPlayer = () => {
      console.log('Creating Player...');
      player = new window.YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoId,
      });
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
    queryKey: ['video', videoId],
    queryFn: async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/data/one-video.json`);
      const data = await res.json();
      return data.items[0].snippet;
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div>
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
        <RelatedVideos videoSnippet={videoSnippet} />
      )}
    </div>
  );
}
