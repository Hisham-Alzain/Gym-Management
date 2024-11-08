import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../../utils/Contexts";
import { UpdateMeal, DeleteMeal } from '../../apis/DietsApis';
import img_holder from '../../assets/noImage.jpg';
import styles from '../../styles/meals.module.css';


const MealCard = ({ MealData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const [updating, setUpdating] = useState(false);
  const [newDescription, setNewDescription] = useState(MealData.description);
  const [newCalories, setNewCalories] = useState(MealData.calories_per_gram);
  const [newProtein, setNewProtein] = useState(MealData.protein_per_gram);
  const [newCarbs, setNewCarbs] = useState(MealData.carbs_per_gram);
  const [newFat, setNewFat] = useState(MealData.fat_per_gram);

  const handleDescription = (event) => {
    setNewDescription(event.target.value);
  }

  const handleUpdateMeal = (event, meal_id) => {
    event.preventDefault();
    UpdateMeal(
      accessToken,
      meal_id,
      newDescription,
      newCalories,
      newProtein,
      newCarbs,
      newFat
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
    setNewDescription(MealData.description);
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
            <img src={MealData.thumbnail_path}
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
              {MealData.meal_name}
            </h3>
          </div>
          <div className={styles.nutritions}>
            {!updating ?
              <>
                <p>{`${t('components.meals_card.p1')} ${MealData.calories_per_gram}g`}</p>
                <p>{`${t('components.meals_card.p2')} ${MealData.protein_per_gram}g`}</p>
                <p>{`${t('components.meals_card.p3')} ${MealData.carbs_per_gram}g`}</p>
                <p>{`${t('components.meals_card.p4')} ${MealData.fat_per_gram}g`}</p>
              </> : <div className={styles.input_div}>
                <input
                  type="number"
                  value={newCalories}
                  onChange={(event) => setNewCalories(event.target.value)}
                  placeholder={t('components.meals_card.input1')}
                  step="0.01"
                  className={styles.custom_input}
                />
                <input
                  type="number"
                  value={newProtein}
                  onChange={(event) => setNewProtein(event.target.value)}
                  placeholder={t('components.meals_card.input2')}
                  step="0.01"
                  className={styles.custom_input}
                />
                <input
                  type="number"
                  value={newCarbs}
                  onChange={(event) => setNewCarbs(event.target.value)}
                  placeholder={t('components.meals_card.input3')}
                  step="0.01"
                  className={styles.custom_input}
                />
                <input
                  type="number"
                  value={newFat}
                  onChange={(event) => setNewFat(event.target.value)}
                  placeholder={t('components.meals_card.input4')}
                  step="0.01"
                  className={styles.custom_input}
                />
              </div>
            }
          </div>
          {!updating ?
            <p>{`${t('components.meals_card.p5')} ${MealData.description}g`}</p>
            : <textarea
              rows={7}
              type='text'
              value={newDescription}
              onChange={handleDescription}
              placeholder={t('components.meals_card.input5')}
              className={styles.description}
            />
          }
        </div>
        <div className={styles.column}>
          {!updating &&
            <button
              className={styles.update_button}
              onClick={() => setUpdating(true)}>
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
