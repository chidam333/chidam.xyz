<script>
	import { routes } from 'svelte-hash-router';
	import Navbar from "./Navbar.svelte";
	import Home from "./Home.svelte";
	import Projects from "./Projects.svelte";
	import Contact from "./Contact.svelte";
	import Extra from "./Extra.svelte";
	import Material from "./Material.svelte"
	routes.set({
	'/': Home,
	'/project': Projects,
	'/contact':Contact,
	'/material':Material,
	'/extra':Extra,
	})
</script>

<main>
	<Navbar/>
</main>

<style>
	:root::-webkit-scrollbar{
		width: 0.5rem;
	}
	:root::-webkit-scrollbar-track{
		background: rgba(0, 0, 0,1);
	}
	:root::-webkit-scrollbar-thumb{
		background:rgb(150, 80, 0);
	}
</style>