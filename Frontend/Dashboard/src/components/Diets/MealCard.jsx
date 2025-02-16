import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../../utils/Contexts";
import { UpdateMeal, DeleteMeal } from '../../apis/DietsApis';
import UpImgPopUp from '../PopUps/UpImgPopUp';
import img_holder from '../../assets/noImage.jpg';
import styles from '../../styles/meals.module.css';


const MealCard = ({ MealData }) => {
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const [updating, setUpdating] = useState(false);
  const [newDescription, setNewDescription] = useState(MealData.translations[i18n.language].description);
  const [newCalories, setNewCalories] = useState(MealData.calories_per_gram);
  const [newProtein, setNewProtein] = useState(MealData.protein_per_gram);
  const [newCarbs, setNewCarbs] = useState(MealData.carbs_per_gram);
  const [newFat, setNewFat] = useState(MealData.fat_per_gram);
  const [newNa, setNewNa] = useState(MealData.Na_per_gram);
  const [newK, setNewK] = useState(MealData.K_per_gram);

  const handleDescription = (event) => {
    setNewDescription(event.target.value);
  }

  const handleUpdateMeal = (event, meal_id) => {
    event.preventDefault();
    UpdateMeal(
      accessToken,
      meal_id,
      i18n.language,
      newDescription,
      newCalories,
      newProtein,
      newCarbs,
      newFat,
      newK,
      newNa
    ).then((response) => {
      if (response.status == 200) {
        console.log('Meal updated');
        window.location.reload();
      } else {
        console.log(response);
      }
    });
  }

  const handleCancel = (event) => {
    event.preventDefault();
    setNewDescription(MealData.translations[i18n.language].description);
    setNewCalories(MealData.calories_per_gram);
    setNewProtein(MealData.protein_per_gram);
    setNewCarbs(MealData.carbs_per_gram);
    setNewFat(MealData.fat_per_gram);
    setUpdating(false);
  }

  const handleDeleteMeal = (event, meal_id) => {
    event.preventDefault();
    DeleteMeal(accessToken, meal_id).then((response) => {
      if (response.status === 204) {
        console.log('Meal deleted');
        window.location.reload();
      } else {
        console.log('delete not working');
      }
    });
  }

  return (
    <div className={styles.meal_card}>
      {MealData && <div className={styles.row}>
        <div className={styles.img_holder}>
          {MealData.thumbnail_path ? (
            <img src={`https://olive-salmon-530757.hostingersite.com/storage/${MealData.thumbnail_path}`}
              alt="Uploaded Photo"
              style={{ pointerEvents: 'none' }}
              className={styles.image}
            />
          ) : (
            <img src={img_holder}
              alt="Photo Placeholder"
              style={{ pointerEvents: 'none' }}
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.title_div}>
            <h3 className={styles.title}>
              {MealData.translations[i18n.language].meal_name}
            </h3>
          </div>
          <div className={styles.nutritions}>
            {!updating ?
              <>
                <p>{`${t('components.meals_card.p1')} ${MealData.calories_per_gram}g`}</p>
                <p>{`${t('components.meals_card.p2')} ${MealData.protein_per_gram}g`}</p>
                <p>{`${t('components.meals_card.p3')} ${MealData.carbs_per_gram}g`}</p>
                <p>{`${t('components.meals_card.p4')} ${MealData.fat_per_gram}g`}</p>
                <p>{`${t('components.meals_card.p5')} ${MealData.Na_per_gram}g`}</p>
                <p>{`${t('components.meals_card.p6')} ${MealData.K_per_gram}g`}</p>
              </> : <div className={styles.input_div}>
                <label>
                  {t('components.meals_card.label1')}
                  <input
                    type="number"
                    value={newCalories}
                    onChange={(event) => setNewCalories(event.target.value)}
                    placeholder={t('components.meals_card.input1')}
                    step="0.01"
                    className={styles.custom_input}
                  />
                </label>
                <label>
                  {t('components.meals_card.label2')}
                  <input
                    type="number"
                    value={newProtein}
                    onChange={(event) => setNewProtein(event.target.value)}
                    placeholder={t('components.meals_card.input2')}
                    step="0.01"
                    className={styles.custom_input}
                  />
                </label>
                <label>
                  {t('components.meals_card.label3')}
                  <input
                    type="number"
                    value={newCarbs}
                    onChange={(event) => setNewCarbs(event.target.value)}
                    placeholder={t('components.meals_card.input3')}
                    step="0.01"
                    className={styles.custom_input}
                  />
                </label>
                <label>
                  {t('components.meals_card.label4')}
                  <input
                    type="number"
                    value={newFat}
                    onChange={(event) => setNewFat(event.target.value)}
                    placeholder={t('components.meals_card.input4')}
                    step="0.01"
                    className={styles.custom_input}
                  />
                </label>
                <label>
                  {t('components.meals_card.label5')}
                  <input
                    type="number"
                    value={newNa}
                    onChange={(event) => setNewNa(event.target.value)}
                    placeholder={t('components.meals_card.input6')}
                    step="0.01"
                    className={styles.custom_input}
                  />
                </label>
                <label>
                  {t('components.meals_card.label6')}
                  <input
                    type="number"
                    value={newK}
                    onChange={(event) => setNewK(event.target.value)}
                    placeholder={t('components.meals_card.input5')}
                    step="0.01"
                    className={styles.custom_input}
                  />
                </label>
              </div>
            }
          </div>
          {!updating ?
            <p>{`${t('components.meals_card.p7')} ${MealData.translations[i18n.language].description}`}</p>
            : <textarea
              rows={7}
              type='text'
              value={newDescription}
              onChange={handleDescription}
              placeholder={t('components.meals_card.input7')}
              className={styles.description}
            />
          }
        </div>
        <div className={styles.column}>
          <UpImgPopUp id={MealData.meal_id} meal={true} />
          {!updating &&
            <button
              className={styles.update_button}
              onClick={() => {
                setUpdating(true);
                setNewDescription(MealData.translations[i18n.language].description);
              }}>
              {t('components.meals_card.update_button')}
            </button>}
          {updating &&
            <form
              className={styles.btn_holder}
              onSubmit={(event) => handleUpdateMeal(event, MealData.meal_id)}
            >
              <button className={styles.submit} type='submit'>
                {t('components.meals_card.submit')}
              </button>
              <button className={styles.cancel} onClick={handleCancel}>
                {t('components.meals_card.cancel')}
              </button>
            </form>
          }
          <button
            className={styles.delete_button}
            onClick={(event) => handleDeleteMeal(event, MealData.meal_id)}>
            {t('components.meals_card.delete_button')}
          </button>
        </div>
      </div>}
    </div>
  );
}

export default MealCard;
