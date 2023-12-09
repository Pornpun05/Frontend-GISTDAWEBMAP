<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <div class="item-list">
      <h2>Item List</h2>
      <div style="display: flex; flex-direction: column; transform: scale(0.9)">
        <!-- <v-btn
          v-for="item in itemList"
          :key="item.id"
          @click="gotoPin(item.longitude, item.latitude)"
        >
          {{ item.faculty }} - {{ item.location }}
        </v-btn> -->
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import axios from "axios";
import AppMapVue from "@/components/AppMap.vue";

export default {
  data() {
    return {
      map: null,
      marker: null,
      itemList: null,
      lon: null,
      lat: null,
    };
  },
  components: {
    AppMapVue,
  },

  created() {
    this.getListPoint();
    this.loadMapScript();

    setTimeout(() => {
      this.addPin();
    }, 3000);

    const lon = this.$route.query.lon;
    const lat = this.$route.query.lat;

    console.log("Lon:", lon);
    console.log("Lat:", lat);
  },

  watch: {
    $route(to, from) {
      if (to.query.lon !== undefined && to.query.lat !== undefined) {
        const lon = parseFloat(to.query.lon);
        const lat = parseFloat(to.query.lat);
        this.gotoPin(lon, lat);
      }
    },
  },
  methods: {
    initMap() {
      try {
        this.map = new sphere.Map({
          placeholder: document.getElementById("map"),
        });
      } catch (error) {
        console.error("Error initializing the map:", error);
      }
    },
    loadMapScript() {
      const script = document.createElement("script");
      script.src =
        "https://api.sphere.gistda.or.th/map/?key=94DCFAE5F0E946EB814C6DCCE6C861FB";
      script.async = true;

      script.onload = async () => {
        this.initMap();
        console.log("Sphere Map script loaded successfully.");
      };

      script.onerror = () => {
        console.error("Error loading Sphere Map script.");
      };

      document.head.appendChild(script);
    },

    addPin() {
      try {
        const list = this.itemList;

        list.forEach((item) => {
          const marker = new sphere.Marker({
            lon: parseFloat(item.longitude),
            lat: parseFloat(item.latitude),
          });

          this.map.Overlays.add(marker);

          console.log("item", item.longitude, item.latitude);
        });
      } catch (error) {
        console.error("Error adding pin:", error);
      }
    },

    clearPin() {
      this.map.Overlays.clear();
    },
    gotoPin(lon, lat) {
      // Your logic to handle lon and lat in the second component
      this.map.goTo({
        center: { lon: lon, lat: lat },
        zoom: 18,
      });
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
  },
};
</script>

<style scoped>
#map {
  justify-items: center;
  display: flex;
  padding: 20px 20px 20px;
  width: 100%;
  height: 500px;
  margin: 0;
}
</style>
