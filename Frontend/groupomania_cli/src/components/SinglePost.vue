<template>
  <div class="post">
    <router-link :to="{ name: 'PostDetails', params: { id: post.id }}">
      <h3> {{ post.title }}</h3>
    </router-link>
      
      <p> {{ snippet }}</p>
      <p> {{ post.url }}</p>
      <p> {{ post.dateContent }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['post'],
  setup(props) {
    const snippet = computed(() => { // faire apparaitre un extrait du texte complet
      return props.post.body.substring(0,20) + '...'
    })
    return { snippet }
  }
}
</script>

<style>

</style>