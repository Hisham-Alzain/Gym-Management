import React, { useEffect, useState } from 'react';
import styles from './DayTable.module.css';

const exerciseData = [
    {
        name: 'Exercise 1',
        sets: [
            {
                setName: 'set1',
                reps: '10',
                weight: '10 x 20kg',
                weights: ['10 x 20kg', '11 x 20kg', '12 x 20kg', '13 x 20kg'],
            },
            {
                setName: 'set2',
                reps: '12',
                weight: '11 x 30kg',
                weights: ['11 x 30kg', '12 x 30kg', '13 x 30kg', '14 x 30kg'],
            },
        ],
        dates: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04'],
    },
    {
        name: 'Exercise 2',
        sets: [],
        dates: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04'],
    },
    {
        name: 'Exercise 3',
        sets: [],
        dates: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04'],
    },
];

const DayTable = ({exerciseData}) => {
    return (
        <div className={styles.DayTable}>
            <h1 className={styles.tableTitle}>Exercise Data</h1>
            <table className={styles.exerciseTable}>
                <thead>
                    <tr>
                        <th>Exercise Name</th>
                        <th>Set</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        {exerciseData[0] && exerciseData[0].dates.map((date, index) => (
                            <th key={index}>{date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {exerciseData.map((exercise, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan={exercise.sets.length}>
                                    {exercise.name}
                                </td>
                                {exercise.sets[0] && (
                                    <>
                                        <td>{exercise.sets[0].setName}</td>
                                        <td>{exercise.sets[0].reps}</td>
                                        <td>{exercise.sets[0].weight}</td>
                                        {exercise.sets[0].weights.map((weight, weightIndex) => (
                                            <td key={weightIndex}>{weight}</td>
                                        ))}
                                    </>
                                )}
                            </tr>
                            {exercise.sets.slice(1).map((set, setIndex) => (
                                <tr key={setIndex}>
                                    <td>{set.setName}</td>
                                    <td>{set.reps}</td>
                                    <td>{set.weight}</td>
                                    {set.weights.map((weight, weightIndex) => (
                                        <td key={weightIndex}>{weight}</td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DayTable;