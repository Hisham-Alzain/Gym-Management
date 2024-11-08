import { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../../utils/Contexts";
import { FetchMeals } from '../../apis/DietsApis';
import { FetchImage } from '../../apis/UserViewApis';
import NewMealPopUp from '../PopUps/NewMealPopUp';
import MealCard from './MealCard';
import styles from '../../styles/meals.module.css';


const Meals = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    FetchMeals(accessToken, nextPage).then((response) => {
      if (response.status === 200) {
        setData(response.data.pagination_data);
        if (!response.data.pagination_data.has_more_pages) {
          setIsDone(true);
        }
        response.data.meals.map((meal) => {
          // Check if meal is already in array
          if (!meals.some(item => meal.meal_id === item.meal_id)) {

            // if not add meal
            if (meal.thumbnail_path) {
              FetchImage(accessToken, meal.thumbnail_path).then((response) => {
                meal.thumbnail_path = response.imageURL;
                setMeals((prevState) => ([...prevState, meal]));
              });
            } else {
              setMeals((prevState) => ([...prevState, meal]));
            }
          }
        });
      } else {
        console.log(response.data);
      }
    }).then(() => {
      setIsLoading(false);
    });
  }, [nextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextPage]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (isDone) {
      return;
    }
    if (scrollY + windowHeight >= documentHeight - 100) {
      setNextPage(nextPage + 1);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMeals = meals
    ? meals.filter(meal =>
      meal.meal_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];


  return (
    <div className={styles.screen}>
      <div className={styles.upper_div}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={t('components.meals.search')}
          className={styles.search_input}
        />
        <div className={styles.popup_div}>
          <NewMealPopUp />
        </div>
      </div>
      <div className={styles.mid_container}>
        {filteredMeals.map((meal) => (
          <div key={meal.meal_id}>
            <MealCard MealData={meal} />
          </div>
        ))}
        {isLoading ?
          <h5 className={styles.done}>
            {t('components.meals.loading')}
          </h5>
          : isDone &&
          <h5 className={styles.done}>
            {t('components.meals.no_meals')}
          </h5>
        }
      </div>
    </div>
  );
}

export default Meals;
