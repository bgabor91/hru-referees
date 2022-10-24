import React, { useState, useEffect } from 'react'
import { videos } from 'src/pages/Videos/video-data'
import VideoListItem from '../videoListItem'
import Spinner from 'src/components/common/spinner'

const VideoList = () => {
  const [loading, setLoading] = useState(true)
  console.log(loading)

  const load = () => setLoading(false)

  useEffect(() => {
    setTimeout(load, 1000)
}, [])

  return (
    <>
      {loading ? (
        <Spinner topMargin={'mt-10'}/>
      ) : (
        <div>
          {videos.map((video) => (
            <VideoListItem video={video} />
          ))}
        </div>
      )}
    </>
  )
}

export default VideoList
