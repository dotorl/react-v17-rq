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

			{albumId ? (
				<>
					<div className="sec_left">
						<div className="sec_left_scroll">
							<div className="plain-header-wrapper overlay">
								<div></div>
								<div className="btn-press usetap">
									<i className="btn btn-prev"></i>
								</div>

								<p className="text-center title" style={{ opacity: 0 }}>
									도도녀 길들이기
								</p>
							</div>

							<div className="vod vod-type-2 vod-fix-wrap">
								<div className="vod-wrapper vod-fix">
									<div className="inner">
										<div className="box">
											<div className="info thumb-type-4">
												<a className="btn btn-play-1 usetap"></a>
												<img src="http://210.182.60.11/resize.php?filename=M01201L235PPV00MA130.png&width=&height=&type=thumbnail" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="vod-detail-type1">
								<div className="box_twogrid">
									<div className="title-area">
										<h2>도도녀 길들이기 </h2>
										<p>
											<a className="genre">로맨스</a>
											<a className="date">2019.01.01</a>
											<a className="running">88분</a>
											<a className="grade">청소년 관람불가</a>
										</p>
									</div>
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
				<p> no params</p>
			)}
			<br />
			<Link to="/detail">Go Detail</Link>
			<br />
			<Link to="/detail?id=123">Go Detail 123</Link>
		</>
	);
};

export default index;
