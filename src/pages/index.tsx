import React, { useState } from 'react';
import { useEffect } from 'react';
import useParams from '@hooks/useParams';
import Header from '@components/detail/Header';
import Title from '@components/detail/Title';
import ContentInfo from '@interfaces/ContentInfo';
import { QueryClient, useQuery } from 'react-query';
import { getContentInfo, getSetting } from '../api/index';
import { getFirebaseLink } from '@utils/firebaselink';
import { getIntentUrl } from '@utils/redirect';
import { URLSearchParams } from 'url';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DefaultContents from '@components/DefaultContents';
import DetailContents from '@components/DetailContents';

const index = (props) => {
	const params = useParams();
	const location = useLocation();

	const [pageType, setPageType] = useState('default');
	const [firebaseLink, setFirebaseLink] = useState('');

	const aRtype = params.get('a_rtype');
	const iRtype = params.get('i_rtype');

	const queryClient = new QueryClient();

	const { data: settingData } = useQuery('settingInfo', getSetting);

	// useEffect(() => {
	// 	if (!firebaseLink) {
	// 		settingFirebaseLink();
	// 	} else {
	// 		console.log(' ************** firebaseLink ************* ', firebaseLink);
	// 	}
	// }, [firebaseLink]);

	useEffect(() => {
		// !VOD 상세페이지 ->  rtype, initType
		// !그외 -> aRtype, iRtype
		console.group('%c ######### urlParams -> type 확인 및 newParams -> return intentUrl ##########', 'color:yellow');

		const param = settingParamsType();
		console.log('url param : ', param);
		const intentUrl = getIntentUrl(param);
		console.log('intentUrl : ', intentUrl);
		console.groupEnd();

		// if (intentUrl?.android) {
		// 	window.location.href = intentUrl.android;
		// }

		// VOD 상세페이지 (유플릭스) 의 경우는 다른 스키마라서 해당 스키마일경우도 따로 찾아야함.
		if (aRtype === 'detail_page') {
			setPageType('detail');
			// TODO: VOD 상세페이지 일때니까 API 호출하고 화면그려야함
			document.getElementsByTagName('html')[0].classList.remove('index');
		} else {
			setPageType('default');
			// TODO: Default Page
			console.log('%c *********** TODO: Default Page', 'color:pink');
			document.getElementsByTagName('html')[0].classList.add('index');
		}
	}, [params]);

	// URL parmas 반복문 통해 key, value 세팅
	const settingParamsType = () => {
		const strUrl = location.search;
		const params = queryString.parse(strUrl);
		return params;
	};

	// Firebase Link 세팅
	const settingFirebaseLink = async () => {
		const params = {
			albumId: 'M01164R320PPV00',
			catId: 'E91VS',
			serCatId: undefined,
			albumName: '',
			synopsis: '',
			imgUrl: '',
			imgFileName: '',
		};
		const link = await getFirebaseLink(params);
		setFirebaseLink(link);
	};

	return <>{pageType === 'default' ? <DefaultContents /> : <DetailContents />}</>;
};

export default index;
