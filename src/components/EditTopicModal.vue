<template>
  <div>
  <modal>
    <h3 slot="header">Edit Topic</h3>
    <div slot="body">
      <div class="field">
        <p class="label">Name:</p>
        <input type="text" class="text-field" v-model="name"/>
      </div>
      <div class="field">
        <p class="label">Description:</p>
        <textarea v-model="description"></textarea>
      </div>
    </div>
    <div slot="footer">
      <button class="modal-default-button btn" @click="editTopic">
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
  name: 'editTopicModal',
  props: ['topic'],
  data() {
    return {
      name: '',
      description: '',
      isUpdatingTopic: false,
    };
  },
  computed: {
  },
  created: function () {
    this.name = this.topic.name;
    this.description = this.topic.description;
  },
  methods: {
    editTopic: function () {
      if (this.isUpdatingTopic) return;
      if (!this.name || !this.description) return;

      this.isUpdatingTopic = true;

      const body = {
        name: this.name,
        description: this.description
      };

      axios.put(`/api/topics/${this.topic._id}`, body)
        .then(() => {
          this.isUpdatingTopic = false;
          this.$emit('close');
        })
        .catch((e) => {
          this.isUpdatingTopic = false;
          this.errors.push(e);
        });
    },
  },
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
