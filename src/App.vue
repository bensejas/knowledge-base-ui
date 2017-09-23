<template>
  <div id="app">
    <div class="header">
      <i class="fa fa-book logo" aria-hidden="true"></i>
      <span class="title">Knowledge Base</span>
    </div>
    <div class="body">
      <div class="side-bar">
        <input class="search" type="text" placeholder="Search">
        <ul>
          <li>Topic 1</li>
          <li>Topic 2</li>
          <li>Topic 3</li>
          <li>Topic 4</li>
          <li>Topic 5</li>
        </ul>
      </div>
      <div class="content">
        <h1>Content Goes Here</h1>
        <p></p>
      </div>
    </div>
    <!--router-view></router-view-->
  </div>
</template>

<script>
export default {
  name: 'app',
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
  text-align: center;
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
</style>
