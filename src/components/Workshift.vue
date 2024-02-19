<script>
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
  name: 'Workshift',
  data() {
    return {
        showModal: false,
        start: "",
        end: "",
        showModalOrders: false,
        userId: '',
    };
  },
  methods: {
    async createWorkshiftAsync() {
        const workshiftData = {
            start: this.start.replace('T', ' '),
            end: this.end.replace('T', ' ')
        }
        await this.$store.dispatch('createWorkshiftAsync', workshiftData);
            this.showModal = false;
    },
    async closeWorkshiftAsync(workshiftId) {
        await this.$store.dispatch('closeWorkshiftAsync', workshiftId);
        this.$store.dispatch('fetchWorkshiftsAsync');
    },
    async openWorkshiftAsync(workshiftId) {
        await this.$store.dispatch('openWorkshiftAsync', workshiftId);
        this.$store.dispatch('fetchWorkshiftsAsync');
    },
    async fetchWorkshiftOrdersAsync(workshiftId) {
        await this.$store.dispatch('fetchWorkshiftOrdersAsync', workshiftId);
    },
    async addEmployerToWorkshiftAsync(workshiftId) {
        const userId = {
            user_id: this.userId
        }
        this.userId = ''
        await this.$store.dispatch('addEmployerToWorkshiftAsync', {workshiftId, userId});
    }
  },
  computed: {
    ...mapGetters(['getWorkshifts', 'getWorkshiftOrders']),
    workshifts() {
      return this.getWorkshifts;
    },
    orders() {
        return this.getWorkshiftOrders;
    }
  },
  mounted() {
    this.$store.dispatch('fetchWorkshiftsAsync');
  },
};
</script>

<template>
    <h2>Смены</h2>
    <button @click="showModal = true">Открыть смену</button>
        <form @submit.prevent="createWorkshiftAsync" class="modal-container" v-if="showModal">
            <h2>Добавление смены</h2>
            <div>
                <label for="start">Начало</label>
                <input type="datetime-local" name="start" id="start" v-model="start">
            </div>
            <div>
                <label for="end">Конец</label>
                <input type="datetime-local" name="end" id="end" v-model="end">
            </div>
            <div>
                <button class="approve_button" type="submit">Отправить</button>
                <button @click="showModal = false">Закрыть</button>
            </div>
        </form>
        <h2>Активная смена</h2>
    <div class="workshifts active">
        <div class="card" v-for="workshift in workshifts">
            <div class="workshift" v-if="workshift.active !== 0">
            <h3>Смена {{ workshift.id }}</h3>
            <p>Начало смены: {{ workshift.start }}</p>        
            <p>Окончание смены {{ workshift.end }}</p>
            <p>Статус: Открыта</p>
            <button @click="closeWorkshiftAsync(workshift.id)">Закрыть смену</button>
            <button @click="showModalOrders = true" v-on:click="fetchWorkshiftOrdersAsync(workshift.id)">Заказы</button>
            </div>
        </div>
    </div>
    <h2>Закрытые смены</h2>
    <div class="workshifts">
        <div class="card" v-for="closedWorkshift in workshifts">
            <div class="workshift" v-if="closedWorkshift.active === 0">
                <h3>Смена {{ closedWorkshift.id }}</h3>
                <p>Начало смены: {{ closedWorkshift.start }}</p>        
                <p>Окончание смены {{ closedWorkshift.end }}</p>
                <p>Статус: Закрыта</p>
                <form @submit.prevent="addEmployerToWorkshiftAsync(closedWorkshift.id)">
                    <div>
                        <label for="amount">Идентификатор пользователя</label>
                        <input type="number" name="userId" id="userId" v-model="userId">
                    </div>
                    <div>
                        <button class="approve_button" type="submit">Добавить сотрудника</button>
                    </div>
                </form>
                <button @click="showModalOrders = true" v-on:click="fetchWorkshiftOrdersAsync(closedWorkshift.id)">Заказы</button>
            </div>
        </div>
    </div>
    <div class="modal-container" v-if="showModalOrders">
        <h2>Заказы смены</h2>
        <div v-for="order in orders" :key="order.id">
            <div>{{ order.table }} - {{ order.status }}</div>
            <div>Работники: {{ order.shift_workers }}</div>
            <div>Цена: {{ order.price }}</div>
            <div>Итоговая сумма за смену</div>
        </div>
        <button @click="showModalOrders = false">Закрыть</button>
    </div>
</template>

<style scoped>

.workshifts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.workshift {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
    border: 2px solid gray;
    align-items: center;
}

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

.modal-container > div {
    display: flex;
    gap: 5px;
}

.active {
    display: flex;
    justify-content: center;
}

</style>
