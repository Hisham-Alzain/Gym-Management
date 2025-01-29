import axios from 'axios';

export const FetchUserWorkouts = async (token, user_id) => {
  try {
    const response = await axios.get(`https://olive-salmon-530757.hostingersite.com/api/workouts/${user_id}`, {
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
    const response = await axios.get(`https://olive-salmon-530757.hostingersite.com/api/workout/${program_id}`, {
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
    const response = await axios.delete(`https://olive-salmon-530757.hostingersite.com/api/workouts/${program_id}`, {
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

export const FetchDefaultWorkouts = async (token) => {
  try {
    const response = await axios.get(`https://olive-salmon-530757.hostingersite.com/api/workouts/default`, {
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
    const response = await axios.post('https://olive-salmon-530757.hostingersite.com/api/workouts/create/default', {
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
    const response = await axios.post('https://olive-salmon-530757.hostingersite.com/api/workouts/create', {
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
