interface IConfig {
  PORT: number;
  NODE_ENV: string;
  DATABASE_URL: string;
  API_KEY: string;
}

export const config: IConfig = {
  PORT: parseInt(process.env.PORT || '8000'),
  DATABASE_URL: String(process.env.DATABASE_URL),
  NODE_ENV: String(process.env.NODE_ENV),
  API_KEY: String(process.env.API_KEY),
};
