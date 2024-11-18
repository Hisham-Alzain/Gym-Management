import axios from 'axios';

export const FetchUserDiets = async (token, user_id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/diets/${user_id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const FetchDietProgram = async (token, program_id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/diet/${program_id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const DeleteDietProgram = async (token, program_id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/diets/${program_id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const FetchMealGi = async (token) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/meal/GI`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const FetchMeals = async (token, page) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/meals?page=${page}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const AddMeal = async (token, en_name, ar_name, en_description, ar_description, calories, protein, carbs, fat, gi, thumbnail_path) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/meals/create`, {
      "en_meal_name": en_name,
      "ar_meal_name": ar_name,
      "en_description": en_description,
      "ar_description": ar_description,
      "calories": calories,
      "protein": protein,
      "carbs": carbs,
      "fat": fat,
      "GI": gi,
      "thumbnail_path": thumbnail_path
    }, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const UpdateMeal = async (token, meal_id, lang, description, calories, protein, carbs, fat) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/meals/update`, {
      "meal_id": meal_id,
      "lang": lang,
      "description": description,
      "calories": calories,
      "protein": protein,
      "carbs": carbs,
      "fat": fat,
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const DeleteMeal = async (token, meal_id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/meals/${meal_id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
