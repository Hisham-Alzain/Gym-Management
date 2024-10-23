import React from 'react';
import { useTranslation } from 'react-i18next';
import img_holder from '../../assets/noImage.jpg';
import styles from '../styles/Exercises.module.css';


const ExerciseCard = ({ ExerciseData }) => {
    // Translations
    const { t } = useTranslation('global');

    return (
        <div className={styles.card}>
            {JobData && <div className={styles.row}>
                <div className={styles.img_holder}>
                    {JobData.photo ? (
                        <img src={URL.createObjectURL(JobData.photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
                    ) : (
                        <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
                    )}
                </div>
                <div className={styles.info}>
                    <h3 className={styles.title}>{JobData.title}</h3>
                    <p>{t('pages.jobs.job_card.type')} {JobData.type}</p>
                </div>
                <div className={styles.second_column}>
                    <p> {t('pages.jobs.job_card.published_by')}{' '}
                        {JobData.job_user ? JobData.job_user.name : JobData.company.name}
                    </p>
                    <p> {t('pages.jobs.job_card.publish_date')}{' '}
                        {JobData.publish_date.split('T')[0]}
                    </p>
                    {JobData.deadline && <p>
                        {t('pages.jobs.job_card.deadline')}{' '}{JobData.deadline}
                    </p>}
                </div>
            </div>
            }
        </div>
    );
}

export default ExerciseCard;
