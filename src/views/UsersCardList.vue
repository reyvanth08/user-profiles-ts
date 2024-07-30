<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../services/service";

interface User {
    id: string;
    name: string;
    avatar: string;
    createdAt: string;
}

export default defineComponent({
    name: "UserCardList",
    setup() {
        const users = ref<User[]>([]);
        const router = useRouter();

        onMounted(async () => {
            const res = await api.getUsers();
            users.value = res.data;
            console.log(res.data);
        });

        const formatDate = (dateString: string) => {
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        const goToUserImages = (userId: string) => {
            router.push(`/user/${userId}`);
        };

        return { users, formatDate, goToUserImages };
    },
});
</script>

<template>
    <div class="user-card-list">
        <h1 class="header">Users</h1>
        <div class="user-cards">
            <div
                v-for="user in users"
                :key="user.id"
                class="user-card"
                @click="goToUserImages(user.id)"
            >
                <img :src="user.avatar" class="picture" />
                <h2 class="title">{{ user.name }}</h2>
                <p class="date">{{ formatDate(user.createdAt) }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    background-color: #f7f9fc;
    font-family: "Arial", sans-serif;
    color: #333;
}

.user-card-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.header {
    font-size: 36px;
    color: #34495e;
    margin-bottom: 10px;
}

.sub-header {
    font-size: 18px;
    color: #7f8c8d;
    margin-bottom: 20px;
}

.user-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.user-card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    width: 250px;
    cursor: pointer;
    overflow: hidden;
    text-align: left;
}

.user-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.picture {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.title {
    padding: 15px;
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
    text-align: center;
}

.date {
    padding: 0 15px 15px;
    color: #95a5a6;
    font-size: 14px;
    text-align: center;
}

@media (max-width: 768px) {
    .user-cards {
        flex-direction: column;
        align-items: center;
    }
}
</style>
