<script>
  export default {
    name: "Login",
    data() {
      return {
        login: "",
        password: ""
      }
    },
    methods: {
      async fetchLogin() {
        const userData = {
          login: this.login,
          password: this.password
        }
        await this.$store.dispatch("fetchLoginAsync", userData)
        this.$router.push('/about')
        this.login = ""
        this.password = ""
      }
    }
  }
</script>

<template>
  <form @submit.prevent="fetchLogin">
    <h2>Авторизация</h2>
    <div>
      <label for="login_enter">Логин</label>
      <input type="text" name="login" id="login_enter" v-model="login">
    </div>
    <div>
      <label for="password_enter">Пароль</label>
      <input type="password" name="password" id="password_enter" v-model="password">
    </div>
    <div>
      <button class="approve_button" type="submit">Отправить</button>
      <button class="cancel_button">Отмена</button>
    </div>
  </form>
</template>

<style scoped>

</style>