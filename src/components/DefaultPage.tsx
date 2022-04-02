import React from 'react';
import ContentDownlod from './common/ContentDownlod';

const DefaultPage = () => {
	return (
		<>
			<div id="wrap" className="wrap-index">
				<header className="header">
					<h1>
						<span className="txt-hide">U+모바일TV</span>
					</h1>
				</header>
				<section className="contents">
					<dl>
						<dt>내게 맞는 영상 추천!</dt>
						<dd>
							<span>70여 개의 실시간 채널, 영화, 해외시리즈, </span>
							<span>애니메이션 등 20만 여 편의 동영상 중</span>
							<br />
							<span>내게 맞는 동영상을 추천해주는 앱 서비스</span>
						</dd>
					</dl>
					<ContentDownlod />
				</section>
				<div className="bg">
					<div></div>
				</div>
			</div>
		</>
	);
};

export default DefaultPage;
