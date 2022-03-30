import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TestPage = () => {
	return (
		<div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
			<h2>1.실시간 채널</h2>
			<div>
				<Link to="/?a_rtype=live_vod&i_rtype=live_vod&service_id=761&multi_channel=N&is_splash=Y">멀티채널</Link>
			</div>
			<div>
				<Link to="/?a_rtype=live_vod&i_rtype=live_vod&service_id=761,658,726,720&multi_channel=Y&is_splash=Y">단일채널</Link>
			</div>
			<br />
			<div>
				<Link to="/?a_rtype=live_vod&i_rtype=live_vod&service_id=761,658,726,720&multi_channel=Y&is_splash=">is_splah(optional) 빈값</Link>
			</div>
			<div>
				<Link to="/?a_rtype=live_vod&i_rtype=live_vod&service_id=761,658,726,720&multi_channel=Y">is_splah(optional) 없음 - undefined</Link>
			</div>
			<div>
				<Link to="/?i_rtype=live_vod&service_id=761,658,726,720&multi_channel=Y">a_rtype(require) 없음</Link>
			</div>
			<hr />

			<h2>2.VOD재생(본편보기)</h2>
			<div>
				<Link to="/?a_rtype=vod_play&i_rtype=play_vod&contents_id=M011587733PPV00&category_id=E91VM&vod_type=Vod&i_vod_type=1&series_num=-1&is_splash=Y">
					A:VOD, I:TV다시보기
				</Link>
			</div>
			<div>
				<Link to="/?a_rtype=vod_play&i_rtype=play_vod&contents_id=M01135OA15PPV00&category_id=E8AK1&vod_type=Sample_vod&i_vod_type=1&series_num=6&is_splash=Y">
					A:맛보기VOD, I:TV다시보기
				</Link>
			</div>
			<div>
				<Link to="/?a_rtype=vod_play&i_rtype=play_vod&contents_id=M01155C335PPV00&category_id=D8023&vod_type=Download_vod&i_vod_type=3&series_num=-1&is_splash=Y">
					A:다운로드된VOD, I:맛집
				</Link>
			</div>
			<div>
				<Link to="/?a_rtype=vod_play&i_rtype=play_vod&contents_id=M01154L008PPV00&category_id=D801M&vod_type=Vod&i_vod_type=4&series_num=-1&is_splash=Y">
					A:VOD, I:여행
				</Link>
			</div>
			<hr />

			<h2>6.VOD상세페이지(유플릭스)</h2>
			<div>
				<Link to="/?rtype=detail&initType=intent&pType=D&albumId=M011587733PPV00&cateId=E91VM&seriesYn=N&seriesCateId=&genreId=&applive_yn=Y&appType=UFLIX&share_type=F">
					시리즈 N
				</Link>
			</div>

			<div>
				<Link to="/?rtype=detail&initType=intent&pType=D&albumId=M01135OA15PPV00&cateId=E8AK1&seriesYn=Y&seriesCateId=E8AK1&genreId=&applive_yn=Y&appType=UFLIX&share_type=F">
					시리즈 Y
				</Link>
			</div>
			<hr />

			<h2>7.하이라이트재생</h2>
			<div>
				<Link to="/?a_rtype=highlight&i_rtype=play_h_vod&category_id=E8316&contents_id=M011599353PPV00&title=동해 청정 심해에서만 만날 수 있다는 주인공은?&start_time=00:26:05&end_time=00:28:00&seriesNo=&is_splash=Y&i_contents_id=C000047316&i_category_id=parentcategoryID">
					하이라이트재생
				</Link>
			</div>
			<hr />

			<h2>8.비디오포털 메인화면</h2>
			<div>
				<Link to="/?a_rtype=main&i_rtype=main&is_splash=Y">비디오포털 메인화면</Link>
			</div>
			<hr />
		</div>
	);
};

export default TestPage;
