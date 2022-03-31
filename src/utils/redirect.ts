import {
	mapDefaultParamsType1,
	mapDefaultParamsType2,
	mapDefaultParamsType3,
	mapDefaultParamsType4,
	mapDefaultParamsType5,
	mapDefaultParamsType6,
	mapDefaultParamsType6_1,
	mapDefaultParamsType7,
	mapDefaultParamsType8,
} from '@interfaces/DefatulSearchParams';

interface IIntentUrl {
	android: string;
	ios: string;
}

// getRedirectPath
export const getIntentUrl = (params): IIntentUrl | undefined => {
	const { a_rtype, rtype } = params;

	switch (a_rtype || rtype) {
		// 실시간 채널
		case 'live_vod': {
			console.log('%c### [getRedirect] - 실시간 채널', 'color: #ff0000');
			// TODO: 필수값 체크 및 확인 필요
			// if (!a_rtype || !i_rtype || !service_id || !multi_channel) {
			// 	console.log('[실시간채널] 필수값 없음');
			// 	return;
			// }

			const newParams = mapDefaultParamsType1(params);
			console.log(' newParams : ', newParams);
			const redirectUrl = {
				android: `hdtvexternalcall://live_vod?main_run=Y&auth_check=Y&backkey_finish=Y&is_splash=${newParams.is_splash}&service_id=${newParams.service_id}&multi_channel=${newParams.multi_channel}`,
				ios: `hdtvexternalcall://live_vod?service_id=${newParams.service_id}`,
			};
			return redirectUrl;
		}

		// VOD재생(본편보기)
		case 'vod_play': {
			// TODO: 안에 여러 케이스로 나눠서 각 다른 링크 만들어야함
			// VOD 본편, 다운로드, 맛보기, 마이컷
			// ?마이컷 보기는 연동 규격 따로 존재함????
			console.log('%c### [getRedirect] - VOD 재생(본편보기)', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// if (!a_rtype || !i_rtype || !i_vod_type || !vod_type || !contents_id || !category_id || !series_num) {
			// 	console.log('[ VOD재생(본편보기) ] 필수값 없음');
			// 	return;
			// }

			// hdtvexternalcall://play_vod?vod_type=2&contents_id=M011587733PPV00&category_id=E91VM&series_num=-1
			// hdtvexternalcall://play_vod?vod_type=1&contents_id=M01135OA15PPV00&category_id=E8AK1&series_num=5
			// hdtvexternalcall://play_vod?vod_type=3&contents_id=M01155C335PPV00&category_id=D8023
			// hdtvexternalcall://play_vod?vod_type=4&contents_id=M01154L008PPV00&category_id=D801M
			// !IOS series_num 이 아예 존재하지 않는 경우가 있음 ( 설명에는 해당값으로 시리즈인지 단편인지 구분되는값인데 없는게 말이안됨 : 단편 -1 , 시리즈 0~ )

			// category_id , series_num 모두 단편일떄, 시리즈일때 나뉘게되는데 애초에 전달받는 params에서 나뉘어서 전달받기때문에 그대로 사용하면 됨
			const newParams = mapDefaultParamsType2(params);
			console.log(' newParams : ', newParams);
			const redirectUrl = {
				android: `hdtvexternalcall://vod_play?main_run=Y&auth_check=Y&backkey_finish=Y&is_splash=${newParams.is_splash}&contents_id=${newParams.contents_id}&category_id=${newParams.category_id}&vod_type=${newParams.vod_type}`,
				ios: `hdtvexternalcall://play_vod?vod_type=${newParams.i_vod_type}&contents_id=${newParams.contents_id}&category_id=${newParams.category_id}&series_num=${newParams.series_num}`,
			};
			return redirectUrl;
		}

		// 하이라이트 재생
		case 'highlight': {
			console.log('%c### [getRedirect] - 하이라이트재생', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// seriesNo는 option값이라 제외
			// if (!a_rtype || !i_rtype || !title || !start_time || !end_time || !contents_id || !category_id || !i_contents_id || !i_category_id) {
			// 	console.log('[ 하이라이트 재생 ] 필수값 없음');
			// 	return;
			// }

			// ? IOS i_category_id 값이 url로 받게되는데 왜 빨간색으로 표시되어있는지 확인 필요
			const newParams = mapDefaultParamsType3(params);
			console.log(' newParams : ', newParams);
			const redirectUrl = {
				android: `hdtvexternalcall://highlight?main_run=Y&auth_check=Y&backkey_finish=Y&is_splash=${newParams.is_splash}&title=${newParams.title}!&category_id=${newParams.category_id}&contents_id=${newParams.contents_id}&start_time=${newParams.start_time}&end_time=${newParams.end_time}&seriesNo=${newParams.seriesNo}`,
				ios: `hdtvexternalcall://play_h_vod?contents_id=${newParams.i_contents_id}&category_id=${newParams.i_category_id}`,
			};
			return redirectUrl;
		}

		// 탭 메뉴 바로가기 ( 마이컷, 선물함 추가)
		case 'tab_menu': {
			// TODO: 안에 여러 케이스로 나눠서 각 다른 링크 만들어야함
			// 굿모닝 핫비디오, 쿠폰함(이용 가능한쿠폰), 쿠폰함(쿠폰 등록), 쿠폰함(무료 하루권), 찜 목록, 시청 목록, 다운로드 목록, 구매 목록, 지상파, 케이블,
			// #장르 code
			// 알림 목록, OneID 가입페이지, SNS ID 가입 페이지, 설정 페이지, 마이 비디오 페이지, 마이컷 보관함, 선물함 페이지, 월정액 페이지 (cat_depth1: monthly, cat_depth2: 상품코드)
			console.log('%c### [getRedirect] - 텝 메뉴 바로가기', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// || !cat_depth2 || !cat_depth3 || !cat_depth4    optional 인듯
			// if (!a_rtype || !i_rtype || !cat_depth1) {
			// 	console.log('[ 탭 메뉴 바로가기 ( 마이컷, 선물함 추가) ] 필수값 없음');
			// 	return;
			// }

			// ? 앞의 유형에서는 main_run=Y&auth_check=Y&backkey_finish=Y
			// ? 탭 메뉴 바로가기에서는 main_run=Y&auth_check=&backkey_finish=  비어있음 이부분에 대해서도 확인 필요함 ( )
			// ? android의 경우 cat_depth3,4 없으면 안넣어도 된다고하는데 코드에서는 3,4를 아예 안씀. 그리고 전달 파라미터에서 그냥 강제로 넣어도 정상작동하는지 확인 필요함
			const newParams = mapDefaultParamsType4(params);
			console.log(' newParams : ', newParams);
			const redirectUrl = {
				android: `hdtvexternalcall://tab_menu?main_run=Y&auth_check=&backkey_finish=&is_splash=${newParams.is_splash}&cat_depth1=${newParams.cat_depth1}&cat_depth2=${newParams.cat_depth2}&cat_depth3=${newParams.cat_depth3}&cat_depth4=${newParams.cat_depth4}`,
				ios: `hdtvexternalcall://tab_menu?cat_depth1=${newParams.cat_depth1}&cat_depth2=${newParams.cat_depth2}&cat_depth3=${newParams.cat_depth3}&cat_depth4=${newParams.cat_depth4}`,
			};
			return redirectUrl;
		}

		// 이벤트페이지
		case 'event_page': {
			console.log('%c### [getRedirect] - 이벤트 페이지', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// if (!a_rtype || !i_rtype || !bbs_id || !reg_id) {
			// 	console.log('[ 이벤트페이지 ] 필수값 없음');
			// 	return;
			// }

			// ? bbs_id 값 입력없이 빈칸으로 요청,  ios는 param이 reg_no로 되어있는거 그냥 reg_id 쓰면되는지 확인 필요
			const newParams = mapDefaultParamsType5(params);
			console.log(' newParams : ', newParams);
			const redirectUrl = {
				android: `hdtvexternalcall://event_page?main_run=Y&auth_check=Y&backkey_finish=Y&is_splash=${newParams.is_splash}&bbs_id=${newParams.bbs_id}&reg_id=${newParams.reg_id}`,
				ios: `hdtvexternalcall://eventlist?bbs_id=&reg_no=${newParams.reg_id}`,
			};
			return redirectUrl;
		}

		// VOD 상제페이지
		case 'detail_page': {
			// TODO: 안에 여러 케이스로 나눠서 각 다른 링크 만들어야함
			// 단변, 시리즈, 맛집, 여행지
			// ?Android의 경우 맛집 여행지 외부 연동 규격 따로 존재함???
			console.log('%c### [getRedirect] - VOD 상세페이지', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// // !contents_id || !category_id || !series_category_id
			// if (!a_rtype || !i_rtype || !vod_type || !i_vod_type || !series_num || !is_splash || !appType || !share_type) {
			// 	console.log('[ VOD 상제페이지 ] 필수값 없음');
			// 	return;
			// }
			// ? 맛집, 여행지는 series_num -1 안써도 되는건지 확인필요
			const newParams = mapDefaultParamsType6(params);
			console.log(' newParams : ', newParams);
			const redirectUrl = {
				android: `hdtvexternalcall://detail_page?main_run=Y&auth_check=&backkey_finish=&is_splash=${newParams.is_splash}&contents_id=${newParams.contents_id}&category_id=${newParams.is_splash}&series_category_id=${newParams.series_category_id}`,
				ios: `hdtvexternalcall://detail_page?vod_type=${newParams.i_vod_type}&contents_id=${newParams.contents_id}&category_id=${newParams.category_id}&series_num=-1`,
			};
			return redirectUrl;
		}

		// VOD상세페이지(유플릭스)
		case 'detail': {
			console.log('%c### [getRedirect] - VOD 상세페이지(유플릭스)', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// // !|| !seriesCateId || !genreId
			// if (!rtype || !initType || !pType || !albumId || !cateId || !seriesYn || !applive_yn || !appType || !share_type) {
			// 	console.log('[ VOD 상제페이지(유플릭스) ] 필수값 없음');
			// 	return;
			// }

			//! 스키마명 다름. 해당 스키마 확인 필요
			const newParams = mapDefaultParamsType6_1(params);
			console.log(' newParams : ', newParams);
			const redirectUrl = {
				android: `uflixmovie://detail?initType=intent&pType=${newParams.pType}&albumId=${newParams.albumId}&cateId=${newParams.cateId}&seriesYn=${newParams.seriesYn}&seriesCateId=${newParams.seriesCateId}&genreId=${newParams.genreId}`,
				ios: `uflixmovie://detail?initType=intent&pType=${newParams.pType}&albumId=${newParams.albumId}&cateId=${newParams.cateId}&seriesYn=${newParams.seriesYn}&seriesCateId=${newParams.seriesCateId}&genreId=${newParams.genreId}`,
			};
			return redirectUrl;
		}
		case 'h_detail_page': {
			// 하이라이트 상세화면
			console.log('%c### [getRedirect] - 하이라이트 상세화면', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// if (!a_rtype || !i_rtype || !contents_title || !contents_id || !category_id || !i_contents_id || !i_category_id) {
			// 	console.log('[ 하이라이트 상세화면 ] 필수값 없음');
			// 	return;
			// }

			// ?a_rtype=h_detail_page&i_rtype=h_detail_page&category_id=E8316&contents_id=M011599353PPV00&title=donghae?&is_splash=Y&i_contents_id=C000047316&i_category_id=parentcategoryID
			//! android param 예시 key: content_title  명세서에는 contents_title 확인 필요
			const newParams = mapDefaultParamsType7(params);
			console.log(' newParams : ', newParams);
			const redirectUrl = {
				android: `hdtvexternalcall://h_detail_page?main_run=Y&auth_check=Y&backkey_finish=Y&is_splash=${newParams.is_splash}&contents_title=${newParams.contents_title}&contents_id=${newParams.contents_id}&category_id=${newParams.category_id}`,
				ios: `hdtvexternalcall://h_detail_page?contents_id=${newParams.i_contents_id}&category_id=${newParams.i_category_id}`,
			};
			return redirectUrl;
		}
		case 'main': {
			console.log('%c### [getRedirect] - 비디오포털 메인화면', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// if (!a_rtype || !i_rtype) {
			// 	console.log('[ 비디오포털 메인화면 ] 필수값 없음');
			// 	return;
			// }

			const newParams = mapDefaultParamsType8(params);
			console.log(' newParams : ', newParams);
			const redirectUrl = {
				android: `hdtvexternalcall://main?main_run=Y&auth_check=Y&backkey_finish=Y&is_splash=${newParams.is_splash}`,
				ios: `hdtvexternalcall://main}`,
			};
			return redirectUrl;
		}

		default: {
			console.log('예외처리!~!!!!!!!!!!!');
			break;
		}
	}
};
