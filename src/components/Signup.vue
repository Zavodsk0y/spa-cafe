<script>
export default {
    data() {
        return {
            name: null,
            login: null,
            password: null,
            photoFile: null,
            roleId: null
        }
    },
  methods: {
    uploadFile() {
        this.photoFile = this.$refs.file.files[0];
      },
    signupNewEmployerAsync() {
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('login', this.login);
        formData.append('password', this.password);
        formData.append('photo_file', this.photoFile);
        formData.append('role_id', this.roleId);

        this.$store.dispatch('signupNewEmployerAsync', formData);
    }
  }
}
</script>

<template>
    <h2>Регистрация нового пользователя в системе</h2>
    <h3>Заполните форму ниже, чтобы добавить нового сотрудника</h3>
    <form @submit.prevent="signupNewEmployerAsync" id="form" enctype="multipart/form-data" method="post">
        <div>
            <label for="login_enter">Имя</label>
            <input type="text" name="name" id="name_enter" v-model="name">
        </div>
        <div>
            <label for="login_enter">Логин</label>
            <input type="text" name="login" id="login_enter" v-model="login">
        </div>
        <div>
            <label for="password_enter">Пароль</label>
            <input type="password" name="password" id="password_enter" v-model="password">
        </div>
        <div>
            <label for="file_enter">Фотография</label>
            <input type="file" name="photo_file" id="file_enter" @change="uploadFile" ref="file">
        </div>
        <div>
            <label for="role_enter">Роль</label>
            <input type="number" name="role_id" id="role_enter" v-model="roleId">
        </div>
        <div>
            <button class="approve_button" type="submit">Отправить</button>
            <button class="cancel_button">Отмена</button>
        </div>
    </form>

</template>

<style scoped>

button  {
  border: none;
  font-weight: bold;
  width: 225px;
  height: 80px;
  background: dodgerblue;
  color: aliceblue;
  font-size: 18px;
  cursor: pointer;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

form:nth-child(0) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

form > div {
    display: flex;
    gap: 10px;
}

</style>