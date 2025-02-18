import {POSTGRES_URL} from '$env/static/private'
import { users } from './schema';
//PostgresJsDatabase is the type for db instance for future migration just in case
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
export async function handle({ event, resolve }) {
    const sqlClient = postgres(POSTGRES_URL);
    const db = drizzle(sqlClient)
    event.locals = {
        db:db
    }
    const response = await resolve(event);
    return response;
}