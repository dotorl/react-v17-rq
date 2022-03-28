import FocusButton from '@components/FocusButton';
import React, { useEffect, useState } from 'react';

interface Props {
	contentInfo: any;
	onClickBack?: () => void;
}

const Header = ({ contentInfo, onClickBack }: Props) => {
	const [opacity, setOpacity] = useState(0);

	useEffect(() => {
		console.log('contentInfo :  ', contentInfo);
	}, [contentInfo]);

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
				{contentInfo.album_name}
			</p>
		</div>
	);
};

export default Header;
