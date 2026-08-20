import axios from "axios";

const API_KEY = process.env.API_KEY;

export async function getYoutubeVideos(categoryId: string) {

    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&hl=pt_BR&maxResults=45&regionCode=br&videoCategoryId=${categoryId}&key=${API_KEY}`;

    const response = await axios.get(url);

    return response.data;
}