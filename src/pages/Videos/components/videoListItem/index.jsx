import React from 'react'

const VideoListItem = ({ video }) => {
  const w = window.innerWidth

  return (
    <div className='flex flex-col justify-center text-center'>
      <h1>{video.name}</h1>
      <div className='flex justify-center'>
        <iframe
          width={w < 600 ? w*0.95 : 560}
          height={w < 600 ? w*0.95*0.56 : 315}
          src={video.embeddedLink}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  )
}

export default VideoListItem
