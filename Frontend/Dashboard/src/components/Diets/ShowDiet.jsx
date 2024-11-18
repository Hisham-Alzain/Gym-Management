import { useEffect, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginContext } from '../../utils/Contexts';
import { FetchImage } from '../../apis/UserViewApis';
import { FetchDietProgram } from '../../apis/DietsApis';
import LoadingBars from '../LoadingBars';
import img_holder from '../../assets/noImage.jpg';
import styles from '../../styles/show_diet.module.css';


const ShowDiet = () => {
  // Params
  const { program_id } = useParams();
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // States
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [program, setProgram] = useState(null);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchDietProgram(accessToken, program_id).then((response) => {
        if (response.status === 200) {
          setProgram(response.data.program);
          response.data.program.meals.map((meal) => {
            if (meal.meal.thumbnail_path) {
              FetchImage(accessToken, meal.meal.thumbnail_path).then((response) => {
                meal.meal.thumbnail_path = response.imageURL;
                setMeals((prevState) => ([...prevState, meal]));
              });
            } else {
              setMeals((prevState) => ([...prevState, meal]));
            }
          })
        } else {
          console.log(response);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [accessToken, program_id]);


  if (isLoading) {
    return <LoadingBars />;
  }
  return (
    <div className={styles.program}>
      {program && (
        <div className={styles.header}>
          <h1>
            {`${program.user.name} ${t('components.show_diet.header')} ${program_id}`}
          </h1>
          <div>
            <h3>{`${t('components.show_diet.start_date')} ${program.start_date}`}</h3>
            <h3>{`${t('components.show_diet.end_date')} ${program.end_date}`}</h3>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <table className={styles.meals_table}>
          <caption>
            {program.no_meals === 1 ?
              `${program.no_meals} ${t('components.show_diet.no_meals1')}` :
              `${program.no_meals} ${t('components.show_diet.no_meals2')}`}
          </caption>
          <tbody>
            {meals.length > 0 && meals.map((meal) => (
              <tr key={meal.meal_id}>
                <td className={styles.td1}>
                  <div className={styles.img_holder}>
                    {meal.meal.thumbnail_path ? (
                      <img src={meal.meal.thumbnail_path}
                        alt="Uploaded Photo"
                        style={{ pointerEvents: 'none' }}
                        className={styles.image} />
                    ) : (
                      <img src={img_holder}
                        alt="Photo Placeholder"
                        style={{ pointerEvents: 'none' }}
                        className={styles.image} />
                    )}
                  </div>
                </td>
                <td className={styles.td2}>
                  <table className={styles.details_table}>
                    <caption>
                      {meal.meal.translations[i18n.language].meal_name}
                    </caption>
                    <tbody>
                      <tr>
                        <th>{t('components.show_diet.th1')}</th>
                        <td>{meal.meal.meal_number}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th2')}</th>
                        <td>{meal.meal.quantity}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th3')}</th>
                        <td>{meal.meal.calories_gram}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th4')}</th>
                        <td>{meal.meal.protein_gram}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th5')}</th>
                        <td>{meal.meal.carbs_gram}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th6')}</th>
                        <td>{meal.meal.fat_gram}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th7')}</th>
                        <td>{meal.meal.calories_total}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th8')}</th>
                        <td>{meal.meal.protein_total}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th9')}</th>
                        <td>{meal.meal.carbs_total}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th10')}</th>
                        <td>{meal.meal.fat_total}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th11')}</th>
                        <td>{meal.meal.time_after}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th12')}</th>
                        <td>{meal.meal.details}</td>
                      </tr>
                      <tr>
                        <th>{t('components.show_diet.th13')}</th>
                        <td>{meal.meal.translations[i18n.language].description}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowDiet;
