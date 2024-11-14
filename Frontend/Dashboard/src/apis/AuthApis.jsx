import axios from 'axios';

export const LoginAPI = async (email, password, rememberMe) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login/trainer', {
      "email": email,
      "password": password,
      "remember": rememberMe,
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const CheckToken = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/check_token', {
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

export const LogoutAPI = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/logout', {
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
