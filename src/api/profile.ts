import axios from 'axios';
import * as urls from '../config/urls';

export const fetch_profile_api = () => {
	return axios.get(urls.fetch_profile_url);
};
export const update_profile_photo_api = (photoData: string) => {
	const body = {
		photo: photoData,
	};

	return axios.post(urls.update_profile_photo_url, body);
};
