import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useTranslation } from 'react-i18next';
import { FaCircleInfo } from "react-icons/fa6";
import styles from '../../styles/PopUps/popup.module.css';


const PopUp = ({ user }) => {
  // Translations
  const { t } = useTranslation('global');

  return (
    <Popup
      trigger={
        <button className={styles.info_button}
          title={`${user.name} ${t('components.pop_ups.popup.title')}`}>
          <FaCircleInfo />
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
          <div className={styles.header}>
            {`${user.name} ${t('components.pop_ups.popup.header')}`}
          </div>
          <div className={styles.content}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th>{t('components.pop_ups.popup.th1')}</th>
                  <td>
                    {user.height ? `${user.height} cm` : '-'}
                  </td>
                </tr>
                <tr>
                  <th>{t('components.pop_ups.popup.th2')}</th>
                  <td>
                    {user.weight ? `${user.weight} Kg` : '-'}
                  </td>
                </tr>
                <tr>
                  <th>{t('components.pop_ups.popup.th3')}</th>
                  <td>
                    {user.gender ? user.gender : '-'}
                  </td>
                </tr>
                <tr>
                  <th>{t('components.pop_ups.popup.th4')}</th>
                  <td>
                    {user.birth_date ? user.birth_date : '-'}
                  </td>
                </tr>
                <tr>
                  <th>{t('components.pop_ups.popup.th5')}</th>
                  <td>
                    {user.active_days ? user.active_days : '-'}
                  </td>
                </tr>
                <tr>
                  <th>{t('components.pop_ups.popup.th6')}</th>
                  <td>
                    {user.illnesses ? user.illnesses : '-'}
                  </td>
                </tr>
                <tr>
                  <th>{t('components.pop_ups.popup.th7')}</th>
                  <td>
                    {user.allergies ? user.allergies : '-'}
                  </td>
                </tr>
                <tr>
                  <th>{t('components.pop_ups.popup.th8')}</th>
                  <td>
                    {user.disliked_food ? user.disliked_food : '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.actions}></div>
        </div>
      )}
    </Popup>
  )
};

export default PopUp;
