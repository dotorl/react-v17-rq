import ContentInfo from '@interfaces/ContentInfo';
import React, { useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import defaultImg from '../static/res/images/samplebg.jpeg';

interface Props {
	contentInfo: ContentInfo;
}

const DetailPage = ({ contentInfo }) => {
	// const thumbEl = document.querySelector('.contents-thumbnail')
	// const appDownEl = document.querySelector('.wrap-contents .contents-download');

	// useRef getBoundingClientRect
	const thumbRef = useRef<HTMLDivElement>(null);
	const downloadRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);

	const handleResize = () => {
		console.log('브라우저 resize');

		if (thumbRef.current && downloadRef.current && infoRef.current) {
			const thumbElHeight = thumbRef.current.getBoundingClientRect().height;
			const appDownElHeight = downloadRef.current.getBoundingClientRect().height;

			infoRef.current.style.paddingTop = `${thumbElHeight}px`;
			infoRef.current.style.paddingBottom = `${appDownElHeight}px`;
		}

		// const thumbElHeight = parseInt(thumbEl.getBoundingClientRect().height);
		// const appDownElHeight = parseInt(appDownEl.getBoundingClientRect().height);
		// infoEl.style.paddingTop = `${thumbElHeight}px`;
		// infoEl.style.paddingBottom = `${appDownElHeight}px)`;
	};

	useEffect(() => {
		console.log('detail useEffect ');

		// const thumbElHeight = parseInt(thumbEl.getBoundingClientRect().height);
		// const appDownElHeight = parseInt(appDownEl.getBoundingClientRect().height);
		// infoEl.style.paddingTop = `${thumbElHeight}px`;
		// infoEl.style.paddingBottom = `${appDownElHeight}px`;

		// if (thumbRef.current && downloadRef.current && infoRef.current) {
		// 	const thumbElHeight = thumbRef.current.getBoundingClientRect().height;
		// 	const appDownElHeight = downloadRef.current.getBoundingClientRect().height;

		// 	infoRef.current.style.paddingTop = `${thumbElHeight}px`;
		// 	infoRef.current.style.paddingBottom = `${appDownElHeight}px`
		// }
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

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
						<h1>어벤져스 : 인피니티워</h1>
						<ul className="des">
							<li>액션</li>
							<li>2019.04.24</li>
							<li>181분</li>
							<li>15세이상</li>
							<li>어학자막</li>
						</ul>
						<ul className="people">
							<li>
								<strong>연출/극본</strong>
								<div>
									<span>안소니 루소</span>
								</div>
							</li>
							<li>
								<strong>출연</strong>
								<div>
									<span>로버트 다우니 주니어</span>,<span>크리스 에반스</span>,<span>로버트 다우니 주니어</span>,<span>크리스 에반스</span>
								</div>
							</li>
						</ul>
						<div className="synopsis">
							<p>
								노바에서 파워 스톤을 손에 넣은 타노스는 아스가르드 피난선을 공격해 로키와 토르에게서 스페이스 스톤을 손에 넣는다. 타노스는 지구에 있는 인피니트
								스톤을 확보 노바에서 파워 스톤을 손에 넣은 타노스는 아스가르드 피난선을 공격해 로키와 토르에게서 스페이스 스톤을 손에 넣는다. 타노스는 지구에
								있는 인피니트 스톤을 확보 노바에서 파워 스톤을 손에 넣은 타노스는 아스가르드 피난선을 공격해 로키와 토르에게서 스페이스 스톤을 손에 넣는다.
								타노스는 지구에 있는 인피니트 스톤을 확보 노바에서 파워 스톤을 손에 넣은 타노스는 아스가르드 피난선을 공격해 로키와 토르에게서 스페이스 스톤을
								손에 넣는다. 타노스는 지구에 있는 인피니트 스톤을 확보 노바에서 파워 스톤을 손에 넣은 타노스는 아스가르드 피난선을 공격해 로키와 토르에게서
								스페이스 스톤을 손에 넣는다. 타노스는 지구에 있는 인피니트 스톤을 확보 노바에서 파워 스톤을 손에 넣은 타노스는 아스가르드 피난선을 공격해 로키와
								토르에게서 스페이스 스톤을 손에 넣는다. 타노스는 지구에 있는 인피니트 스톤을 확보
							</p>
						</div>
					</div>
					<div className="contents-download" ref={downloadRef}>
						<strong>App 다운로드</strong>
						<div className="btn-downloads">
							<a href="#">
								<i></i>
								<span>Google Play</span>
							</a>
							<a href="#">
								<i></i>
								<span>App Store</span>
							</a>
						</div>
						<a href="#" className="btn-link">
							U+모바일tv 앱으로 보기
						</a>
					</div>
				</div>
			</section>
		</div>
	);
};

export default DetailPage;
