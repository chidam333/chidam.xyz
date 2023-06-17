<script>
    import { onMount } from 'svelte';
	import { active } from './../stores.js';
    onMount(()=>{
        console.log($active)
        $active[0]=true
    })
    let click =false;
    let clickcount=0;
    let chidam =false;
    let uni =false;
    let build = false;
    let cartophile =false;
    let wave=false;
    let observe=false;
    let alerttrue = false;
</script>
<main>
    <div class="clk mt-12"></div>
    {#if clickcount==1}
        <span class="ml-6 lg:ml-12" on:click={()=>{clickcount+=1;click = (clickcount==2) ? true:false;}}>Becuase things expand ! ➕</span>
    {/if}    
    {#if clickcount==0 || clickcount ==1}
        <div class="clickhere text-amber-400 ml-6 lg:ml-12 cursor-pointer" on:click={()=>{clickcount+=1;click = (clickcount==2) ? true:false;}} class:nobuild={click}>Click here....</div>
    {/if}
    {#if click}
        <div class="click" >
            <div class="pre text-amber-200 ml-6 lg:ml-12 text-lg">Helloo ! call me <span on:click={()=>{(chidam = (chidam==false) ? true :false)}}>chidam&nbsp;</span><span class:build={build} class:nobuild={!build} ><img src="/build.svg" style="height:14px; width:20px; margin:0% !important;" alt="builder svg"></span><span class:build={cartophile} class:nobuild={!cartophile}><img src="/india.svg" alt="indian svg" style="height: 14px;"></span><span class:build={wave} class:nobuild={!wave}><img src="/wave.svg" alt="wave svg" style="height: 20px;"></span><span class:build={observe} class:nobuild={!observe}><img src="/observe.svg" alt="observation" style="height:20px ;"></span><span class:chidam={chidam}></span>
            <br style="color: wheat;"/>
            <div>I am currently a sophomore in <span class:uni={uni} on:click={()=>{uni = (uni==false) ? true : false}}> sastra university</span> .
            A <span on:click={()=>{build = (build==false) ? true : false}}>builder</span> from heart . <span class:cartophile={cartophile} on:click={()=>{cartophile = (cartophile==false) ? true : false}}>Cartophile</span>
            at times , just <span on:click={()=>{wave= (wave==false) ? true : false}}>flowing</span> and <span on:click={()=>{observe=(observe==false) ? true : false}}>observing</span> the other times .
            </div>
            </div>
        </div>
    {/if}
    {#if click}
        <div class="sec flex">
            <a href="https://twitter.com/Chidam333" target="_blank"><div class="mb-4 font-light ml-6 lg:ml-12 mt-4 text-amber-200 bg-zinc-700 p-1 flex"><img src="/twitter.png" alt="twitter" style="height: 22px;">&nbsp;twitter</div></a>
            <a href="https://github.com/chidam333" target="_blank"><div class="mb-4 font-light ml-6 lg:ml-12 mt-4 text-amber-200 bg-zinc-700 p-1 flex "><img src="./github.png" alt="github" style="height: 24px;">&nbsp; github</div></a>
        </div>
    {/if}
</main>
<style>
    .clickhere,.sec{
            font-family: 'Roboto', sans-serif;
    }
    .nobuild{
        display: none;
    }
    .build{
        display: inline-block;
    }
    .cartophile:after{
        content: " (lmao 😂 not sure it is normal but i spend hours sometimes staring at map lol)";
        color: #fde68a;
    }
    .uni:after{
        content: " , it is situated in trichy-thanjavur highway a good enough college ";
        color: #fde68a;
    }
    .chidam:after{
        content: " , it's an alias for chidambaranathan, i am named after my grandfather that's a family tradition ";
        color: #fde68a;
    }
    span{
        color: rgb(234, 167, 42);
        cursor: pointer;
    }
    span:hover{
        border-bottom: 3px solid wheat;
        /* border-top: 3px solid wheat; */
    }
    .pre{        
        font-family: 'Roboto', sans-serif;
    }
</style>