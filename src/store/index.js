import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // place: [],
    drawer: false,
    valueMarker: null,
    placeLocation: null,
  },
  getters: {},
  mutations: {},
  actions: {
    async loadData() {
      try {
        const result = await axios.get("http://localhost:5000/getlist");
        this.place = result.data.data;
        for (let i = 0; i < this.place.length; i++) {
          this.place[i].image = "data:image/jpeg;base64," + this.place[i].image;
        }
        console.log(this.place);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
