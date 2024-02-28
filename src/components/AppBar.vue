<template>
  <div>
    <v-app-bar class="custom-app-bar" color="#03178C" :height="70">
  <v-toolbar-title
    style="
      font-size: 25px;
      text-align: center;
      color: #ffffff;
      padding: 10px;
      font-family: 'Arial', sans-serif;  

    "
    class="athiti-regular "
  >
    MOR AOR GO MORE
  </v-toolbar-title>

  <v-spacer></v-spacer>
</v-app-bar>

  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
.custom-app-bar {
  width: 100%;
}

</style>
