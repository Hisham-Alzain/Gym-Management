import { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import { LoginContext } from "../../utils/Contexts";
import { FetchVideo } from '../../apis/UserViewApis';
import styles from '../../styles/video_popup.module.css';


const VideoPopUp = ({ Path }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const vidRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);

      FetchVideo(accessToken, Path).then((response) => {
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

  return (
    <Popup
      trigger={
        <button className={styles.video_button} title='Trainee images'>
          Show video
        </button>
      }
      modal
      nested
    >
      {close => (isLoading ? <></> :
        <div className={styles.modal}>
          <button className={styles.close} onClick={close}>
            &times;
          </button>
          <div className={styles.header}> Exercise video </div>
          <div className={styles.content}>
            <div className={styles.video_div}>
              <video ref={vidRef} controls>
                <source src={videoData} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className={styles.actions}></div>
        </div>
      )}
    </Popup>
  )
};

export default VideoPopUp;
