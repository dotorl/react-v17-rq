import React from 'react';
import ContentDownlod from './common/ContentDownlod';
import { motion } from 'framer-motion/dist/framer-motion';

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
						<motion.dt layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
							내게 맞는 영상 추천!
						</motion.dt>
						<motion.dd layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
							<span>70여 개의 실시간 채널, 영화, 해외시리즈, </span>
							<span>애니메이션 등 20만 여 편의 동영상 중</span>
							<br />
							<span>내게 맞는 동영상을 추천해주는 앱 서비스</span>
						</motion.dd>
					</dl>
					<ContentDownlod />
				</section>

				<motion.div className="bg" layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
					<div></div>
				</motion.div>
			</div>
		</>
	);
};

export default DefaultPage;
