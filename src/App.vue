<template>
  <div id="app">
    <div class="header">
      <!--<i class="fa fa-book logo" aria-hidden="true"></i>-->
      <span class="kb-logo">kb</span>
      <span class="title">Knowledge Base</span>
    </div>
    <div class="body">
      <div class="side-bar">
        <h3>Topics</h3>
        <input v-model="search" class="search" type="text" placeholder="Search or Create topics">
        <div class="create-topic-label" v-if="search && notInFilteredList">
          <button class="btn" v-on:click="createTopic">Create Topic: {{ search }}</button>
        </div>

        <div class="topic-menu">
          <ul v-if="topics && topics.length">
            <li v-for="topic of filteredList">
              <router-link :to="{ name: 'Topic', params: { id: topic._id }}">{{topic.name}}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'app',
    computed: {
      filteredList: function () {
        return this.topics.filter(topic => topic.name.toLowerCase().indexOf(this.search && this.search.toLowerCase()) !== -1);
      },
      notInFilteredList: function () {
        return !this.filteredList.filter(topic => topic.name.toLowerCase() === this.search.toLowerCase()).length;
      },
    },
    methods: {
      createTopic: function () {
        if (this.creatingTopic) return;

        this.creatingTopic = true;
        axios.post('/api/topics', { name: this.search })
          .then(() => {
            this.loadTopics().then(() => {
              this.creatingTopic = false;
            });
          })
          .catch((e) => {
            this.creatingTopic = false;
            this.errors.push(e);
          });
      },
      loadTopics: function () {
        axios.get('/api/topics')
          .then((response) => {
            // JSON responses are automatically parsed.
            this.topics = response.data;
          })
          .catch((e) => {
            this.errors.push(e);
          });
      },
    },
    data: () => ({
      topics: [],
      errors: [],
      search: '',
      creatingTopic: false,
    }),

    // Fetches posts when the component is created.
    created() {
      axios.get('/api/topics')
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
    font-size: 14px;
  }

  body {
    margin: 0;
  }

  .logo {
    font-size: 18px !important;
    padding: 0 2px;
  }

  #app {
    font-family: 'Source Sans Pro', 'Avenir', Helvetica, Arial, sans-serif;
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
    margin: 15px;
    border: 1px solid #ccc;
    padding: 10px 20px;
  }

  h3, h4 {
    margin-bottom: 0;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-top: 15px;
  }

  .side-bar h3 {
    margin: 15px 0 0 15px;
  }

  .side-bar ul {
    margin-top: 0;
  }

  .create-topic-label {
    font-size: 14px;
    margin-left: 15px;
    line-height: 30px;
  }

  h4 a {
    font-weight: 600;
  }

  p {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 400;
    color: #888;
  }

  ul {
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
  }

  .topic-menu {
    margin-left: 15px;
    line-height: 30px;
  }

  .topic-menu a:visited {
    /*color: #0B3C5D;*/
    color: #328CC1;
    font-weight: 600;
  }

  a {
    /*color: #0B3C5D;*/
    color: #328CC1;
    font-weight: 400;
    text-decoration: none;
  }

  .kb-logo {
    background-color: #328CC1;
    border-radius: 15px;
    display: inline-block;
    height: 30px;
    width: 30px;
    text-align: center;
    vertical-align: baseline;
    line-height: 28px;
    font-weight: 600;
    color: #fff;
  }

  .btn {
    border: 1px solid #328CC1;
    color: #328CC1;
    font-weight: 600;
    padding: 5px 15px;
    border-radius: 15px;
    background-color: #ecf8ff;
    font-size: 12px;
    margin-bottom: 8px;
    cursor: pointer;
  }

</style>
