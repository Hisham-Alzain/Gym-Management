import React, { useEffect, useState } from 'react';
import SearchBar from "./SearchBar";
import { FaDumbbell } from "react-icons/fa6";
import { LoginContext } from '../utils/Contexts';
import { useContext } from 'react';
import { FetchWorkouts } from '../apis/WorkoutApis';
import Popup from 'reactjs-popup';
import styles from '../styles/popup.module.css';

const Programs = ({ user }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [data, setData] = useState([]);
    // Context
    const { accessToken } = useContext(LoginContext);

    useEffect(() => {
        FetchWorkouts(accessToken).then((response) => {
            if (response.status === 200) {
                setData(response.data.pagination_data);
                setPrograms(response.data.programs);
            } else {
                console.log(response);
            }
        });
    }, [accessToken]);

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
                    <div className={styles.header}> {user.name} workouts </div>
                    <div className={styles.workouts}>
                        {programs.map((program) => (
                            <div key={program.id} className={styles.CompetitorCard}>
                                <div className={styles.CompetitorCardContent}>
                                    <div className={styles.info_container}>
                                        <p className={styles.CompetitorDescription}>
                                            from {program.start_date} to {program.end_date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Popup>
    );
}

export default Programs;