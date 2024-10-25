import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../utils/Contexts";
import { FetchFile } from '../apis/UserViewApis';
import { DeleteExercise } from '../apis/ExerciseApis';
import VideoPopUp from './PopUps/VideoPopUp';
import img_holder from '../assets/noImage.jpg';
import styles from '../styles/Exercises.module.css';


const ExerciseCard = ({ ExerciseData }) => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);

    const [files, setFiles] = useState(ExerciseData.video);

    const handleFileChange = (event) => {
        setFiles([]);
        event.preventDefault();
        const allowedFileTypes = ["video/mp4"];
        if (event.target.files.length == 1) {
            Array.from(event.target.files).forEach((file) => {
                if (file && allowedFileTypes.includes(file.type)) {
                    setFiles((prevState) => [...prevState, file]);
                } else {
                    console.log("Invalid file type. Please select a mp4 video.");
                }
            });
        }
    }

    const handleDeleteExercise = (event, exercise_id) => {
        event.preventDefault();
        DeleteExercise(accessToken, exercise_id).then((response) => {
            if (response.status == 204) {
                console.log('Exercise deleted');
                window.location.reload();
            } else {
                console.log('delete not working')
            }
        })
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
                    <input
                        title="Upload video"
                        id='files'
                        type='file'
                        placeholder='Upload video'
                        accept='.mp4'
                        onChange={handleFileChange}
                        className={styles.btn}
                    />
                    <VideoPopUp Path={ExerciseData.video} />
                    <button className={styles.delete_button} onClick={(event) => handleDeleteExercise(event, ExerciseData.exercise_id)}>Delete exercise</button>
                </div>
            </div>
            }
        </div>
    );
}

export default ExerciseCard;
