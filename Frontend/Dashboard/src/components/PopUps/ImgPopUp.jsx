import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { FaRegImages } from "react-icons/fa6";
import { LoginContext } from "../../utils/Contexts";
import { FetchImage } from '../../apis/UserViewApis';
import LoadingBars from '../LoadingBars';
import styles from '../../styles/PopUps/img_popup.module.css';


const ImgPopUp = ({ user }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // if (!initialized.current) {
    //   initialized.current = true;
    setIsLoading(true);

    if (user.photos.length > 0) {
      user.photos.map((photo) => {
        // FetchImage(accessToken, photo.photo_path).then((response) => {
        //   if (response.status === 200) {
        setImages((prev) => [...prev, `https://olive-salmon-530757.hostingersite.com/storage/${photo}`]);
        //   }
        // }).then(() => {
        setIsLoading(false);
        // });
      })
    } else {
      setIsLoading(false);
    }
    // }
  }, [user]);


  return (
    <Popup
      trigger={
        <button className={styles.img_button}
          title={`${user.name} ${t('components.pop_ups.img_popup.title')}`}>
          <FaRegImages />
        </button>
      }
      modal
      nested
    >
      {close =>
        <div className={styles.modal}>
          <button className={styles.close} onClick={close}>
            &times;
          </button>
          {isLoading ? <LoadingBars /> : <>
            <div className={styles.header}>
              {`${user.name} ${t('components.pop_ups.img_popup.header')}`}
            </div>
            <div className={styles.content}>
              {images.length > 0 ? images.map((image, i) => {
                return (
                  <Popup
                    key={i}
                    trigger={
                      <div className={styles.img_div}>
                        <img className={styles.image} src={image} />
                      </div>}
                    modal
                    nested
                  >
                    {close => (
                      <div className={styles.modal}>
                        <button className={styles.close} onClick={close}>
                          &times;
                        </button>
                        <div className={styles.img_div2}>
                          <img className={styles.image} src={image} />
                        </div>
                      </div>
                    )}
                  </Popup>
                )
              }) : <div className={styles.header}>
                {t('components.pop_ups.img_popup.no_images')}
              </div>
              }
            </div>
          </>}
          <div className={styles.actions}></div>
        </div>
      }
    </Popup>
  );
};

export default ImgPopUp;
