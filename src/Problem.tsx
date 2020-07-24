import React from 'react';
import useSWR from 'swr';

const YT_BASE = 'https://www.youtube.com/watch?v=';
const YT_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const getUrl = (q: string) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${q}&key=${YT_KEY}`;

const fetcher = (url: any) => fetch(url).then(r => r.json());

const Problem = ({route}: any) => {
  // TODO: preprocess query
  const url = getUrl(
    `${route.name.split('/')[0]} ${route.location[route.location.length - 1]}`,
  );
  const {data, error} = useSWR(url, fetcher);

  console.log('route', route);
  console.log('yt3data', data);

  if (!route) return <div>loading...</div>;
  if (error) return <div> failed to fetch</div>;
  if (!data) return <div> loading...</div>;

  const videoIds = data.items.map((d: any) => d.id.videoId);

  return (
    <div>
      <img src={route.imgSqSmall} alt={route.name}></img>
      <p>{route.name}</p>
      <p>{route.rating}</p>
      <p>{route.location.join('-')}</p>
      <div>videos</div>
      <ul>
        {data.items.map((v: any) => (
          <li key={v.id.videoId}>
            <a href={`${YT_BASE}${v.id.videoId}`}>{v.snippet.title}</a>
          </li>
        ))}
      </ul>
      {videoIds.slice(0, 5).map((id: string) => (
        <iframe
          key={id}
          title={id}
          id="player"
          width="320"
          height="195"
          src={`https://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com`}></iframe>
      ))}
    </div>
  );
};

export default Problem;
