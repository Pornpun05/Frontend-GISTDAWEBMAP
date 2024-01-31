<template>
  <v-dialog v-model="dialog" persistent width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
    </template>

    <v-card>
      <v-card-actions class="d-flex mt-2">
        <v-card-text class="text-center">
          <div style="font-size: 20px; color: #000000">ตึกฟัก</div>
          <div
            style="font-size: 18px; color: #000000"
            class="d-flex justify-center mt-5">
            คะแนนความพึงพอใจ
          </div>

          <v-col>
            <v-rating
              v-model="userRating"
              background-color="#e0e0e0"
              color="#ffcc33"
              class="custom-rating">
            </v-rating>
          </v-col>

          <v-row>
            <v-col md="10" class="mx-auto d-flex">
              <v-textarea
                outlined
                name="input-7-4"
                label="เล่าประสบการณ์ที่ได้จากสถานที่นี้โดยละเอียด"
                value=""
                height="100%"
                width="100%"
              ></v-textarea>
            </v-col>
          </v-row>

          <div
            style="font-size: 16px; margin-left: 2.5cm; color: #000000"
            class="d-flex">
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
            @click="gotoBack()">
            ยกเลิก
          </v-btn>

          <v-btn
            depressed
            class="ml-3 custom-button"
            color="green"
            style="color: #ffffff"
            @click="updateData()">
            โพสต์
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      userRating: 0,
      imageUrl: null,
      dialog: false,
    };
  },
  methods: {
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
    gotoBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
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
</style>
