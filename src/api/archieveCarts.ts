import axios from 'axios';
import * as urls from '../config/urls';

export const fetch_archieve_carts_api = (pageNumber?: number, pageSize?: number) => {
		const config = {
				params: {
						currentPage: pageNumber,
						pageSize: pageSize,
				},
		};
		return axios.get(urls.fetch_archive_cart_url, config);
};
