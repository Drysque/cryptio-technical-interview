import { Router } from 'express';
import HttpStatus from 'http-status-codes';

import { getRawAddressInfo, ApiError, API_LIMIT } from './remote_api';

const router = Router();

router.get('/address', (req, res) => {
  const { a: addr } = req.query;

  if (typeof addr !== 'string') return res.sendStatus(HttpStatus.BAD_REQUEST);

  console.log({ addr });

  return getRawAddressInfo(addr)
    .then((rawInfo) => {
      const { txs, ...info } = rawInfo;
      return res.send(info);
    })
    .catch((err: Error) => {
      if (err instanceof ApiError) return res.status(err.status).send(err.message);
      console.error(err);
      return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});

router.get('/transactions', (req, res) => {
  const { a: addr, p, pg } = req.query;

  if (typeof addr !== 'string') return res.sendStatus(HttpStatus.BAD_REQUEST);

  const page = typeof p === 'undefined' ? 0 : +p;
  if (isNaN(page) || page < 0) return res.sendStatus(HttpStatus.BAD_REQUEST);

  const pagination = typeof pg === 'undefined' ? 10 : +pg;
  if (isNaN(pagination) || pagination <= 0 || pagination > API_LIMIT) return res.sendStatus(HttpStatus.BAD_REQUEST);

  const offset = (page % (API_LIMIT / pagination)) * pagination;
  console.log({
    addr,
    page,
    pagination,
    remote_page: Math.floor(page / (API_LIMIT / pagination)),
    start: offset,
    end: offset + pagination,
  });

  return getRawAddressInfo(addr, Math.floor(page / (API_LIMIT / pagination)))
    .then((rawInfo) => {
      const { txs } = rawInfo;
      return res.send(txs.slice(offset, offset + pagination));
    })
    .catch((err: Error) => {
      if (err instanceof ApiError) return res.status(err.status).send(err.message);
      console.error(err);
      return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});

export default router;
