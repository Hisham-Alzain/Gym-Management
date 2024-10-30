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