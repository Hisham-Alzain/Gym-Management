import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa6";
import { LoginContext } from '../utils/Contexts';
import { useContext } from 'react';
import { FetchUserWorkouts } from '../apis/WorkoutApis';
import Popup from 'reactjs-popup';
import styles from '../styles/programs_popup.module.css';

const Programs = ({ user_id, user_name }) => {
    // Context
    const { accessToken } = useContext(LoginContext);
    // Define states
    const initialized = useRef(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [programs, setPrograms] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
        } else {
            setIsLoading(true);

            FetchUserWorkouts(accessToken, user_id).then((response) => {
                if (response.status === 200) {
                    console.log(response.data.programs);
                    setData(response.data.pagination_data);
                    setPrograms([]);
                    response.data.programs.map((program) => {
                        if (!programs.some(item => program.id === item.id)) {
                            setPrograms(response.data.programs);
                        }
                    });
                } else {
                    console.log(response);
                }
            }).then(() => {
                setIsLoading(false);
            });
        }
    }, [currentPage]);

    const handleShowWorkout = (event) => {
        event.preventDefault();
        navigate(`/trainee/workout/${user_id}/${user_name}`)
    }

    const columnStructure = [
        { key: "id", label: 'Workout number' },
        { key: "start_date", label: 'Start Date' },
        { key: "end_date", label: 'End Date' },
    ];

    console.log(programs);

    return (
        <Popup
            trigger={<button className={styles.edit_button} title='Show workout programs'> <FaDumbbell /></button>}
            modal
            nested
        >
            {close => (
                <div className={styles.modal}>
                    <button className={styles.close} onClick={close}>
                        &times;
                    </button>
                    {isLoading ? <></> : <>
                        <div className={styles.header}>
                            <div className={styles.name}>{user_name} workouts</div>
                            <button className={styles.create_button}>Add workout</button>
                        </div>
                        <div className={styles.workouts}>
                            <div className={styles.CompetitorCard}>
                                <div className={styles.CompetitorCardContent}>
                                    <div className={styles.info_container}>
                                        <table className={styles.users_table}>
                                            <thead>
                                                <tr>
                                                    {columnStructure.map((column) => (<th key={column.key}>{column.label}</th>))}
                                                    <th> Show Workout </th>
                                                </tr>
                                            </thead>
                                            <tbody>{programs.length > 0 ? (
                                                programs.map((program) => <tr key={program.id}>
                                                    {columnStructure.map((column) => (
                                                        <td key={column.key}>
                                                            {program[column.key]}
                                                        </td>
                                                    ))}
                                                    <td>
                                                        <button onClick={() => handleShowWorkout(event)} className={styles.edit_button} title='Show Workout program' >
                                                            <FaDumbbell />
                                                        </button>
                                                    </td>
                                                </tr>)
                                            ) : (
                                                <tr>
                                                    <td colSpan={columnStructure.length + 1}>No subscription found</td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            )}
        </Popup>
    );
}

export default Programs;