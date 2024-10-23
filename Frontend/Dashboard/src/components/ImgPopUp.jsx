import { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import { FaRegImages } from "react-icons/fa6";
import { LoginContext } from "../utils/Contexts";
import { FetchImage } from '../apis/UserViewApis';
import styles from '../styles/img_popup.module.css';


const ImgPopUp = ({ user }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      if (user.photos.length > 0) {
        user.photos.map((photo) => {
          FetchImage(accessToken, photo.photo_path).then((response) => {
            setImages((prev) => [...prev, response]);
          }).then(() => {
            setIsLoading(false);
          });
        })
      } else {
        setIsLoading(false);
      }
    }
  }, [user]);


  return (
    <Popup
      trigger={
        <button className={styles.img_button} title='Trainee images'>
          <FaRegImages />
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
          <div className={styles.header}> {user.name} photos </div>
          <div className={styles.content}>
            {images.length > 0 ? images.map((image, i) => {
              return (
                <Popup
                  key={i}
                  trigger={
                    <div className={styles.img_div}>
                      <img className={styles.image} src={URL.createObjectURL(image)} />
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
                        <img className={styles.image} src={URL.createObjectURL(image)} />
                      </div>
                    </div>
                  )}
                </Popup>
              )
            }) : <div className={styles.header}> No Images </div>}
          </div>
          <div className={styles.actions}></div>
        </div>
      )}
    </Popup>
  )
};

export default ImgPopUp;
