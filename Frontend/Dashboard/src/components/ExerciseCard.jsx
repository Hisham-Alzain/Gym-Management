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
                    <h3 className={styles.title}>{ExerciseData.name}</h3>
                    <p>Muscle: {ExerciseData.muscle}</p>
                </div>
                <div className={styles.second_column}>
                    <p> {t('pages.jobs.job_card.publish_date')}{' '}
                    </p>
                    {ExerciseData.deadline && <p>
                        {t('pages.jobs.job_card.deadline')}{' '}{ExerciseData.deadline}
                    </p>}
                </div>
            </div>
            }
        </div>
    );
}

export default ExerciseCard;
