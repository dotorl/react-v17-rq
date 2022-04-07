import ContentInfo from '@interfaces/ContentInfo';
import React, { useEffect, useRef } from 'react';
import defaultImg from '../static/res/images/samplebg.jpeg';
import ContentDownlod from './common/ContentDownlod';

interface IProps {
	contentInfo: ContentInfo;
}

const DetailPage = ({ contentInfo }: IProps) => {
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
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		console.log('contentInfo', contentInfo);
	}, [contentInfo]);

	return (
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
	);
};

export default DetailPage;
