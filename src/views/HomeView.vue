<template>
  <v-app>
    <v-main>
      <v-container
        class="d-flex justify-content-center align-center mt-10 flex-wrap"
      >
        <v-row justify="center">
          <v-col cols="20" sm="10" md="8">
            <v-card class="custom-card">
              <v-img
                src="https://clib.psu.ac.th/memory/wp-content/uploads/2019/08/62.jpg"
                height="250px"
              ></v-img>
              <br />
              <v-card-text>
                <div
                  style="font-size: 20px; text-align: center; color: #000000"
                >
                  แผนที่แนะนำสถานที่อ่านหนังสือภายในมหาวิทยาลัยสงขลานครินทร์
                </div>
              </v-card-text>
              <br />
              <div class="text-center">
                <v-btn class="button" color="#03178C" @click="gotohome">
                  <v-icon style="color: #ffffff">mdi-map-marker</v-icon>
                  <span class="text" style="color: #ffffff"
                    >คลิกเพื่อดูแผนที่</span
                  >
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    gotohome() {
      this.$router.push("/searchpage");
    },
  },
};
</script>

<style>
.custom-card {
  width: 100%;
  height: 450px;
  padding: 16px;
}
.button-login {
  background-color: #1976d2;
  color: white;
}
.text-login {
  margin-left: 10px;
}
</style>
