import axios from 'axios';

export const LoginAPI = async (email, password, rememberMe) => {
  try {
    const response = await axios.post('https://olive-salmon-530757.hostingersite.com/api/login/trainer', {
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
    const response = await axios.get('https://olive-salmon-530757.hostingersite.com/api/check_token', {
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
    const response = await axios.get('https://olive-salmon-530757.hostingersite.com/api/trainee', {
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
    const response = await axios.get('https://olive-salmon-530757.hostingersite.com/api/logout', {
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
