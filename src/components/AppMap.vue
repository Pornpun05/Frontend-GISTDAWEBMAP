<template>
  <div>
    <v-app-bar app color="#03178C" :height="70">
      <v-app-bar-nav-icon
        @click="toggleDrawer"
        class="burger-icon"
        style="color: #ffffff"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        style="
          font-size: 25px;
          text-align: center;
          color: #ffffff;
          font-family: 'Arial', sans-serif;
        "
      >
        MOR AOR GO MORE
      </v-toolbar-title>
    </v-app-bar>
    <template>
      <v-navigation-drawer
        v-model="$store.state.drawer"
        app
        class="drawer"
        width="400px"
      >
        <template v-if="currentTemplate === 'drawerTemplate'">
          <v-row justify="center" class="mx-auto mt-5">
            <v-col>
              <v-col cols="12" sm="12" style="font-weight: bold; font-family: 'Arial', sans-serif;">
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
                          item.id,
                          item.longitude,
                          item.latitude,
                          item.location,
                          item.image,
                          item.details
                        );
                        switchDrawer();
                      "
                      class="custom-button"
                    >
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
        </template>

        <template v-else>
          <div
            style="
              display: flex;
              flex-direction: column;
              height: 100%;
              width: 100%;
              padding: 8px;
            "
          >
            <div id="map">
              <div
                style="display: grid; grid-template-rows: auto auto auto 30px"
              >
                <div>
                  <v-col style="width: max-content">
                    <div style="width: 350px; height: 200px">
                      <v-img
                        :src="selectedImage"
                        style="width: 100%; height: 100%; border-radius: 10px"
                      ></v-img>
                    </div>
                    <v-card class="nametitle d-flex justify-center">
                      {{ selectedLocation }}
                    </v-card>
                  </v-col>
                </div>

                <div
                  class="d-flex mt-5"
                  style="margin-left: 0.8cm; font-size: 18px; font-weight: bold;"
                >
                  สรุปความคิดเห็น
                </div>

                <div
                  style="display: flex; align-items: center; margin-left: 1cm"
                  class="d-flex mt-5"
                >
                  <v-rating
                    v-model="rating"
                    background-color="indigo"
                    color="yellow"
                    size="30px"
                    readonly
                    half-increments
                  ></v-rating>
                  <div style="margin-left: 1cm; font-size: 18px">
                    <b>{{ rating }}</b>
                  </div>
                </div>

                <div
                  style="display: flex; align-items: center"
                  class="d-flex mt-12"
                >
                  <v-btn
                    text
                    class="mr-5 textbutton"
                    :style="{ borderBottom: !dialog ? '2px solid red' : '' }"
                    style="
                      font-size: 16px;
                      height: 10px;
                      margin-left: 0.5cm;
                      background-color: #f0f0f0;
                      font-family: Arial;
                      font-weight: bold;
                    "
                  >
                    ภาพรวม
                  </v-btn>

                  <v-dialog
                    v-model="dialog"
                    persistent
                    width="850px"
                    ref="reviewDialog"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        text
                        class="mr-5 textbutton"
                        style="
                          font-size: 16px;
                          height: 10px;
                          background-color: #f0f0f0;
                          font-family: Arial;
                          font-weight: bold;
                        "
                        :style="{ borderBottom: dialog ? '3px solid red' : '' }"
                      >
                        <v-icon size="15px">mdi-pencil</v-icon>
                        รีวิว
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-actions class="d-flex">
                        <v-card-text class="text-center">
                          <div
                            style="
                              font-size: 20px;
                              color: #000000;
                              margin-bottom: 10px;
                            "
                          >
                           {{ selectedLocation }}
                          </div>
                          <v-btn
                            style="
                              font-size: 35px;
                              cursor: pointer;
                              margin-top: 10px;
                              justify-content: center;
                              text-align: center;
                            "
                            icon
                            v-for="index in 5"
                            :key="index"
                            @click="updateRating(index)"
                          >
                            <v-icon
                              style="font-size: 30px; cursor: pointer"
                              :color="index <= userRating ? 'yellow' : 'grey'"
                              >
                                mdi-star
                            </v-icon>
                          </v-btn>

                          <v-row>
                            <v-col md="10" class="mx-auto d-flex mt-2">
                              <v-textarea
                                outlined
                                name="input-7-4"
                                label="เล่าประสบการณ์ที่ได้จากสถานที่นี้โดยละเอียด"
                                v-model="details"
                                height="100%"
                                width="80%"
                                style="margin-top: 0.5cm"
                              ></v-textarea>
                            </v-col>
                          </v-row>

                          <div class="text-center">
                            <v-btn
                              depressed
                              @click="dialog = false"
                              color="red"
                              class="mr-5"
                              style="text-align: center; color: #ffffff"
                            >
                              ยกเลิก
                            </v-btn>
                            <v-btn
                              depressed
                              class="ml-5"
                              @click="addReview(), (dialog = false)"
                              color="green"
                              style="text-align: center; color: #ffffff"
                            >
                              โพสต์
                            </v-btn>
                          </div>
                        </v-card-text>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
                <br />
                <div
                  class="d-flex mt-12"
                  style="margin-left: 0.8cm; margin-top: 20px"
                >
                  <div style="font-size: 18px; color: #000000; font-weight: bold;">
                    รีวิวทั้งหมด
                  </div>
                </div>

                <div class="reviewcom d-flex mt-5" style="margin-left: 0.1cm">
                  <div v-for="(review, index) in allReviews" :key="index">
                    <span style="font-size: 16px" v-if="allReviews != null">
                      {{ index + 1 }}. {{ review.comment }}
                    </span>
                    <br />
                  </div>

                  <span style="font-size: 16px" v-if="allReviews == ''">
                    ไม่มีการรีวิว
                  </span>
                </div>
                <div
                  class="d-flex mt-5 flex-column align-items-center justify-content: center;"
                  style="
                    font-size: 16px;
                    margin-left: 2.8cm;
                    margin-bottom: 28px;
                  "
                >
                  <v-btn
                    @click="switchDrawer2"
                    class="mt-2"
                    style="
                      font-size: 14px;
                      height: 40px;
                      width: 160px;
                      color: aliceblue;
                      font-weight: bold;
                    "
                    color="#FB8C00"
                  >
                    กลับเพื่อเลือกสถานที่
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </template>
      </v-navigation-drawer>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentTemplate: "drawerTemplate",
      map: null,
      marker: null,
      itemList: null,
      items: [],
      selectedFaculty: null,
      selectedButton: null,
      filteredItemList: [],
      selectedLocation: "",
      selectedImage: "",
      userRating: 0,
      imageUrl: null,
      dialog: false,
      localTemplate: "",
      selectedreview: "",
      selectedLocationID: "",
      allReviews: [],
      details: "",
      commentById: [],
      score: 0,
      rating: null,
    };
  },

  methods: {
    toggleDrawer() {
      this.$store.state.drawer = !this.$store.state.drawer;
      // console.log(this.$store.state.drawer);
    },
    switchDrawer() {
      this.currentTemplate =
        this.currentTemplate === "drawerTemplate"
          ? "otherTemplate"
          : "drawerTemplate";
    },
    switchDrawer2() {
      this.currentTemplate =
        this.currentTemplate === "otherTemplate"
          ? "drawerTemplate"
          : "otherTemplate";
    },

    async getListPoint() {
      try {
        const response = await axios.get("http://localhost:5000/getlist");
        this.itemList = response.data.data;
        // console.log(" response.data.data", response.data.data);
        const Faculty = [...new Set(this.itemList.map((item) => item.faculty))];
        this.items = Faculty;
        for (let i = 0; i < this.itemList.length; i++) {
          this.itemList[i].image =
            "data:image/jpeg;base64," + this.itemList[i].image;
        }

        // console.log("itemList", this.itemList);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    },

    async getReview() {
      try {
        const response = await axios.get("http://localhost:5000/getReview");
        // this.allReviews = response.data;
        // console.log(" response.body", response);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    },
    async getReviewByid() {
      try {
        const response = await axios.get(
          `http://localhost:5000/getReviewBylocation/${this.selectedLocationID}`
        );
        this.allReviews = response.data;

        // console.log(" response.body", response.data);
        this.score = this.allReviews.reduce(
          (sum, review) => sum + review.score,
          0
        );

        let sumRating = this.score / this.allReviews.length;
        if (sumRating !== 0) {
          this.rating = parseFloat(sumRating.toFixed(1));
        } else {
          this.rating = 0;
        }
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    },
    async addReview() {
      try {
        const response = await axios.post("http://localhost:5000/addReview", {
          comment: this.details,
          score: this.userRating,
          locationID: this.selectedLocationID,
        });
        if (response) {
          alert("เพิ่มรีวิวสำเร็จ");
          this.getReviewByid();
        }
      } catch (error) {
        console.error("Error adding review:", error);
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

    gotoSeletePin(Id, lon, lat, location, image, details, review) {
      this.selectedLocationID = Id;
      this.selectedLocation = location;
      this.selectedImage = image;
      this.selectedreview = review;

      const encodeImg = encodeURIComponent(image);
      const currentRoute = this.$route.fullPath;
      const destinationRoute = `/searchpage?lon=${lon}&lat=${lat}&location=${location}&details=${details}`;

      if (currentRoute !== destinationRoute) {
          try {
            this.$router.push({
            path: `/searchpage?lon=${lon}&lat=${lat}&location=${location}&details=${details}&image=${encodeImg}`,
          })
          } catch (error) {
            // console.log('error');
            this.$router.push({
            path: `/`,
          })
        }
      }
      this.getReviewByid();
    },
    updateRating(rating) {
      this.userRating = rating;
    },
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.userRating = 0;
        this.details = "";
      }
    },
    "$store.state.valueMarker": function () {
      let placeLocation = this.$store.state.placeLocation;
      let valueMarker = this.$store.state.valueMarker._geojson.properties.title
        .substr(5)
        .split("<")[0];
      placeLocation.forEach((item) => {
        if (item.location == valueMarker) {
          this.currentTemplate = "otherTemplate";
          this.gotoSeletePin(
            item.id,
            item.longitude,
            item.latitude,
            item.location,
            item.image,
            item.details
          );
        }
      });
    },
  },
  mounted() {
    // const marker = L.marker([this.lat, this.lon]).addTo(this.map);
    // marker.on("click", this.showReviewDialog);
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
  width: 340px !important;
  height: 50px !important;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: pre-wrap;
  transition: background-color 0.3s;
  font-size: 16px;
}

.textbutton {
  width: 155px !important;
  height: 50px !important;
}

.image-button {
  max-height: 100px;
  display: flex;
  font-size: 18px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.underline {
  display: block;
  width: 95%;
  height: 1px;
  background-color: #d1d1d1;
}
.nametitle {
  font-size: 16px !important;
  justify-content: center !important;
  text-align: center !important;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 8px;
  width: 350px;
  height: 25px;
  white-space: pre-wrap;
  font-weight: bold;
}

.custom-rating .v-icon {
  font-size: 30px;
}
.underline-button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: blue;
  bottom: 0;
  left: 0;
}
.reviewcom {
  width: 360px !important;
  height: auto !important;
  flex-wrap: wrap !important;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  font-size: 14px;
  color: #333;
  border-radius: 4px;
  margin-top: 10px;
  font-family: "Arial", sans-serif;
  background-color: #f0f0f0;
  white-space: pre-wrap !important;
  padding: 12px;
  border: 1px solid #ccc;
}
.star {
  text-align: center !important;
}
</style>
