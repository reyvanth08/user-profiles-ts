import axios from "axios";

const api = axios.create({
    baseURL: "https://66a7a72953c13f22a3d09723.mockapi.io/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default {
    getUsers() {
        return api.get("/users");
    },

    getImages(userId: string) {
        return api.get(`/users/${userId}/images`);
    },

    addImage(
        userId: string,
        image: {
            name: string;
            imageURL: string;
        }
    ) {
        return api.post(`/users/${userId}/images`, image);
    },

    deleteImage(userId: string, imageId: string) {
        return api.delete(`/users/${userId}/images/${imageId}`);
    },
};
