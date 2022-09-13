import postgres from 'postgres'
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const sql = postgres('postgresql://postgres:va91rv4FLOc8xixce5LE@containers-us-west-83.railway.app:6434/railway');
    event.locals = {
        sql:sql
    }
    const response = await resolve(event);
    return response;
}
