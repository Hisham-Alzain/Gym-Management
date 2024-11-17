import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { FaPlus } from "react-icons/fa6";
import { LoginContext } from "../../utils/Contexts";
import { FetchExerciseMuscles, AddExercise } from '../../apis/ExerciseApis';
import LoadingBars from '../LoadingBars';
import img_holder from '../../assets/noImage.jpg';
import styles from '../../styles/PopUps/exercise_popup.module.css';


const NewExercisePopUp = () => {
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [en_name, setEn_name] = useState('');
  const [ar_name, setAr_name] = useState('');
  const [muscles, setMuscles] = useState([]);
  const [muscle, setMuscle] = useState('');
  const [en_description, setEn_description] = useState('');
  const [ar_description, setAr_description] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');
  const [videoPath, setVideoPath] = useState('');

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      setIsLoading(true);
      FetchExerciseMuscles(accessToken, 1).then((response) => {
        if (response.status === 200) {
          setMuscles(response.data.muscles);
        } else {
          console.log(response);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const handleNewExercise = (event) => {
    event.preventDefault();
    AddExercise(
      accessToken,
      en_name,
      ar_name,
      muscle,
      en_description,
      ar_description,
      thumbnailPath,
      videoPath
    ).then((response) => {
      if (response.status == 201) {
        console.log('Added exercise successfully');
        window.location.reload();
      } else {
        console.log(response);
      }
    });
  }

  const handlePhotoChange = (event) => {
    setThumbnailPath(null);
    const image = event.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (image && allowedImageTypes.includes(image.type)) {
      setThumbnailPath(image);
    } else {
      console.log("Invalid Image type. Please select a PNG, JPG, JPEG image.");
    }
  }

  const handleFileChange = (event) => {
    setVideoPath(null);
    const video = event.target.files[0];
    const allowedFileTypes = ["video/mp4", "video/m4v", "video/mkv", "video/webm", "video/flv", "video/avi", "video/wmv"];
    if (video && allowedFileTypes.includes(video.type)) {
      setVideoPath(video);
    } else {
      console.log("Invalid video type. Please select a valid video.");
    }
  }

  return (
    <Popup
      trigger={
        <button className={styles.add_button}
          title={t('components.pop_ups.exercise_popup.title')}>
          <FaPlus />{t('components.pop_ups.exercise_popup.title')}
        </button>
      }
      modal
      nested
    >
      {close => (
        <div className={styles.modal}>
          <button className={styles.close} onClick={close}>
            &times;
          </button>
          {isLoading ? <LoadingBars /> : <>
            <div className={styles.header}>
              {t('components.pop_ups.exercise_popup.header')}
            </div>
            <div className={styles.content}>
              <form
                className={styles.add_form}
                onSubmit={(event) => handleNewExercise(event)}
              >
                <input
                  type='text'
                  value={en_name}
                  onChange={(event) => setEn_name(event.target.value)}
                  placeholder={t('components.pop_ups.exercise_popup.input1')}
                  className={styles.custom_input}
                  required
                />
                <input
                  type='text'
                  value={ar_name}
                  onChange={(event) => setAr_name(event.target.value)}
                  placeholder={t('components.pop_ups.exercise_popup.input1_a')}
                  className={styles.custom_input}
                  required
                />
                <select
                  value={muscle}
                  onChange={(event) => setMuscle(event.target.value)}
                  className={styles.custom_input}
                  required
                >
                  <option value="" disabled>
                    {t('components.pop_ups.exercise_popup.option')}
                  </option>
                  {muscles.map((muscle) => (
                    <option key={muscle.id} value={muscle.name}>
                      {muscle.value[i18n.language]}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={7}
                  value={en_description}
                  onChange={(event) => setEn_description(event.target.value)}
                  placeholder={t('components.pop_ups.exercise_popup.input2')}
                  className={styles.custom_input}
                  required
                />
                <textarea
                  rows={7}
                  value={ar_description}
                  onChange={(event) => setAr_description(event.target.value)}
                  placeholder={t('components.pop_ups.exercise_popup.input2_a')}
                  className={styles.custom_input}
                  required
                />
                <label htmlFor='thumbnailPath' className={styles.img_holder}>
                  {thumbnailPath ? (
                    <img
                      src={URL.createObjectURL(thumbnailPath)}
                      alt="Uploaded Photo"
                      style={{ pointerEvents: 'none' }}
                    />
                  ) : (
                    <img
                      src={img_holder}
                      alt="Photo Placeholder"
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </label>
                <input
                  id='thumbnailPath'
                  type='file'
                  placeholder='Photo'
                  accept='.png,.jpg,.jpeg'
                  onChange={handlePhotoChange}
                  width="100px" height="100px"
                  style={{ visibility: 'hidden' }}
                />
                <div className={styles.row}>
                  <label>
                    {t('components.pop_ups.exercise_popup.label')}
                  </label>
                  <input
                    id='file'
                    type='file'
                    accept='.mp4,.m4v,.mkv,.webm,.flv,.avi,.wmv'
                    onChange={handleFileChange}
                  />
                </div>
                <div className={styles.submit_div}>
                  <button className={styles.submit} type='submit'>
                    {t('components.pop_ups.exercise_popup.title')}
                  </button>
                </div>
              </form>
            </div>
          </>}
          <div className={styles.actions}></div>
        </div>
      )}
    </Popup>
  );
}

export default NewExercisePopUp;
