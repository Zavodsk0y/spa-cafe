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
    }
  },
  computed: {
    ...mapGetters(['getWorkshifts']),
    workshifts() {
      return this.getWorkshifts;
    },
  },
  mounted() {
    this.$store.dispatch('fetchWorkshiftsAsync');
  },
};
</script>

<template>
    <h2>Смены</h2>
    <button @click="showModal = true">Добавить смену</button>
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
            </div>
        </div>
    </div>
    <h2>Закрытые смены</h2>
    <div class="workshifts">
        <div class="card" v-for="workshift in workshifts">
            <div class="workshift" v-if="workshift.active === 0">
            <h3>Смена {{ workshift.id }}</h3>
            <p>Начало смены: {{ workshift.start }}</p>        
            <p>Окончание смены {{ workshift.end }}</p>
            <p>Статус: Закрыта</p>
            <button @click="openWorkshiftAsync(workshift.id)">Открыть смену</button>
            </div>
        </div>
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
