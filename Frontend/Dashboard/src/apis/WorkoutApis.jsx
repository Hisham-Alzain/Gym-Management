import axios from 'axios';

export const FetchUserWorkouts = async (token, user_id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/workouts/${user_id}`, {
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

export const FetchWorkoutProgram = async (token, program_id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/workout/${program_id}`, {
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

export const DeleteWorkoutProgram = async (token, program_id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/workouts/${program_id}`, {
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

export const CreateDefaultWorkout = async (token, user_id, start_date, end_date, program_name) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/workouts/create/default', {
      "user_id": user_id,
      "start_date": start_date,
      "end_date": end_date,
      "program_name": program_name
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

export const CreateWorkout = async (token, workoutData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/workouts/create', {
      "user_id": workoutData.user_id,
      "start_date": workoutData.start_date,
      "end_date": workoutData.end_date,
      "repeat_days": workoutData.repeat_days,
      "days": workoutData.days
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
