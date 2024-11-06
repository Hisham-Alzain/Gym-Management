import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from "../styles/AddWorkout.module.css";
import { useParams } from "react-router-dom";
import { LoginContext } from '../utils/Contexts';
import { CreateDefaultWorkout, CreateWorkout } from '../apis/WorkoutApis';
import { FetchExercises } from '../apis/ExerciseApis';

const defaultPrograms = [
    "beginner", "semi-beginner", "first-program"
];
const muscleGroups = [
    "Chest", "Back", "Legs", "Shoulders", "Arms",
    "Chest_Biceps", "Back_Triceps", "Leg_Shoulders", "Abs"
];

const AddWorkout = () => {
    const { accessToken } = useContext(LoginContext);
    const { user_id, user_name } = useParams();
    const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [dateDifference, setDateDifference] = useState('');
    const [error, setError] = useState('');
    const [repeatDays, setRepeatDays] = useState(2);
    const [exercises, setExercises] = useState(Array.from({ length: repeatDays }, () => []));
    const [selectedMuscles, setSelectedMuscles] = useState(Array.from({ length: repeatDays }, () => ""));
    const [availableExercises, setAvailableExercises] = useState(Array.from({ length: repeatDays }, () => []));
    const [selectedExercises, setSelectedExercises] = useState(Array.from({ length: repeatDays }, () => ""));
    const [currentPage, setCurrentPage] = useState(Array.from({ length: repeatDays }, () => 1));
    const [totalPages, setTotalPages] = useState(Array.from({ length: repeatDays }, () => 1));
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
        }
    }, [accessToken]);

    useEffect(() => {
        if (start_date && end_date) {
            const start = new Date(start_date);
            const end = new Date(end_date);
            const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setDateDifference(difference >= 0 ? difference : 0);
        } else {
            setDateDifference('');
        }
    }, [start_date, end_date]);

    const handleCreateProgram = (program) => {
        if (!start_date || !end_date) {
            setError('Please enter both start and end dates before creating a workout.');
            return;
        } else {
            setError('');
        }

        CreateDefaultWorkout(accessToken, user_id, start_date, end_date, program).then((response) => {
            if (response.status === 200) {
                // Handle successful program creation
            } else {
                console.log('Error creating workout', response);
            }
        });
    };

    const handleExerciseChange = (dayIndex, exerciseIndex, value) => {
        const newExercises = exercises.map((dayExercises, index) => {
            if (index === dayIndex) {
                const updatedExercises = [...dayExercises];
                updatedExercises[exerciseIndex] = value;
                return updatedExercises;
            }
            return dayExercises;
        });
        setExercises(newExercises);
    };

    const addExercise = (dayIndex) => {
        const newExercises = exercises.map((dayExercises, index) => {
            if (index === dayIndex) {
                // Initialize with default sets and reps
                return [...dayExercises, { name: selectedExercises[dayIndex], sets: new Array(3).fill(0), reps: new Array(3).fill(0) }];
            }
            return dayExercises;
        });
        setExercises(newExercises);

        const newSelectedExercises = [...selectedExercises];
        newSelectedExercises[dayIndex] = "";
        setSelectedExercises(newSelectedExercises);
    };

    const removeExercise = (dayIndex, exerciseIndex) => {
        const newExercises = exercises.map((dayExercises, index) => {
            if (index === dayIndex) {
                return dayExercises.filter((_, idx) => idx !== exerciseIndex);
            }
            return dayExercises;
        });
        setExercises(newExercises);
    };

    const handleMuscleChange = (dayIndex, muscle) => {
        const newMuscles = [...selectedMuscles];
        newMuscles[dayIndex] = muscle;
        setSelectedMuscles(newMuscles);

        fetchExercises(muscle, dayIndex);
    };

    const fetchExercises = async (muscle, dayIndex) => {
        FetchExercises(accessToken, 1, muscle).then((response) => {
            if (response.status === 200) {
                const data = response.data;
                const newAvailableExercises = [...availableExercises];

                const existingExercises = new Set(newAvailableExercises[dayIndex]);
                data.exercises.forEach(exercise => existingExercises.add(exercise));

                newAvailableExercises[dayIndex] = Array.from(existingExercises);
                setAvailableExercises(newAvailableExercises);
                setTotalPages(prev => {
                    const newTotalPages = [...prev];
                    newTotalPages[dayIndex] = data.totalPages;
                    return newTotalPages;
                });
            } else {
                console.log('Error fetching exercises', response);
            }
        });
    };

    const loadMoreExercises = (dayIndex) => {
        const newPage = currentPage[dayIndex] + 1;
        setCurrentPage(prev => {
            const newCurrentPage = [...prev];
            newCurrentPage[dayIndex] = newPage;
            return newCurrentPage;
        });
        fetchExercises(selectedMuscles[dayIndex], dayIndex);
    };

    const handleSubmit = async () => {
        // Validate dates
        if (!start_date || !end_date) {
            setError('Please enter both start and end dates.');
            return;
        }

        // Validate that there are exercises for each day
        for (let i = 0; i < repeatDays; i++) {
            if (exercises[i].length === 0) {
                setError(`Please add at least one exercise for Day ${i + 1}.`);
                return;
            }
        }

        // Prepare the workout data
        const workoutData = {
            user_id,
            start_date,
            end_date,
            repeat_days: repeatDays,
            days: exercises.map((dayExercises, dayIndex) => ({
                muscle: selectedMuscles[dayIndex],
                exercises: dayExercises.map(exercise => ({
                    exercise_id: exercise.id,
                    sets: exercise.sets.map((set, setIndex) => ({
                        set_no: setIndex + 1,
                        exp_reps: exercise.reps[setIndex] // Assuming reps are stored in the same order
                    }))
                }))
            }))
        };

            CreateWorkout(accessToken,workoutData).then((response) => {
            if (response.status === 200) {
                // Handle successful program creation
                console.log('Workout program created successfully:', response.data);
                setIsCreatingWorkout(false);
            } else {
                console.log('Error creating workout', response);
                setError('Failed to create workout. Please try again.');
            }
        })

    };

    return (
        <div className={styles.programs}>
            <div className={styles.header}>
                <h1>Create Workout Program for {user_name}</h1>
                <div className={styles.toggleButtons}>
                    <button
                        className={isCreatingWorkout ? styles.active : ''}
                        onClick={() => setIsCreatingWorkout(false)}
                    >
                        Choose Existing Workout
                    </button>
                    <div className={styles.dateInputs}>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                value={start_date}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </label>
                        <label>
                            End Date:
                            <input
                                type="date"
                                value={end_date}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </label>
                        {dateDifference !== '' && (
                            <div>
                                <p>Difference: {dateDifference} day(s)</p>
                            </div>
                        )}
                        {error && (
                            <p className={styles.errorMessage}>{error}</p>
                        )}
                    </div>
                    <button
                        className={!isCreatingWorkout ? styles.active : ''}
                        onClick={() => setIsCreatingWorkout(true)}
                    >
                        Create New Workout
                    </button>
                </div>
            </div>
            <div className={styles.cardsContainer}>
                {isCreatingWorkout ? (
                    <div className={styles.createWorkout}>
                        <h2 className={styles.header2}>Create New Workout</h2>
                        <div className={styles.repeatDaysContainer}>
                            <label>
                                Repeat Days:
                                <select value={repeatDays} onChange={(e) => {
                                    const newRepeatDays = Number(e.target.value);
                                    setRepeatDays(newRepeatDays);
                                    setExercises(Array.from({ length: newRepeatDays }, () => []));
                                    setSelectedMuscles(Array.from({ length: newRepeatDays }, () => ""));
                                    setAvailableExercises(Array.from({ length: newRepeatDays }, () => []));
                                    setSelectedExercises(Array.from({ length: newRepeatDays }, () => ""));
                                    setCurrentPage(Array.from({ length: newRepeatDays }, () => 1));
                                    setTotalPages(Array.from({ length: newRepeatDays }, () => 1));
                                }}>
                                    {[...Array(6)].map((_, index) => (
                                        <option key={index} value={index + 2}>{index + 2}</option>
                                    ))}
                                </select>
                            </label>
                            <button className={styles.submitButton} onClick={handleSubmit}>Create Workout</button>
                        </div>
                        <div className={styles.cardsWrapper}>
                            {[...Array(repeatDays)].map((_, dayIndex) => (
                                <div key={dayIndex} className={styles.card}>
                                    <label className={styles.AddWorkoutcardLabel}>
                                        Select Muscle Group for Day {dayIndex + 1}:
                                        <select
                                            value={selectedMuscles[dayIndex] || ""}
                                            onChange={(e) => handleMuscleChange(dayIndex, e.target.value)}
                                        >
                                            <option value="" disabled>Select Muscle</option>
                                            {muscleGroups.map((muscle, index) => (
                                                <option key={index} value={muscle}>{muscle}</option>
                                            ))}
                                        </select>
                                    </label>
                                    {selectedMuscles[dayIndex] && availableExercises[dayIndex].length > 0 && (
                                        <>
                                            <label className={styles.selectExerciseLabel}>
                                                Select Exercise:
                                                <select
                                                    value={selectedExercises[dayIndex]}
                                                    onChange={(e) => {
                                                        const newSelectedExercises = [...selectedExercises];
                                                        newSelectedExercises[dayIndex] = e.target.value;
                                                        setSelectedExercises(newSelectedExercises);
                                                    }}
                                                >
                                                    <option value="" disabled>Select Exercise</option>
                                                    {availableExercises[dayIndex].map((exercise, index) => (
                                                        <option key={index} value={exercise.name}>{exercise.name}</option>
                                                    ))}
                                                </select>
                                            </label>
                                            <button className={styles.addExerciseButton} onClick={() => addExercise(dayIndex)}>Add Exercise</button>
                                            {currentPage[dayIndex] < totalPages[dayIndex] && (
                                                <button onClick={() => loadMoreExercises(dayIndex)}>Load More</button>
                                            )}
                                        </>
                                    )}
                                    {exercises[dayIndex].map((exercise, exerciseIndex) => (
                                        <div key={exerciseIndex} className={styles.exerciseItem}>
                                            <label className={styles.exerciseLabel}>
                                                Exercise {exerciseIndex + 1}:
                                                <div>{exercise.name}</div>
                                            </label>
                                            <div className={styles.setsRepsContainer}>
                                                <label className={styles.setsLabel}>
                                                    Sets:
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        className={styles.setsInput}
                                                        defaultValue={3} // Set default value to 3
                                                        onChange={(e) => {
                                                            const newSetsCount = Number(e.target.value);
                                                            const updatedExercises = [...exercises];
                                                            updatedExercises[dayIndex][exerciseIndex].sets = new Array(newSetsCount).fill(0);
                                                            updatedExercises[dayIndex][exerciseIndex].reps = new Array(newSetsCount).fill(0);
                                                            setExercises(updatedExercises);
                                                        }}
                                                    />
                                                </label>
                                                {exercise.sets ? exercise.sets.map((_, setIndex) => (
                                                    <div key={setIndex} className={styles.repInputContainer}>
                                                        <label>
                                                            Reps for Set {setIndex + 1}:
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                className={styles.repsInput}
                                                                placeholder="Reps"
                                                                onChange={(e) => {
                                                                    const updatedExercises = [...exercises];
                                                                    updatedExercises[dayIndex][exerciseIndex].reps[setIndex] = Number(e.target.value);
                                                                    setExercises(updatedExercises);
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                )) : <></>}
                                            </div>
                                            <button onClick={() => removeExercise(dayIndex, exerciseIndex)} className={styles.removeExerciseButton}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.chooseWorkout}>
                        <h2 className={styles.header2}>Choose Existing Workout</h2>
                        <div className={styles.programButtons}>
                            {defaultPrograms.map((program, index) => (
                                <button
                                    key={index}
                                    className={styles.programButton}
                                    onClick={() => handleCreateProgram(program)}
                                >
                                    {program}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default AddWorkout;