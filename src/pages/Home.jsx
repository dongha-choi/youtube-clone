import React, { useEffect, useState } from 'react';
import Video from '../components/Video';

export default function Search() {
  const [homeVideos, setHomeVideos] = useState([]);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  useEffect(() => {
    // const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&regionCode=US&key=${apiKey}`;
    fetch('data/home-videos.json')
      .then((res) => res.json())
      .then((data) => setHomeVideos(data.items))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {homeVideos.map((item) => {
        return <Video key={item.id} item={item} />;
      })}
    </>
  );
}
