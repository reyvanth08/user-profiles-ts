<script lang="ts">
import { defineComponent, ref, PropType, watch, onMounted } from 'vue';

interface ImageWithRandomSuffix {
    id: string;
    imageURL: string;
    name: string;
    updatedAt: string;
    randomSuffix: string;
}

export default defineComponent({
    name: "UserImage",
    props: {
        images: {
            type: Array as PropType<{ id: string; imageURL: string; name: string; updatedAt: string }[]>,
            required: true
        }
    },
    setup(props, { emit }) {
        const selectedImage = ref('');
        const showModal = ref(false);
        const loading = ref(true);
        const imagesWithRandomSuffix = ref<ImageWithRandomSuffix[]>([]);

        //function for keeping the user images without getting refreshed
        const updateImagesWithRandomSuffix = () => {
            imagesWithRandomSuffix.value = props.images.map(image => ({
                ...image,
                randomSuffix: `?r=${Math.random()}`
            }));
        };

        onMounted(() => {
            updateImagesWithRandomSuffix();
        });

        //to recalculate imagesWithRandomSuffix whenever props.images changes
        watch(() => props.images, () => {
            updateImagesWithRandomSuffix();
        }, { immediate: true });

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

        return {
            selectedImage, showModal, loading, openModal, closeModal, deleteImage, handleImageLoad, formatDate,
            imagesWithRandomSuffix
        };
    }
});
</script>

<template>
    <div>
        <div class="image-gallery">
            <div v-for="image in imagesWithRandomSuffix" :key="image.id" class="image-card">
                <img v-lazyload :data-src="image.imageURL + image.randomSuffix" class="gallery-image" @click="openModal(image.imageURL)"
                    loading="lazy" />
                <p class="image-name">{{ image.name }}</p>
                <p class="image-date">{{ formatDate(image.updatedAt) }}</p>
                <button class="delete-button" @click="deleteImage(image.id)"></button>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <div v-if="loading" class="loader">Loading...</div>
                <img :src="selectedImage" class="modal-image" @load="handleImageLoad" @error="loading = false"
                    loading="lazy" />
            </div>
        </div>
    </div>
</template>
