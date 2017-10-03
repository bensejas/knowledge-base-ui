<template>
  <div class="myList">
    <h1>{{ topic.name }}</h1>
    <p>The id: {{ id }}</p>

    <ul v-if="topic && topic.links && topic.links.length">
      <li v-for="links of topic.links">
        <h3><router-link :to="{ name: 'Topic', params: { id: links.topicId }}">{{links.name}}</router-link></h3>
        <p>{{ links.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'topic',
  props: ['id'],
  methods: {
  },
  data: () => ({
    topic: {},
    errors: [],
    text: '',
  }),
  watch: {
    id: function (value) {
      const vm = this;
      axios.get(`http://localhost:8080/api/topics/${value}`)
        .then((response) => {
          // JSON responses are automatically parsed.
          vm.topic = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },

  // Fetches posts when the component is created.
  created() {
    axios.get(`http://localhost:8080/api/topics/${this.id}`)
      .then((response) => {
        // JSON responses are automatically parsed.
        this.topic = response.data;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    text-align: left;
  }
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
