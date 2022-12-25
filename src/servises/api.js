import axios from 'axios';

const API_KEY = '30801365-9fdc371d6ba359459ec7eb092';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(query, page) {
    const response = await axios.get("", {
        params: {
            key: API_KEY,
            q: query,
            page,
            image_type: "photo",
            orientation: "horizontal",
            per_page: 12,
        }
    });
    return response.data;
}

