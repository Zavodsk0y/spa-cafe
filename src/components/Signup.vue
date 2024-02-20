<script>
import { mapGetters } from 'vuex';
export default {
    name: "User",
    data() {
        return {
            name: null,
            login: null,
            password: null,
            photoFile: null,
            roleId: null,
            showDropdown: false
        }
    },
    computed: {
        ...mapGetters(['getUsers', 'getUser']),
        users() {
            return this.getUsers
        },
        user() {
            return this.getUser
        }
    },
    methods: {
        uploadFile() {
            this.photoFile = this.$refs.file.files[0];
        },
        async signupNewEmployerAsync() {
            let formData = new FormData();
            formData.append('name', this.name);
            formData.append('login', this.login);
            formData.append('password', this.password);
            formData.append('photo_file', this.photoFile);
            formData.append('role_id', this.roleId);

            await this.$store.dispatch('signupNewEmployerAsync', formData);
            this.name = null
            this.login = null
            this.password = null
            this.photoFile = null
            this.roleId = null
            this.$store.dispatch('fetchUsersAsync');
        },
        async fireEmployerAsync(employerId) {
            await this.$store.dispatch('fireEmployerAsync', employerId);
            this.$store.dispatch('fetchUsersAsync');
        },
        async fetchUserAsync(userId) {
            await this.$store.dispatch('fetchUserAsync', userId);
        }
    },
    mounted() {
        this.$store.dispatch('fetchUsersAsync');
    }
}
</script>

<template>
    <h2>Регистрация нового пользователя в системе</h2>
    <h3>Заполните форму ниже, чтобы добавить нового сотрудника</h3>
    <form @submit.prevent="signupNewEmployerAsync" id="form" enctype="multipart/form-data" method="post">
        <div>
            <label for="login_enter">Имя</label>
            <input type="text" name="name" id="name_enter" v-model="name" required>
        </div>
        <div>
            <label for="login_enter">Логин</label>
            <input type="text" name="login" id="login_enter" v-model="login" required>
        </div>
        <div>
            <label for="password_enter">Пароль</label>
            <input type="password" name="password" id="password_enter" v-model="password" required>
        </div>
        <div>
            <label for="file_enter">Фотография</label>
            <input type="file" name="photo_file" id="file_enter" @change="uploadFile" ref="file">
        </div>
        <div>
            <label for="role_enter">Роль</label>
            <input type="number" name="role_id" id="role_enter" v-model="roleId" required>
        </div>
        <div>
            <button class="approve_button" type="submit">Отправить</button>
            <button class="cancel_button">Отмена</button>
        </div>
    </form>
    <h2>Список сотрудников</h2>
    <div class="cards">
        <div v-for="user in users">
            <div v-if="user.status !== 'fired'" class="card">
                <h3>{{ user.name }}</h3>
                <p>Роль: {{ user.group }}</p>
                <div>
                    <button @click="showDropdown = true" v-on:click="fetchUserAsync(user.id)">Полная информация</button>
                    <button @click="fireEmployerAsync(user.id)">Уволить сотрудника</button>
                </div>
            </div>
        </div>
    </div>
    <div id="myDropdown" class="modal-container" v-if="showDropdown">
        <p>Имя: {{ user.name }}</p>
        <p>Логин {{ user.login }}</p>
        <p>Роль: {{ user.group }}</p>
        <button @click="showDropdown = false">Закрыть</button>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid grey;
    gap: 2px;
    position: relative;
}

.card  > div {
    display: flex;
    gap: 5px;
}

.card > div > button {
    width: 120px;
    height: 50px;
    font-size: 14px;
}

.card > div > button:last-child {
    background: crimson;

}

.cards {
    display: grid;
    grid-template-columns: repeat(6, 300px);
    justify-content: center;
    gap: 10px;
}

button {
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

form>div {
    display: flex;
    gap: 10px;
}

/* Dropdown Content (Hidden by Default) */
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    gap: 30px;
    flex-direction: column;
    color: aliceblue
}
  
  /* Links inside the dropdown */
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {background-color: #ddd;}
  
  /* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
  .show {display:block;}
</style>