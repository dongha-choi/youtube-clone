import React from 'react';
import { useNavigate } from 'react-router-dom';
import getTimeNotation from '../utils/getTimeNotation.js';

export default function Video({ item }) {
  const { title, channelTitle, publishedAt } = item.snippet;
  const imgUrl = item.snippet.thumbnails.medium.url;
  const timeNotation = getTimeNotation(publishedAt);
  const videoId = typeof item.id === 'string' ? item.id : item.id.videoId;
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/videos/watch/${videoId}`);
      }}
    >
      <img src={imgUrl} alt='' />
      <p>{title}</p>
      <p>{channelTitle}</p>
      <p>{timeNotation}</p>
    </li>
  );
}
