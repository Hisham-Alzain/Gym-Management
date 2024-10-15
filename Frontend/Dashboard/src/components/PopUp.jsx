import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaCircleInfo } from "react-icons/fa6";
import styles from '../styles/popup.module.css';

const PopUp = ({ user }) => {

    return (
        <Popup
            trigger={<button className={styles.edit_button} title='Trainee info' > <FaCircleInfo /></button>}
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
                        <ul className={styles.list}>
                            <li>Height: {user.height} cm</li>
                            <li>Weight: {user.weight} kg</li>
                            <li>Gender: {user.gender} kg</li>
                            <li>Birth date: {user.birth_date} kg</li>
                            <li>Active days: {user.active_days}</li>
                            <li>Illnesses: {user.illnesses}</li>
                            <li>Allergies: {user.allergies}</li>
                            <li>Disliked food: {user.disliked_food}</li>
                        </ul>
                    </div>
                    <div className={styles.actions}>
                    </div>
                </div>
            )}
        </Popup>
    )
};
export default PopUp;