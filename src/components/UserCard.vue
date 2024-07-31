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
		<img :src="user.avatar" class="picture" />
		<h2 class="title">{{ user.name }}</h2>
		<p class="date">{{ formatDate(user.createdAt) }}</p>
	</div>
</template>