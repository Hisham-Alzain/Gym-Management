import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from "../utils/Contexts";
import { FetchMeals } from '../apis/DietsApis';
import { FetchImage } from '../apis/UserViewApis';
import NewMealPopUp from './PopUps/NewMealPopUp';
import MealCard from './MealCard';
import styles from '../styles/meals.module.css';


const Meals = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const filtered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [newFilter, setNewFilter] = useState(false);

  useEffect(() => {
    if (!filtered.current) {
      filtered.current = true;

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
        setNewFilter(false);
      });
    }
  }, [nextPage, newFilter]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (isDone) {
      return;
    }
    if (scrollY + windowHeight >= documentHeight - 100) {
      filtered.current = false;
      setNextPage(nextPage + 1);
    }
  };

  const filteredMeals = meals
    ? meals.filter(meal =>
      meal.meal_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextPage]);

  return (
    <div className={styles.screen}>
      <div className={styles.upper_div}>
        <div className={styles.search}>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search meal"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.buttun_div}>
          <NewMealPopUp />
        </div>
      </div>
      <div className={styles.mid_container}>
        {filteredMeals.map((meal) => (
          <div key={meal.meal_id}
            className={styles.meal_card}
          >
            <MealCard MealData={meal} />
          </div>
        ))}
        {isLoading ?
          <h5 className={styles.done}>
            Please wait
          </h5>
          : isDone &&
          <h5 className={styles.done}>
            No more Meals to display
          </h5>
        }
      </div>
    </div>
  );
}

export default Meals;
