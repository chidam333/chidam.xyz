<script>
    import { enhance,applyAction } from '$app/forms';
      /** @type {import('./$types').PageData} */
    export let data;
    /** @type {import('./$types').ActionData} */
    export let form;
    let name;
</script>
<main>
    <div class="head text-amber-400 font-bold text-center mt-8 mb-8">Let's connect </div>
    <div class="form grid justify-items-center">
        <form method="POST" class="grid" on:enhance>
            <label for="name" class="text-amber-400 mb-2 flex border-2 border-amber-900"><div class="sty bg-black w-fit grid place-items-center pl-2 border-r-4 border-r-amber-700">NAME&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp&nbsp;</div><input placeholder="Chidam" name="name" type="text" class=" w-48 md:w-60 lg:w-96 pl-2" bind:value={name} required></label>
            <label for="email" class="text-amber-400 mb-2  flex border-2 border-amber-900"><div class="sty bg-black w-fit grid place-items-center pl-2 border-r-4 border-r-amber-700">EMAIL:&nbsp;&nbsp;&nbsp;&nbsp&nbsp;</div><input placeholder="dev@chidam.xyz" type="email" name="email" id="email" class="w-48 md:w-60 lg:w-96 pl-2" required></label>
            <label for="cont" class="text-amber-400 mb-2  flex border-2 border-amber-900"><div class="sty bg-black w-fit grid place-items-center pl-2 border-r-4 border-r-amber-700">MSG:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><input placeholder="Postgres is waiting for your message" type="text" class="pl-2 w-48 md:w-60 lg:w-96 resize-y" name="content" id="cont"></label>
            <input type="submit" value="submit" class="bg-amber-300 mx-auto px-4 border-2 border-amber-700 mt-4 mb-8">
        </form>
    </div>
    {#if form?.success}
        <div class="alert bg-lime-600 mb-4 max-w-full mx-12 h-10 font-semibold grid place-items-center rounded-tr-3xl rounded-bl-3xl">Successfully logged in! Welcome back</div>
    {/if}
    <div class="sec grid grid-flow-col justify-center gap-8">
        <a href="https://twitter.com/Chidam333" target="_blank"><div class="mb-4 mt-4 text-amber-200 font-light bg-zinc-700 p-1 flex border-2 border-amber-200"><img src="/twitter.png" alt="twitter" style="height: 24px;">&nbsp;twitter</div></a>
        <a href="https://github.com/chidam333" target="_blank"><div class="mb-4 mt-4 text-amber-200 font-light bg-zinc-700 p-1 flex border-2 border-amber-200 "><img src="./github.png" alt="github" style="height: 24px;">&nbsp; github</div></a>
    </div>
</main>
<style>
    .head,.alert{
        font-family: "Roboto",sans-serif;
    }
    form{
        font-family: 'Playfair Display', serif;
    }
    input{
        font-family: "Roboto", sans-serif;
        font-weight: 900;
        color: black;
    }
</style>