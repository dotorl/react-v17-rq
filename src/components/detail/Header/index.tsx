import FocusButton from '@components/detail/FocusButton';
import React, { useEffect, useState } from 'react';
interface Props {
	title: string;
	onClickBack?: () => void;
}

const Header = ({ title, onClickBack }: Props) => {
	const [opacity, setOpacity] = useState(0);

	const onClickBackFunc = () => {
		if (onClickBack) {
			onClickBack();
		}
	};

	return (
		<div className="plain-header-wrapper overlay">
			<div style={{ backgroundColor: '#0d0d0d', width: '100%', height: '100%', position: 'absolute', borderBottom: '1px solid #525252', opacity: opacity }} />
			<FocusButton containerClass="btn-press" onClick={onClickBackFunc}>
				<i className="btn btn-prev" />
			</FocusButton>
			<p className="text-center title" style={{ opacity: opacity }}>
				{title}
			</p>
		</div>
	);
};

export default Header;
