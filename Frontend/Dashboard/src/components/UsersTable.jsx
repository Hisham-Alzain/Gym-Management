import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaRegTrashCan } from "react-icons/fa6";
import { LoginContext } from "../utils/Contexts";
import { FetchUsers, DeleteUser } from "../apis/UserViewApis";
import PopUp from "./PopUps/PopUp";
import ImgPopUp from "./PopUps/ImgPopUp";
import DietsPopUp from './PopUps/DietsPopUp';
import ProgramsPopUp from "./PopUps/ProgramsPopUp";
import SubscriptionPopUp from "./PopUps/SubscriptionPopUp";
import styles from "../styles/users_table.module.css";


const Users = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);

      FetchUsers(accessToken, currentPage).then((response) => {
        if (response.status === 200) {
          setData(response.data.pagination_data);
          setUserData([]);
          response.data.users.map((user) => {
            if (!userData.some(item => user.user_id === item.user_id)) {
              setUserData(response.data.users);
            }
          });
        } else {
          console.log(response.data);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [currentPage]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  }

  const handleDelete = (event, user_id) => {
    event.preventDefault();
    DeleteUser(accessToken, user_id).then((response) => {
      if (response.status === 204) {
        window.location.reload();
      } else {
        console.log(response)
      }
    });
  }

  const columnStructure = [
    { key: "name", label: t('components.users_table.column_structure.name') },
    { key: "email", label: t('components.users_table.column_structure.email') },
    { key: "phone_number", label: t('components.users_table.column_structure.phone_number') },
  ];

  const filteredUsers = userData
    ? userData.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

  if (isLoading) {
    return <></>;
  }
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div className={styles.content_div}>
          <div>
            <h1>Trainees</h1>
            <div className={styles.search_bar}>
              <input
                type="text"
                placeholder={t('components.users_table.search')}
                value={searchQuery}
                onChange={handleSearch}
                className={styles.search_input}
              />
            </div>
          </div>
          <table className={styles.users_table}>
            <thead>
              <tr>
                {columnStructure.map((column) => (<th key={column.key}>{column.label}</th>))}
                <th>{t('components.users_table.actions')}</th>
              </tr>
            </thead>
            <tbody>{filteredUsers.length > 0 ? (
              filteredUsers.map((user) => <tr key={user.id}>
                {columnStructure.map((column) => (
                  <td key={column.key}>
                    {user[column.key]}
                  </td>
                ))}
                <td>
                  <PopUp user={user} />
                  <ImgPopUp user={user} />
                  <SubscriptionPopUp user_id={user.id} user_name={user.name} />
                  <ProgramsPopUp user_id={user.id} user_name={user.name} />
                  <DietsPopUp user_id={user.id} user_name={user.name} />
                  <button
                    onClick={(event) => handleDelete(event, user.id)}
                    className={styles.delete_button}
                    title={t('components.users_table.delete')}
                  >
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>)
            ) : (
              <tr>
                <td colSpan={columnStructure.length + 1}>{t('components.users_table.no_users')}</td>
              </tr>
            )}
            </tbody>
          </table>
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
      </div>
    </div>
  );
};

export default Users;
