<i18n>
{
  "en":{
    "heading": "Welcome to MERHAV",
    "vision": "A new way to keep in touch with your pupils."
  },
  "he":{
    "heading": "ברוכים הבאים למרח\"ב",
    "vision": "דרך חדשה לתקשר עם התלמידים שלך"    
  }
}
</i18n>


<template>
  <div class="home">
    <h1>{{$t('heading')}}</h1>
    <h2>
     {{$t('vision')}}
    </h2>
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
