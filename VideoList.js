import React from 'react';

const VideoList = ({ videos }) => {
  return (
    <div>
      {videos.map((video, index) => (
        <div key={index}>
          <video controls width="300" height="auto">
            <source src={video.url} type={video.type} />
            uploaded
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
