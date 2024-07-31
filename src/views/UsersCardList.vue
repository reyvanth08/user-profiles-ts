<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import api from "../services/service";
import UserCard from "@/components/UserCard.vue";

interface User {
    id: string;
    name: string;
    avatar: string;
    createdAt: string;
}

export default defineComponent({
    name: "UserCardList",
    components: { UserCard },
    setup() {
        const users = ref<User[]>([]);
        const loading = ref(false);

        onMounted(async () => {
            loading.value = true;
            try {
                const res = await api.getUsers();
                users.value = res.data;
            } catch (error) {
                console.error(error);
            } finally {
                loading.value = false;
            }
        });

        return { users, loading };
    },
});
</script>

<template>
    <div class="user-card-list">
        <h1 class="header">Users</h1>
        <div v-if="loading" class="loader">Loading...</div>
        <div class="user-cards">
            <UserCard v-for="user in users" :key="user.id" :user="user" />
        </div>
    </div>
</template>
