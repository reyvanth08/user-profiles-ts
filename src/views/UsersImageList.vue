<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from "@/services/service";
import UserImages from '@/components/UserImages.vue';

interface UserImage {
	id: string;
	imageURL: string;
	name: string;
	updatedAt: string;
}

export default defineComponent({
	name: "UsersImagesPage",
	components: { UserImages },
	setup() {
		const route = useRoute();
		const router = useRouter();
		const loading = ref(false);

		const userId = route.params.id as string;
		const userName = ref('');
		const userImages = ref<UserImage[]>([]);

		const newImage = reactive({ name: '', imageURL: '' });

		const successMessage = ref('');
		const errorMessage = ref('');

		onMounted(async () => {
			loading.value = true;
			try {
				const res = await api.getImages(userId as string);
				userImages.value = res.data;
				userName.value = res.data[0]?.userId || "";
			} catch (error) {
				console.error(error)
			} finally {
				loading.value = false;
			}
		});

		const addImage = async () => {
			if (!newImage.name || !newImage.imageURL) {
				successMessage.value = '';
				errorMessage.value = 'Both image name and URL are required.';
				return;
			}

			errorMessage.value = '';
			loading.value = true;
			try {
				await api.addImage(userId, newImage);
				newImage.name = '';
				newImage.imageURL = '';
				successMessage.value = 'Image added successfully!';
				const res = await api.getImages(userId as string);
				userImages.value = res.data;
			} catch (error) {
				console.error(error)
			} finally {
				loading.value = false;
			}
		};

		const deleteImage = async (imageId: string) => {
			loading.value = true;
			try {
				await api.deleteImage(userId, imageId);
				successMessage.value = 'Image deleted successfully!';
				const res = await api.getImages(userId as string);
				userImages.value = res.data;
			} catch (error) {
				console.error(error)
			} finally {
				loading.value = false;
			}
		};

		const goBack = () => {
			router.back();
		};

		return { userImages, userName, newImage, loading, successMessage, errorMessage, addImage, deleteImage, goBack };
	}
});
</script>

<template>
	<div class="user-images-page">
		<div class="header-container">
			<button class="back-button" @click="goBack">Back</button>
			<h1 class="header">{{ userName }}'s Gallery</h1>
		</div>
		<div class="add-image-form">
			<input v-model="newImage.name" placeholder="Image Name" />
			<input v-model="newImage.imageURL" placeholder="Image URL" />
			<button @click="addImage">Add Image</button>
			<p v-if="successMessage" class="success-message">{{ successMessage }}</p>
			<p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
		</div>

		<div v-if="loading" class="loader">Loading...</div>

		<UserImages :images="userImages" @delete-image="deleteImage" />
	</div>
</template>