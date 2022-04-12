<template>
<div>
  <div class="photoWrapper" v-if="photo">
    <img :src="photo.path" />
    <div class="photoInfo">
      <p class="photoTitle">{{photo.title}}</p>
      <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
    </div>
    <p class="photoDate">{{formatDate(photo.created)}}</p>
    <p class="photoDesc">{{photo.description}}</p>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'PhotoComponent',
  data() {
    return {
      photo: null
    }
  },
  created() {
    this.getPhoto(this.photoId);
  },
  props: {
    photoId: String
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
