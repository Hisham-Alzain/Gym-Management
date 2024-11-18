import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import { FaPlus } from "react-icons/fa6";
import { LoginContext } from "../../utils/Contexts";
import { FetchMealGi, AddMeal } from '../../apis/DietsApis';
import LoadingBars from '../LoadingBars';
import img_holder from '../../assets/noImage.jpg';
import styles from '../../styles/PopUps/meal_popup.module.css';


const NewMealPopUp = () => {
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [en_name, setEn_name] = useState('');
  const [ar_name, setAr_name] = useState('');
  const [en_description, setEn_description] = useState('');
  const [ar_description, setAr_description] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setcarbs] = useState('');
  const [fat, setfat] = useState('');
  const [gis, setGis] = useState([]);
  const [gi, setGi] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      setIsLoading(true);
      FetchMealGi(accessToken).then((response) => {
        if (response.status === 200) {
          setGis(response.data.gis);
        } else {
          console.log(response);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const handleNewMeal = (event) => {
    event.preventDefault();
    AddMeal(
      accessToken,
      en_name,
      ar_name,
      en_description,
      ar_description,
      calories,
      protein,
      carbs,
      fat,
      gi,
      thumbnailPath
    ).then((response) => {
      if (response.status == 201) {
        console.log('Added meal successfully');
        window.location.reload();
      } else {
        console.log(response.data);
      }
    });
  }

  const handlePhotoChange = (event) => {
    setThumbnailPath(null);
    const image = event.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (image && allowedImageTypes.includes(image.type)) {
      setThumbnailPath(image);
    } else {
      console.log("Invalid Image type. Please select a PNG, JPG, JPEG image.");
    }
  }

  return (
    <Popup
      trigger={
        <button className={styles.add_button}
          title={t('components.pop_ups.meal_popup.title')}>
          <FaPlus />{t('components.pop_ups.meal_popup.title')}
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
          {isLoading ? <LoadingBars /> : <>
            <div className={styles.header}>
              {t('components.pop_ups.meal_popup.header')}
            </div>
            <div className={styles.content}>
              <form
                className={styles.add_form}
                onSubmit={(event) => handleNewMeal(event)}
              >
                <input
                  type='text'
                  value={en_name}
                  onChange={(event) => setEn_name(event.target.value)}
                  placeholder={t('components.pop_ups.meal_popup.input1')}
                  className={styles.custom_input1}
                  required
                />
                <input
                  type='text'
                  value={ar_name}
                  onChange={(event) => setAr_name(event.target.value)}
                  placeholder={t('components.pop_ups.meal_popup.input1_a')}
                  className={styles.custom_input1}
                  required
                />
                <textarea
                  rows={7}
                  value={ar_description}
                  onChange={(event) => setAr_description(event.target.value)}
                  placeholder={t('components.pop_ups.meal_popup.input2')}
                  className={styles.custom_input1}
                  required
                />
                <textarea
                  rows={7}
                  value={en_description}
                  onChange={(event) => setEn_description(event.target.value)}
                  placeholder={t('components.pop_ups.meal_popup.input2_a')}
                  className={styles.custom_input1}
                  required
                />
                <div className={styles.container}>GI</div>
                <div className={styles.container}>
                  {gis.map((G) => (
                    <div className={styles.radio_div} key={G.id}>
                      <input
                        id={G.id}
                        type="radio"
                        value={G.name}
                        checked={G.name === gi}
                        onChange={(event) => setGi(event.target.value)}
                      />
                      <label htmlFor={G.id}>{G.value[i18n.language]}</label>
                    </div>
                  ))}
                </div>
                <div className={styles.container}>
                  <input
                    type="number"
                    value={calories}
                    onChange={(event) => setCalories(event.target.value)}
                    placeholder={t('components.pop_ups.meal_popup.input3')}
                    step="0.01"
                    className={styles.custom_input2}
                    required
                  />
                  <input
                    type="number"
                    value={protein}
                    onChange={(event) => setProtein(event.target.value)}
                    placeholder={t('components.pop_ups.meal_popup.input4')}
                    step="0.01"
                    className={styles.custom_input2}
                    required
                  />
                  <input
                    type="number"
                    value={carbs}
                    onChange={(event) => setcarbs(event.target.value)}
                    placeholder={t('components.pop_ups.meal_popup.input5')}
                    step="0.01"
                    className={styles.custom_input2}
                    required
                  />
                  <input
                    type="number"
                    value={fat}
                    onChange={(event) => setfat(event.target.value)}
                    placeholder={t('components.pop_ups.meal_popup.input6')}
                    step="0.01"
                    className={styles.custom_input2}
                    required
                  />
                </div>
                <label htmlFor='thumbnailPath' className={styles.img_holder}>
                  {thumbnailPath ? (
                    <img
                      src={URL.createObjectURL(thumbnailPath)}
                      alt="Uploaded Photo"
                      style={{ pointerEvents: 'none' }}
                    />
                  ) : (
                    <img
                      src={img_holder}
                      alt="Photo Placeholder"
                      style={{ pointerEvents: 'none' }}
                    />
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
                  <button className={styles.submit} type='submit'>
                    {t('components.pop_ups.meal_popup.title')}
                  </button>
                </div>
              </form>
            </div>
          </>}
          <div className={styles.actions}></div>
        </div>
      )}
    </Popup>
  );
}

export default NewMealPopUp;
