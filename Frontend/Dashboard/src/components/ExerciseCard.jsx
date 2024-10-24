import React from 'react';
import { useTranslation } from 'react-i18next';
import img_holder from '../assets/noImage.jpg';
import styles from '../styles/Exercises.module.css';


const ExerciseCard = ({ ExerciseData }) => {
    // Translations
    const { t } = useTranslation('global');

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
                    <button className={styles.btn}>Upload video</button>
                    <button className={styles.sbtn}>Show video</button>
                    <button className={styles.delete_button}>Delete exercise</button>
                </div>
            </div>
            }
        </div>
    );
}

export default ExerciseCard;
