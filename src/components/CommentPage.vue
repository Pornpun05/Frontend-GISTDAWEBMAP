<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      padding: 20px;
    "
  >
    <div id="map">
      <div style="display: grid; grid-template-rows: auto auto auto 30px">
        <div>
          <v-card style="width: max-content">
            <v-img
              src="Image(card.image)"
              class="mx-auto rounded-lg"
              style="width: 320px; height: 200px"
            ></v-img>
            <v-card-title class="nametitle">
              มหาวิทยาลัยสงขลานครินทร์
            </v-card-title>
          </v-card>
        </div>

        <div>สรุปความคิดเห็น</div>
        <div style="margin-left: 1.5cm">
          <v-btn
            elevation="2"
            text
            class="mr-5 custom-button underline-button"
            style="font-size: 16px"
          >
            ภาพรวม
          </v-btn>

          <v-dialog v-model="dialog" persistent width="850px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                elevation="2"
                text
                class="ml-5 custom-button underline-button"
                style="font-size: 16px"
              >
                <v-icon size="15px">mdi-pencil</v-icon>
                รีวิว
              </v-btn>
            </template>

            <v-card>
              <v-card-actions class="d-flex mt-2">
                <v-card-text class="text-center">
                  <div
                    style="font-size: 20px; color: #000000; margin-bottom: 10px"
                  >
                    ตึกฟัก
                  </div>
                  <div
                    style="font-size: 18px; color: #000000; margin-bottom: 20px"
                    class="d-flex justify-center"
                  >
                    คะแนนความพึงพอใจ
                  </div>

                  <v-col>
                    <v-rating
                      v-model="userRating"
                      background-color="#e0e0e0"
                      color="#ffcc33"
                      class="custom-rating"
                    >
                    </v-rating>
                  </v-col>

                  <v-row>
                    <v-col md="10" class="mx-auto d-flex mt-2">
                      <v-textarea
                        outlined
                        name="input-7-4"
                        label="เล่าประสบการณ์ที่ได้จากสถานที่นี้โดยละเอียด"
                        value=""
                        height="100%"
                        width="100%"
                        style="margin-top: 0.5cm"
                      ></v-textarea>
                    </v-col>
                  </v-row>

                  <div
                    style="font-size: 16px; margin-left: 2.5cm; color: #000000"
                    class="d-flex"
                  >
                    เพิ่มรูปภาพ
                  </div>
                  <v-col class="mx-auto" style="margin-left: 2cm">
                    <input type="file" @change="handleFileUpload" />
                  </v-col>
                </v-card-text>

                <div class="button">
                  <v-btn
                    depressed
                    color="red"
                    class="mr-3 custom-button"
                    style="color: #ffffff"
                    @click="gotoBack()"
                  >
                    ยกเลิก
                  </v-btn>

                  <v-btn
                    depressed
                    class="ml-3 custom-button"
                    color="green"
                    style="color: #ffffff"
                    @click="updateData()"
                  >
                    โพสต์
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="d-flex mt-2">
          <div style="font-size: 16px; color: #000000">รีวิวทั้งหมด</div>
        </div>

        <div class="d-flex mt-2">
          {{ localTemplate }}
        </div>
        <div>
          <v-btn @click="localTemplate"> กลับเพื่อเลือกสถานที่ </v-btn>
        </div>
      </div>
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
      userRating: 0,
      imageUrl: null,
      dialog: false,
    };
  },
  components: {
    AppMapVue,
  },
  props: {
    currentTemplate: String,
  },

  methods: {
    data() {
      return {
        localTemplate: this.currentTemplate,
      };
    },
    watch: {
      currentTemplate(newVal) {
        this.localTemplate = newVal;
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
      switchDrawer() {
        this.$emit(
          "update:currentTemplate",
          this.currentTemplate === "otherTemplate"
            ? "drawerTemplate"
            : "otherTemplate"
        );
      },

      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            this.imageUrl = reader.result;
          };
          reader.readAsDataURL(file);
        }
      },

      Image(image) {
      return `data:image/jpeg;base64,${image}`;
    },

      gotoBack() {
        this.$router.go(-1);
      },
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
  padding: 20px 20px 20px 20px;
  width: 100%;
  height: 100%;
  margin: 0;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red !important;
}

.nametitle {
  font-size: 16px;
  justify-content: center;
  text-align: center;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.custom-rating .v-icon {
  font-size: 30px;
}

.custom-textarea {
  width: 100%;
  margin: 0 auto;
  border: 2px solid #999;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
}

.button {
  position: absolute;
  bottom: 5%;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #03178c;
  background-color: #ffffff;
  padding: 10px 20px;
  margin: 5px;
}

.underline-button {
  position: relative;
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
</style>
