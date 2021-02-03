import axios from 'axios';
import * as env from 'env-var';

const API_ENDPOINT = env.get('API_ENDPOINT').asUrlString() || 'http://localhost:8080';

export const getHealth = (): Promise<void> =>
  axios
    .get(`${API_ENDPOINT}/health`)
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err));

export const getAddressInfo = (addr: string): void => {
  axios
    .get(`${API_ENDPOINT}/crypto/address`, { params: { a: addr } })
    .then(console.log)
    .catch(console.error);
};

export const getAddressTransaction = (addr: string, page: number): void => {
  axios
    .get(`${API_ENDPOINT}/crypto/address`, { params: { a: addr, p: page } })
    .then(console.log)
    .catch(console.error);
};
