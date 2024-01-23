<template>
  <div
    style="display: flex; flex-direction: column; height: 100%; padding: 20px"
  >
    <div id="map">
      <v-navigation-drawer
        id="review-bar"
        v-model="drawer"
        app
        class="drawer"
        style="
          position: absolute;
          top: 0px;
          left: 0px;
          display: flex;
          width: 360px;
          height: 500px;
          background-color: rgb(255, 255, 255);
          z-index: 10;
        "
        width="350px"
      >
        <div class="d-flex justify-content mt-3 flex-nowrap flex-column">
          <v-card style="width: max-content" class="text-center d-flex">
            <v-img
              src="https://lh3.googleusercontent.com/pw/AM-JKLX_-E9QnJ7YmGL9RVb8RRtfrvmOTIiFLcgoa1n9Nr16qHPO_heBCbDooFQvpyK5ToU-3woEbt4AzyhnnHqEgnuPdbTjNJoYPEf7aKjb59OPamdOOKYTfn-bufschoQHVXcXJ5YZ5p-oehajggoNSxNK=w1209-h907-no?authuser=0"
              height="200px"
              width="340px"
              class="mx-auto my-auto"
            >
            </v-img>
          </v-card>

          <v-card-text class="mt-3" style="margin-left: 0.5cm">
            <div style="font-size: 18px; color: #000000">ตึกฟัก</div>
          </v-card-text>
        </div>


        <div class="mt-10" style="margin-left: 1cm;">
              <v-btn
                depressed
                class="mr-5" >
                ภาพรวม
              </v-btn>
              <v-btn
                depressed
                class="mr-5" 
                
                >
                รีวิว
              </v-btn>  
          </div>
        <div class="underline"></div>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppMapVue from "@/components/AppMap.vue";

export default {
  data() {
    return {
      drawer: false,
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
        this.map.Event.bind(sphere.EventName.OverlayClick, () => {
          this.drawer = !this.drawer;
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
                              padding: 8px;">${details}</div> 
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
.underline {
  display: block;
  width: 95%;
  height: 1px;
  background-color: #d1d1d1;
}

* {
  padding: 0;
}

#map {
  justify-items: center;
  display: flex;
  padding: 20px 20px 20px;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
