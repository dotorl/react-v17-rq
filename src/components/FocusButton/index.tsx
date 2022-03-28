import React, { useState } from 'react';
import classNames from 'classnames';

interface Props {
	ContainerElement?: any;
	containerClass?: string;
	onClick?: () => void;
	onTouchStart?: () => void;
	onTouchEnd?: () => void;
	onTouchCancel?: () => void;
	children?: JSX.Element;
	style?: any;
}

const FocusButton = ({ containerClass, children, onClick, style, onTouchStart, onTouchEnd, onTouchCancel }: Props) => {
	const [isActive, setIsActive] = useState(false);

	const onTouchStartFunc = () => {
		setIsActive(true);
		if (onTouchStart) {
			onTouchStart();
		}
	};

	const onTouchEndFunc = () => {
		setIsActive(false);
		if (onTouchEnd) {
			onTouchEnd();
		}
	};

	const onTouchCancelFunc = () => {
		setIsActive(false);
		if (onTouchCancel) {
			onTouchCancel();
		}
	};

	const onClickFunc = (e: any) => {
		e.stopPropagation();
		if (onClick) {
			onClick();
		}
	};

	return (
		<div
			className={classNames(containerClass, 'usetap', { active: isActive })}
			onClick={onClickFunc}
			onTouchStart={onTouchStartFunc}
			onTouchEnd={onTouchEndFunc}
			onTouchCancel={onTouchCancelFunc}
			style={style}
		>
			{children}
		</div>
	);
};

export default FocusButton;
