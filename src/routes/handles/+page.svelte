<script>
    let alertstuff=false;
</script>
<main>
    <div class="head text-amber-400 font-bold text-center mt-8 mb-8">Let's connect </div>
    <div class="form grid justify-items-center">
        <form method="POST" class="grid" on:submit={()=>{alertstuff=true}}>
            <label for="name" class="text-amber-400 mb-2 flex border-2 border-amber-900"><div class="sty bg-black w-fit grid place-items-center pl-2 border-r-4 border-r-amber-700">NAME&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp&nbsp;</div><input placeholder="Chidam" name="name" type="text" class=" w-48 md:w-60 lg:w-96 pl-2" required></label>
            <label for="email" class="text-amber-400 mb-2  flex border-2 border-amber-900"><div class="sty bg-black w-fit grid place-items-center pl-2 border-r-4 border-r-amber-700">EMAIL:&nbsp;&nbsp;&nbsp;&nbsp&nbsp;</div><input placeholder="dev@chidam.xyz" type="email" name="email" id="email" class="w-48 md:w-60 lg:w-96 pl-2" required></label>
            <label for="cont" class="text-amber-400 mb-2  flex border-2 border-amber-900"><div class="sty bg-black w-fit grid place-items-center pl-2 border-r-4 border-r-amber-700">MSG:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><input placeholder="Postgres is waiting for your message" type="text" class="pl-2 w-48 md:w-60 lg:w-96 resize-y" name="content" id="cont"></label>
            <input type="submit" value="submit" class="bg-amber-300 mx-auto px-4 border-2 border-amber-700 mt-4 mb-8">
        </form>
    </div>
    {#if alertstuff}
        <div class="alert bg-lime-500 w-full mx-12"> does it work for real though</div>
    {/if}
    <div class="sec grid grid-flow-col justify-center gap-8">
        <a href="https://twitter.com/Chidam333" target="_blank"><div class="mb-4 mt-4 text-black font-bold bg-zinc-700 p-1 flex border-2 border-white"><img src="/twitter.svg" alt="twitter">&nbsp;twitter</div></a>
        <a href="https://github.com/chidam333" target="_blank"><div class="mb-4 mt-4 text-black font-bold bg-zinc-700 p-1 flex border-2 border-white "><img src="./github.png" alt="github" style="height: 24px;">&nbsp; github</div></a>
    </div>
</main>
<style>
    .head{
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