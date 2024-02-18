<script>
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
  name: 'Workshift',
  data() {
    return {};
  },
  methods: {},
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
    <div class="workshifts">
        <div class="card" v-for="workshift in workshifts">
            <div class="workshift" v-if="workshift.active !== 0">
            <h3>Смена {{ workshift.id }}</h3>
            <p>Начало смены: {{ workshift.start }}</p>        
            <p>Окончание смены {{ workshift.end }}</p>
            <p v-if="workshift.active === 0">Не активна</p>
            <p v-else>Активна</p>
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

</style>
