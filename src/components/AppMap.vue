<template>
  <div>
    <v-app-bar app color="#03178C" :height="70">
      <v-app-bar-nav-icon
        @click="toggleDrawer"
        class="burger-icon"
        style="color: #ffffff"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        style="font-size: 30px; text-align: center; color: #ffffff"
        >MOR AOR GO MORE</v-toolbar-title
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="drawer">
      <v-row justify="center" class="mx-auto mt-5">
        <v-col>
          <v-text-field
            required
            outlined
            dense
            class="my-custom-text-field"
            style="width: 250px"
            color="#E7E4E4"
          ></v-text-field>
          <v-row justify="center" class="button">
            <v-col>
              <v-btn
                v-for="item in itemList"
                :key="item.id"
                @click="gotoSeletePin(item.longitude, item.latitude)"
              >
                {{ item.faculty }} - {{ item.location }}
              </v-btn>

              <span class="underline"></span>
              <v-card>
                <!-- <v-btn
                    v-for="item in itemList"
                    :key="item.id"
                    :to="{
                      name: 'ItemDetail',
                      params: { lon: item.longitude, lat: item.latitude },
                    }"
                  >
                    {{ item.faculty }} - {{ item.location }}
                  </v-btn> -->
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    transform: scale(0.9);
                  "
                ></div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      drawer: false,
      map: null,
      marker: null,
      itemList: null,
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    async getListPoint() {
      try {
        const response = await axios.get("http://localhost:5000/getlist");
        this.itemList = response.data.data;

        console.log("itemList", this.itemList);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    },

    gotoSeletePin(lon, lat) {
      const currentRoute = this.$route.fullPath;
      const destinationRoute = `/searchpage?lon=${lon}&lat=${lat}`;

      // Check if the destination route is different from the current route
      if (currentRoute !== destinationRoute) {
        this.$router.push(destinationRoute);
      }
    },
  },

  created() {
    this.getListPoint();
  },
};
</script>

<style scoped>
.button .underline {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #03178c;
  margin-top: 1cm;
}
</style>
