import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../utils/Contexts";
import { FetchExercises, AddExercise } from '../apis/ExerciseApis';
import { FetchImage } from '../apis/UserViewApis';
import ExerciseCard from './ExerciseCard';
import styles from '../styles/exercises.module.css';


const Exercises = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const [exercises, setExercises] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
    else {
      setIsLoading(true);
      FetchExercises(accessToken, nextPage, '').then((response) => {
        if (response.status === 200) {
          setData(response.data.pagination_data);
          if (!response.data.pagination_data.has_more_pages) {
            setIsDone(true);
          }
          response.data.exercises.map((exercise) => {
            // Check if exercise is already in array
            if (!exercises.some(item => exercise.exercise_id === item.exercise_id)) {

              // if not add exercise
              if (exercise.photo) {
                FetchImage("", exercise.photo).then((response) => {
                  exercise.photo = response.imageURL;
                  setExercises((prevState) => ([...prevState, exercise]));
                });
              } else {
                setExercises((prevState) => ([...prevState, exercise]));
              }
            }
          });
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [nextPage]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (isDone) {
      return;
    }
    if (scrollY + windowHeight >= documentHeight - 100) {
      setNextPage(nextPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextPage]);

  return (
    <div className={styles.screen}>
      <div className={styles.mid_container}>
        {exercises.map((exercise) => (
          <div key={exercise.exercise_id}
            className={styles.exercise_card}
          >
            <ExerciseCard ExerciseData={exercise} />
          </div>
        ))}
        {isLoading ? <></> : isDone &&
          <h5 className={styles.done}>
            No more exercises to display
          </h5>
        }
      </div>
    </div>
  );
}

export default Exercises;
