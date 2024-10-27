import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useTranslation } from 'react-i18next';
import { FaPlus } from "react-icons/fa6";
import styles from '../../styles/exercises.module.css';


const NewExercisePopUp = () => {
    // Translations
    const { t } = useTranslation('global');

    const [name, setName] = useState('');
    const [muscle, setMuscle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailPath, setThumbnailPath] = useState('');
    const [videoPath, setVideoPath] = useState('');

    const handleNewExercise = () => {

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
                        <form className={styles.add_form} onSubmit={handleNewExercise}>
                            <input
                                type='text'
                                className={styles.input}
                                placeholder='Exercise name'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                            <input
                                type='text'
                                className={styles.input}
                                placeholder='Exercise name'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                            <input
                                type='text'
                                className={styles.input}
                                placeholder='Exercise description'
                                value={name}
                                onChange={(event) => setDescription(event.target.value)}
                                required
                            />
                            <input
                                type='text'
                                className={styles.input}
                                placeholder='Exercise name'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                            <button className={styles.submit} type='submit'></button>
                        </form>
                    </div>
                    <div className={styles.actions}></div>
                </div>
            )}
        </Popup>
    )
};

export default NewExercisePopUp;
