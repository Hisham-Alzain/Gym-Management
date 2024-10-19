import React, { useEffect, useState } from 'react';
import SearchBar from "./SearchBar";
import { FaDumbbell } from "react-icons/fa6";
import { LoginContext } from '../utils/Contexts';
import { useContext } from 'react';
import { FetchUserWorkouts } from '../apis/WorkoutApis';
import Popup from 'reactjs-popup';
import styles from '../styles/popup.module.css';

const Programs = ({ user }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [data, setData] = useState([]);
    // Context
    const { accessToken } = useContext(LoginContext);

    useEffect(() => {
        FetchUserWorkouts(accessToken,user.id).then((response) => {
            console.log(response,user.id);
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
                    <div className={styles.header}>
                            <div className={styles.name}>{user.name} workouts</div>
                            <button className={styles.create_button}>Add workout</button>
                         </div>
                    <div className={styles.workouts}>
                        {programs.map((program) => (
                            <div key={program.id} className={styles.CompetitorCard}>
                                <div className={styles.CompetitorCardContent}>
                                    <div className={styles.info_container}>
                                        <a className={styles.CompetitorDescription} href=''>
                                            from {program.start_date} to {program.end_date}
                                        </a>
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