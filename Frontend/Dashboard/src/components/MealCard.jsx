import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../utils/Contexts";
import { UpdateMeal, DeleteMeal } from '../apis/DietsApis';
import img_holder from '../assets/noImage.jpg';
import styles from '../styles/meals.module.css';


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
    event.preventDefault();
    setNewDescription(event.target.value);
  }

  const handleUpdateMeal = (event, meal_id) => {
    event.preventDefault();
    UpdateMeal(accessToken, meal_id, newDescription, newCalories, newProtein, newCarbs, newFat).then((response) => {
      if (response.status == 200) {
        console.log('meal updated');
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
      if (response.status == 204) {
        console.log('meal deleted');
        window.location.reload();
      } else {
        console.log('delete not working');
      }
    });
  }

  return (
    <div className={styles.card}>
      {MealData && <div className={styles.row}>
        <div className={styles.img_holder}>
          {MealData.thumbnail_path ? (
            <img src={MealData.thumbnail_path} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
          ) : (
            <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.title_div}>
            <h3 className={styles.title}>{MealData.meal_name}</h3>
          </div>
          <div className={styles.nutritions}>
            {!updating ?
              <>
                <p>calories per gram:  {MealData.calories_per_gram}g</p>
                <p>protein per gram:  {MealData.protein_per_gram}g</p>
                <p>carbs per gram:  {MealData.carbs_per_gram}g</p>
                <p>fat per gram:  {MealData.fat_per_gram}g</p>
              </> : <>
                <input type="number"
                  value={newCalories}
                  onChange={(event) => setNewCalories(event.target.value)}
                  placeholder='meal calories per gram'
                  step="0.01"
                  className={styles.custom_input}
                />
                <input type="number"
                  value={newProtein}
                  onChange={(event) => setNewProtein(event.target.value)}
                  placeholder='meal protein per gram'
                  step="0.01"
                  className={styles.custom_input}
                />
                <input type="number"
                  value={newCarbs}
                  onChange={(event) => setNewCarbs(event.target.value)}
                  placeholder='meal carbs per gram'
                  step="0.01"
                  className={styles.custom_input}
                />
                <input type="number"
                  value={newFat}
                  onChange={(event) => setNewFat(event.target.value)}
                  placeholder='meal fat per gram'
                  step="0.01"
                  className={styles.custom_input}
                />
              </>
            }
          </div>
          {!updating ? <p>Description: {MealData.description}</p>
            :
            <textarea
              rows={7}
              type='text'
              id='newDescription'
              className={styles.description}
              placeholder='New description'
              onChange={handleDescription}
              value={newDescription}
            />
          }
        </div>
        <div className={styles.column}>
          {!updating && <button className={styles.update_button} onClick={() => setUpdating(true)}>Update meal</button>}
          {updating &&
            <form
              className={styles.btn_holder}
              onSubmit={(event) => handleUpdateMeal(event, MealData.meal_id)}
            >
              <button className={styles.submit} type='submit'>Submit</button>
              <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
            </form>
          }
          <button className={styles.delete_button} onClick={(event) => handleDeleteMeal(event, MealData.meal_id)}>
            Delete meal
          </button>
        </div>
      </div>}
    </div>
  );
}

export default MealCard;
