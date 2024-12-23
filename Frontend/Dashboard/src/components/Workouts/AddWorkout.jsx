import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaCalendarDays } from "react-icons/fa6";
import { LoginContext } from '../../utils/Contexts';
import {
  FetchDefaultWorkouts, CreateDefaultWorkout, CreateWorkout
} from '../../apis/WorkoutApis';
import { FetchExerciseMuscles, FetchExercises } from '../../apis/ExerciseApis';
import LoadingBars from '../LoadingBars';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/add_workout.module.css";


const AddWorkout = () => {
  // Params
  const { user_id, user_name } = useParams();
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [muscles, setMuscles] = useState([]);
  const [defaults, setDefaults] = useState([]);
  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateDifference, setDateDifference] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [repeatDays, setRepeatDays] = useState(2);
  const [exercises, setExercises] = useState(Array.from({ length: repeatDays }, () => []));
  const [selectedMuscles, setSelectedMuscles] = useState(Array.from({ length: repeatDays }, () => ""));
  const [selectedExercises, setSelectedExercises] = useState(Array.from({ length: repeatDays }, () => ""));
  const [selectedName, setSelectedName] = useState(Array.from({ length: repeatDays }, () => ""));
  const [availableExercises, setAvailableExercises] = useState(Array.from({ length: repeatDays }, () => []));
  const [currentPage, setCurrentPage] = useState(Array.from({ length: repeatDays }, () => 1));
  const [lastPage, setLastPage] = useState(Array.from({ length: repeatDays }, () => 1));
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchExerciseMuscles(accessToken).then((response) => {
        if (response.status === 200) {
          setMuscles(response.data.muscles);
        } else {
          console.log(response);
        }
      }).then(() => {
        setIsLoading(false);
      });

      FetchDefaultWorkouts(accessToken).then((response) => {
        if (response.status === 200) {
          setDefaults(response.data.workouts);
        } else {
          console.log(response);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setDateDifference(difference >= 0 ? difference : 0);
    } else {
      setDateDifference('');
    }
  }, [startDate, endDate]);

  const handleMuscleChange = (dayIndex, muscle) => {
    const newMuscles = [...selectedMuscles];
    newMuscles[dayIndex] = muscle;
    setSelectedMuscles(newMuscles);
    setCurrentPage(prev => {
      const newCurrentPage = [...prev];
      newCurrentPage[dayIndex] = 1;
      return newCurrentPage;
    });
    fetchExercises(muscle, dayIndex);
  };

  const fetchExercises = async (muscle, dayIndex) => {
    FetchExercises(accessToken, 1, muscle).then((response) => {
      if (response.status === 200) {
        const data = response.data;
        const newAvailableExercises = [...availableExercises];

        newAvailableExercises[dayIndex] = Array.from(data.exercises);
        setAvailableExercises(newAvailableExercises);
        setLastPage(prev => {
          const newLastPage = [...prev];
          newLastPage[dayIndex] = data.pagination_data.last_page;
          return newLastPage;
        });
      } else {
        console.log('Error fetching exercises', response);
      }
    });
  }

  const loadMoreExercises = (dayIndex) => {
    const newPage = currentPage[dayIndex] + 1;
    setCurrentPage(prev => {
      const newCurrentPage = [...prev];
      newCurrentPage[dayIndex] = newPage;
      return newCurrentPage;
    });

    FetchExercises(accessToken, newPage, selectedMuscles[dayIndex]).then((response) => {
      if (response.status === 200) {
        const data = response.data;
        const newAvailableExercises = [...availableExercises];

        const existingExercises = new Set(newAvailableExercises[dayIndex]);
        data.exercises.forEach(exercise => existingExercises.add(exercise));

        newAvailableExercises[dayIndex] = Array.from(existingExercises);
        setAvailableExercises(newAvailableExercises);
      } else {
        console.log('Error fetching exercises', response);
      }
    });
  }

  const addExercise = (dayIndex) => {
    if (selectedExercises[dayIndex] != "") {
      const newExercises = exercises.map((dayExercises, index) => {
        if (index === dayIndex) {
          // Initialize with default sets and reps
          return [...dayExercises, {
            id: selectedExercises[dayIndex],
            name: selectedName[dayIndex],
            sets: new Array(3).fill(0),
            reps: new Array(3).fill(0),
            rest: new Array(3).fill(0),
            tempo: new Array(3).fill([0, 0, 0, 0])
          }];
        }
        return dayExercises;
      });
      setExercises(newExercises);

      const newSelectedExercises = [...selectedExercises];
      newSelectedExercises[dayIndex] = "";
      setSelectedExercises(newSelectedExercises);
      setSelectedName(newSelectedExercises)
    }
  }

  const removeExercise = (dayIndex, exerciseIndex) => {
    const newExercises = exercises.map((dayExercises, index) => {
      if (index === dayIndex) {
        return dayExercises.filter((_, idx) => idx !== exerciseIndex);
      }
      return dayExercises;
    });
    setExercises(newExercises);
  }

  const handleCreateProgram = (program) => {
    if (!startDate || !endDate) {
      setError(t('components.add_workout.error2'))
      return;
    } else {
      setError('');
    }

    CreateDefaultWorkout(accessToken, user_id, startDate, endDate, program).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setShowSuccessPopup(true);
      } else {
        console.log('Error creating workout', response);
        if (response.data.errors && response.data.errors.end_date) {
          setError(response.data.errors.end_date);
        }
      }
    });
  }

  const handleSubmit = async () => {
    // Validate dates
    if (!startDate || !endDate) {
      setError(t('components.add_workout.error3'))
      return;
    }

    // Validate that there are exercises for each day
    for (let i = 0; i < repeatDays; i++) {
      if (exercises[i].length === 0) {
        setError(`${t('components.add_workout.error4')} ${i + 1}.`);
        return;
      }
    }

    setError('');

    // Prepare the workout data
    const workoutData = {
      user_id: user_id,
      start_date: startDate,
      end_date: endDate,
      repeat_days: repeatDays,
      days: exercises.map((dayExercises, dayIndex) => ({
        muscle: selectedMuscles[dayIndex],
        exercises: dayExercises.map(exercise => ({
          exercise_id: exercise.id,
          sets: exercise.sets.map((set, setIndex) => ({
            set_no: setIndex + 1,
            exp_reps: exercise.reps[setIndex], // Assuming reps are stored in the same order
            exp_rest: exercise.rest[setIndex], // Assuming time are stored in the same order
            tempo: exercise.tempo[setIndex].join('-')
          }))
        }))
      }))
    };

    CreateWorkout(accessToken, workoutData).then((response) => {
      console.log(workoutData);
      if (response.status === 201) {
        console.log(response.data);
        setIsCreatingWorkout(false);
        setShowSuccessPopup(true);
      } else {
        console.log('Error creating workout', response);
        setError(t('components.add_workout.error1'));
      }
    });
  }

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate('/home');
  }

  if (isLoading) {
    return <LoadingBars />;
  }

  const SuccessPopup = ({ onClose }) => {
    return (
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <h2>{t('components.add_diet.Success')}</h2>
          <p>{t('components.add_workout.SuccessPopup')}</p>
          <button onClick={onClose}>{t('components.add_diet.ReturnPopup')}</button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.programs}>
      {showSuccessPopup && <SuccessPopup onClose={handleClosePopup} />}
      <div className={styles.header}>
        <h1>{t('components.add_workout.h1')} {user_name}</h1>
        <div className={styles.row}>
          <button
            className={`${styles.btn} ${!isCreatingWorkout ? styles.active : ''}`}
            onClick={() => setIsCreatingWorkout(false)}
          >
            {t('components.add_workout.button1')}
          </button>
          <button
            className={`${styles.btn} ${isCreatingWorkout ? styles.active : ''}`}
            onClick={() => setIsCreatingWorkout(true)}
          >
            {t('components.add_workout.button2')}
          </button>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label>{t('components.add_workout.label1')}</label>
            <DatePicker
              icon={<FaCalendarDays />}
              dateFormat='dd/MM/yyyy'
              className={styles.date_input}
              wrapperClassName={styles.date_wrapper}
              calendarIconClassName={styles.calendar}
              selected={startDate}
              onChange={(date) => {
                setStartDate(new Date(date).toISOString().split('T')[0]);
              }}
              peekNextMonth
              scrollableYearDropdown
              showMonthDropdown
              showYearDropdown
              showIcon
              required
            />
          </div>
          <div className={styles.colmun}>
            {dateDifference !== '' && (
              <p>{`${t('components.add_workout.p1')} ${dateDifference}
                ${dateDifference === 1 ? t('components.add_workout.p2')
                  : t('components.add_workout.p3')}`}</p>
            )}
            {error && (
              <p className={styles.error}>{error}</p>
            )}
          </div>
          <div className={styles.column}>
            <label>{t('components.add_workout.label2')}</label>
            <DatePicker
              icon={<FaCalendarDays />}
              dateFormat='dd/MM/yyyy'
              className={styles.date_input}
              wrapperClassName={styles.date_wrapper}
              calendarIconClassName={styles.calendar}
              selected={endDate}
              onChange={(date) => {
                setEndDate(new Date(date).toISOString().split('T')[0]);
              }}
              peekNextMonth
              scrollableYearDropdown
              showMonthDropdown
              showYearDropdown
              showIcon
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {isCreatingWorkout ? (<>
          <h2>{t('components.add_workout.h2_1')}</h2>
          <div className={styles.repeat_days_container}>
            <label>
              {t('components.add_workout.label3')}
              <select value={repeatDays} onChange={(event) => {
                const newRepeatDays = Number(event.target.value);
                setRepeatDays(newRepeatDays);
                setExercises(Array.from({ length: newRepeatDays }, () => []));
                setSelectedMuscles(Array.from({ length: newRepeatDays }, () => ""));
                setAvailableExercises(Array.from({ length: newRepeatDays }, () => []));
                setSelectedExercises(Array.from({ length: newRepeatDays }, () => ""));
                setSelectedName(Array.from({ length: newRepeatDays }, () => ""));
                setCurrentPage(Array.from({ length: newRepeatDays }, () => 1));
                setLastPage(Array.from({ length: newRepeatDays }, () => 1));
              }}>
                {[...Array(6)].map((_, index) => (
                  <option key={index} value={index + 2}>{index + 2}</option>
                ))}
              </select>
            </label>
            <button onClick={handleSubmit} className={styles.submit_button}>
              {t('components.add_workout.button3')}
            </button>
          </div>
          <div className={styles.cards_container}>
            {[...Array(repeatDays)].map((_, dayIndex) => (
              <div key={dayIndex} className={styles.card}>
                <label className={styles.card_label}>
                  {t('components.add_workout.label4')} {dayIndex + 1}:
                  <select
                    value={selectedMuscles[dayIndex] || ""}
                    onChange={(e) => handleMuscleChange(dayIndex, e.target.value)}
                  >
                    <option value="" disabled>
                      {t('components.add_workout.option1')}
                    </option>
                    {muscles.map((muscle) => (
                      <option key={muscle.id} value={muscle.name}>
                        {muscle.value[i18n.language]}
                      </option>
                    ))}
                  </select>
                </label>
                {selectedMuscles[dayIndex] &&
                  availableExercises[dayIndex].length > 0 && (
                    <>
                      <label className={styles.card_label}>
                        {t('components.add_workout.label5')}
                        <select
                          value={selectedExercises[dayIndex]}
                          onChange={(event) => {
                            const newSelectedExercises = [...selectedExercises];
                            newSelectedExercises[dayIndex] = event.target.value;
                            setSelectedExercises(newSelectedExercises);

                            const newSelectedName = [...selectedName];
                            availableExercises[dayIndex].map((exercise) => {
                              if (exercise.exercise_id == event.target.value) {
                                newSelectedName[dayIndex] = exercise.translations[i18n.language].name;
                              }
                            })
                            setSelectedName(newSelectedName)
                          }}
                        >
                          <option value="" disabled>
                            {t('components.add_workout.option2')}
                          </option>
                          {availableExercises[dayIndex].map((exercise, index) => (
                            <option key={index} value={exercise.exercise_id}>
                              {exercise.translations[i18n.language].name}
                            </option>
                          ))}
                        </select>
                        {currentPage[dayIndex] < lastPage[dayIndex] && (
                          <button onClick={() => loadMoreExercises(dayIndex)}>
                            {t('components.add_workout.button4')}
                          </button>
                        )}
                      </label>
                      <button className={styles.exercise_button} onClick={() => addExercise(dayIndex)}>
                        {t('components.add_workout.button5')}
                      </button>
                    </>
                  )}
                {exercises[dayIndex].map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className={styles.exercise_item}>
                    <label className={styles.exercise_label}>
                      {t('components.add_workout.label6')} {exerciseIndex + 1}: {exercise.name}
                    </label>
                    <div className={styles.sets_container}>
                      <label className={styles.sets_label}>
                        {t('components.add_workout.label7')}
                        <input
                          min="1"
                          type="number"
                          className={styles.sets_input}
                          placeholder={t('components.add_workout.holder1')}
                          defaultValue={3} // Set default value to 3
                          onChange={(e) => {
                            const newSetsCount = Number(e.target.value);
                            const updatedExercises = [...exercises];
                            updatedExercises[dayIndex][exerciseIndex].sets = new Array(newSetsCount).fill(0);
                            updatedExercises[dayIndex][exerciseIndex].reps = new Array(newSetsCount).fill(0);
                            updatedExercises[dayIndex][exerciseIndex].rest = new Array(newSetsCount).fill(0);
                            updatedExercises[dayIndex][exerciseIndex].tempo = new Array(newSetsCount).fill([0, 0, 0, 0]);
                            setExercises(updatedExercises);
                          }}
                        />
                      </label>
                      {exercise.sets && exercise.sets.map((_, setIndex) => (
                        <div key={setIndex} className={styles.set_reps}>
                          <h3>{t('components.add_workout.label8')} {setIndex + 1}</h3>
                          <div className={styles.reps_container}>
                            <label>
                              {t('components.add_workout.label9')}
                              <input
                                type="number"
                                min={1}
                                className={styles.reps_input}
                                placeholder={t('components.add_workout.holder2')}
                                onChange={(e) => {
                                  const updatedExercises = [...exercises];
                                  updatedExercises[dayIndex][exerciseIndex].reps[setIndex] = Number(e.target.value);
                                  setExercises(updatedExercises);
                                }}
                              />
                            </label>
                          </div>
                          <div className={styles.reps_container}>
                            <label>
                              {t('components.add_workout.label10')}
                              <input
                                type="number"
                                min={1}
                                max={60}
                                className={styles.reps_input}
                                placeholder={t('components.add_workout.holder3')}
                                onChange={(e) => {
                                  const updatedExercises = [...exercises];
                                  updatedExercises[dayIndex][exerciseIndex].rest[setIndex] = Number(e.target.value);
                                  setExercises(updatedExercises);
                                }}
                              />
                            </label>
                          </div>

                          {/* Tempo */}
                          <label className={styles.tempo_label}>
                            tempo: {/* {t('components.add_workout.label10')} */}
                          </label>
                          <div className={styles.reps_container}>
                            <input
                              type="number"
                              min={1}
                              max={60}
                              className={styles.tempo_input}
                              onChange={(e) => {
                                const updatedExercises = [...exercises];
                                updatedExercises[dayIndex][exerciseIndex].tempo[setIndex][0] = Number(e.target.value);
                                setExercises(updatedExercises);
                              }}
                            />
                            <input
                              type="number"
                              min={1}
                              max={60}
                              className={styles.tempo_input}
                              onChange={(e) => {
                                const updatedExercises = [...exercises];
                                updatedExercises[dayIndex][exerciseIndex].tempo[setIndex][1] = Number(e.target.value);
                                setExercises(updatedExercises);
                              }}
                            />
                            <input
                              type="number"
                              min={1}
                              max={60}
                              className={styles.tempo_input}
                              onChange={(e) => {
                                const updatedExercises = [...exercises];
                                updatedExercises[dayIndex][exerciseIndex].tempo[setIndex][2] = Number(e.target.value);
                                setExercises(updatedExercises);
                              }}
                            />
                            <input
                              type="number"
                              min={1}
                              max={60}
                              className={styles.tempo_input}
                              onChange={(e) => {
                                const updatedExercises = [...exercises];
                                updatedExercises[dayIndex][exerciseIndex].tempo[setIndex][3] = Number(e.target.value);
                                setExercises(updatedExercises);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className={styles.remove_button}
                      onClick={() => removeExercise(dayIndex, exerciseIndex)}
                    >
                      {t('components.add_workout.button6')}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>) : (<>
          <h2>{t('components.add_workout.h2_2')}</h2>
          <div className={styles.program_buttons}>
            {defaults.map((program) => (
              <button
                key={program.id}
                className={styles.program_button}
                onClick={() => handleCreateProgram(program.name)}
              >
                {program.value[i18n.language]}
              </button>
            ))}
          </div>
        </>
        )}
      </div>
    </div >
  );
}

export default AddWorkout;
