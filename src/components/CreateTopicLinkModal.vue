<template>
  <div>
  <modal>
    <h3 slot="header">Create or Update Topic Link</h3>
    <div slot="body">
      <div class="field">
        <p class="label">Choose Topic to link to <strong>{{$parent.topic.name}}</strong>:</p>
        <v-select v-model="selectedTopicLink" :options="options"></v-select>
      </div>
      <div class="field">
        <p class="label">Describe the relationship:</p>
        <textarea v-model="description"></textarea>
      </div>
    </div>
    <div slot="footer">
      <button class="modal-default-button btn" @click="createTopicLink">
        Save
      </button>
      <button class="modal-secondary-button btn btn-secondary" @click="$emit('close')">
        Cancel
      </button>
    </div>
  </modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'createTopicLinkModal',
  props: ['options', 'selectedTopicLinkProp'],
  data() {
    return {
      description: '',
      creatingTopicLink: false,
      selectedTopicLink: ''
    };
  },
  methods: {
    createTopicLink: function () {
      if (this.creatingTopicLink) return;
      if (!this.selectedTopicLink || !this.selectedTopicLink.value || !this.description) return;

      this.creatingTopicLink = true;

      const body = {
        topicId: this.selectedTopicLink.value._id,
        name: this.selectedTopicLink.value.name,
        description: this.description
      };

      axios.post(`/api/topics/${this.$parent.topic._id}/links`, body)
        .then(() => {
          this.creatingTopicLink = false;
          this.$emit('close');
        })
        .catch((e) => {
          this.creatingTopicLink = false;
          this.errors.push(e);
        });
    },
  },
  watch: {
    selectedTopicLink: function (selectedTopic) {
      const topic = this.$parent.topic.links.filter(link => link.topicId === selectedTopic.value._id);
      if (topic.length) {
        this.description = topic[0].description;
      } else {
        this.description = '';
      }
    },
  },
  created() {
    this.selectedTopicLink = this.selectedTopicLinkProp ? Object.assign({}, this.selectedTopicLinkProp) : '';
    if (!this.selectedTopicLink) {
      return;
    }
    const topic = this.$parent.topic.links.filter(link => link.topicId === this.selectedTopicLink.value.topicId);
    if (topic.length) {
      this.selectedTopicLink.value._id = this.selectedTopicLink.value.topicId;
      this.description = topic[0].description;
    } else {
      this.description = '';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .modal-secondary-button {
    margin-left: 5px;
  }

  .modal-body .label {
    margin-bottom: 8px;
    color: #2c3e50;
  }

  .field {
    margin-top: 10px;
  }
  .field:first-child {
    margin-top: 0;
  }

  .v-select {
    width: 100%;
  }

  .modal-container {
    width: 500px !important;
  }

</style>
