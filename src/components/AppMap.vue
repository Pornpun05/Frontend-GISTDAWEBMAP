<template>
  <div>
    <v-app-bar app color="#03178C" :height="70">
      <v-app-bar-nav-icon
        @click="toggleDrawer"
        class="burger-icon"
        style="color: #ffffff"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        style="font-size: 23px; text-align: center; color: #ffffff"
      >
        MOR AOR GO MORE</v-toolbar-title
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="drawer" width="350px">
      <v-row justify="center" class="mx-auto mt-5">
        <v-col>
          <v-col cols="12" sm="12">
            <v-select
              :items="items"
              label="โปรดเลือกสถานที่อ่านหนังสือ"
              dense
              solo
              v-model="selectedFaculty"
              @change="updateItemList"
            ></v-select>
          </v-col>

          <v-col>
            <v-row justify="center" class="button">
              <v-col style="display: flex; flex-direction: column">
                
                <v-btn
      
                  v-for="item in filteredItemList"
                  :key="item.id"
                  @click="
                    gotoSeletePin(
                      item.longitude,
                      item.latitude,
                      item.location,
                      item.image,
                      item.details
                    )
                  "
                  class="custom-button">

                    {{ item.location }}
                
                </v-btn>

              </v-col>
              <span class="underline"></span>
            </v-row>

            <div
              style="
                display: flex;
                flex-direction: column;
                transform: scale(0.9);
              "
            ></div>
          </v-col>
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
      items: [],
      selectedFaculty: null,
      selectedButton: null,
      filteredItemList: [],
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
        console.log(" response.data.data", response.data.data);
        const Faculty = [...new Set(this.itemList.map((item) => item.faculty))];
        this.items = Faculty;
        for (let i = 0; i < this.itemList.length; i++) {
          this.itemList[i].image =
            "data:image/jpeg;base64," + this.itemList[i].image;
        }

        console.log("itemList", this.itemList);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    },

    updateItemList() {
      if (this.selectedFaculty) {
        this.filteredItemList = this.itemList.filter(
          (item) => item.faculty === this.selectedFaculty
        );
      } else {
        this.filteredItemList = [];
      }
    },

    gotoSeletePin(lon, lat, location, image,details) {
      const encodeImg = encodeURIComponent(image);
      const currentRoute = this.$route.fullPath;
      const destinationRoute = `/searchpage?lon=${lon}&lat=${lat}&location=${location}&details=${details}`;

      if (currentRoute !== destinationRoute) {
        this.$router
          .push({
            path: `/searchpage?lon=${lon}&lat=${lat}&location=${location}&details=${details}&image=${encodeImg}`,
          })
          .catch(() => {});
         
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

.button-search {
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-button:focus,
.custom-button:active {
  background-color: #ff0000 !important;
}

.custom-button {
  margin-bottom: 20px;
  width: 300px;
  height: 50px !important;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  text-align: center;
  text-wrap: wrap !important;
  transition: background-color 0.3s;
  font-size: 16px; 
}

.image-button {
  max-height: 100px;
  display: flex;
  font-size: 18px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
</style>




