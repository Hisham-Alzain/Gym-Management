import { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { LoginContext } from "../../utils/Contexts";
import { useTranslation } from 'react-i18next';
import { FaPlus } from "react-icons/fa6";
import { AddMeal } from '../../apis/DietsApis';
import img_holder from '../../assets/noImage.jpg';
import styles from '../../styles/PopUps/meal_popup.module.css';


const NewMealPopUp = () => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setcarbs] = useState('');
    const [fat, setfat] = useState('');
    const [thumbnailPath, setThumbnailPath] = useState('');

    const handleNewMeal = (event) => {
        event.preventDefault();
        AddMeal(accessToken, name, description, calories, protein, carbs, fat, thumbnailPath).then((response) => {
            if (response.status == 201) {
                console.log('Added meal successfully');
                window.location.reload();
            } else {
                console.log(response.data);
            }
        });
    }

    const handlePhotoChange = (event) => {
        const image = event.target.files[0];
        const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (image && allowedImageTypes.includes(image.type)) {
            setThumbnailPath(image);
        } else {
            console.log("Invalid Image type. Please select a PNG, JPG, JPEG image.");
        }
    };

    return (
        <Popup contentStyle={{ width: '70%' }}
            trigger={
                <button className={styles.add_button} title='Add meal'>
                    <FaPlus /> Add meal
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
                    <div className={styles.header}> Add new meal </div>
                    <div className={styles.content}>
                        <form className={styles.add_form} onSubmit={(event) => handleNewMeal(event)}>
                            <input
                                type='text'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder='meal name'
                                className={styles.custom_input}
                                required
                            />
                            <textarea
                                rows={7}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder='meal description'
                                className={styles.custom_input}
                                required
                            />
                            <input type="number"
                                value={calories}
                                onChange={(event) => setCalories(event.target.value)}
                                placeholder='meal calories per gram'
                                step="0.01"
                                className={styles.custom_input}
                                required />
                            <input type="number"
                                value={protein}
                                onChange={(event) => setProtein(event.target.value)}
                                placeholder='meal protein per gram'
                                step="0.01"
                                className={styles.custom_input}
                                required />
                            <input type="number"
                                value={carbs}
                                onChange={(event) => setcarbs(event.target.value)}
                                placeholder='meal carbs per gram'
                                step="0.01"
                                className={styles.custom_input}
                                required />
                            <input type="number"
                                value={fat}
                                onChange={(event) => setfat(event.target.value)}
                                placeholder='meal fat per gram'
                                step="0.01"
                                className={styles.custom_input}
                                required />
                            <label htmlFor='thumbnailPath' className={styles.img_holder}>
                                {thumbnailPath ? (
                                    <img src={URL.createObjectURL(thumbnailPath)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} />
                                ) : (
                                    <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} />
                                )}
                            </label>
                            <input
                                id='thumbnailPath'
                                type='file'
                                placeholder='Photo'
                                accept='.png,.jpg,.jpeg'
                                onChange={handlePhotoChange}
                                width="100px" height="100px"
                                style={{ visibility: 'hidden' }}
                            />
                            <div className={styles.submit_div}>
                                <button className={styles.submit} type='submit'> Add Meal </button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.actions}></div>
                </div>
            )}
        </Popup>
    )
};

export default NewMealPopUp;
