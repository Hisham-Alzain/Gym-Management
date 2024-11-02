import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../utils/Contexts";
import { FetchExercises, FetchExerciseMuscles } from '../apis/ExerciseApis';
import { FetchImage } from '../apis/UserViewApis';
import NewExercisePopUp from './PopUps/NewExercisePopUp';
import ExerciseCard from './ExerciseCard';
import styles from '../styles/exercises.module.css';


const Exercises = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const filtered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const [filterMuscle, setFilterMuscle] = useState('')
  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [newFilter, setNewFilter] = useState(false);

  useEffect(() => {
    if (!filtered.current) {
      filtered.current = true;

      setIsLoading(true);
      FetchExerciseMuscles(accessToken).then((response) => {
        if (response.status === 200) {
          setMuscles(response.data.muscles);
        } else {
          console.log(response);
        }
      });

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
        setNewFilter(false);
      });
    }
  }, [nextPage, newFilter]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (isDone) {
      return;
    }
    if (scrollY + windowHeight >= documentHeight - 100) {
      filtered.current = false;
      setNextPage(nextPage + 1);
    }
  };

  const filteredExercises = exercises
    ? exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextPage]);

  const handleFilterSubmit = (event) => {
    setFilterMuscle(event.target.value);
    setExercises([]);
    setNextPage(1);
    setIsDone(false);
    setNewFilter(true);
    filtered.current = false;
  }

  return (
    <div className={styles.screen}>
      <div className={styles.upper_div}>
        <div className={styles.search}>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search exercise"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.flex_some}>
          <div className={styles.filter_div}>
            <label>muscle filter:</label>
            <select
              value={filterMuscle}
              onChange={handleFilterSubmit}
              className={styles.filter}
            >
              <option value="" >All</option>
              {muscles.map((muscle) => (
                <option
                  key={muscle.id}
                  value={muscle.name}
                >
                  {muscle.value['en']}
                </option>
              ))
              }
            </select>
          </div>
          <div className={styles.buttun_div}>
            <NewExercisePopUp />
          </div>
        </div>
      </div>
      <div className={styles.mid_container}>
        {filteredExercises.map((exercise) => (
          <div key={exercise.exercise_id}
            className={styles.exercise_card}
          >
            <ExerciseCard ExerciseData={exercise} />
          </div>
        ))}
        {isLoading ?
          <h5 className={styles.done}>
            Please wait
          </h5>
          : isDone &&
          <h5 className={styles.done}>
            No more exercises to display
          </h5>
        }
      </div>
    </div>
  );
}

export default Exercises;
