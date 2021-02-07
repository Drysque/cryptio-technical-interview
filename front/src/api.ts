import axios, { AxiosResponse } from 'axios';
import * as env from 'env-var';

const API_ENDPOINT = env.get('API_ENDPOINT').asUrlString() || 'http://localhost:8080';

export type Out = {
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

export type InfoResponse = {
  hash160: string;
  address: string;
  n_tx: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
};

export type Transaction = {
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
};

export type TransactionResponse = Transaction[];

export const getHealth = (): Promise<void> =>
  axios
    .get(`${API_ENDPOINT}/health`)
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err));

export const getAddressInfo = (addr: string): Promise<AxiosResponse<InfoResponse>> =>
  axios.get(`${API_ENDPOINT}/crypto/address`, { params: { a: addr } });

export const getAddressTransaction = (
  addr: string,
  page: number,
  pagination: number,
): Promise<AxiosResponse<TransactionResponse>> =>
  axios.get<TransactionResponse>(`${API_ENDPOINT}/crypto/transactions`, {
    params: { a: addr, p: page, pg: pagination },
  });
