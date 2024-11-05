import { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import { LoginContext } from "../../utils/Contexts";
import { FetchVideo } from '../../apis/UserViewApis';
import styles from '../../styles/PopUps/video_popup.module.css';


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

      if (Path) {
        FetchVideo(accessToken, Path).then((response) => {
          if (response.status == 200) {
            setVideoData({
              URL: response.videoURL,
              type: response.type,
              size: response.size,
            });
          } else {
            setIsLoading(false);
          }
        }).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [Path]);

  const handlePlayVideo = () => {
    vidRef.current.play();
  }

  return (
    <Popup
      trigger={
        <button className={styles.video_button} title='Video'>
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
              {Path && videoData ? (
                <video ref={vidRef} controls>
                  <source src={videoData.URL} type={videoData.type} />
                  Your browser does not support the video tag.
                </video>
              ) : <div className={styles.header}> No Video </div>}
            </div>
          </div>
          <div className={styles.actions}></div>
        </div>
      )}
    </Popup>
  );
};

export default VideoPopUp;
