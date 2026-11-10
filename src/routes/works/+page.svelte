<script>
    import { onMount } from 'svelte';
	import { active } from '../../stores.js';
    onMount(()=>{
        $active.fill(false)
        $active[1]=true
    })
    const works=[
        {title:"prometheus/client_js", link:"https://github.com/prometheus/client_js/pull/742", desc:"perf: switched to the faster API for collecting RSS memory"},
        {title:"CCExtractor", link:"https://github.com/CCExtractor/ccextractor/pull/1518", desc:"added support for 2, 3 and 4 byte UTF-8 characters in WebVTT"},
        {title:"DiceDB JS client", link:"https://github.com/chidam333/dicedb-js", desc:"an async JavaScript client for DiceDB, a reactive Redis-inspired DB"},
    ]
</script>
<main class="pb-24">
    <ul class="mt-8">
        {#each works as item}
            <li class="ml-6 lg:ml-12 mt-2 text-amber-300"><a class="text-amber-600 font-extrabold border-b-2  border-amber-300 cursor-pointer" href={item.link} target="_blank">{item.title}</a> : {item.desc}</li>
        {/each}
    </ul>
    <div class="allwork ml-6 lg:ml-12 mt-10"><a href="https://docs.google.com/spreadsheets/d/1AFjJyJ9xJOUGeoZA2tyQHB7QS45KQvOwFtZxgnsHGQU/" target="_blank" class="text-sm text-stone-500 border border-stone-700 px-2 py-1 hover:text-stone-300 hover:border-stone-500">older projects ↗</a></div>
</main>
<style>
    .allwork{
        font-family: 'Playfair Display', serif;
    }
    ul li{
        font-family: 'Roboto', sans-serif;
    }
</style>
