<script>
    import "../app.css";
    import Works from "./works/+page.svelte";
    import {active} from "../stores"
    import { onMount } from "svelte";
    const nav=["about","works","handles"]
    const navclickhandle = ()=>{
        $active.fill(false)
    }
    onMount(()=>{
        const imgsrc=document.querySelector("#thanjavur")
        imgsrc.src=imgsrc.dataset.src
    })
</script>
<main class="bg-neutral-900 min-h-screen relative">
    <div class="content lg:mx-40  h-full">
        <div class="imgdalle h-60 overflow-y-hidden relative" title="Dall-e-2 img: Highly detailed Thanjavur painting of crowd attracted towards a  a builder demonstrating his product in expo ,set in modern day">
            <img data-src="/opti1.png" id="thanjavur" alt="Highly detailed Thanjavur painting of crowd attracted towards a  a builder demonstrating his product in expo ,set in modern day" class="absolute imgdalle w-full lg:-top-80 z-0">
            <div class="overlay h-full w-full absolute bg-gradient-to-b from-transparent to-neutral-900"></div>
        </div>
        <nav>
            <div class="list-none text-yellow-700 flex ml-4 md:ml-6 text-base md:text-lg lg:text-2xl gap-4 md:gap-8 lg:gap-12 lg:ml-12 mt-4 cursor-pointer">
                {#each nav as navitem,i}
                    {#if navitem=="about"}
                    <a href="/"><span class:active={$active[i]} on:click={()=>{navclickhandle()}}>about</span></a>
                    {:else}
                    <a href="/{navitem}"><span class:active={$active[i]} on:click={()=>{navclickhandle()}}>{navitem}</span></a>            
                    {/if}
                {/each}
            </div>
        </nav>
        <slot/>
        <footer>
            <div class="ok fixed">
                <div class="con text-stone-700 font-medium ml-6 lg:ml-12">build using sveltekit, tailwind, postgres</div>
                <div class="con text-stone-700 font-medium ml-6 lg:ml-12">deployed on vercel & neon</div>
            </div>
        </footer>
</main>
<style>
    .ok{
        top: 90vh;
    }
    .active{
        color: rgb(252, 194, 87);
    }
    nav ol li{
        font-family: 'Playfair Display', serif;
    }
    a:focus{
        background: transparent;
    }
</style>
