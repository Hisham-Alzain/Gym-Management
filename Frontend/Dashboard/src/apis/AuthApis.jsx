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

export const LoginAPI = async (
  email,
  password,
  rememberMe
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      "email": "test@example.com",
      "password": "password",
      "remember": false,
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

export const LogoutAPI = async (
  token,
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/logout', {},
      {
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

export const FetchUsers = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/users', {
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

export const DeleteUser = async (token, user_id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/users/${user_id}`, {
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

export const StartSubscription = async (token, user_id, duration) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/subscription/start`, {
      "user_id": user_id,
      "duration": duration,
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
