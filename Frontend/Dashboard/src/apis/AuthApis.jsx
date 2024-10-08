import axios from 'axios';


export const FetchProfile = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/trainee', {
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
export const CheckToken = async (
    token
) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/isExpired', {
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