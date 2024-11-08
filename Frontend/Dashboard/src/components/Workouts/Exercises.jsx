import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../../utils/Contexts";
import { FetchExercises, FetchExerciseMuscles } from '../../apis/ExerciseApis';
import { FetchImage } from '../../apis/UserViewApis';
import NewExercisePopUp from '../PopUps/NewExercisePopUp';
import ExerciseCard from './ExerciseCard';
import styles from '../../styles/exercises.module.css';


const Exercises = () => {
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const filtered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const [filterMuscle, setFilterMuscle] = useState('');
  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    FetchExerciseMuscles(accessToken).then((response) => {
      if (response.status === 200) {
        setMuscles(response.data.muscles);
      } else {
        console.log(response);
      }
    });
  }, []);

  useEffect(() => {
    if (!filtered.current) {
      filtered.current = true;

      setIsLoading(true);
      FetchExercises(accessToken, nextPage, filterMuscle).then((response) => {
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
                FetchImage(accessToken, exercise.photo).then((response) => {
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
  }, [nextPage, filterMuscle]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [nextPage]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (isDone || nextPage >= data.last_page) {
      return;
    }
    if (scrollY + windowHeight >= documentHeight - 100) {
      filtered.current = false;
      setNextPage(nextPage + 1);
    }
  };

  const handleFilterSubmit = (event) => {
    setFilterMuscle(event.target.value);
    setExercises([]);
    setNextPage(1);
    setIsDone(false);
    filtered.current = false;
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredExercises = exercises
    ? exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];


  return (
    <div className={styles.screen}>
      <div className={styles.upper_div}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={t('components.exercises.search')}
          className={styles.search_input}
        />
        <div className={styles.filter_div}>
          <label>{t('components.exercises.label')}</label>
          <select
            value={filterMuscle}
            onChange={handleFilterSubmit}
            className={styles.filter}
          >
            <option value="" disabled>All</option>
            {muscles.map((muscle) => (
              <option
                key={muscle.id}
                value={muscle.name}
              >
                {muscle.value[i18n.language]}
              </option>
            ))
            }
          </select>
        </div>
        <div className={styles.popup_div}>
          <NewExercisePopUp />
        </div>
      </div>
      <div className={styles.mid_container}>
        {filteredExercises.map((exercise) => (
          <div key={exercise.exercise_id}>
            <ExerciseCard ExerciseData={exercise} />
          </div>
        ))}
        {isLoading ?
          <h5 className={styles.done}>
            {t('components.exercises.loading')}
          </h5>
          : isDone &&
          <h5 className={styles.done}>
            {t('components.exercises.no_exercises')}
          </h5>
        }
      </div>
    </div>
  );
}

export default Exercises;
