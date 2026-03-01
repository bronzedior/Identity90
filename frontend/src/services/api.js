import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const generateAvatar = async (data) => {
    const formData = new FormData();
    formData.append('path', data.path);
    formData.append('region', data.region);
    formData.append('vibe', data.vibe);

    if (data.imageFile) {
        formData.append('image', data.imageFile);
    }

    const response = await api.post('/generate', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
