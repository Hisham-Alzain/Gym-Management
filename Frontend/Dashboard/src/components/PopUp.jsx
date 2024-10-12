import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaCircleInfo } from "react-icons/fa6";
import styles from "../styles/users_table.module.css";

const PopUp = ({user}) => {
    console.log(user);
    return (
    <Popup trigger={<button className={styles.edit_button}> <FaCircleInfo /></button>} position="right center">
        <div>name: {user.name}</div>
    </Popup>
    )
};
export default PopUp;