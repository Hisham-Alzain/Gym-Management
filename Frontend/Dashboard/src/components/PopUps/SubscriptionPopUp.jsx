import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { FaCalendarDays } from "react-icons/fa6";
import { LoginContext } from "../../utils/Contexts";
import { FetchSubscriptions, StartSubscription } from "../../apis/UserViewApis";
import styles from '../../styles/PopUps/subscription_popup.module.css';


const SubscriptionPopUp = ({ user_id, user_name }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  const [subscriptions, setSubscriptions] = useState([]);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);

      FetchSubscriptions(accessToken, user_id, currentPage).then((response) => {
        if (response.status === 200) {
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
    });
  }

  const columnStructure = [
    { key: 'start_date', label: t('components.pop_ups.subscriptions_popup.label1') },
    { key: 'end_date', label: t('components.pop_ups.subscriptions_popup.label2') },
  ];

  return (
    <Popup
      trigger={
        <button className={styles.subscription_button}
          title={`${user_name} ${t('components.pop_ups.subscriptions_popup.title')}`}>
          <FaCalendarDays />
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
              {`${user_name} ${t('components.pop_ups.subscriptions_popup.name')}`}
            </div>
            <div className={styles.content}>
              <table className={styles.table}>
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
                    <td colSpan={columnStructure.length + 1}>
                      {t('components.pop_ups.subscriptions_popup.no_subscriptions')}
                    </td>
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
              <form onSubmit={handleSubscription} className={styles.sub_form}>
                <input type="number" min={1} max={12} required value={month}
                  onChange={(event) => setMonth(event.target.value)} />
                <label>{t('components.pop_ups.subscriptions_popup.label3')}</label>
                <button type='submit' className={styles.button}>
                  {t('components.pop_ups.subscriptions_popup.button')}
                </button>
              </form>
            </div>
          </>}
        </div>
      )}
    </Popup>
  )
};
export default SubscriptionPopUp;