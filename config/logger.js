import winston from 'winston';
import winstondb from 'winston-mongodb';

import { db } from '../models/index.js';

const { combine, timestamp, label, printf } = winston.format;
const { createLogger, transports, format } = winston;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: 'info',
      db: db.url,
      collection: 'logs',
      capped: true,
      cappedMax: 20,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: format.combine(
    label({ label: 'Grade-Api' }),
    format.timestamp(),
    myFormat
  ),
});

export { logger };
