import { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaRegImages } from "react-icons/fa6";
import { LoginContext } from "../utils/Contexts";
import { FetchImage } from '../apis/AuthApis';
import styles from '../styles/img_popup.module.css';

const ImgPopUp = ({ user }) => {
    // Context
    const { accessToken } = useContext(LoginContext);

    const initialized = useRef(false);

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            setIsLoading(true);

            if (user.photos.length > 0) {
                user.photos.map((photo) => {
                    FetchImage(accessToken, photo.photo_path).then((response) => {
                        setImages((prev) => [...prev, response]);
                    }).then(() => {
                        setIsLoading(false);
                    });
                })
            }
        }
    }, [user]);

    if (isLoading) {
        return <></>;
    }
    return (
        <Popup
            trigger={<button className={styles.img_button} title='Trainee images' > <FaRegImages /></button>}
            modal
            nested
        >
            {close => (
                <div className={styles.modal}>
                    <button className={styles.close} onClick={close}>
                        &times;
                    </button>
                    <div className={styles.header}> {user.name} Photos </div>
                    <div className={styles.content}>
                        {images.map((image) => {
                            return (
                                <Popup
                                    trigger={
                                        <div className={styles.img_div}>
                                            <img className={styles.image} src={URL.createObjectURL(image)} />
                                        </div>}
                                    modal
                                    nested
                                >
                                    {close => (
                                        <div className={styles.modal}>
                                            <button className={styles.close} onClick={close}>
                                                &times;
                                            </button>
                                            <div className={styles.img_div2}>
                                                <img className={styles.image} src={URL.createObjectURL(image)} />
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            )
                        })}
                    </div>
                    <div className={styles.actions}>
                    </div>
                </div>
            )}
        </Popup>
    )
};
export default ImgPopUp;