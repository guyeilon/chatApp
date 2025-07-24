import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

function paramsSerializer(params: AxiosRequestConfig['params']) {
  return qs.stringify(params, { arrayFormat: 'repeat' });
}

function setAuthHeaderFromStorage(key: string) {
  return (req: AxiosRequestConfig) => {
    if (req.headers?.Authorization) return req;
    let token = localStorage.getItem(key);
    if (!token) return req;
    try {
      token = JSON.parse(token);
      if (!token) return req;
      req.headers = { ...req.headers, Authorization: `Bearer ${token}` };
    } catch (err) {
      // no-op
    }
    return req;
  };
}

const apiUtils = { paramsSerializer, setAuthHeaderFromStorage };
export default apiUtils;
