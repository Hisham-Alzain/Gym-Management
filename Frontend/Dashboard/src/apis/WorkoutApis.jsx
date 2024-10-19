import axios from 'axios';

export const FetchUserWorkouts = async (token,user_id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/trainee/workouts/${user_id}`, {
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
  export const FetchWorkoutProgram = async (token,program_id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/trainee/workout/${program_id}`, {
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