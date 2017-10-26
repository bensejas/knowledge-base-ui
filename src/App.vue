<template>
  <div id="app">
    <div class="header">
      <router-link :to="{ name: 'Welcome' }"><span class="kb-logo">kb</span></router-link>
      <span class="title">Knowledge Base</span>
    </div>
    <div class="body">
      <div class="side-bar">
        <h3>Topics</h3>
        <div class="create-topic-container">
          <input v-model="search" class="search" type="text" placeholder="Search or Create topics">
          <button class="btn" v-if="search && notInFilteredList" v-on:click="createTopic">Create</button>
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
          .then((response) => {
            this.$router.push({ name: 'Topic', params: { id: response.data._id } });
            this.loadTopics().then(() => {
              this.search = '';
              this.creatingTopic = false;
            });
          })
          .catch((e) => {
            this.search = '';
            this.creatingTopic = false;
            this.errors.push(e);
          });
      },
      loadTopics: function () {
        axios.get('/api/topics')
          .then((response) => {
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

    created() {
      axios.get('/api/topics')
        .then((response) => {
          this.topics = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  };
</script>

<style>
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

  textarea {
    font-family: 'Source Sans Pro', 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    padding: 5px;
    border-radius: 5px;
    border-color: #cdcdcd;
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    box-sizing: border-box;
    min-height: 110px;
    outline: 0;
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
    padding: 5px 20px;
    outline: 0;
  }

  h1 {
    margin-top: 0;
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

  .create-topic-container {
    display: flex;
  }

  .create-topic-container input {
    margin: 15px 15px 15px 15px;
    flex: 1 0 0px;
    width: 40px;
  }
  .create-topic-container button {
    margin: 15px 15px 15px 0;
    flex: 0 0 0px;
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
    line-height: 22px;
  }

  .topic-menu a {
    width: 100%;
    display: inline-block;
  }

  .topic-menu a:visited {
    color: #328CC1;
    font-weight: 600;
  }

  .topic-menu a:hover {
    background-color: #ecf8ff;
    /*text-decoration: underline;*/
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

  .text-field {
    font-family: 'Source Sans Pro', 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #cdcdcd;
    width: 100%;
    box-sizing: border-box;
    outline: 0;
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
    outline: 0;
  }

  .btn-secondary {
    border: 1px solid #777777;
    color: #888888;
    background-color: #fff;
    font-weight: 400;
  }

  .v-select {
    font-family: 'Source Sans Pro', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 14px;
    width: 300px;
  }

  .v-select .dropdown-toggle {
    display: flex;
    overflow: hidden;
  }
  .v-select .selected-tag {
    flex: 1 0 auto;
    pointer-events: none;
  }
  .v-select input[type=search] {
    flex: 1 1 auto;
  }

</style>
