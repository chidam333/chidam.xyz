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
    // newest first; date = date of authorship (YYYY-MM-DD)
    const blogs=[
        {title:"Luna decision model is 20x costlier than Jev", link:"/blog/decision-model-pricing/", date:"2026-11-10"},
    ]
    const prettyDate = d => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
</script>
<main class="pb-24">
    <ul class="mt-8">
        {#each works as item}
            <li class="ml-6 lg:ml-12 mt-2 text-amber-300"><a class="text-amber-600 font-extrabold border-b-2  border-amber-300 cursor-pointer" href={item.link} target="_blank">{item.title}</a> : {item.desc}</li>
        {/each}
    </ul>
    <h2 class="ml-6 lg:ml-12 mt-10 text-amber-200 text-lg">blogs</h2>
    <ul class="mt-2">
        {#each blogs as post}
            <li class="ml-6 lg:ml-12 mt-2 text-amber-300"><a class="text-amber-600 font-extrabold border-b-2 border-amber-300 cursor-pointer" href={post.link} data-sveltekit-reload>{post.title}</a> <time class="text-sm text-stone-500" datetime={post.date}>· {prettyDate(post.date)}</time></li>
        {/each}
    </ul>
    <div class="allwork ml-6 lg:ml-12 mt-10 flex flex-wrap items-center gap-3">
        <a href="/resume" target="_blank" data-sveltekit-reload class="text-sm font-semibold text-amber-400 border border-amber-400 px-2 py-1 hover:text-amber-200 hover:border-amber-200">resume ↗</a>
        <a href="https://docs.google.com/spreadsheets/d/1AFjJyJ9xJOUGeoZA2tyQHB7QS45KQvOwFtZxgnsHGQU/" target="_blank" class="text-sm text-stone-500 border border-stone-700 px-2 py-1 hover:text-stone-300 hover:border-stone-500">older projects ↗</a>
    </div>
</main>
<style>
    .allwork{
        font-family: 'Playfair Display', serif;
    }
    ul li, h2{
        font-family: 'Roboto', sans-serif;
    }
</style>
