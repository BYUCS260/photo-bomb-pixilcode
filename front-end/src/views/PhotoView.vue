<template>
<div class="photo">
  <Photo v-if="user" :photo-id="photoId" />
  <Login v-else />
</div>
</template>

<script>
import Photo from '@/components/Photo.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';

export default {
  name: 'dashboard-view',
  data() {
    return {
      photoId: ''
    }
  },
  components: {
    Photo,
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
      this.photoId = this.$route.params.id;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>
.photo {
  padding-top: 10px;
}
</style>
