import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { LoginContext } from "../../utils/Contexts";
import { FetchVideo } from '../../apis/UserViewApis';
import styles from '../../styles/PopUps/video_popup.module.css';


const VideoPopUp = ({ Path }) => {
  // Translations
  const { t } = useTranslation('global');
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
        <button className={styles.video_button}
          title={t('components.pop_ups.video_popup.title')}>
          {t('components.pop_ups.video_popup.trigger')}
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
          <div className={styles.header}>
            {t('components.pop_ups.video_popup.header')}
          </div>
          <div className={styles.content}>
            <div className={styles.video_div}>
              {Path && videoData ?
                <video ref={vidRef} controls>
                  <source src={videoData.URL} type={videoData.type} />
                  {t('components.pop_ups.video_popup.video_tag')}
                </video>
                : <div className={styles.header}>
                  {t('components.pop_ups.video_popup.no_video')}
                </div>
              }
            </div>
          </div>
          <div className={styles.actions}></div>
        </div>
      )}
    </Popup>
  );
};

export default VideoPopUp;
