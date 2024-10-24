import axios from 'axios';

export const FetchExercises = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/exercises', {
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

export const AddExercise = async (token, name, muscle, description, video_path, thumbnail_path) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/exercise/create`, {
            "name": name,
            "muscle": muscle,
            "description": description,
            "video_path": video_path,
            "thumbnail_path": thumbnail_path
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

export const DeleteExercise = async (token, exercise_id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/exercises/${exercise_id}`, {
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