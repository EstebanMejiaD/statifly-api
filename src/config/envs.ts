import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  USER_SECRET: string;
  KEY_SECRET: string;
  SSH_SECRET_KEY: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    USER_SECRET: joi.string().required(),
    KEY_SECRET: joi.string().required(),
    SSH_SECRET_KEY: joi.string().length(32).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  jwtSecret: envVars.JWT_SECRET,
  userSecret: envVars.USER_SECRET,
  keySecret: envVars.KEY_SECRET,
  sshSecretKey: envVars.SSH_SECRET_KEY,
};
