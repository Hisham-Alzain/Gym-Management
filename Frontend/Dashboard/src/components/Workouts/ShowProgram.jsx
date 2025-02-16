import { useEffect, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginContext } from '../../utils/Contexts';
import { FetchWorkoutProgram } from '../../apis/WorkoutApis';
import LoadingBars from '../LoadingBars';
import DayTable from './DayTable';
import styles from '../../styles/show_program.module.css';


const ShowProgram = () => {
  // Params
  const { program_id } = useParams();
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [program, setProgram] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [workoutDays, setWorkoutDays] = useState(null);

  useEffect(() => {
    // if (!initialized.current) {
    //   initialized.current = true;
    setIsLoading(true);

    FetchWorkoutProgram(accessToken, program_id).then((response) => {
      if (response.status === 200) {
        setProgram(response.data.program);
        setWorkoutDays(response.data.program.days)
      } else {
        console.log(response);
      }
    }).then(() => {
      setIsLoading(false);
    });
    // }
  }, [accessToken, program_id]);

  const handleBackButtonClick = () => {
    setSelectedDay(null);
  };

  if (isLoading) {
    return <LoadingBars />;
  }
  return (
    <div className={styles.program}>
      {program && (
        <div className={styles.header}>
          <h1>
            {`${program.user.name} ${t('components.show_program.header')} ${program_id}`}
          </h1>
          <div>
            <h3>{`${t('components.show_program.start_date')} ${program.start_date}`}</h3>
            <h3>{`${t('components.show_program.end_date')} ${program.end_date}`}</h3>
          </div>
        </div>
      )}{selectedDay ? (
        <DayTable exerciseDay={selectedDay} handleBackButtonClick={handleBackButtonClick} />
      ) : (
        <div className={styles.container}>
          {workoutDays.map((day) => (
            <div key={day.day_id} className={styles.card}>
              <button onClick={() => setSelectedDay(day)}>
                {day.muscle[i18n.language]}
              </button>
              <ul>
                {day.exercises.map((exercise) => (
                  <li key={exercise.workout_exercise_id}>
                    <h4>{exercise.exercise.translations[i18n.language].name}</h4>
                    <h4>
                      {exercise.exercise.no_sets === 1 ?
                        `${exercise.exercise.no_sets} ${t('components.show_program.no_sets1')}` :
                        `${exercise.exercise.no_sets} ${t('components.show_program.no_sets2')}`}
                    </h4>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowProgram;
