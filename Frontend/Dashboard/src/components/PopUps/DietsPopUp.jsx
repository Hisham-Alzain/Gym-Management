import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { MdNoFood } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { LoginContext } from '../../utils/Contexts';
import { FetchUserDiets, DeleteDietProgram } from '../../apis/DietsApis';
import LoadingBars from '../LoadingBars';
import styles from '../../styles/PopUps/diets_popup.module.css';
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
    // if (!initialized.current) {
    //   initialized.current = true;
    // } else {
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
    // }
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
    { key: 'program_id', label: t('components.pop_ups.diets_popup.label1') },
    { key: 'start_date', label: t('components.pop_ups.diets_popup.label2') },
    { key: 'end_date', label: t('components.pop_ups.diets_popup.label3') },
  ];

  return (
    <Popup
      trigger={
        <button className={styles.diet_button}
          title={`${user_name} ${t('components.pop_ups.diets_popup.title1')}`}>
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
          {isLoading ? <LoadingBars /> : <>
            <div className={styles.header}>
              <div className={styles.name}>
                {`${user_name} ${t('components.pop_ups.diets_popup.name')}`}
              </div>
              <button className={styles.create_button} onClick={handleAddDiet}>
                {t('components.pop_ups.diets_popup.create_button')}
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
                      <th style={{ minWidth: '80px' }}>
                        {t('components.pop_ups.diets_popup.th')}
                      </th>
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
                          title={t('components.pop_ups.diets_popup.title2')}
                          className={styles.diet_button}
                        >
                          <MdNoFood />
                        </button>
                        <button
                          onClick={(event) => handleDeleteDiet(event, program.program_id)}
                          title={t('components.pop_ups.diets_popup.title3')}
                          className={btn_style.delete_button}
                        >
                          <FaRegTrashCan />
                        </button>
                      </td>
                    </tr>)
                  ) : (
                    <tr>
                      <td colSpan={columnStructure.length + 1}>
                        {t('components.pop_ups.diets_popup.no_programs')}
                      </td>
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
