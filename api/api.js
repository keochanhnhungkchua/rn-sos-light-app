import axios from 'axios';

const baseURL = 'http://10.1.22.242:3000';

const instanceSecondary = axios.create({
  baseURL: baseURL,
});

const setHeader = async () => {
  //   const token = await getCookie(STORAGEKEY.ACCESS_TOKEN);
  instanceSecondary.defaults.headers.common['Authorization'] = `123`;
};

export const get = async (path, params = {}) => {
  try {
    await setHeader();
    const config = {params};
    const response = await instanceSecondary.get(path, config);
    return _responseHandler(response);
  } catch (error) {
    return _errorHandler(error);
  }
};

export const put = async (path, data = {}) => {
  try {
    let response = {};
    if (data.toLocaleString() === '[object FormData]') {
      response = await instanceSecondary.put(path, data);
    } else {
      response = await instanceSecondary.put(path, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
    return _responseHandler(response);
  } catch (error) {
    _errorHandler(error);
  }
};

export const post = async (path, data) => {
  const formData = new FormData();
  //   formData.append('data', data.base64);
  formData.append('filename', data.fileName);
  formData.append('type', data.type);

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    await setHeader();
    const response = await instanceSecondary.post(path, formData, config);
    return _responseHandler(response);
  } catch (error) {
    return _errorHandler(error);
  }
};

export const del = async (path, data = {}) => {
  try {
    await setHeader();
    const response = await instanceSecondary.delete(path, data);
    return _responseHandler(response);
  } catch (error) {
    return _errorHandler(error);
  }
};

const _responseHandler = (response, url) => {
  return response.data;
};

const _errorHandler = async error => {
  if (error.response && error.response.status === 401) {
    refreshToken();
  }
  throw error;
};
