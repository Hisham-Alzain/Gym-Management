import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/day_table.module.css';


const DayTable = ({ exerciseDay, handleBackButtonClick }) => {
  // Translations
  const { t, i18n } = useTranslation('global');
  // Variables
  const uniqueDates = new Set();

  exerciseDay.exercises.forEach(exercise => {
    exercise.exercise.sets.forEach(set => {
      set.user_sets.forEach(userSet => {
        uniqueDates.add(userSet.date);
      });
    });
  });
  const datesArray = Array.from(uniqueDates);

  return (
    <div className={styles.day_table}>
      <button className={styles.back_button}
        onClick={handleBackButtonClick}>
        {t('components.day_table.back')}
      </button>
      <table className={styles.exercise_table}>
        <caption>{exerciseDay.muscle[i18n.language]}</caption>
        <thead>
          <tr>
            <th>{t('components.day_table.th1')}</th>
            <th>{t('components.day_table.th2')}</th>
            {datesArray.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exerciseDay.exercises.map((exercise, index) => (
            <React.Fragment key={index}>
              {exercise.exercise.sets.map((set, setIndex) => (
                <React.Fragment key={set.set_id}>
                  <tr>
                    {setIndex === 0 && (
                      <td rowSpan={exercise.exercise.sets.length * 2}>
                        {exercise.exercise.translations[i18n.language].name}
                      </td>
                    )}
                    <td>
                      {`${t('components.day_table.set')} ${set.set_number}`}
                    </td>
                    <td colSpan={set.user_sets.length}>
                      {`${set.expected_reps} ${t('components.day_table.rep')}`}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    {datesArray.map((date, dateIndex) => {
                      const userSet = set.user_sets.find(us => us.date === date);
                      return (
                        <td key={dateIndex}>
                          {userSet ?
                            `${userSet.reps || 'N/A'} x ${userSet.rep_weight || 'N/A'}
                            ${t('components.day_table.kilo')}`
                            : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DayTable;
