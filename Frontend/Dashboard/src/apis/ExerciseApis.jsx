import axios from 'axios';

export const FetchExerciseMuscles = async (token, addingExercise = 0) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/muscles/${addingExercise}`, {
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

export const FetchExercises = async (token, page, muscle) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/exercises?page=${page}&muscle[eq]=${muscle}`, {
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

export const AddExercise = async (token, en_name, ar_name, muscle, en_description, ar_description, thumbnail_path, video_path) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/exercise/create`, {
            "en_name": en_name,
            "ar_name": ar_name,
            "muscle": muscle,
            "en_description": en_description,
            "ar_description": ar_description,
            "video_path": video_path,
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

export const UpdateExercise = async (token, exercise_id, description, lang) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/exercise/update`, {
            "exercise_id": exercise_id,
            "description": description,
            "lang": lang
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

export const UploadExerciseVideo = async (token, exercise_id, video) => {
    try {
        console.log(video);
        const response = await axios.post(`http://127.0.0.1:8000/api/exercise/video`, {
            "exercise_id": exercise_id,
            "video": video,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data; charset=UTF-8',
                'Accept': "application/json;",
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
