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

const index = (props) => {
	const params = useParams();
	const location = useLocation();

	const [firebaseLink, setFirebaseLink] = useState('');

	const aRtype = params.get('a_rtype');
	const iRtype = params.get('i_rtype');

	const { data: settingData } = useQuery('settingInfo', getSetting);
	const {
		isLoading,
		isSuccess,
		isError,
		isFetching,
		data: contentInfo,
	} = useQuery<ContentInfo, Error>('contentInfo', getContentInfo, {
		retry: 3,
		staleTime: 6000,
		cacheTime: 3000,
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

	useEffect(() => {
		if (!firebaseLink) {
			settingFirebaseLink();
		} else {
			console.log(' ************** firebaseLink ************* ', firebaseLink);
		}
	}, [firebaseLink]);

	useEffect(() => {
		// !VOD 상세페이지 ->  rtype, initType
		// !그외 -> aRtype, iRtype
		console.group('%c ######### urlParams -> type 확인 및 newParams -> return intentUrl ##########', 'color:yellow');

		const param = settingParamsType();
		console.log('url param : ', param);
		const intentUrl = getIntentUrl(param);
		console.log('intentUrl : ', intentUrl);
		console.groupEnd();

		if (intentUrl?.android) {
			window.location.href = intentUrl.android;
		}

		if (aRtype === 'live_vod') {
			// TODO: VOD 상세페이지 일때니까 API 호출하고 화면그려야함
			console.log('%c *********** TODO: VOD 상세페이지 일때니까 API 호출하고 화면그려야함', 'color:pink');
		} else {
			// TODO: Default Page
			console.log('%c *********** TODO: Default Page', 'color:pink');
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

	return (
		<>
			{isSuccess ? (
				<>
					<div className="sec_left">
						<div className="sec_left_scroll">
							<Header title={contentInfo.albumName} onClickBack={() => {}} />

							{/* DummyPlater */}
							<div className="vod vod-type-2 vod-fix-wrap">
								<div className="vod-wrapper vod-fix">
									<div className="inner">
										<div className="box">
											<div className="info thumb-type-4">
												<a className="btn btn-play-1 usetap"></a>
												<img src="http://210.182.60.11/still/ST_M0116C2015PPV00_165200.jpg" style={{ opacity: 1 }} />
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="vod-detail-type1">
								<div className="box_twogrid">
									<Title contentInfo={contentInfo} />
									<div className="btn-wrapper detail">
										<li>
											<a className="btn-poke">찜</a>
											<a className="heart-wrapper">
												<div className="heart" style={{}}></div>
											</a>
										</li>
										<li>
											<a className="btn-rate-txt">평가</a>
											<div className="btn_rate_wrap">
												<button className="btn_like">
													<i className="sel">좋아요</i>
												</button>
												<button className="btn_unlike">
													<i className="sel">싫어요</i>
												</button>
												<button className="btn_close">
													<i className="sel">닫기</i>
												</button>
											</div>
										</li>
										<li>
											<a className="btn-share">공유</a>
											<a className="heart-wrapper">
												<div className="share" style={{}}></div>
											</a>
										</li>
									</div>
								</div>
								<dl>
									<dt>연출/극본</dt>
									<dd>
										<a className="usetap">신성진</a>
									</dd>
									<dt>출연</dt>
									<dd>
										<a className="usetap">지아</a>, <a className="usetap">강민우</a>
									</dd>
								</dl>
								<p className="exp" style={{}}>
									<span>
										아내가 벌어주는 돈으로 의기소침하게 지내던 백수 남자는 무례하고 도도한 처제의 등장으로 골머리를 앓게 된다. 우연히 처제의 정사 장면을 목격한
										남자, 하지만 곧 훔쳐본 사실이 발각되어 곤경에 처한다. 도도한 처제를 굴복시키기 위한 백수 남자의 작전이 시작된다.
									</span>
								</p>
								<div className="fixed_btn_wrap">
									<div className="btn-status-04">
										<div className="flex_from">
											<button className="btn_basic indigo usetap">
												<i className="icn_utv_v2"></i>
												<span className="btn_txt">U+tv로보기</span>
											</button>
											<button className="btn_basic indigo usetap">
												<div style={{}}></div>
												<i className="icn_down_01"></i>
												<span className="btn_txt">다운로드하기</span>
											</button>
										</div>
									</div>
									<div className="btn-status-01">
										<div className="flex_from">
											<button className="btn_basic usetap">
												<i className="ic-btn-play visible"></i>
												<span className="btn_txt visible">재생하기</span>
											</button>
										</div>
										<p className="desc">
											<a>데이터소진 최대 1.65 GB</a>
										</p>
									</div>
								</div>
								<p className="icn-mark-exc">본 콘텐츠를 시청할 수 있는 월정액은 아래와 같습니다.</p>
								<div className="list_prod">
									<div className="btn_more3"></div>
									<div className="box usetap">
										<div className="tit">U+영화월정액 베이직(모바일)</div>
										<div className="desc">영화월정액 메뉴 내 4만여편의 영화/미드 무제한 감상</div>
									</div>
									<div className="box usetap">
										<div className="tit">U+영화월정액 프리미엄(모바일)</div>
										<div className="desc">프리미엄관 최신 인기 영화 무제한 감상</div>
									</div>
									<div className="box usetap">
										<div className="tit">U+영화월정액 프리미엄 1년 약정(모바일)</div>
										<div className="desc">프리미엄관 최신 인기 영화 무제한 감상</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<p>U+모바일tv는 70여개의 실시간 채널, 영화, 해외시리즈, 애니메이션 등 20만여편의 동영상 중 내게 맞는 동영상을 추천해주는 앱 서비스 힙니다.</p>
				</>
			)}
		</>
	);
};

export default index;
