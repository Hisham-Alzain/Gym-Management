import { useEffect, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { LoginContext } from '../utils/Contexts';
import { FetchImage } from '../apis/UserViewApis';
import { FetchDietProgram } from '../apis/DietsApis';
import img_holder from '../assets/noImage.jpg';
import styles from '../styles/show_diet.module.css';


const ShowDiet = () => {
  // Params
  const { program_id } = useParams();
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
    return <></>;
  }
  return (
    <div className={styles.program}>
      {program && (
        <div className={styles.header}>
          <h1>{program.user.name}'s Diet Program {program_id}</h1>
          <div>
            <h3>Start Date: ${program.start_date}</h3>
            <h3>End Date: ${program.end_date}</h3>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <table className={styles.meals_table}>
          <caption>
            {program.no_meals === 1 ?
              `${program.no_meals} meal` :
              `${program.no_meals} meals`}
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
                      {meal.meal.meal_name}
                    </caption>
                    <tbody>
                      <tr>
                        <th>Number</th>
                        <td>{meal.meal.meal_number}</td>
                      </tr>
                      <tr>
                        <th>Quantity</th>
                        <td>{meal.meal.quantity}</td>
                      </tr>
                      <tr>
                        <th>Calories 1g</th>
                        <td>{meal.meal.calories_gram}</td>
                      </tr>
                      <tr>
                        <th>Protein 1g</th>
                        <td>{meal.meal.protein_gram}</td>
                      </tr>
                      <tr>
                        <th>Carbs 1g</th>
                        <td>{meal.meal.carbs_gram}</td>
                      </tr>
                      <tr>
                        <th>Fat 1g</th>
                        <td>{meal.meal.fat_gram}</td>
                      </tr>
                      <tr>
                        <th>Total Calories</th>
                        <td>{meal.meal.calories_total}</td>
                      </tr>
                      <tr>
                        <th>Total Protein</th>
                        <td>{meal.meal.protein_total}</td>
                      </tr>
                      <tr>
                        <th>Total Carbs</th>
                        <td>{meal.meal.carbs_total}</td>
                      </tr>
                      <tr>
                        <th>Total Fat</th>
                        <td>{meal.meal.fat_total}</td>
                      </tr>
                      <tr>
                        <th>Next meal</th>
                        <td>{meal.meal.time_after}</td>
                      </tr>
                      <tr>
                        <th>Details</th>
                        <td>{meal.meal.details}</td>
                      </tr>
                      <tr>
                        <th>Description</th>
                        <td>{meal.meal.description}</td>
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
