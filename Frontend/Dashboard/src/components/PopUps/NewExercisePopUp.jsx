import { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { LoginContext } from "../../utils/Contexts";
import { useTranslation } from 'react-i18next';
import { FaPlus } from "react-icons/fa6";
import { AddExercise } from '../../apis/ExerciseApis';
import { FetchExerciseMuscles } from '../../apis/ExerciseApis';
import img_holder from '../../assets/noImage.jpg';
import styles from '../../styles/exercise_popup.module.css';


const NewExercisePopUp = () => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);

    const initialized = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [muscles, setMuscles] = useState([]);
    const [muscle, setMuscle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailPath, setThumbnailPath] = useState('');
    const [videoPath, setVideoPath] = useState('');

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            setIsLoading(true);
            FetchExerciseMuscles(accessToken).then((response) => {
                if (response.status === 200) {
                    setMuscles(response.data.muscles);
                } else {
                    console.log(response);
                }
            }).then(() => {
                setIsLoading(false);
            });
        }
    }, []);

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
                            <input
                                type='text'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder='Exercise name'
                                className={styles.custom_input}
                                required
                            />
                            <select
                                value={muscle}
                                onChange={handleChange}
                                className={styles.custom_input}
                                required
                            >
                                <option value="" disabled>Choose Muscle</option>
                                {muscles.map((muscle) => (
                                    <option
                                        key={muscle.id}
                                        value={muscle.name}
                                    >
                                        {muscle.value['en']}
                                    </option>
                                ))
                                }
                            </select>
                            <textarea
                                rows={7}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder='Exercise description'
                                className={styles.custom_input}
                                required
                            />
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
                            <div className={styles.row}>
                                <label>Video: </label>
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
