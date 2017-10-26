<template>
  <div class="topic-content">
    <h1>{{ topic.name }}<i class="fa fa-pencil" aria-hidden="true" @click="showEditTopicModal = true"></i></h1>
    <div class="topic-description">
      <span v-html="topicDescription"></span>
      <span class="edit-topic-description" v-if="!topic || !topic.description" @click="showEditTopicModal = true">Add description here</span>
      <i class="fa fa-pencil" aria-hidden="true" @click="showEditTopicModal = true"></i>
      <edit-topic-modal v-if="showEditTopicModal" :topic="topic" @close="onEditTopicModalClose"></edit-topic-modal>
    </div>
    <input v-model="search" class="search" type="text" placeholder="Search related topics">
    <button class="btn" id="show-create-topic-link" @click="openCreateTopicLinkModal">Create or Update a Topic Link</button>
    <create-topic-link-modal :selectedTopicLinkProp="selectedTopicLink" v-if="showModal" :options="selectTopics" @close="onModalClose"></create-topic-link-modal>
    <ul v-if="topic && topic.links && topic.links.length">
      <li v-for="link of filteredList" class="topic-link-container">
        <h4><router-link :to="{ name: 'Topic', params: { id: link.topicId }}">{{link.name}}</router-link></h4>
        <p class="topic-link-description"><span v-html="formatTextForHTML(link.description)"></span><i class="fa fa-pencil" @click="editTopicLink(link)" aria-hidden="true"></i></p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import anchorme from 'anchorme';

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
    topicDescription: function () {
      if (!this.topic || !this.topic.description) {
        return '';
      }
      const des = this.topic.description.replace(/\n/g, '<br>');
      return anchorme(des || '', this.anchormeOptions);
    }
  },
  data: () => ({
    showModal: false,
    showEditTopicModal: false,
    topic: {},
    errors: [],
    text: '',
    search: '',
    selectedTopicLink: {},
    anchorme: anchorme,
    anchormeOptions: {
      attributes: [
        {
          name: 'target',
          value: '_blank'
        }]
    }
  }),
  methods: {
    formatTextForHTML: function (text) {
      if (!text) {
        return '';
      }
      const output = text.replace(/\n/g, '<br>');
      return anchorme(output || '', this.anchormeOptions);
    },
    openCreateTopicLinkModal: function () {
      this.selectedTopicLink = '';
      this.showModal = true;
    },
    editTopicLink: function (topicLink) {
      this.selectedTopicLink = { label: topicLink.name, value: topicLink };
      this.showModal = true;
    },
    onModalClose: function () {
      this.showModal = false;
      this.reloadTopic();
    },
    onEditTopicModalClose: function () {
      this.showEditTopicModal = false;
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
      window.scrollTo(0, 0);
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
<style>
  .edit-topic-description {
    cursor: pointer;
    color: #d4d9d8;
  }
  .edit-topic-description:hover {
    color: #2c3e50;
  }
  .topic-description {
    margin-bottom: 25px;
  }
  #show-create-topic-link {
    margin-left: 15px;
  }
  body {
    text-align: left;
  }
h1, h2 {
  font-weight: normal;
}

h1 .fa-pencil {
  font-size: 20px;
  margin-left: 5px;
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

  .topic-content .fa-pencil {
    padding: 0 5px;
    color: #eaeaea;
    cursor: pointer;
  }

  .topic-content .fa-pencil:hover {
    color: #2c3e50;
  }

  .topic-link-description a {
    color: #aaa;
    text-decoration: underline;
  }

  .topic-description a {
    color: #aaa;
    text-decoration: underline;
  }

</style>
