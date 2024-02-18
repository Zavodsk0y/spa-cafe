<script>
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
  name: 'Workshift',
  data() {
    return {
        showModal: false
    };
  },
  methods: {
    
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
    <div class="modal-container" v-if="showModal">
        <button @click="showModal = false">Закрыть</button>
    </div>
    <div class="workshifts">
        <div class="card" v-for="workshift in workshifts">
            <div class="workshift" v-if="workshift.active !== 0">
            <h3>Смена {{ workshift.id }}</h3>
            <p>Начало смены: {{ workshift.start }}</p>        
            <p>Окончание смены {{ workshift.end }}</p>
            <p v-if="workshift.active === 0">Не активна</p>
            <p v-else>Статус: Открыта</p>
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
    border: 2px solid gray
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
}

</style>
