import { IdefaultParamsType1, mapDefaultParamsType1 } from '@interfaces/DefatulSearchParams';

interface IIntentUrl {
	android: string;
	ios: string;
}

// getRedirectPath
export const getIntentUrl = (params): IIntentUrl | undefined => {
	const {
		a_rtype,
		i_rtype,
		service_id,
		multi_channel,
		is_splash,

		i_vod_type,
		vod_type,
		contents_id,
		category_id,
		series_num,

		title,
		start_time,
		end_time,
		seriesNo,
		i_contents_id,
		i_category_id,

		cat_depth1,
		cat_depth2,
		cat_depth3,
		cat_depth4,

		bbs_id,
		reg_id,

		series_category_id,
		appType,
		share_type,

		rtype,
		initType,
		pType,
		albumId,
		cateId,
		seriesYn,
		seriesCateId,
		genreId,
		applive_yn,

		contents_title,
	} = params;

	switch (a_rtype || rtype) {
		case 'live_vod': {
			// 실시간 채널
			// TODO: multi_channel 값으로 멀티채널, 단일채널로 파라미터 다르게 구성해야 함
			console.log('%c### [getRedirect] - 실시간 채널', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// if (!a_rtype || !i_rtype || !service_id || !multi_channel) {
			// 	console.log('[실시간채널] 필수값 없음');
			// 	return;
			// }

			const newParams = mapDefaultParamsType1(params);
			const redirectUrl = {
				android: `hdtvexternalcall://live_vod?main_run=Y&auth_check=Y&backkey_finish=Y&is_splash=${newParams.is_splash}&service_id=${newParams.service_id}&multi_channel=${newParams.multi_channel}`,
				ios: `hdtvexternalcall://live_vod?service_id=${newParams.service_id}`,
			};
			return redirectUrl;
		}
		case 'vod_play': {
			// VOD재생(본편보기)
			// TODO: 안에 여러 케이스로 나눠서 각 다른 링크 만들어야함
			// VOD 본편, 다운로드, 맛보기, 마이컷
			// ?마이컷 보기는 연동 규격 따로 존재함????
			console.log('%c### [getRedirect] - VOD 재생(본편보기)', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// if (!a_rtype || !i_rtype || !i_vod_type || !vod_type || !contents_id || !category_id || !series_num) {
			// 	console.log('[ VOD재생(본편보기) ] 필수값 없음');
			// 	return;
			// }

			const newParams = mapDefaultParamsType1(params);
			const redirectUrl = {
				android: `hdtvexternalcall://live_vod?main_run=Y&auth_check=Y&backkey_finish=Y&is_splash=${newParams.is_splash}&service_id=${newParams.service_id}&multi_channel=${newParams.multi_channel}`,
				ios: `hdtvexternalcall://live_vod?service_id=${newParams.service_id}`,
			};
			return redirectUrl;
		}
		case 'highlight': {
			// 하이라이트 재생
			console.log('%c### [getRedirect] - 하이라이트재생', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// seriesNo는 option값이라 제외
			// if (!a_rtype || !i_rtype || !title || !start_time || !end_time || !contents_id || !category_id || !i_contents_id || !i_category_id) {
			// 	console.log('[ 하이라이트 재생 ] 필수값 없음');
			// 	return;
			// }

			break;
		}
		case 'tab_menu': {
			// 탭 메뉴 바로가기 ( 마이컷, 선물함 추가)
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

			break;
		}
		case 'event_page': {
			// 이벤트페이지
			console.log('%c### [getRedirect] - 이벤트 페이지', 'color: #ff0000');

			if (!a_rtype || !i_rtype || !bbs_id || !reg_id) {
				console.log('[ 이벤트페이지 ] 필수값 없음');
				return;
			}
			break;
		}
		case 'detail_page': {
			// VOD 상제페이지
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

			break;
		}
		case 'detail': {
			// VOD상세페이지(유플릭스)
			console.log('%c### [getRedirect] - VOD 상세페이지(유플릭스)', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// // !|| !seriesCateId || !genreId
			// if (!rtype || !initType || !pType || !albumId || !cateId || !seriesYn || !applive_yn || !appType || !share_type) {
			// 	console.log('[ VOD 상제페이지(유플릭스) ] 필수값 없음');
			// 	return;
			// }

			break;
		}
		case 'h_detail_page': {
			// 하이라이트 상세화면
			console.log('%c### [getRedirect] - 하이라이트 상세화면', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// if (!a_rtype || !i_rtype || !contents_title || !contents_id || !category_id || !i_contents_id || !i_category_id) {
			// 	console.log('[ 하이라이트 상세화면 ] 필수값 없음');
			// 	return;
			// }

			break;
		}
		case 'main': {
			console.log('%c### [getRedirect] - 비디오포털 메인화면', 'color: #ff0000');

			// TODO: 필수값 체크 및 확인 필요
			// if (!a_rtype || !i_rtype) {
			// 	console.log('[ 비디오포털 메인화면 ] 필수값 없음');
			// 	return;
			// }

			break;
		}
		default: {
			console.log('예외처리!~!!!!!!!!!!!');
			break;
		}
	}
};
