import { loadContentInfo } from '@interfaces/ContentInfo';
import axios from 'axios';

export const getContentInfo = async () => {
	const response = await axios.get('/info');
	return loadContentInfo(response.data.record);
};

export const getSetting = async () => {
	const response = await axios.get('/setting');
	return response.data;
};
