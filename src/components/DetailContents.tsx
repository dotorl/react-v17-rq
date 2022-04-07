import ContentInfo from '@interfaces/ContentInfo';
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
		// placeholderData: {}	// 캐시에 유지 X
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
