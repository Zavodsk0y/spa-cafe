<script>
import { mapGetters } from 'vuex';
export default {
    name: "Cook",
    data() {
        return {
            orders: [],
            convertStatusData: {
                preparing: "Готовится",
                ready: "Готово",
            }
        }
    },
    computed: {
        ...mapGetters(['getOrders']),
        getUndoneOrders() {
            return this.getOrders
        }
    },
    methods: {
        async changeStatusAsync(cook) {
            const status = cook.status === "Принят" ? "preparing" : "ready"
            await this.$store.dispatch('changeStatusAsync', {
                id: cook.id,
                status: status
            })
        }
    },
    async mounted() {
        await this.$store.dispatch('fetchOrdersAsync')
        this.orders = this.getOrders
    }
}
</script>

<template>
    <div>
        <header>
            <article>
                logo
            </article>
        </header>
        <section class="employees">
            <article class="card">
                <div v-for="cook in undoneOrders" :key="cook.id">
                    <p>Имя: {{ cook.table }}</p>
                    <p>Статус: {{ convertStatusData[cook.status] || cook.status }}</p>
                    <p>Должность: {{ cook.shift_workers }}</p>
                    <button @click="changeStatus(cook)">Изменить</button>
                </div>
            </article>
        </section>
    </div>
</template>

<style scoped></style>