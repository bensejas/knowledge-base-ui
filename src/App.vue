<template>
  <div id="app">
    <div class="header">
      <i class="fa fa-book logo" aria-hidden="true"></i>
      <span class="title">Knowledge Base</span>
    </div>
    <div class="body">
      <div class="side-bar">
        <input class="search" type="text" placeholder="Search">
        <ul v-if="topics && topics.length">
          <li v-for="topic of topics">
            <router-link :to="{ name: 'Topic', params: { id: topic._id }}">{{topic.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="content">
        <h1>Content Goes Here</h1>
        <p></p>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'app',

    data: () => ({
      topics: [],
      errors: [],
    }),

    // Fetches posts when the component is created.
    created() {
      axios.get('http://localhost:8080/api/topics')
        .then((response) => {
          // JSON responses are automatically parsed.
          this.topics = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      // async / await version (created() becomes async created())
      //
      // try {
      //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
      //   this.posts = response.data
      // } catch (e) {
      //   this.errors.push(e)
      // }
    },
  };
</script>

<style>
  /* http://paletton.com/#uid=33O0u0kuaBaiLJjocE5AxsJCZmp */
  .body {
    display: flex;
  }

  .side-bar {
    border-right: 1px solid #ddd;
    width: 300px;
    display: flex;
    flex-direction: column;
  }

  .side-bar ul {
    text-align: left;
  }

  body {
    margin: 0;
  }

  .logo {
    font-size: 18px !important;
    padding: 0 2px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    height: 30px;
    align-items: center;
    padding: 5px;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }

  .header .title {
    margin-left: 5px;
    font-size: 20px;
    line-height: 1.2em;
  }

  .header img {
    width: 30px;
  }

  .search {
    border-radius: 20px;
    flex: 0 0 auto;
    margin: 20px;
    border: 1px solid #ccc;
    padding: 10px 20px;
  }

  h3 {
    margin-bottom: 4px;
  }

  p {
    margin-top: 4px;
  }
</style>
