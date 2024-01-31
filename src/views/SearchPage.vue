<template>
  <div
    style="display: flex; flex-direction: column; height: 100%; padding: 20px"
  >
    <!-- <div class="item-list">
      <div style="display: flex; flex-direction: column; transform: scale(0.9)"> -->
    <!-- <v-btn
          v-for="item in itemList"
          :key="item.id"
          @click="gotoPin(item.longitude, item.latitude)"
        >
          {{ item.faculty }} - {{ item.location }}
        </v-btn> -->
    <!-- </div>
    </div> -->
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
      location: null,
      image: null,
      detail: null,
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
        const location = this.$route.query.location;
        const details = this.$route.query.details;
        const image = to.query.image;
        this.gotoPin(lon, lat, location, image, details);
        this.gotoMarker(lon, lat);
      }
    },
  },

  async mounted() {
    try {
      const response = await axios.get("http://localhost:5000/getlist");
      this.itemList = response.data.data;
      for (let i = 0; i < this.itemList.length; i++) {
        this.itemList[i].image =
          "data:image/jpeg;base64," + this.itemList[i].image;
      }
      console.log("itemList", this.itemList);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
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

    navigateToComment() {
      this.$router.push("/comment");
    },

    addPin() {
      try {
        const list = this.itemList;

        list.forEach((item) => {
          const marker = new sphere.Marker(
            {
              lon: parseFloat(item.longitude),
              lat: parseFloat(item.latitude),
            },
            {
              title: `<div>${item?.location}</div>`,
              detail:
                `<div style="width: 200px; max-height: 300px; overflow: auto; margin-top: 10px; padding: 5px; display: flex; flex-direction: column;">` +
                `<div style="display: flex; justify-content: center; align-items: center; overflow: hidden; width: 190px; height: 120px;">
                 <img style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" src="${item?.image}" alt="Gistda images"></div>` +
                `<div style="
                            display: grid;
                            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                            gap: 5px;
                            font-size: 14px; 
                            line-height: 1.5; 
                            color: #333; 
                            border-radius: 6px;
                            margin-top: 10px;
                            text-align: center; 
                            font-family: 'YourChosenFont', sans-serif; 
                            background-color: #f0f0f0; 
                            padding: 8px; ">${item?.details}</div>
                            `,

              style: `
              .sphere-popup-content {
                font-size: 18px;
                text-align: center;
                
              }
              .sphere-popup-header {
                font-size: 20px;
                text-align: center;
                margin: 0;
              }`,
            }
          );

          this.map.Overlays.add(marker);
        });
      } catch (error) {
        console.error("Error adding pin:", error);
      }
    },

    clearPin() {
      this.map.Overlays.clear();
    },

    gotoPin(lon, lat, location, image, details) {
      console.log("details", details);
      this.map.goTo({
        center: { lon: lon, lat: lat },
        zoom: 18,
      });
      var popup1 = new sphere.Popup(
        { lon: lon, lat: lat },
        {
          title: `<div>${location}</div>`,
          detail:
            `<div style="width: 200px; max-height: 300px; overflow: auto; margin-top: 10px; padding: 5px; display: flex; flex-direction: column;">` +
            `<div style="display: flex; justify-content: center; align-items: center; overflow: hidden; width: 190px; height: 120px;">
            <img style="width: 150px; height: 100%; object-fit: cover; border-radius: 8px;" src="${image}" alt="Gistda images"></div>` +
            `<div style="
                            display: grid;
                            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                            gap: 5px;
                            font-size: 14px; 
                            line-height: 1.5; 
                            color: #333; 
                            border-radius: 6px;
                            margin-top: 10px;
                            text-align: center; 
                            font-family: 'YourChosenFont', sans-serif; 
                            background-color: #f0f0f0; 
                            padding: 8px;">${details}</div>`,

          style: `
                  .sphere-popup-content {
                    font-size: 18px;
                    text-align: center;
                    
                  }
                  .sphere-popup-header {
                    font-size: 20px;
                    text-align: center;
                    margin: 0;
                  }`,
        }
      );

      this.map.Overlays.add(popup1);
    },

    async getListPoint() {
      try {
        const response = await axios.get("http://localhost:5000/getlist");
        this.itemList = response.data.data;
        for (let i = 0; i < this.itemList.length; i++) {
          this.itemList[i].image =
            "data:image/jpeg;base64," + this.itemList[i].image;
        }
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
  padding: 200px 20px 20px 20px !important;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
