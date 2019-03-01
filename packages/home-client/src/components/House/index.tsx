import React from 'react';
import styled from 'styled-components';

export interface Room {
  name: string;
  paths: number[][];
}

export interface Props {
  rooms: Room[];
  width: number,
  height: number,
}

const House = ({ rooms, width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {rooms.map(({ name, paths }, i) => {
        const [first, ...rest] = paths;
        let path = `M${first[0] * width} ${first[1] * height} `;
        path += rest.map(path => `L${path[0] * width} ${path[1] * height}`).join(' ');
        path += ' Z';

        return (
          <>
            <path id={`room${i}`} d={path} strokeWidth="2" fill="transparent" stroke="#aaa" />
            <defs>
              <path id={`room${i}`} d={path} strokeWidth="2" fill="transparent" stroke="#aaa" />
            </defs>
            <text>
              <textPath xlinkHref={`#room${i}`} startOffset="50%" text-anchor="middle">{name}</textPath>
            </text>
          </>
        )
      })}
    </svg>
  );
};

export default House;
