import React from 'react';
import useSWR from 'swr';
//import {ytData as mockData} from './data';
import {RouteType} from './types';

//const YT_BASE = 'https://www.youtube.com/watch?v=';
const YT_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const getUrl = (q: string) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${q}&key=${YT_KEY}`;

const Video: React.FC<{route: RouteType}> = ({route}) => {
  // TODO: preprocess query
  const url = getUrl(
    `${route.name.split('/')[0]} ${route.location[2]} ${route.rating}`,
  );

  //const data = mockData;
  const {data, error} = useSWR(url);

  if (!route) return <div>loading...</div>;
  if (error) return <div>failed to fetch</div>;
  if (!data || !data.items) return <div> loading...</div>;

  const videoIds = data.items.map((d: any) => d.id.videoId);

  return (
    <div>
      <img src={route.imgSqSmall} alt={route.name}></img>
      <p>{route.location.slice(-2).join(' : ')}</p>

      {/*<ul>
        {data.items.map((v: any) => (
          <li key={v.id.videoId}>
            <a href={`${YT_BASE}${v.id.videoId}`}>{v.snippet.title}</a>
          </li>
        ))}
      </ul>*/}

      <div className="absolute float-right flex transform -translate-x-1/2">
        {videoIds.slice(0, 4).map((id: string, idx: number) => {
          let cn = 'absolute float-right transform ';
          if (idx === 0) {
            cn += '-translate-y-72 translate-x-52';
          } else if (idx === 1) {
            cn += '-translate-x-32';
          } else if (idx === 2) {
            cn += 'translate-x-56';
          } else {
            cn += '-translate-y-72 -translate-x-36';
          }

          return (
            <iframe
              className={cn}
              key={id}
              title={id}
              id="player"
              width="320"
              height="195"
              src={`https://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com`}></iframe>
          );
        })}
      </div>
    </div>
  );
};

export default Video;
