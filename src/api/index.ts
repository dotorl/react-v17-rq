import axios from 'axios';

export const getContentInfo = async () => {
	const response = await axios.get('/info');
	return response.data;
};

export const getSetting = async () => {
	const response = await axios.get('/setting');
	return response.data;
};
