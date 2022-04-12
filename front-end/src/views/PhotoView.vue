<template>
<div class="photo">
  <section v-if="user">
    <img :src="photo.path" />
    <div class="photoInfo">
      <p class="photoTitle">{{photo.title}}</p>
      <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
    </div>
    <p class="photoDate">{{formatDate(photo.created)}}</p>
    <p class="photoDesc">{{photo.description}}</p>
  </section>
  <Login v-else />
</div>
</template>

<script>
import Login from '@/components/Login.vue';
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'photo-view',
  data() {
    return {
      photoId: '',
      photo: null
    }
  },
  components: {
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
      this.photoId = this.$route.params.id;
      this.getPhoto(this.photoId);
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async getPhoto(id) {
      try {
        const response = await axios.get(`/api/photos/${id}`);
        this.photo = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
.photo {
  padding-top: 10px;
}

.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}
</style>
