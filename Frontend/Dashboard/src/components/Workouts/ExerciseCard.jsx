import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../../utils/Contexts";
import { UpdateExercise, DeleteExercise } from '../../apis/ExerciseApis';
import UpImgPopUp from '../PopUps/UpImgPopUp';
import VideoPopUp from '../PopUps/VideoPopUp';
import UploadPopUp from '../PopUps/UploadPopUp';
import img_holder from '../../assets/noImage.jpg';
import styles from '../../styles/exercises.module.css';


const ExerciseCard = ({ ExerciseData }) => {
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const [updating, setUpdating] = useState(false);
  const [newDescription, setNewDescription] = useState(ExerciseData.translations[i18n.language].description);

  const handleDescription = (event) => {
    setNewDescription(event.target.value);
  }

  const handleUpdateDescription = (event, exercise_id) => {
    event.preventDefault();
    UpdateExercise(accessToken, exercise_id, newDescription, i18n.language).then((response) => {
      if (response.status == 200) {
        console.log('Exercise updated');
        window.location.reload();
      } else {
        console.log(response);
      }
    });
  }

  const handleCancel = (event) => {
    event.preventDefault();
    setNewDescription(ExerciseData.translations[i18n.language].description);
    setUpdating(false);
  }

  const handleDeleteExercise = (event, exercise_id) => {
    event.preventDefault();
    DeleteExercise(accessToken, exercise_id).then((response) => {
      if (response.status === 204) {
        console.log('Exercise deleted');
        window.location.reload();
      } else {
        console.log('delete not working');
      }
    });
  }

  return (
    <div className={styles.exercise_card}>
      {ExerciseData && <div className={styles.row}>
        <div className={styles.img_holder}>
          {ExerciseData.photo ? (
            <img src={`https://olive-salmon-530757.hostingersite.com/storage/${ExerciseData.photo}`}
              alt="Uploaded Photo"
              style={{ pointerEvents: 'none' }}
              className={styles.image}
            />
          ) : (
            <img src={img_holder}
              alt="Photo Placeholder"
              style={{ pointerEvents: 'none' }}
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.name_muscle}>
            <h3 className={styles.title}>{ExerciseData.translations[i18n.language].name}</h3>
            <h3 className={styles.muscle}>
              {`${t('components.exercises_card.muscle')} ${ExerciseData.muscle[i18n.language]}`}
            </h3>
          </div>
          {!updating ?
            <p>{`${t('components.exercises_card.p')} ${ExerciseData.translations[i18n.language].description}`}</p>
            : <textarea
              rows={7}
              type='text'
              value={newDescription}
              onChange={handleDescription}
              placeholder={t('components.exercises_card.input')}
              className={styles.description}
            />
          }
        </div>
        <div className={styles.column}>
          <VideoPopUp Path={ExerciseData.video}
            Name={ExerciseData.translations[i18n.language].name} />
          <UpImgPopUp id={ExerciseData.exercise_id} meal={false} />
          <UploadPopUp exercise_id={ExerciseData.exercise_id} />
          {!updating &&
            <button
              className={styles.update_button}
              onClick={() => {
                setUpdating(true)
                setNewDescription(ExerciseData.translations[i18n.language].description);
              }}>
              {t('components.exercises_card.update_button')}
            </button>}
          {updating &&
            <form
              className={styles.btn_holder}
              onSubmit={(event) => handleUpdateDescription(event, ExerciseData.exercise_id)}
            >
              <button className={styles.submit} type='submit'>
                {t('components.exercises_card.submit')}
              </button>
              <button className={styles.cancel} onClick={handleCancel}>
                {t('components.exercises_card.cancel')}
              </button>
            </form>
          }
          <button className={styles.delete_button}
            onClick={(event) => handleDeleteExercise(event, ExerciseData.exercise_id)}>
            {t('components.exercises_card.delete_button')}
          </button>
        </div>
      </div>}
    </div>
  );
}

export default ExerciseCard;
