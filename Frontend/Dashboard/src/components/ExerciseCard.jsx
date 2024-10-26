import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../utils/Contexts";
import { UpdateExercise } from '../apis/ExerciseApis';
import { DeleteExercise } from '../apis/ExerciseApis';
import VideoPopUp from './PopUps/VideoPopUp';
import UploadPopUp from './PopUps/UploadPopUp';
import img_holder from '../assets/noImage.jpg';
import styles from '../styles/Exercises.module.css';


const ExerciseCard = ({ ExerciseData }) => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);

    const [updating, setUpdating] = useState(false);
    const [newDescription, setNewDescription] = useState('');

    const handleDescription = (event) => {
        event.preventDefault();
        setNewDescription(event.target.value);
    }

    const handleUpdateDescription = (event, exercise_id) => {
        event.preventDefault();
        UpdateExercise(accessToken, exercise_id, newDescription).then((response) => {
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
        setNewDescription('');
        setUpdating(false);
    }

    const handleDeleteExercise = (event, exercise_id) => {
        event.preventDefault();
        DeleteExercise(accessToken, exercise_id).then((response) => {
            if (response.status == 204) {
                console.log('Exercise deleted');
                window.location.reload();
            } else {
                console.log('delete not working');
            }
        });
    }

    return (
        <div className={styles.card}>
            {ExerciseData && <div className={styles.row}>
                <div className={styles.img_holder}>
                    {ExerciseData.photo ? (
                        <img src={URL.createObjectURL(ExerciseData.photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
                    ) : (
                        <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
                    )}
                </div>
                <div className={styles.info}>
                    <div className={styles.name_muscle}>
                        <h3 className={styles.title}>{ExerciseData.name}</h3>
                        <h3 className={styles.muscle}>Muscle: {ExerciseData.muscle}</h3>
                    </div>
                    <p>Description: {ExerciseData.description}</p>
                </div>
                <div className={styles.second_column}>
                    <VideoPopUp Path={ExerciseData.video} />
                    <UploadPopUp exercise_id={ExerciseData.exercise_id} />
                    {!updating && <button className={styles.update_button} onClick={() => setUpdating(true)}>Update description</button>}
                    {updating &&
                        <form className={styles.desc_form} onSubmit={(event) => handleUpdateDescription(event, ExerciseData.exercise_id)}>
                            <input className={styles.description} id='newDescription' type='text' placeholder='New description' onChange={handleDescription} />
                            <button className={styles.submit} type='submit'>Submit change</button>
                            <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
                        </form>
                    }
                    <button className={styles.delete_button} onClick={(event) => handleDeleteExercise(event, ExerciseData.exercise_id)}>Delete exercise</button>
                </div>
            </div>
            }
        </div>
    );
}

export default ExerciseCard;
