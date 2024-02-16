import { createStore } from 'vuex'

const API = process.env.VUE_APP_API

export default createStore({
  state: {
    token: localStorage.getItem('token') || ''
  },
  getters: {
    isAuthenticated: state => !!state.token
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token
    },
    AUTH_FAILED: (state) => {
      state.token = ''
    }
  },
  actions: {
    async fetchLoginAsync({commit}, userData) {
      await fetch(`${API}/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

          .then(response => {
            return response.json()
          })
          .then(result => {
            commit('AUTH_SUCCESS', result.data.user_token)
            localStorage.setItem("token", result.data.user_token)
          })
          .catch(error => {
            commit('AUTH_FAILED')
            localStorage.token = ''
            console.log(error)
          })
    },
    async fetchLogoutAsync({commit}) {
      await fetch(`${API}/logout`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            return response.json()
          })
          .then(result => {
            console.log(result)
            commit('AUTH_FAILED')
            localStorage.removeItem('token')
          })
          .catch(error => {
            console.log(error)
          })
    }
  },
  modules: {
  }
})
