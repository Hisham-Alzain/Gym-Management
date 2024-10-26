import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { FaDumbbell } from "react-icons/fa6";
import { LoginContext } from '../../utils/Contexts';
import { FetchUserWorkouts } from '../../apis/WorkoutApis';
import styles from '../../styles/programs_popup.module.css';


const ProgramsPopUp = ({ user_id, user_name }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);

      FetchUserWorkouts(accessToken, user_id).then((response) => {
        if (response.status === 200) {
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

  const handleShowWorkout = (event, id) => {
    event.preventDefault();
    navigate(`/trainee/workout/${id}/${user_name}`);
  }

  const handleAddWorkout=(event)=>{
    event.preventDefault();
    navigate(`/trainee/workout/add/${user_id}/${user_name}`);
  }

  const columnStructure = [
    { key: "id", label: 'Workout number' },
    { key: 'start_date', label: 'Start Date' },
    { key: 'end_date', label: 'End Date' },
  ];

  return (
    <Popup
      trigger={
        <button className={styles.workout_button} title='Show workout programs'>
          <FaDumbbell />
        </button>
      }
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
              <button className={styles.create_button} onClick={handleAddWorkout}>Add workout</button>
            </div>
            <div className={styles.workouts}>
              <div className={styles.workout_table}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {columnStructure.map((column) => (
                        <th key={column.key}>{column.label}</th>
                      ))}
                      <th style={{ width: '100px' }}> Show Workout </th>
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
                        <button
                          onClick={(event) => handleShowWorkout(event, program.id)}
                          className={styles.workout_button}
                          title='Show Workout program'
                        >
                          <FaDumbbell />
                        </button>
                      </td>
                    </tr>)
                  ) : (
                    <tr>
                      <td colSpan={columnStructure.length + 1}>No programs found</td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className={styles.pagination}>
                {data.pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? styles.active_page : styles.page}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </>}
        </div>
      )}
    </Popup>
  );
}

export default ProgramsPopUp;
