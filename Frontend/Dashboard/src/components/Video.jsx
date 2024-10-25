import { useEffect, useState, useRef } from 'react';
import { FetchVideo } from '../apis/UserViewApis';

const Video = (props) => {
  const initialized = useRef(false);
  const vidRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);

      FetchVideo("", 'exercises_videos/2024_10_09_130721_eldenring.mp4').then((response) => {
        const VideoURL = URL.createObjectURL(response);
        setVideoData(VideoURL);
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const handlePlayVideo = () => {
    vidRef.current.play();
  }

  if (isLoading) {
    return <></>;
  }
  return (
    <video ref={vidRef} width="640" height="360" controls>
      <source src={videoData} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default Video;
