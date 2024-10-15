import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaCalendarDays } from "react-icons/fa6";
import { LoginContext } from "../utils/Contexts";
import { FetchSubscription } from "../apis/AuthApis";
import styles from '../styles/subscription_popup.module.css';

const SubscriptionPopUp = ({ user_id, user_name}) => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);
    // Define states
    const initialized = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
        } else {
            setIsLoading(true);

            FetchSubscription(accessToken, user_id, currentPage).then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data.pagination_data);
                    setUserData([]);
                    response.data.subscriptions.map((subscription) => {
                        if (!userData.some(item => subscription.id === item.id)) {
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
    }, [currentPage]);

    const columnStructure = [
        { key: "start_date", label: 'Start Date' },
        { key: "end_date", label: 'End Date' },
    ];

    const filteredUsers = userData
        ? userData.filter(user =>
            user.name) : [];

            console.log(filteredUsers)

    return (
        <Popup
            trigger={<button className={styles.subscription_button} title='Trainee Subscriptions' > <FaCalendarDays /></button>}
            modal
            nested
        >
            {close => (
                <div className={styles.modal}>
                    <button className={styles.close} onClick={close}>
                        &times;
                    </button>
                    {isLoading ? <></> : <>
                        <div className={styles.header}> {user_name} Subscriptions </div>
                        <div className={styles.content}>
                            <table className={styles.users_table}>
                                <thead>
                                    <tr>
                                        {columnStructure.map((column) => (<th key={column.key}>{column.label}</th>))}
                                    </tr>
                                </thead>
                                <tbody>{filteredUsers.length > 0 ? (
                                    filteredUsers.map((subscription) => <tr key={subscription.user_id}>
                                        {columnStructure.map((column) => (
                                            <td key={column.key}>
                                                {subscription[column.key]}
                                            </td>
                                        ))}
                                    </tr>)
                                ) : (
                                    <tr>
                                        <td colSpan={columnStructure.length + 1}>No subscription found</td>
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
                    </>}
                </div>
            )}
        </Popup>
    )
};
export default SubscriptionPopUp;