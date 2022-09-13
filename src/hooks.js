import postgres from 'postgres'
import 'dotenv/config'
/** @type {import('@sveltejs/kit').Handle} */
const urlo=process.env.POSTGRES_URL
export async function handle({ event, resolve }) {
    const sql = postgres(urlo);
    event.locals = {
        sql:sql
    }
    const response = await resolve(event);
    return response;
}
