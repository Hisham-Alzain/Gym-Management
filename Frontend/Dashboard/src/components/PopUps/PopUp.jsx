import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useTranslation } from 'react-i18next';
import { FaCircleInfo } from "react-icons/fa6";
import styles from '../../styles/popup.module.css';


const PopUp = ({ user }) => {
  // Translations
  const { t } = useTranslation('global');

  return (
    <Popup
      trigger={
        <button className={styles.info_button} title='Trainee info'>
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
          <div className={styles.header}> {user.name} info </div>
          <div className={styles.content}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th>Height</th>
                  <td>
                    {user.height ? `${user.height} cm` : ''}
                  </td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>
                    {user.weight ? `${user.weight} Kg` : ''}
                  </td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>
                    {user.gender ? user.gender : ''}
                  </td>
                </tr>
                <tr>
                  <th>Birth date</th>
                  <td>
                    {user.birth_date ? user.birth_date : ''}
                  </td>
                </tr>
                <tr>
                  <th>Active days</th>
                  <td>
                    {user.active_days ? user.active_days : ''}
                  </td>
                </tr>
                <tr>
                  <th>Illnesses</th>
                  <td>
                    {user.illnesses ? user.illnesses : ''}
                  </td>
                </tr>
                <tr>
                  <th>Allergies</th>
                  <td>
                    {user.allergies ? user.allergies : ''}
                  </td>
                </tr>
                <tr>
                  <th>Disliked food</th>
                  <td>
                    {user.disliked_food ? user.disliked_food : ''}
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
