import { createStore } from "vuex";

const API = process.env.VUE_APP_API;

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    workshifts: [],
    workshiftOrders: []
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getWorkshifts: (state) => state.workshifts,
    getWorkshiftOrders: (state) => state.workshiftOrders
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_FAILED: (state) => {
      state.token = "";
    },
    SET_WORKSHIFTS: (state, workshifts) => {
      state.workshifts = workshifts;
    },
    ADD_WORKSHIFT: (state, workshift) => {
      state.workshifts.push(workshift);
    },
    CLOSE_WORKSHIFT: (state, workshiftId) => {
      const index = state.workshifts.findIndex(workshift => workshift.id === workshiftId);
      state.workshifts[index].active = false;
    },
    OPEN_WORKSHIFT: (state, workshiftId) => {
      const index = state.workshifts.findIndex(workshift => workshift.id === workshiftId);
      state.workshifts[index].active = true;
    },
    SET_WORKSHIFTS_ORDERS: (state, orders) => {
      state.workshiftOrders = orders;
    }
  },
  actions: {
    async fetchLoginAsync({ commit }, userData) {
      await fetch(`${API}/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          commit("AUTH_SUCCESS", result.data.user_token);
          localStorage.setItem("token", result.data.user_token);
        })
        .catch((error) => {
          commit("AUTH_FAILED");
          localStorage.token = "";
          console.log(error);
        });
    },
    async fetchLogoutAsync({ commit }) {
      await fetch(`${API}/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
          commit("AUTH_FAILED");
          localStorage.removeItem("token");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchWorkshiftsAsync({ commit }) {
      await fetch(`${API}/work-shift`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          commit("SET_WORKSHIFTS", result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createWorkshiftAsync({ commit }, workshiftData) {
      await fetch(`${API}/work-shift`, {
        method: "POST",
        body: JSON.stringify(workshiftData),
        headers: {
          "Content-Type": "application/json; chartset=utf8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
          commit("ADD_WORKSHIFT", result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async closeWorkshiftAsync({ commit }, workshiftId) {
      await fetch(`${API}/work-shift/${workshiftId}/close`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; chartset=utf8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
       .then((response) => {
          return response.json();
        })
       .then((result) => {
          commit("CLOSE_WORKSHIFT", workshiftId);
          console.log(result);
        })
       .catch((error) => {
          console.log(error);
        });
    },
    async openWorkshiftAsync({ commit }, workshiftId) {
      await fetch(`${API}/work-shift/${workshiftId}/open`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; chartset=utf8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
     .then((response) => {
          return response.json();
        })
     .then((result) => {
          commit("OPEN_WORKSHIFT", workshiftId);
          console.log(result);
        })
     .catch((error) => {
          console.log(error);
        });
    },
    async fetchWorkshiftOrdersAsync({ commit }, workshiftId) {
      await fetch(`${API}/work-shift/${workshiftId}/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; chartset=utf8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
          return response.json();
        })
      .then((result) => {
        commit("SET_WORKSHIFTS_ORDERS", result.data.orders);
          console.log(result.data.orders);
          console.log(result)
        })
      .catch((error) => {
          console.log(error);
        });
    }
  },
  modules: {},
});
