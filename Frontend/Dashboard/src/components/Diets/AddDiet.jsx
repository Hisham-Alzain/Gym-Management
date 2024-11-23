import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaCalendarDays } from "react-icons/fa6";
import { LoginContext } from '../../utils/Contexts';
import {
  FetchDefaultWorkouts, CreateDefaultWorkout, CreateWorkout
} from '../../apis/WorkoutApis';
import { FetchExerciseMuscles, FetchExercises } from '../../apis/ExerciseApis';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/add_diet.module.css";
import { CreateDietProgram, FetchMeals } from '../../apis/DietsApis';
import LoadingBars from '../LoadingBars';


const AddDiet = () => {
  // Params
  const { user_id, user_name } = useParams();
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [defaults, setDefaults] = useState([]);
  const [isCreatingDiet, setisCreatingDiet] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateDifference, setDateDifference] = useState('');
  const [error, setError] = useState('');

  const [repeatDays, setRepeatDays] = useState(1);
  const [mealsNo, setMealsNo] = useState(1);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [meals, setMeals] = useState(Array.from({ length: mealsNo }, () => []));
  const [currentPage, setCurrentPage] = useState(Array.from({ length: repeatDays }, () => 1));
  const [totalPages, setTotalPages] = useState(Array.from({ length: repeatDays }, () => 1));

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchMeals(accessToken).then((response) => {
        if (response.status === 200) {
          setAvailableMeals(response.data.meals);
          console.log(response.data.meals);
          setIsLoading(false);
        } else {
          console.log(response);
        }
      });

      FetchDefaultWorkouts(accessToken).then((response) => {
        if (response.status === 200) {
          setDefaults(response.data.workouts);
        } else {
          console.log(response);
        }
      });
    }
  }, [accessToken]);

  useEffect(() => {
    setMeals((prevMeals) => {
      if (prevMeals.length < mealsNo) {
        return [...prevMeals, ...Array.from({ length: mealsNo - prevMeals.length }, () => ({}))];
      } else if (prevMeals.length > mealsNo) {
        return prevMeals.slice(0, mealsNo);
      }
      return prevMeals;
    });
  }, [mealsNo]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setDateDifference(difference >= 0 ? difference : 0);
    } else {
      setDateDifference('');
    }
  }, [startDate, endDate]);

  const handleMealChange = (mealIndex, key, value) => {
    setMeals((prevMeals) => {
      const updatedMeals = [...prevMeals];
      if (!updatedMeals[mealIndex]) {
        updatedMeals[mealIndex] = {};
      }
      updatedMeals[mealIndex][key] = value;

      return updatedMeals;
    });
  };

  const handleCreateProgram = (program) => {
    if (!startDate || !endDate) {
      setError('Please enter both start and end dates before creating a workout.');
      return;
    } else {
      setError('');
    }

    CreateDefaultWorkout(accessToken, user_id, startDate, endDate, program).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.log('Error creating workout', response);
      }
    });
  }

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      setError(t('components.add_diet.error_missing_dates'));
      return;
    }

    for (const [index, meal] of meals.entries()) {
      if (!meal || !meal.meal_id || !meal.quantity || !meal.time_after) {
        setError(
          t('components.add_diet.error_missing_meal', { mealNumber: index + 1 })
        );
        return;
      }
    }

    setError('');

    const dietData = {
      user_id,
      startDate,
      endDate,
      meals: meals.map((meal, mealIndex) => ({
        meal_id: meal.meal_id,
        meal_number: mealIndex + 1,
        quantity: meal.quantity,
        details: meal.details || '',
        time_after: meal.time_after
      })),
    };
    console.log(dietData)
    CreateDietProgram(accessToken, dietData).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setisCreatingDiet(false);
      } else {
        console.log('Error creating workout', response);
        setError(t('components.add_diet.error'));
      }
    });
  }

  if (isLoading) {
    return <LoadingBars />;
  }

  return (
    <div className={styles.programs}>
      <div className={styles.header}>
        <h1>{t('components.add_diet.h1')} {user_name}</h1>
        <div className={styles.row}>
          <button
            className={`${styles.btn} ${!isCreatingDiet ? styles.active : ''}`}
            onClick={() => setisCreatingDiet(false)}
          >
            {t('components.add_diet.button1')}
          </button>
          <button
            className={`${styles.btn} ${isCreatingDiet ? styles.active : ''}`}
            onClick={() => setisCreatingDiet(true)}
          >
            {t('components.add_diet.button2')}
          </button>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label>{t('components.add_diet.label1')}</label>
            <DatePicker
              icon={<FaCalendarDays />}
              dateFormat='dd/MM/yyyy'
              className={styles.date_input}
              wrapperClassName={styles.date_wrapper}
              calendarIconClassName={styles.calendar}
              selected={startDate}
              onChange={(date) => {
                setStartDate(new Date(date).toISOString().split('T')[0]);
              }}
              peekNextMonth
              scrollableYearDropdown
              showMonthDropdown
              showYearDropdown
              showIcon
              required
            />
          </div>
          <div className={styles.colmun}>
            {dateDifference !== '' && (
              <p>{`${t('components.add_diet.p1')} ${dateDifference}
                ${dateDifference === 1 ? t('components.add_diet.p2')
                  : t('components.add_diet.p3')}`}</p>
            )}
            {error && (
              <p className={styles.error}>{error}</p>
            )}
          </div>
          <div className={styles.column}>
            <label>{t('components.add_diet.label2')}</label>
            <DatePicker
              icon={<FaCalendarDays />}
              dateFormat='dd/MM/yyyy'
              className={styles.date_input}
              wrapperClassName={styles.date_wrapper}
              calendarIconClassName={styles.calendar}
              selected={endDate}
              onChange={(date) => {
                setEndDate(new Date(date).toISOString().split('T')[0]);
              }}
              peekNextMonth
              scrollableYearDropdown
              showMonthDropdown
              showYearDropdown
              showIcon
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {isCreatingDiet ? (<>
          <h2>{t('components.add_diet.h2_1')}</h2>
          <div className={styles.repeat_days_container}>
            <label>
              {t("components.add_diet.label3")}
              <select value={mealsNo} onChange={(event) => setMealsNo(Number(event.target.value))}>
                {[...Array(7)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleSubmit} className={styles.submit_button}>
              {t("components.add_diet.button3")}
            </button>

            {/* Total Nutritional Values */}
            <div className={styles.totals}>
              {(() => {
                // Calculate totals
                let totalCalories = 0;
                let totalProtein = 0;
                let totalCarbs = 0;
                let totalFat = 0;
                const giCounts = {};

                meals.forEach((meal) => {
                  if (meal?.meal_id) {
                    const selectedMeal = availableMeals.find(
                      (availableMeal) => availableMeal.meal_id === parseInt(meal.meal_id)
                    );
                    if (selectedMeal) {
                      const quantity = meal.quantity || 0;
                      totalCalories += selectedMeal.calories_per_gram * quantity;
                      totalProtein += selectedMeal.protein_per_gram * quantity;
                      totalCarbs += selectedMeal.carbs_per_gram * quantity;
                      totalFat += selectedMeal.fat_per_gram * quantity;

                      const giValue = selectedMeal.GI[i18n.language];
                      if (giValue) {
                        giCounts[giValue] = (giCounts[giValue] || 0) + 1;
                      }
                    }
                  }
                });

                // Determine the most frequent GI value
                const mostFrequentGI = Object.keys(giCounts).reduce((a, b) =>
                  giCounts[a] > giCounts[b] ? a : b,
                  ""
                );

                return (
                  <div className={styles.totals_info}>
                    <p>{t("components.add_diet.total_calories")}: {totalCalories.toFixed(2)} kcal</p>
                    <p>{t("components.add_diet.total_protein")}: {totalProtein.toFixed(2)} g</p>
                    <p>{t("components.add_diet.total_carbs")}: {totalCarbs.toFixed(2)} g</p>
                    <p>{t("components.add_diet.total_fat")}: {totalFat.toFixed(2)} g</p>
                    <p>{t("components.add_diet.most_frequent_gi")}: {mostFrequentGI}</p>
                  </div>
                );
              })()}
            </div>
          </div>
          <div className={styles.cards_container}>
            {[...Array(mealsNo)].map((_, mealIndex) => {
              const meal = meals[mealIndex];
              const selectedMeal = availableMeals.find(
                (availableMeal) => availableMeal.meal_id === parseInt(meal?.meal_id)
              );
              const calories = selectedMeal
                ? (selectedMeal.calories_per_gram * (meal?.quantity || 0)).toFixed(2)
                : 0;
              const protein = selectedMeal
                ? (selectedMeal.protein_per_gram * (meal?.quantity || 0)).toFixed(2)
                : 0;
              const carbs = selectedMeal
                ? (selectedMeal.carbs_per_gram * (meal?.quantity || 0)).toFixed(2)
                : 0;
              const fat = selectedMeal
                ? (selectedMeal.fat_per_gram * (meal?.quantity || 0)).toFixed(2)
                : 0;
              const GI = selectedMeal ? selectedMeal.GI[i18n.language] : "";

              return (
                <div key={mealIndex} className={styles.card}>
                  <label className={styles.card_label}>
                    {t("components.add_diet.label4")} {mealIndex + 1}:
                  </label>
                  <select
                    value={meal?.meal_id || ""}
                    onChange={(e) => handleMealChange(mealIndex, "meal_id", e.target.value)}
                  >
                    <option value="" disabled>
                      {t("components.add_diet.option1")}
                    </option>
                    {availableMeals.map((meal) => (
                      <option key={meal.meal_id} value={meal.meal_id}>
                        {meal.translations[i18n.language].meal_name}
                      </option>
                    ))}
                  </select>
                  <label className={styles.card_label}>
                    {t("components.add_diet.quantity_label")}:
                  </label>
                  <input
                    type="number"
                    placeholder={t("components.add_diet.quantity")}
                    value={meal?.quantity || ""}
                    onChange={(e) => handleMealChange(mealIndex, "quantity", e.target.value)}
                  />
                  <label className={styles.card_label}>
                    {t("components.add_diet.details_label")}:
                  </label>
                  <input
                    type="text"
                    placeholder={t("components.add_diet.details")}
                    value={meal?.details || ""}
                    onChange={(e) => handleMealChange(mealIndex, "details", e.target.value)}
                  />
                  <label className={styles.card_label}>
                    {t("components.add_diet.time_after_label")}:
                  </label>
                  <input
                    type="number"
                    placeholder={t("components.add_diet.time_after")}
                    value={meal?.time_after || ""}
                    onChange={(e) => handleMealChange(mealIndex, "time_after", e.target.value)}
                  />
                  <span className={styles.hours}>{t("components.add_diet.hours")}</span>
                  {selectedMeal && (
                    <div className={styles.nutrition_info}>
                      <p>{t("components.add_diet.calories")}: {calories} kcal</p>
                      <p>{t("components.add_diet.protein")}: {protein} g</p>
                      <p>{t("components.add_diet.carbs")}: {carbs} g</p>
                      <p>{t("components.add_diet.fat")}: {fat} g</p>
                      <p>{t("components.add_diet.gi")}: {GI}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>) : (<>
          <h2>{t('components.add_diet.h2_2')}</h2>
          <div className={styles.program_buttons}>
            {defaults.map((program) => (
              <button
                key={program.id}
                className={styles.program_button}
                onClick={() => handleCreateProgram(program.name)}
              >
                {program.value[i18n.language]}
              </button>
            ))}
          </div>
        </>
        )}
      </div>
    </div >
  );
}

export default AddDiet;
