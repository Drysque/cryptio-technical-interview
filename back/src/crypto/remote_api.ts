import axios, { AxiosError } from 'axios';
import cache from 'memory-cache';
import HttpStatus from 'http-status-codes';

export class ApiError extends Error {
  status: number;

  constructor(status: number) {
    const text = HttpStatus.getStatusText(status);
    super(`Api call failed with http status ${status}: ${text}`);
    this.status = status;
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const API_ENDPOINT = 'https://blockchain.info/rawaddr';
const INVALID_ADDRESS_MESSAGE = 'Invalid Bitcoin Address';
export const API_LIMIT = 50;

type Out = {
  spent: boolean;
  spending_outpoints: {
    tx_index: number;
    n: number;
  }[];
  tx_index: number;
  type: number;
  addr: string;
  value: number;
  n: number;
  script: string;
};

type In = {
  sequence: number;
  witness: string;
  prev_out: Out;
  script: string;
};

type ApiResponse = {
  hash160: string;
  address: string;
  n_tx: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
  txs: {
    ver: number;
    inputs: In[];
    weight: number;
    block_height: number;
    relayed_by: string;
    out: Out[];
    lock_time: number;
    result: number;
    size: number;
    block_index: number;
    time: number;
    tx_index: number;
    vin_sz: number;
    hash: string;
    vout_sz: number;
  }[];
};

export const getRawAddressInfo = (addr: string, page: number): Promise<ApiResponse> => {
  const cacheKey = `${addr}:${page}`;
  const cachedResponse = cache.get(cacheKey) as ApiResponse;

  console.log({ cacheKey, res: Boolean(cachedResponse) });

  if (cachedResponse) {
    console.log('returning address data from cache');
    return Promise.resolve(cachedResponse);
  }

  const offset = page * API_LIMIT;

  console.log({ url: `${API_ENDPOINT}/${addr}`, params: { offset } });

  return axios
    .get(`${API_ENDPOINT}/${addr}`, { params: { offset } })
    .then(({ data }) => cache.put<ApiResponse>(cacheKey, data, 5 * 3600 * 1000))
    .catch((err: AxiosError) => {
      if (err.isAxiosError && err.response) {
        if (err.response.status === HttpStatus.TOO_MANY_REQUESTS)
          return Promise.reject(new ApiError(HttpStatus.TOO_MANY_REQUESTS));

        if (err.response.status === HttpStatus.INTERNAL_SERVER_ERROR && err.response.data === INVALID_ADDRESS_MESSAGE)
          return Promise.reject(new ApiError(HttpStatus.NOT_FOUND));
      }
      return Promise.reject(err);
    });
};
