<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UserCard',
    props: {
        user: {
            type: Object, required: true
        }
    },
    setup() {
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

        return { formatDate, goToUserImages }
    }
})
</script>

<template>
    <div class="user-card" @click="goToUserImages(user.id)">
        <img :src="user.avatar" class="user-picture" loading="lazy" />
        <h2 class="title-username">{{ user.name }}</h2>
        <p class="date-user-card">{{ formatDate(user.createdAt) }}</p>
    </div>
</template>