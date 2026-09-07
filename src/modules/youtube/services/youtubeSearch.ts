import axios from "axios";

const API_KEY = process.env.API_KEY;

export async function searchYoutubeVideos(search: string) {

    const searchVideos = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=48&&key=${API_KEY}`;

    const response = await axios.get(searchVideos);

    return response.data;
}