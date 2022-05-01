<script>
    
</script>
    <!--Contact form-->
    <section class="chidam" id="chidam">
    <form action="https://formspree.io/f/xwkadaqo" method="post">
                <h3> Please Let Me Know </h3>
                <div class="gp1">
                    <input type="name" class="form-control btn0" name="name" placeholder="Your name" >
                    <input type="email" class="form-control btn1" name="_replyto" placeholder="Your email">
                </div>
                <div class="gp2">
                    <textarea id="btn2" name="msg" rows="2" cols="85" class="form-control" placeholder="Say something 🙊 please !"></textarea>
                    <button class="btn text-center" type="submit" value="submit">SUBMIT</button>
                </div>
                <br>
                <div class="gp3">
                    <span><a href="https://www.linkedin.com/in/chidam333/" target="_blank" ><img src="https://img.icons8.com/clouds/100/000000/linkedin.png" alt="linked-account"/></a>
                    <a target="_blank" href="https://www.twitter.com/chidam333"><img src="https://img.icons8.com/clouds/100/000000/twitter.png" alt="twitter-account"/></a>
                    <a target="_blank" href="https://github.com/chidam333"><img src="https://img.icons8.com/clouds/100/000000/github.png" alt="github-account"/></a></span>
                </div>
    </form>
    </section>
<style>
    .chidam{
        display: grid;
        min-height: 100vh;
        background: linear-gradient(48deg, rgb(54, 29, 0) 18%, rgb(190, 118, 9) 51%, rgba(247,203,76,1) 75%);
        place-items: center;
    }
    .chidam input,textarea{
        color: black;
        font-family: roboto;
        font-weight: 900;
    }
    .chidam h3{
        color: rgb(51, 14, 0);
        font-family: "ele";
        text-transform: lowercase;
        font-size: 40px;
        text-align: center;
        letter-spacing: 0.2rem;
    }
    .gp1{
        display: grid;
        gap: 0rem;
        grid-template-columns: 1fr 1fr;
        height: 40px;
    }
    .gp2{
        display: grid;
        gap: 0rem;
        grid-template-columns: 80vh 20vh;
        height: 40px;
    }
    .gp2 button{
        background: black;
        color: wheat;
        font-family: "roboto" ;
        border: 3px solid wheat;
    }
    .gp2 button:hover{
        background: rgb(247, 187, 76);
        color: black;
        font-family: "roboto" ;
        border: 3px solid black;
    }
    .gp3{
        display: grid;
        justify-content: center;
    }
</style>