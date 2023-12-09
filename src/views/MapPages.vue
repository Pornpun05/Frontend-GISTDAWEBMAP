<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      drawer: false,
    };
  },
  mounted() {
    this.loadMapScript();
  },
  created() {
    this.loadMapScript();
  },
  methods: {
    initMap() {
      if (typeof sphere !== "undefined") {
        var mapElement = document.getElementById("map");
        if (mapElement) {
          this.map = new sphere.Map({
            placeholder: mapElement,
          });
        } else {
          console.error("Map element not found.");
        }
      } else {
        console.error("Sphere library not loaded.");
      }
    },
    loadMapScript() {
      const script = document.createElement("script");
      script.src =
        "https://api.sphere.gistda.or.th/map/?key=94DCFAE5F0E946EB814C6DCCE6C861FB";
      script.async = true;

      script.onload = () => {
        console.log("Sphere Map script loaded successfully.");
        this.initMap();
      };

      script.onerror = () => {
        console.error("Error loading Sphere Map script.");
      };

      document.head.appendChild(script);
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
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

  },
};
</script>

<style scoped>
div {
  justify-items: center;
  display: flex;
  padding: 20px 20px 20px;
  width: 100%;
  height: 100%;
  margin: 0;
}
.drawer {
  width: 350px;
}

.my-custom-text-field {
  width: calc(100% - 32px);
  margin: 0 16px;
}
</style>
