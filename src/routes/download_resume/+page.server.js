import { redirect } from "@sveltejs/kit"
/** @type {import('./$types').PageLoad} */
export async function load() {
    throw redirect(301,'/download_resume.pdf')
}