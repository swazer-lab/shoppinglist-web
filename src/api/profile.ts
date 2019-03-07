import axios from 'axios';
import * as urls from '../config/urls';

export const fetch_profile_api = () => {
	return axios.get(urls.fetch_profile_url);
};
