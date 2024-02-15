<template>
  <v-app>
    <v-main>
      <v-container fluid class="d-flex justify-content-center align-center">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card-title
              class="namemap"
              style="font-family: 'Arial', sans-serif"
            >
              แผนที่แนะนำสถานที่อ่านหนังสือภายในมหาวิทยาลัยสงขลานครินทร์
            </v-card-title>
            <v-card style="width: max-content">
              <v-img
                src="https://campus.campus-star.com/app/uploads/2016/10/mhu.jpg"
                class="mx-auto rounded-lg"
                style="max-width: 100%; height: auto"
              ></v-img>
            </v-card>
            <v-card
              class="d-flex justify-center align-center mt-2"
              style="max-width: 100%; height: 70px"
            >
              <v-btn class="button" color="#03178c" @click="gotohome">
                <v-icon style="color: aliceblue">mdi-map-marker</v-icon>
                <span
                  class="text"
                  style="
                    color: aliceblue;
                    font-size: medium;
                    font-family: 'Arial', sans-serif;"
                >
                  คลิกเพื่อดูแผนที่
                </span>
              </v-btn>
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
  padding: 100px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.custom-card:hover {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  transform: scale(1.02);
}

.custom-card::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.7)
  );
}

.namemap {
  font-size: 20.5px;
  text-align: center;
  color: #03178c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  color: aliceblue;
}
</style>
