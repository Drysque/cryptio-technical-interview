import axios from 'axios';
import * as env from 'env-var';

const API_ENDPOINT = env.get('API_ENDPOINT').asUrlString() || 'http://localhost:8080';

export const getHealth = (): Promise<void> =>
  axios
    .get(`${API_ENDPOINT}/health`)
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err));

export const getAddressInfo = (addr: string): Promise<void> =>
  axios.get(`${API_ENDPOINT}/crypto/address`, { params: { a: addr } });

export const getAddressTransaction = (addr: string, page: number): Promise<void> =>
  axios.get(`${API_ENDPOINT}/crypto/address`, { params: { a: addr, p: page } });
