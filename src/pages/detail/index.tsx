import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import useParams from '@hooks/useParams';

const Detail = () => {
	const params = useParams();

	useEffect(() => {
		console.log(params.get('id'));

		setTimeout(() => {
			testMockAPI();
		}, 1000);
	}, []);

	const testMockAPI = async () => {
		const mockAPI = await axios.get('/fruits');
		console.log(mockAPI);
	};

	return <div>detail</div>;
};

export default Detail;
