import React, { forwardRef } from 'react';

interface IProps {
	title?: string;
}
const ContentDownlod = ({ title }: IProps, ref) => {
	return (
		<div className="contents-download" ref={ref}>
			<strong>{title}</strong>
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
	);
};
export default forwardRef(ContentDownlod);
