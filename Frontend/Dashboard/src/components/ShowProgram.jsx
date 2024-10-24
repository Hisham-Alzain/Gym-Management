import styles from './ShowProgram.module.css';
import { useParams } from 'react-router-dom';
import { FetchWorkoutProgram } from '../apis/WorkoutApis';
import { useEffect, useRef, useState } from 'react';
import { LoginContext } from '../utils/Contexts';
import { useContext } from 'react';
import DayTable from './DayTable';

const ShowProgram = () => {
  const { program_id } = useParams();
  const { accessToken } = useContext(LoginContext);
  const [program, setProgram] = useState(null);
  const [exercisesData, setExercisesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle(muscle);
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      console.log(program_id)
      FetchWorkoutProgram(accessToken, program_id).then((response) => {
        if (response.status === 200) {
          setProgram(response.data.program);
          setExercisesData(response.data.program.days)
        } else {
          console.log(response);
        }
        setIsLoading(false);
      });
    }
  }, [accessToken, program_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.programs}>
      {program && (
        <div className={styles.header}>
          <h1>{program.user.name}'s Workout Program</h1>
          <p>Start Date: {program.start_date} | End Date: {program.end_date}</p>
        </div>
      )}{selectedMuscle ? (
        <DayTable exerciseDay={program.days[0]} />
      ) :
        <div className={styles.cardsContainer}>
          {exercisesData.map((data, index) => (
            <div key={index} className={styles.card}>
              <button onClick={() => handleMuscleClick(data.muscle)}>{data.muscle}</button>
              <ul>
                {console.log(data.exercises)}
                {data.exercises.map((exercise, id) => (
                  <li key={id}>{exercise.exercise.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default ShowProgram;