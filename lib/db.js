import { Client } from 'pg';
//import { ServiceError } from './errors';

async function query(queryObject, params) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject, params);
    return result;
  } catch (error) {
    /*const serviceErrorObject = new ServiceError({
      message: 'Erro na conexão com o Banco ou na Query.',
      cause: error,
    });*/
    //throw serviceErrorObject;
  } finally {
    await client?.end();
  }
}

async function getNewClient() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

const db = {
  query,
  getNewClient,
};

export default db;

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === 'production' ? true : false;
}
