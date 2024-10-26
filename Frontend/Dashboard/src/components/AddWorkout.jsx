import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from "../styles/AddWorkout.module.css";
import { useParams } from "react-router-dom";
import { LoginContext } from '../utils/Contexts';
import { CreateDefaultWorkout } from '../apis/WorkoutApis';

const defaultPrograms = [
    "beginner", "semi-beginner", "first-program"
];

const AddWorkout = () => {
    const { accessToken } = useContext(LoginContext);
    const { user_id, user_name } = useParams();
    const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [dateDifference, setDateDifference] = useState('');
    const [error, setError] = useState('');
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
            const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Difference in days
            setDateDifference(difference >= 0 ? difference : 0); // Ensure non-negative difference
        } else {
            setDateDifference('');
        }
    }, [start_date, end_date]);

    const handleCreateProgram = (program) => {
        // Check for empty dates before proceeding
        if (!start_date || !end_date) {
            setError('Please enter both start and end dates before creating a workout.');
            return;
        } else {
            setError('');
        }

        CreateDefaultWorkout(accessToken, user_id, start_date, end_date, program).then((response) => {
            if (response.status === 200) {
                //handle successful program creation
            } else {
                console.log('error creating workout', response);
            }
        });
    }

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
                            <p className={styles.errorMessage}>{error}</p>                        )}
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
                        {}
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
        </div>
    );
};

export default AddWorkout;