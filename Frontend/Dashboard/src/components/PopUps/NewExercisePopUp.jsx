import { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { LoginContext } from "../../utils/Contexts";
import { useTranslation } from 'react-i18next';
import { FaPlus } from "react-icons/fa6";
import { AddExercise } from '../../apis/ExerciseApis';
import img_holder from '../../assets/noImage.jpg';
import styles from '../../styles/exercises.module.css';


const NewExercisePopUp = () => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);

    const [name, setName] = useState('');
    const [muscle, setMuscle] = useState('Chest');
    const [description, setDescription] = useState('');
    const [thumbnailPath, setThumbnailPath] = useState('');
    const [videoPath, setVideoPath] = useState('');

    const handleNewExercise = (event) => {
        event.preventDefault();
        console.log(thumbnailPath);
        AddExercise(accessToken, name, muscle, description, thumbnailPath, videoPath).then((response) => {
            if (response.status == 201) {
                console.log('Added exercise successfully');
                window.location.reload();
            } else {
                console.log(response);
            }
        });
    }

    const handleChange = (event) => {
        setMuscle(event.target.value);
    };

    const handlePhotoChange = (event) => {
        const image = event.target.files[0];
        const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (image && allowedImageTypes.includes(image.type)) {
            setThumbnailPath(image);
        } else {
            console.log("Invalid Image type. Please select a PNG, JPG, JPEG image.");
        }
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        setVideoPath(null);
        const allowedFileTypes = ["video/mp4", "video/m4v", "video/mkv", "video/webm", "video/flv", "video/avi", "video/wmv"];
        if (event.target.files.length > 0) {
            if (allowedFileTypes.includes(event.target.files[0].type)) {
                setVideoPath(event.target.files[0]);
            } else {
                console.log("Invalid video type. Please select a valid video.");
            }
        }
    }

    return (
        <Popup
            trigger={
                <button className={styles.add_button} title='Add exercise'>
                    <FaPlus /> Add exercise
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
                    <div className={styles.header}> Add new exercise </div>
                    <div className={styles.content}>
                        <form className={styles.add_form} onSubmit={(event) => handleNewExercise(event)}>
                            <div className={styles.row}>
                                <div className={styles.name_muscle}>
                                    <input
                                        type='text'
                                        className={styles.input}
                                        placeholder='Exercise name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        required
                                    />
                                    <select value={muscle} onChange={handleChange} className={styles.drop_down}>
                                        <option value="Chest">Chest</option>
                                        <option value="Back">Back</option>
                                        <option value="Shoulders">Shoulders</option>
                                        <option value="Legs">Legs</option>
                                        <option value="Arms">Arms</option>
                                        <option value="Chest_Biceps">Chest Biceps</option>
                                        <option value="Back_Triceps">Back Triceps</option>
                                        <option value="Leg_Shoulders">Leg Shoulders</option>
                                        <option value="Abs">Abs</option>
                                    </select>
                                </div>
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
                            </div>
                            <div className={styles.row}>
                                <input
                                    type='text'
                                    className={styles.input}
                                    placeholder='Exercise description'
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    required
                                />
                                <input
                                    id='file'
                                    type='file'
                                    accept='.mp4,.m4v,.mkv,.webm,.flv,.avi,.wmv'
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className={styles.submit_div}>
                                <button className={styles.submit} type='submit'> Add workout </button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.actions}></div>
                </div>
            )}
        </Popup>
    )
};

export default NewExercisePopUp;
