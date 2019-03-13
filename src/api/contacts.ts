import axios from 'axios';

import * as urls from '../config/urls';

export const fetch_contacts_api = (pageNumber?: number, pageSize?: number) => {
	const config = {
		params: {
			currentPage: pageNumber,
			pageSize,
		},
	};

	return axios.get(urls.fetch_contacts_url, config);
};
