<script></script>
<div class="full1">
    <div class="bruh1">
        <span class="full">You can call me chidam </span>
        <span class="sdev">You can call me chidam </span>
    </div>
    <div class=par3>
        <a href="http://www.github.com/chidam333" class="btnft1" role="button" target=_blank>All works</a>
        <a href="http://www.twitter.com/chidam333" class="btnft2" role="button" target=_blank>Twitter </a>
        <div class="pay"><form> <script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_JQ0UuD1pt8oSUM" async> 
        </script> 
        </form></div>
    </div>
</div>
    


<style>
    .bruh1{
        position: fixed;
        left: 50%;
        bottom: 50%;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        overflow-x: hidden;
    }
    .sdev{
        display: none;
    }
    .pay{
        grid-area: 2/1/3/3;
        margin-top: 10%;
    }
    .par3{
        position: absolute;
        top: 50vh;
        left: 35vw;
        display: grid;
        place-items: center;
        width: 30vw;
        height: 10vh;
    }
    .par3{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: repeat(2,1fr);
    }
    .par3 a{
        text-decoration: none;
    }
    .btnft1{
        background: rgb(155, 84, 4);
        padding: 2% 3%;
        border-radius: 15px ;
        color: wheat;
        box-shadow: 5px 5px 2px black;
        font-family: "roboto";
        text-transform: lowercase;
        border: 1px solid black;
        transition: box-shadow 0.5s ease;
        width: 80%;
        height: 100%;
        display: grid;
        place-items: center;
    }
    .btnft1:hover{
        background: black;
        color: rgb(236, 191, 106);
        box-shadow: 10px 5px 2px rgb(155, 84, 4);
    }
    .btnft2{
        background: rgb(240, 200, 125);
        padding: 2% 3%;
        border-radius: 15px ;
        color: rgb(155, 84, 4);
        box-shadow: 5px 5px 2px black;
        font-family: "roboto";
        text-transform: lowercase;
        border: 1px solid black;
        transition: box-shadow 0.5s ease;        
        width: 80%;
        height: 100%;
        display: grid;
        place-items: center;
        width: 80%;
        height: 100%;
        display: grid;
        place-items: center;
    }
    .btnft2:hover{
        background: black;
        color: rgb(236, 191, 106);
        box-shadow: 10px 5px 2px rgb(155, 84, 4);
    }
    .full1{
        background: rgb(235, 168, 45);
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        overflow: hidden;
    }
    .full{
        color: rgb(126, 34, 0);
        list-style-type: none;
        font-family: "codercoder";
        text-transform: uppercase ;
        font-weight: 900;
        font-size: 2rem;
        letter-spacing: 0.3rem;
        position: relative;
    }
    .full::before   {
        content: "";
        position: absolute;
        left: 0%;
        height: 100%;
        width:100%;
        background: rgb(235, 168, 45);
        border-left: 3px solid black ;
        animation: typing 5s steps(35) infinite;
    }
    @media screen and (max-width:1493px) {
        .btnft1,.btnft2{
            margin-top: 20%;
            height: 5vh;
        }
    }
    @media screen and (max-width:1142px) {
        .full{
            font-size: 1.5rem;
        }
        .btnft1,.btnft2{
            margin-top: 30%;
            height: 3vh;
        }
    }
    @media screen and (max-width:882px) {
        .full{
            font-size: 1.2rem;
        }
        .btnft1,.btnft2{
            margin-top: 30%;
            height: 3vh;
        }
    }
    @media screen and (max-width:740px) {
        .full{
            display: none;
        }
        .sdev{
            display: inline;
            color: rgb(155, 84, 4);
            font-size: 1.5rem !important;
            font-family: "roboto";
            padding-bottom: 50%;
        }
    }
    @media screen and (max-width:546px) {

        .sdev{
            display: inline;
            color: rgb(155, 84, 4);
            font-size: 1rem !important;
            font-family: "roboto";
            padding-bottom: 50%;
        }
        .btnft1,.btnft2{
            font-size: 0.7rem;
        }
    }
    @keyframes typing{
        60%{
            left:100%;
        }
        80%{
            left:100%;
        }
        100%{
            left:0%;
        }
    }
</style>
