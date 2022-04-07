import ContentInfo, { loadContentInfo } from '@interfaces/ContentInfo';
import React, { useEffect, useRef } from 'react';
import defaultImg from '../static/res/images/samplebg.jpeg';
import ContentDownlod from './common/ContentDownlod';
import { useQuery } from 'react-query';
import { getContentInfo } from '../api/index';

// interface IProps {
// 	contentInfo: ContentInfo;
// }

const DetailPage = () => {
	const {
		isLoading,
		isSuccess,
		isError,
		data: contentInfo,
	} = useQuery<ContentInfo, Error>('contentInfo', getContentInfo, {
		retry: 3,
		staleTime: 6000,
		cacheTime: 0, // 0으로 안하면 inactive 상태에서 해당 초만큼 대기해서 값을 그대로 사용해서 화면 변화를 이룰 수 없음 ( 테스트용으로 빨리할 때 )
		refetchOnWindowFocus: false,
		// initialData: {}				// 캐시에 유지
		placeholderData: {
			actors: ['유지태', '이정현', '이다윗', '정성화'],
			albumId: 'M0116C2015PPV00',
			albumName: '스플릿 SampleData',
			canDownload: true,
			catId: undefined,
			commentCount: 100,
			contentInfos: [
				{ class: 'genre', info: '드라마' },
				{ class: 'date', info: '2016.11.09' },
				{ class: 'running', info: '122분' },
				{ class: 'grade', info: '15세이상' },
			],
			contsType: '',
			dataFreeBillFlag: 'Y',
			dataSizeMessage: '2.29 GB',
			directors: ['최국희'],
			faceMatchAssetId: '',
			genreLarge: '영화',
			imgFileName: 'M0116C2015PPV00MC210.png',
			imgUrl: 'http://210.182.60.11/poster/',
			inAppPrice: undefined,
			is360: false,
			isAdult: false,
			isFaceMatch: false,
			isLivePpv: false,
			isRealHD: true,
			isSeason: false,
			isSetPoint: false,
			layoutMode: 1,
			liveInfo: { concertImageUrls: [], existAll: false },
			onairDate: '',
			prInfo: '04',
			prevAlbumId: 'M01167E494PPV00',
			previewFlag: undefined,
			price: undefined,
			promotion: undefined,
			realSeriesNo: 'undefined',
			reservedDate: undefined,
			runtime: '020212',
			runtimeMinutes: 122,
			runtimeSeconds: 7332,
			seriesDesc: 'undefined',
			seriesNo: 9999,
			seriesTitle: '스플릿',
			serviceGb: 'undefined',
			stillFileNames: [
				'ST_M0116C2015PPV00_165200.jpg',
				'ST_M0116C2015PPV00_165201.jpg',
				'ST_M0116C2015PPV00_165202.jpg',
				'ST_M0116C2015PPV00_165303.jpg',
				'ST_M0116C2015PPV00_165304.jpg',
				'undefined',
			],
			stillImageUrls: [
				'http://210.182.60.11/still/ST_M0116C2015PPV00_165200.jpg',
				'http://210.182.60.11/still/ST_M0116C2015PPV00_165201.jpg',
				'http://210.182.60.11/still/ST_M0116C2015PPV00_165202.jpg',
				'http://210.182.60.11/still/ST_M0116C2015PPV00_165303.jpg',
				'http://210.182.60.11/still/ST_M0116C2015PPV00_165304.jpg',
			],
			synopsis:
				'밑바닥 인생들의 반격이 시작된다! 베일에 싸였던 도박 볼링의 세계. "유지태"와 "이다윗"의 완벽 케미. 볼링으로 꼬인 그들의 인생 드라마! 과거 볼링계의 전설이라 불리며 이름을 날리던 `철종`은 불운의 사고로 모든 것을 잃고 낮에는 가짜석유 판매원, 밤에는 도박볼링판에서 선수로 뛰며 별 볼 일 없는 인생을 살아간다. 그러던 어느 날, 자신만의 세계에 빠져 살지만 볼링만큼은 천재적인 능력을 갖고 있는 `영훈`을 우연히 만난 후, `철종`은 `영훈`을 자신의 파트너로 끌어들이게 된다. `철종`의 조력자이자 도박판의 브로커 `희진`의 주도 아래 드디어 큰 판이 벌어지게 되고, `철종`과 끈질긴 악연의 `두꺼비`까지 가세해 치열한 승부가 시작된다!',
			terrCh: 'undefined',
			terrChName: 'undefined',
			thumbnailUrl: 'http://210.182.60.11/resize.php?filename=M0116C2015PPV00MC230.png&width=&height=&type=thumbnail',
			watchaPoint: 3.2,
			watchaPointCount: 44906,
			watchaPointRating: 64,
		},
	});

	const thumbRef = useRef<HTMLDivElement>(null);
	const downloadRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);

	const handleResize = () => {
		if (thumbRef.current && downloadRef.current && infoRef.current) {
			const thumbElHeight = parseInt(thumbRef.current.getBoundingClientRect().height.toString(), 10);
			const appDownElHeight = parseInt(downloadRef.current.getBoundingClientRect().height.toString(), 10);
			infoRef.current.style.paddingTop = `${thumbElHeight}px`;
			infoRef.current.style.paddingBottom = `${appDownElHeight}px`;
		}
	};

	useEffect(() => {
		// TODO: contentInfo 에서 ERROR가 아닌 빈배열이나 다른형태로 값이 내려왔을 경우에 체크해서 처리 필요
		console.log(contentInfo);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [contentInfo]);

	useEffect(() => {
		// TODO: ERROR
		if (isError) {
			console.log('TODO: 상세페이지 조회 Error라서 default Page로 이동');
		}
	}, [isError]);

	if (isLoading) {
		return <>Loading....</>;
	}

	if (isError) {
		return <>ERROR</>;
	}

	return (
		<>
			{isSuccess && (
				<div id="wrap" className="wrap-contents">
					<section className="contents">
						<div className="contents-thumbnail" ref={thumbRef}>
							<div className="contain">
								<div className="inner">
									<button className="btn-goback">뒤로가기</button>
									<div>
										<img src={defaultImg} />
									</div>
								</div>
							</div>
						</div>
						<div className="contents-info" ref={infoRef}>
							<div className="contents-description">
								<h1>{contentInfo.albumName}</h1>

								<ul className="des">
									{contentInfo.contentInfos.map((item, index) => (
										<li key={index}>{item.info}</li>
									))}
								</ul>

								<ul className="people">
									{(contentInfo.directors.length > 0 || contentInfo.actors.length > 0) && (
										<>
											{contentInfo.directors.length > 0 && (
												<li>
													<strong>연출/극본</strong>
													<div>
														{contentInfo.directors
															.slice(0, 4)
															.map((director, index) => <span key={index}>{director}</span>)
															.reduce((total: any, current) => (total.length > 0 ? [total, ', ', current] : [current]), [])}
													</div>
												</li>
											)}
											{contentInfo.actors.length > 0 && (
												<li>
													<strong>출연</strong>
													<div>
														{contentInfo.actors
															.slice(0, 4)
															.map((actor, index) => <span key={index}>{actor}</span>)
															.reduce((total: any, current) => (total.length > 0 ? [total, ', ', current] : [current]), [])}
													</div>
												</li>
											)}
										</>
									)}
								</ul>
								<div className="synopsis">{contentInfo.synopsis}</div>
							</div>
							<ContentDownlod ref={downloadRef} title="App 다운로드" />
						</div>
					</section>
				</div>
			)}
		</>
	);
};

export default DetailPage;
