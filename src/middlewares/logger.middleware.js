import { formatStringDate } from '../shared/services/utils.service.js';

export const logRequest = (req, _, next) => {
  console.log(`${formatStringDate(new Date().toISOString())} - Received a ${req.method} request from ${req.ip} to the ${req.originalUrl} path with the next params: ${JSON.stringify(req.params)} and the next body: ${JSON.stringify(req.body)}`);
  next();
};