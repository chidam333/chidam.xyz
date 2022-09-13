<script>
    import "../app.css";
    import Automata from "./automata/+page.svelte";
    import Works from "./works/+page.svelte";
    import Content from "./content/+page.svelte";
    let cur = 0;
    let active = [true,false,false,false,false]
    const nav=["about","works","automata","content","handles"]
    const navclickhandle = (i)=>{
        console.log(i)
        cur=i
        cur=nav[i]
        active.fill(false)
        active[i]=true
    }
</script>
<main class="bg-neutral-900 min-h-screen relative">
    <div class="content lg:mx-40  h-full">
        <div class="imgdalle h-60 overflow-y-hidden relative" title="Dall-e-2 img: Highly detailed Thanjavur painting of crowd attracted towards a  a builder demonstrating his product in expo ,set in modern day">
            <img src="/1.png" alt="Highly detailed Thanjavur painting of crowd attracted towards a  a builder demonstrating his product in expo ,set in modern day" class="absolute imgdalle w-full lg:-top-80 z-0">
            <div class="overlay h-full w-full absolute bg-gradient-to-b from-transparent to-neutral-900"></div>
        </div>
        <nav>
            <ol class="list-none text-yellow-700 flex ml-6 text-xs md:text-lg lg:text-2xl gap-8 lg:gap-12 lg:ml-12 mt-4 cursor-pointer">
                {#each nav as navitem,i}
                    {#if navitem=="about"}
                        <a href="/"><li class:active={active[i]} on:click={()=>{navclickhandle(i)}}>about</li></a>
                    {:else}
                    <a href="/{navitem}"><li class:active={active[i]} on:click={()=>{navclickhandle(i)}}>{navitem}</li></a>            
                    {/if}
                {/each}
            </ol>
        </nav>
        <slot/>
        <footer>
            <div class="ok fixed bottom-4">
                <div class="con text-stone-700 font-medium ml-6 lg:ml-12">build using sveltekit, tailwind, postgres</div>
                <div class="con text-stone-700 font-medium ml-6 lg:ml-12">deployed on vercel, railway.app</div>
            </div>
        </footer>
</main>
<style>
    .active{
        color: rgb(252, 194, 87);
    }
    nav ol li{
        font-family: 'Playfair Display', serif;
    }
</style>
