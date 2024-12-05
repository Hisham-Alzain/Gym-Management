import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { LoginContext } from "../../utils/Contexts";
import { UploadExerciseVideo } from '../../apis/ExerciseApis';
import styles from '../../styles/PopUps/upload_popup.module.css';


const UploadPopUp = ({ exercise_id }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // State
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(null);
    const allowedFileTypes = ["video/mp4", "video/m4v", "video/mkv", "video/webm", "video/flv", "video/avi", "video/wmv", "image/gif"];
    if (event.target.files.length > 0) {
      if (allowedFileTypes.includes(event.target.files[0].type)) {
        setFile(event.target.files[0]);
      } else {
        console.log("Invalid video type. Please select a valid video.");
      }
    }
  }

  const handleFileUpload = () => {
    UploadExerciseVideo(accessToken, exercise_id, file).then((response) => {
      if (response.status == 200) {
        console.log('Video uploaded successfully');
        window.location.reload();
      } else {
        console.log(response);
      }
    });
  }

  return (
    <Popup
      trigger={
        <button className={styles.upload_button}
          title={t('components.pop_ups.upload_popup.title')}>
          {t('components.pop_ups.upload_popup.trigger')}
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
            {t('components.pop_ups.upload_popup.header')}
          </div>
          <div className={styles.content}>
            <div className={styles.video_div}>
              <input
                id='file'
                type='file'
                accept='.mp4,.m4v,.mkv,.webm,.flv,.avi,.wmv,.gif'
                onChange={handleFileChange}
              />
              {file &&
                <button onClick={handleFileUpload}>
                  {t('components.pop_ups.upload_popup.button')}
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

export default UploadPopUp;
