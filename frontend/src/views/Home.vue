<i18n>
{
  "en":{
    "heading": "Welcome to MERHAV",
    "vision": "A new way to keep in touch between pupils and teachers."
  },
  "he":{
    "heading": "ברוכים הבאים למרח\"ב",
    "vision": "דרך חדשה לתקשורת בין מורים לתלמידים"    
  }
}
</i18n>


<template>
  <div class="home">
    <h1>{{$t('heading')}}</h1>
    <h2>
     {{$t('vision')}}
    </h2>
    <img class="home-img" src="@/assets/img/home-img.jpg" alt="Kids and teacher at nature" srcset="">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  }
};
</script>
