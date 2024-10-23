import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaCalendarDays } from "react-icons/fa6";
import { LoginContext } from "../utils/Contexts";
import { FetchSubscriptions, StartSubscription } from "../apis/UserViewApis";
import styles from '../styles/subscription_popup.module.css';

const SubscriptionPopUp = ({ user_id, user_name }) => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);
    // Define states
    const initialized = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [subscriptions, setSubscriptions] = useState([]);
    const [month, setMonth] = useState(1);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
        } else {
            setIsLoading(true);

            FetchSubscriptions(accessToken, user_id, currentPage).then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data.pagination_data);
                    setSubscriptions([]);
                    response.data.subscriptions.map((subscription) => {
                        if (!subscriptions.some(item => subscription.id === item.id)) {
                            setSubscriptions(response.data.subscriptions);
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

    const handleSubscription = (event) => {
        event.preventDefault();
        StartSubscription(accessToken, user_id, parseInt(month)).then((response) => {
            if (response.status == 201) {
                console.log('Added Subscription successfully');
                window.location.reload();
            } else {
                console.log(response.data)
            }
        })
    }

    const columnStructure = [
        { key: "start_date", label: 'Start Date' },
        { key: "end_date", label: 'End Date' },
    ];

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
                                <tbody>{subscriptions.length > 0 ? (
                                    subscriptions.map((subscription) => <tr key={subscription.user_id}>
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
                            <form onSubmit={handleSubscription} className={styles.sub_form}>
                                <input type="number" min={1} max={12} required value={month}
                                    onChange={(event) => setMonth(event.target.value)}></input>
                                <button type='submit' className={styles.button}>Extend subscription</button>
                            </form>
                        </div>
                    </>}
                </div>
            )}
        </Popup>
    )
};
export default SubscriptionPopUp;