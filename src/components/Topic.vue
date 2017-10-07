<template>
  <div class="topic-content">
    <h1>{{ topic.name }}</h1>
    <input v-model="search" class="search" type="text" placeholder="Search related topics">
    <!--<v-select v-model="selectedTopicLink" :options="selectTopics"></v-select>-->
    <button class="btn" id="show-create-topic-link" @click="showModal = true">Create or Update a Topic Link</button>
    <create-topic-link-modal v-if="showModal" :options="selectTopics" @close="onModalClose"></create-topic-link-modal>
    <ul v-if="topic && topic.links && topic.links.length">
      <li v-for="links of filteredList" class="topic-link-container">
        <h4><router-link :to="{ name: 'Topic', params: { id: links.topicId }}">{{links.name}}</router-link></h4>
        <p>{{ links.description }}<i class="fa fa-pencil" aria-hidden="true"></i></p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'topic',
  props: ['id'],
  computed: {
    filteredList: function () {
      return this.topic.links.filter(topic => topic.name.toLowerCase().indexOf(this.search && this.search.toLowerCase()) !== -1);
    },
    selectTopics: function () {
      if (!this.$parent || !this.$parent.topics) {
        return [];
      }
      return this.$parent.topics.map((topic) => {
        return { label: topic.name, value: topic };
      });
    },
  },
  data: () => ({
    showModal: false,
    topic: {},
    errors: [],
    text: '',
    search: '',
  }),
  methods: {
    onModalClose: function () {
      this.showModal = false;
      this.reloadTopic();
    },
    reloadTopic: function () {
      axios.get(`/api/topics/${this.id}`)
        .then((response) => {
          this.topic = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }
  },
  watch: {
    id: function (value) {
      const vm = this;
      axios.get(`/api/topics/${value}`)
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
    axios.get(`/api/topics/${this.id}`)
      .then((response) => {
        // JSON responses are automatically parsed.
        this.topic = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #show-create-topic-link {
    margin-left: 15px;
  }
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
  margin: 0;
}

  .topic-content {
    padding: 20px;
  }

  .search {
    margin: 0;
  }

  .topic-link-container .fa-pencil {
    padding: 0 5px;
    color: #eaeaea;
    cursor: pointer;
  }

  .topic-link-container .fa-pencil:hover {
    color: #2c3e50;
  }

</style>
