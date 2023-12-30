<script>
    // import shadow from '$static/img/shadow-one.png'
    export let id
    export let type
    export let classs

    let src=`../img/shadow-${type}.png`
</script>

<img src={src} alt="Palm tree branch shadow" id={id} class={classs}/>

<style>
    
    img {
        position: absolute;
    }

    #shadow-header {
    left: -6vw;
    top: -13vh;
    width: 50vw;
    max-width: 400px;
 }

 #shadow-hero {
    right: -20vw;
    bottom: -100px;
    transform: rotate(180deg) scale(1, -1);
 }

 #shadow-home-menu-1 {
    left: -20vw;
    top: 5vh;
    /* max-width: 400px; */
    transform: rotate(210deg) scale(-1, 1);
 }

  #shadow-home-menu-2 {
      right: -30vw;
      top: 40vh;
      transform: rotate(255deg) scale(1, -1);
  }

</style>