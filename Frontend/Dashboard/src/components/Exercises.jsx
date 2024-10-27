import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../utils/Contexts";
import { FetchExercises, SearchExercises } from '../apis/ExerciseApis';
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
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [checked, setChecked] = useState({});
  // const [searchExersicse, setSearchExercise] = useState("");
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

  // const handleSearch = (event) => {
  //   setSearchExercise(event.target.value);
  //   SearchExercises(accessToken, event.target.value).then((response) => {
  //     if (response.status === 200) {
  //       setExercises(response.data.exercises);
  //       response.data.exercises.forEach((exercise) => {
  //         if (!checked[exercise.exercise_id]) {
  //           setChecked((prevState) => ({ ...prevState, [exercise.exercise_id]: false }));
  //         }
  //       });
  //     } else {
  //       console.log(response.statusText);
  //     }
  //   });
  // }

  return (
    <div className={styles.screen}>
      <div className={styles.upper_div}>
        <div className={styles.search} >
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search exercise"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <NewExercisePopUp />
      </div>
      <div className={styles.mid_container}>
        {filteredExercises.map((exercise) => (
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
