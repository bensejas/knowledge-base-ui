<template>
  <div class="welcome">
    <h1>Welcome to Knowledge Base</h1>
    <p>This knowledge base is designed to be quick and light weight. Any large pieces of information should stored in a wiki and linked.</p>
  </div>
</template>

<script>
export default {
  name: 'welcome',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .welcome {
    margin-left: 15px;
    margin-top: 15px;
  }
  p {
    font-size: 18px;
    color: #2c3e50;
  }
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
