import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useParams from '@hooks/useParams';

const index = () => {
	const params = useParams();
	const albumId = params.get('id');
	// const history = useHistory();

	useEffect(() => {
		console.log(params.get('id'));

		if (params.get('id')) {
			// history.replace('/detail/' + params.get('id'));
		}

		setTimeout(() => {
			testMockAPI();
		}, 1000);
	}, []);

	const testMockAPI = async () => {
		const mockSettingAPI = await axios.get('/setting');
		console.log(mockSettingAPI);

		const mockInfoAPI = await axios.get('/info');
		console.log(mockInfoAPI);
	};

	return (
		<>
			<div>index</div>

			{albumId ? <p> params: {albumId}</p> : <p> no params</p>}
			<br />
			<Link to="/detail">Go Detail</Link>
			<br />
			<Link to="/detail?id=123">Go Detail 123</Link>
		</>
	);
};

export default index;
