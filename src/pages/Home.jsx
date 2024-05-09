import React, { useEffect, useState } from 'react';

export default function Search() {
  const [homeVideos, setHomeVideos] = useState([]);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  useEffect(() => {
    // const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&regionCode=US&key=${apiKey}`;
    fetch('data/home-videos.json')
      .then((res) => res.json())
      .then((data) => setHomeVideos(data))
      .catch((error) => console.log(error));
  }, []);
  //videos api로 받아오고 각 video 컴포넌트에 할당해서 보여주기
  return <div>home</div>;
}
