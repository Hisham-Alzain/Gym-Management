import { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaCircleInfo } from "react-icons/fa6";
import { LoginContext } from "../utils/Contexts";
import { StartSubscription } from '../apis/AuthApis';
import styles from '../styles/popup.module.css';

const PopUp = ({ user }) => {
    // Context
    const { accessToken } = useContext(LoginContext);

    const [month, setMonth] = useState(1);

    const handleSubscription = (event) => {
        event.preventDefault();
        StartSubscription(accessToken, user.id, parseInt(month)).then((response) => {
            if (response.status == 201) {
                console.log('Added Subscription successfully');
                window.location.reload();
            } else {
                console.log(response.data)
            }
        })
    }
    return (
        <Popup
            trigger={<button className={styles.edit_button}> <FaCircleInfo /></button>}
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
                            <li>Active days: {user.active_days}</li>
                            <li>Illnesses: {user.illnesses}</li>
                            <li>Allergies: {user.allergies}</li>
                            <li>Disliked food: {user.disliked_food}</li>
                            <li>
                                <h4>Subscription plan</h4>
                                <ul>
                                    <li>Start Date: {user.subscription_plan && user.subscription_plan.start_date}</li>
                                    <li>End Date: {user.subscription_plan && user.subscription_plan.end_date}</li>
                                </ul>
                                <form onSubmit={handleSubscription} className={styles.sub_form}>
                                    <input type="number" min={1} max={12} required value={month}
                                        onChange={(event) => setMonth(event.target.value)}></input>
                                    <button type='submit' className={styles.button}>Extend subscription</button>
                                </form>
                            </li>
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