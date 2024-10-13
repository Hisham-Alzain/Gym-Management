import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsChatFill, BsTrash } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { LoginContext } from "../utils/Contexts";
import { FetchUsers, DeleteUser } from "../apis/AuthApis";
import PopUp from "./PopUp";
import styles from "../styles/users_table.module.css";


const Users = () => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);
    // Define states
    const initialized = useRef(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [userData, setUserData] = useState([]);
    const [data, setData] = useState([]);
    const [userType, setUserType] = useState("individual");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
        } else {
            setIsLoading(true);

            FetchUsers(accessToken, currentPage, userType).then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data.pagination_data);
                    setUserData([]);
                    response.data.users.map((user) => {
                        if (!userData.some(item => user.user_id === item.user_id)) {
                            setUserData(response.data.users);
                        }
                    });
                } else {
                    console.log(response);
                }
            }).then(() => {
                setIsLoading(false);
            });
        }
    }, [currentPage, userType]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleInfo = (user) => {
    }

    const handleDelete = (event, user_id) => {
        event.preventDefault();
        DeleteUser(accessToken, user_id).then((response) => {
            if (response.status == 204) {
                console.log('user deleted');
                window.location.reload();
            } else {
                console.log('delete not working')
            }
        })
    };

    const columnStructure = [
        { key: "name", label: t('components.admin.users_table.column_structure.name') },
        { key: "email", label: 'Email' },
        { key: "phone_number", label: t('components.admin.users_table.column_structure.phone_number') },
        { key: "gender", label: 'Gender' },
        { key: "birth_date", label: 'Birth date' },
        { key: "role", label: 'Role' },
        { key: "is_verified", label: t('components.admin.users_table.column_structure.is_verified') },
    ];

    const currentColumns = columnStructure;

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
                        <h1>{t('components.admin.users_table.h1')}</h1>
                        <div className={styles.search_bar}>
                            <input
                                type="text"
                                placeholder={t('components.admin.users_table.search')}
                                value={searchQuery}
                                onChange={handleSearch}
                                className={styles.search_input}
                            />
                        </div>
                    </div>
                    <table className={styles.users_table}>
                        <thead>
                            <tr>
                                {currentColumns.map((column) => (<th key={column.key}>{column.label}</th>))}
                                <th>{t('components.admin.users_table.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>{filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => <tr key={user.id}>
                                {currentColumns.map((column) => (
                                    <td key={column.key}>
                                        {column.key == "is_verified" ? column.key == true ? "False" : "True" :
                                            user[column.key]
                                        }
                                    </td>
                                ))}
                                <td>
                                    <PopUp user={user} />
                                    <button onClick={() => handleDelete(user.id)} className={styles.delete_button} >
                                        <BsTrash />
                                    </button>
                                </td>
                            </tr>)
                        ) : (
                            <tr>
                                <td colSpan={currentColumns.length + 1}>{t('components.admin.users_table.no_users')}</td>
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
                                className={currentPage === page ? styles.activePage : styles.page}
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
