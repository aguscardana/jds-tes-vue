<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Kementerian Sosial RI</router-link>
      <!-- <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/penerima-manfaat" class="nav-link">Data Penerima Manfaat</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
      </div> -->
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>