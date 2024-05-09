import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Search() {
  const { q } = useParams();
  const [searchedVideos, setSearchedVideos] = useState({});
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  useEffect(() => {
    // const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${q}&type=video&key=${apiKey}`;
    fetch(process.env.PUBLIC_URL + '/data/search-videos.json')
      .then((res) => res.json())
      .then((data) => setSearchedVideos(data))
      .catch((error) => console.log(error));
  }, []);
  return <div>searched</div>;
}
