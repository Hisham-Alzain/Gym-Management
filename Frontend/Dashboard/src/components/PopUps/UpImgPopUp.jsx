import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { LoginContext } from "../../utils/Contexts";
import { UpdateMealPhoto } from '../../apis/DietsApis';
import { UpdateExercisePhoto } from '../../apis/ExerciseApis';
import styles from '../../styles/PopUps/upload_popup.module.css';


const UpImgPopUp = ({ id, meal }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // State
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(null);
    const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (event.target.files.length > 0) {
      if (allowedFileTypes.includes(event.target.files[0].type)) {
        setFile(event.target.files[0]);
      } else {
        console.log("Invalid Image type. Please select a PNG, JPG, JPEG image.");
      }
    }
  }

  const handleFileUpload = () => {
    if (meal) {
      UpdateMealPhoto(accessToken, id, file).then((response) => {
        if (response.status === 200) {
          console.log('Image uploaded successfully');
          window.location.reload();
        } else {
          console.log(response);
        }
      });
    } else {
      UpdateExercisePhoto(accessToken, id, file).then((response) => {
        if (response.status == 200) {
          console.log('Image uploaded successfully');
          window.location.reload();
        } else {
          console.log(response);
        }
      });
    }
  }

  return (
    <Popup
      trigger={
        <button className={styles.upload_button}
          title={t('components.pop_ups.upimg_popup.title')}>
          {t('components.pop_ups.upimg_popup.trigger')}
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
          <div className={styles.header}>
            {t('components.pop_ups.upimg_popup.header')}
          </div>
          <div className={styles.content}>
            <div className={styles.video_div}>
              <input
                id='file'
                type='file'
                accept='.png,.jpg,.jpeg'
                onChange={handleFileChange}
              />
              {file &&
                <button onClick={handleFileUpload}>
                  {t('components.pop_ups.upimg_popup.button')}
                </button>
              }
            </div>
          </div>
          <div className={styles.actions}></div>
        </div>
      }
    </Popup>
  );
}

export default UpImgPopUp;
