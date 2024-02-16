<script>
export default {
  methods: {
    async fetchLogout() {
      await this.$store.dispatch("fetchLogoutAsync")
      this.$router.push('/login')
    }
  }
}
</script>

<template>
<h2>Выход</h2>
  <h3>Нажмите на кнопку ниже, чтобы выйти из аккаунта</h3>
  <button @click="fetchLogout">Выйти</button>
</template>

<style scoped>

button  {
  border: none;
  font-weight: bold;
  width: 225px;
  height: 80px;
  background: crimson;
  color: aliceblue;
  font-size: 18px;
  cursor: pointer;
}

</style>