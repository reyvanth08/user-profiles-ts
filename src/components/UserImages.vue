<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
	name: "UserImage",
	props: {
		images: {
			type: Array as PropType<{ id: string; imageURL: string }[]>,
			required: true
		}
	},
	setup(props, { emit }) {
		const selectedImage = ref('');
		const showModal = ref(false);
		const loading = ref(true);

		const openModal = (imageURL: string) => {
			selectedImage.value = imageURL;
			showModal.value = true;
			loading.value = true;
		};

		const closeModal = () => {
			showModal.value = false;
			selectedImage.value = '';
		};

		const deleteImage = (imageId: string) => {
			emit('delete-image', imageId);
		};

		const formatDate = (dateString: string) => {
			const options: Intl.DateTimeFormatOptions = {
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			return new Date(dateString).toLocaleDateString(undefined, options);
		};

		const handleImageLoad = () => {
			loading.value = false;
		};

		return { selectedImage, showModal, loading, openModal, closeModal, deleteImage, handleImageLoad, formatDate };
	}
});
</script>

<template>
	<div>
		<div class="image-gallery">
			<div v-for="image in images" :key="image.id" class="image-card">
				<img :src="image.imageURL + `?cache='20240731'`" class="gallery-image" @click="openModal(image.imageURL, image.name)" />
				<p class="image-name">{{ image.name }}</p>
				<p class="image-date">{{ formatDate(image.updatedAt) }}</p>
				<button class="delete-button" @click="deleteImage(image.id)">Delete</button>
			</div>
		</div>

		<!-- Modal -->
		<div v-if="showModal" class="modal-overlay">
			<div class="modal-content">
				<span class="close" @click="closeModal">&times;</span>
				<div v-if="loading" class="loader">Loading...</div>
				<img :src="selectedImage" class="modal-image" @load="handleImageLoad" @error="loading = false" />
			</div>
		</div>
	</div>
</template>
