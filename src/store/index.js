import { createStore } from "vuex";

const API = process.env.VUE_APP_API;

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    workshifts: [],
    workshiftOrders: [],
    users: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getWorkshifts: (state) => state.workshifts,
    getWorkshiftOrders: (state) => state.workshiftOrders,
    getUsers: (state) => state.users,
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
    },
    ADD_USER: (state, user) => {
      state.users.push(user)
    },
    SET_USERS: (state, users) => {
      state.users = users;
    },
    FIRE_USER: (state, userId) => {
      state.users = state.users.filter(user => user.id === userId)
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
    },
    async addEmployerToWorkshiftAsync({ commit }, {workshiftId, userId}) {
      await fetch(`${API}/work-shift/${workshiftId}/user`, {
        method: "POST",
        body: JSON.stringify(userId),
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
      })
      .catch((error) => {
        console.log(error);
      })
    },
    async signupNewEmployerAsync({ commit }, employerData) {
      typeof employerData
      await fetch(`${API}/user`, {
        method: "POST",
        body: employerData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
       return response.json();
      })
      .then((result) => {
        console.log(result);
        commit("ADD_USER", employerData);
      })
      .catch((error) => {
        console.log(error);
      })
    },
    async fetchUsersAsync({ commit }) {
      await fetch(`${API}/user`, {
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
       console.log(result);
       commit("SET_USERS", result.data);
     })
     .catch((error) => {
        console.log(error);
     })
    },
    async fireEmployerAsync({commit}, employerId) {
      await fetch(`${API}/user/${employerId}/to-dismiss`, {
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
        console.log(result);
        commit('FIRE_USER', employerId);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
  modules: {},
});
