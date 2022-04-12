<template>
<div class="photo">
  <img :src="photo.path" />
  <div class="photoInfo">
    <p class="photoTitle">{{photo.title}}</p>
    <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
  </div>
  <p class="photoDate">{{formatDate(photo.created)}}</p>
  <p class="photoDesc">{{photo.description}}</p>
  <div class="comment" v-for="comment in comments" :key="comment._id">
    <hr>
    <p class="commentText">{{comment.comment}}</p>
    <p class="commentName">{{comment.user.firstName}} {{comment.user.lastName}}</p>
    <p class="commentDate">{{formatDate(comment.date)}}</p>
  </div>
  <section v-if="user">
    <textarea v-model="addComment"></textarea>
    <button @click="submitComment">Submit</button>
    <p v-if="error">{{error}}</p>
  </section>
</div>
</template>

<script>
import moment from 'moment'; import axios from 'axios';
export default {
  name: 'photo-view',
  data() {
    return {
      photoId: '',
      photo: null,
      addComment: '',
      error: null,
      comments: []
    }
  },
  async created() {
    this.photoId = this.$route.params.id;
    this.getPhoto(this.photoId);
    try {
      let response = await axios.get(`/api/comments/${this.photoId}`)
      this.comments = response.data;

      response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;

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
    async submitComment() {
      try {
        await axios.post('/api/comments', {
          comment: this.addComment,
          photo: this.photo
        });
        this.comments.push({
          user: this.user,
          comment: this.addComment,
          photo: this.photo,
          date: Date.now()
        });

        this.addComment = '';
      } catch (error) {
        this.error = "Error: " + 'There was an error processing your comment. Please try again later';
      }
    }
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

.commentName {
  font-size: 0.8em;
  font-weight: normal;
}

.photoDate, .commentDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}
</style>
