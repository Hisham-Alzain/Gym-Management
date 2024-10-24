import React from 'react';
import styles from './DayTable.module.css';

const DayTable = ({ exerciseDay }) => {
    const uniqueDates = new Set();

    exerciseDay.exercises.forEach(exercise => {
        exercise.exercise.sets.forEach(set => {
            set.user_sets.forEach(userSet => {
                uniqueDates.add(userSet.date);
            });
        });
    });
    const datesArray = Array.from(uniqueDates);

    return (
        <div className={styles.DayTable}>
            <h1 className={styles.tableTitle}>{exerciseDay.muscle}</h1>
            <table className={styles.exerciseTable}>
                <thead>
                    <tr>
                        <th>Exercise Name</th>
                        <th>Set</th>
                        {datesArray.map((date, index) => (
                            <th key={index}>{date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {exerciseDay.exercises.map((exercise, index) => (
                        <React.Fragment key={index}>
                            {exercise.exercise.sets.map((set, setIndex) => (
                                <React.Fragment key={set.set_id}>
                                    <tr>
                                        {setIndex === 0 && (
                                            <td rowSpan={exercise.exercise.sets.length * 2}>
                                                {exercise.exercise.name}
                                            </td>
                                        )}
                                        <td>Set {set.set_number}</td>
                                        <td colSpan={set.user_sets.length}>
                                            {set.expected_reps} expected reps
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        {datesArray.map((date) => {
                                            const userSet = set.user_sets.find(us => us.date === date);
                                            return (
                                                <td key={date}>
                                                    {userSet ? `${userSet.reps || 'N/A'} x ${userSet.rep_weight || 'N/A'}kg` : 'N/A'}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DayTable;