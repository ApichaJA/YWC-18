<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components:{
    Navbar
  }
}
</script>

<style>

@font-face {  
  font-family: Korfontna;
  src: url('./assets/fonts/Korfontna.ttf');
}

#app {
  font-family: Korfontna;
  text-align: center;
  color: #000;
}

body{
  background-image: url('./assets/klk-bg.png');
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

}

</style>
