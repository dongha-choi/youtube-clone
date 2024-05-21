import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import getTimeNotation from '../../utils/getTimeNotation.js';
import { StylesContext } from '../../context/StylesContext.js';

export default function Video({ item }) {
  const styles = useContext(StylesContext);
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
      className={styles.container}
    >
      <img src={imgUrl} alt='' className={styles.thumbnail} />
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{channelTitle}</p>
        <p className={styles.description}>{timeNotation}</p>
      </div>
    </li>
  );
}
