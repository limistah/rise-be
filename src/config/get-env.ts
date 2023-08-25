export function getEnvFileName(): string {
  const ENV = process.env.NODE_ENV || '';

  const basePath = process.cwd();
  if (isProductionOrNotSet(ENV)) {
    return `${basePath}/.env`;
  }
  return `${basePath}/${ENV}.env`.trim();
}

function isProductionOrNotSet(ENV: string): boolean {
  return !ENV || ['prod', 'production'].includes(ENV);
}
