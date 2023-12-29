<script>
    // import shadow from '$static/img/shadow-one.png'
    export let id
    export let type

    let src=`../img/shadow-${type}.png`
</script>

<img src={src} alt="Palm tree branch shadow" id={id}/>

<style>
    
    img {
        position: absolute;
    }
</style>