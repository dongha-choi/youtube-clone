import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Video from '../components/Video';
import Detail from '../components/Detail';

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

  return (
    <div>
      <div>
        <div id='player'></div>
        <Detail videoId={videoId} />
      </div>
      {/*
      <div>{.map(<Video/>)} </div>
      */}
    </div>
  );
}
