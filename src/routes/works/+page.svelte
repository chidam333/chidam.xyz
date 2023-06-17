<script>
    import { onMount } from 'svelte';
	import { active } from '../../stores.js';
    onMount(()=>{
        $active.fill(false)
        $active[1]=true
    })
    let display =false
    const titles=[
        "Sorting Algorithim visualizer",
        "Vartalap DAPP",
        "movieso DAPP"]
    const link=[
        "https://visualize.chidam.xyz",
        "https://vartalap.chidam.xyz",
        "https://movieso.chidam.xyz"
    ]
    const desc=[
        "An interactive site with animated sorting algo visualisation",
        "An app where you can make multiple accounts and save data modularly and access based on account id from solana blockchain",
        "Project which made us win daksh hackathon it rewards nft as rewards for booking ticket which can be redeemed"
    ]
</script> 
<main>
    <div class="tit ml-6 lg:ml-12 mt-8 text-amber-100 font-bold text-xl">Some of the works</div>
    <ul class="mt-8">
        {#each titles as metadata,i}
            <!-- {#if i==0}
                <li class="ml-6 lg:ml-12 text-amber-300"><span class="text-amber-600 font-extrabold border-b-2  border-amber-300 cursor-pointer" on:click={()=>{display = (display==false) ? true : false}}>{metadata}</span> : {desc[i]}</li>
                {#if display}
                    <iframe class="w-full h-screen bg-slate-300 lg:ml-12 mt-4" src={link[0]} frameborder="5" title=""></iframe>
                {/if}
            {:else} -->
                <li class="ml-6 lg:ml-12 mt-2 text-amber-300"><a class="text-amber-600 font-extrabold border-b-2  border-amber-300 cursor-pointer" href={link[i]} target="_blank">{metadata}</a> : {desc[i]}</li>
            <!-- {/if} -->
        {/each}    
    </ul>
    <div class="allwork  ml-6 lg:ml-12 mt-8 font-semibold  grid place-items-center"><a href="https://docs.google.com/spreadsheets/d/1AFjJyJ9xJOUGeoZA2tyQHB7QS45KQvOwFtZxgnsHGQU/" target="_blank" class="ok pl-2 pr-2 w-fit bg-white border-4 border-black">all works</a></div>
</main>
<style>
    /* iframe::-webkit-scrollbar-track{
        color: black;
        background: brown;
    } */
    .allwork{
        font-family: 'Playfair Display', serif;
    }
    ul li{
        font-family: 'Roboto', sans-serif;
    }
</style>