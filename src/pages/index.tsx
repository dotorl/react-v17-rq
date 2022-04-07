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

	const [firebaseLink, setFirebaseLink] = useState('');

	const aRtype = params.get('a_rtype');
	const iRtype = params.get('i_rtype');

	const queryClient = new QueryClient();

	const { data: settingData } = useQuery('settingInfo', getSetting);
	const {
		isLoading,
		isSuccess,
		isError,
		isFetching,
		data: contentInfo,
		refetch: contentInfoRefetch,
	} = useQuery<ContentInfo, Error>('contentInfo', getContentInfo, {
		retry: 3,
		staleTime: 6000,
		cacheTime: 0, // 0으로 안하면 inactive 상태에서 해당 초만큼 대기해서 값을 그대로 사용해서 화면 변화를 이룰 수 없음 ( 테스트용으로 빨리할 때 )
		enabled: false,
		refetchOnWindowFocus: false,
		//! The query will not execute until the settingData exists
		// enabled: !!settingData,
		// initialData: {}				// 캐시에 유지
		// placeholderData: {}	// 캐시에 유지 X
	});

	useEffect(() => {
		// TODO: ERROR
		if (isError) {
			console.log('TODO: 상세페이지 조회 Error라서 default Page로 이동');
		}
	}, [isError]);

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
			// TODO: VOD 상세페이지 일때니까 API 호출하고 화면그려야함
			console.log('%c *********** TODO: VOD 상세페이지 일때니까 API 호출하고 화면그려야함', 'color:pink');
			contentInfoRefetch();
			document.getElementsByTagName('html')[0].classList.remove('index');
		} else {
			// TODO: Default Page
			// queryClient.removeQueries('contentInfo');
			console.log('%c *********** TODO: Default Page', 'color:pink');

			// setTimeout(() => {
			document.getElementsByTagName('html')[0].classList.add('index');
			// }, 2000);
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

	if (isLoading) {
		return <>Loading....</>;
	}

	if (isError) {
		return <>ERROR</>;
	}

	return <>{isSuccess ? <DetailContents contentInfo={contentInfo} /> : <DefaultContents />}</>;
};

export default index;
