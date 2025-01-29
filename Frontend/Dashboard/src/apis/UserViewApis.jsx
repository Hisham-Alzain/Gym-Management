import axios from 'axios';

export const FetchUsers = async (token) => {
  try {
    const response = await axios.get('https://olive-salmon-530757.hostingersite.com/api/users', {
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

export const FetchSubscriptions = async (token, user_id) => {
  try {
    const response = await axios.get(`https://olive-salmon-530757.hostingersite.com/api/subscription/${user_id}`, {
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
    const response = await axios.post(`https://olive-salmon-530757.hostingersite.com/api/subscription/start`, {
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

export const DeleteUser = async (token, user_id) => {
  try {
    const response = await axios.delete(`https://olive-salmon-530757.hostingersite.com/api/users/${user_id}`, {
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

export const FetchImage = async (token, imagePath) => {
  try {
    const response = await axios({
      url: `https://olive-salmon-530757.hostingersite.com/api/image/${imagePath}?not-from-cache-please`,
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'image/*; charset=UTF-8',
        'Accept': 'image/*'
      }
    }).then((response) => {
      // Create file from response data
      const image = new Blob(
        [response.data],
        { type: response.data.type }
      );
      // Return response
      return ({
        status: response.status,
        imageURL: URL.createObjectURL(image),
        type: image.type,
        size: image.size,
      });
    });
    return (response);
  } catch (error) {
    return error.response;
  }
};

export const FetchVideo = async (token, videoPath) => {
  try {
    const response = await axios({
      url: `https://olive-salmon-530757.hostingersite.com/api/video/${videoPath}`,
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'video/*; charset=UTF-8',
        'Accept': 'video/*'
      }
    }).then((response) => {
      // Create file from response data
      const video = new Blob(
        [response.data],
        { type: response.data.type }
      );
      // Return response
      return ({
        status: response.status,
        videoURL: URL.createObjectURL(video),
        type: video.type,
        size: video.size,
      });
    });
    return (response);
  } catch (error) {
    return error.response;
  }
};

export const FetchFile = async (token, filePath) => {
  try {
    const response = await axios({
      url: `https://olive-salmon-530757.hostingersite.com/api/file/${filePath}`,
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/pdf; charset=UTF-8',
        'Accept': 'application/pdf'
      }
    }).then((response) => {
      // Create file from response data
      const file = new Blob(
        [response.data],
        { type: 'application/pdf' }
      );
      // Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      // Open the URL on new Window
      window.open(fileURL);
    });
  } catch (error) {
    return error.response;
  }
};
