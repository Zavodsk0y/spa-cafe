<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
      ...mapGetters(['getActiveWorkshift', 'getWorkshifts'])
    },
    data() {
      return {
        activeWorkshift: {},
        workshifts: []
      }  
    },
    methods: {
      
    },
    async mounted() {
        await this.$store.dispatch('fetchActiveWorkshiftAsync'); 
        this.activeWorkshift = this.getActiveWorkshift;
        console.log(this.activeWorkshift);
        this.workshifts = this.getWorkshifts;
    }
}
</script>

<template>
awfawfwaf
{{ this.activeWorkshift }}
</template>

<style scoped>

</style>