import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { MdNoFood } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { LoginContext } from '../../utils/Contexts';
import { FetchUserDiets, DeleteDietProgram } from '../../apis/DietsApis';
import styles from '../../styles/diets_popup.module.css';
import btn_style from '../../styles/users_table.module.css';


const DietsPopUp = ({ user_id, user_name }) => {
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

      FetchUserDiets(accessToken, user_id).then((response) => {
        if (response.status === 200) {
          setData(response.data.pagination_data);
          setPrograms([]);
          response.data.programs.map((program) => {
            if (!programs.some(item => program.program_id === item.id)) {
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

  const handleAddDiet = (event) => {
    event.preventDefault();
    navigate(`/trainee/diet/add/${user_id}/${user_name}`);
  }

  const handleShowDiet = (event, id) => {
    event.preventDefault();
    navigate(`/trainee/diet/${id}/${user_name}`);
  }

  const handleDeleteDiet = (event, id) => {
    event.preventDefault();
    DeleteDietProgram(accessToken, id).then((response) => {
      if (response.status === 204) {
        window.location.reload();
      } else {
        console.log(response);
      }
    });
  }

  const columnStructure = [
    { key: 'program_id', label: 'Diet number' },
    { key: 'start_date', label: 'Start Date' },
    { key: 'end_date', label: 'End Date' },
  ];

  return (
    <Popup
      trigger={
        <button className={styles.diet_button} title='Show diet programs'>
          <MdNoFood />
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
              <div className={styles.name}>{user_name} diets</div>
              <button className={styles.create_button} onClick={handleAddDiet}>
                Add Diet
              </button>
            </div>
            <div className={styles.workouts}>
              <div className={styles.diets_table}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {columnStructure.map((column) => (
                        <th key={column.key}>{column.label}</th>
                      ))}
                      <th style={{ minWidth: '80px' }}> Show Diet </th>
                    </tr>
                  </thead>
                  <tbody>{programs.length > 0 ? (
                    programs.map((program) => <tr key={program.program_id}>
                      {columnStructure.map((column) => (
                        <td key={column.key}>
                          {program[column.key]}
                        </td>
                      ))}
                      <td>
                        <button
                          onClick={(event) => handleShowDiet(event, program.program_id)}
                          className={styles.diet_button}
                          title='Show diet program'
                        >
                          <MdNoFood />
                        </button>
                        <button
                          onClick={(event) => handleDeleteDiet(event, program.program_id)}
                          className={btn_style.delete_button}
                          title='Delete diet program'
                        >
                          <FaRegTrashCan />
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

export default DietsPopUp;
