import ContentInfo from '@interfaces/ContentInfo';
import React, { useEffect } from 'react';

interface Props {
	contentInfo: ContentInfo;
}
const Title = ({ contentInfo }: Props) => {
	return (
		<div className="title-area">
			<h2>
				{contentInfo.albumName} {contentInfo.seriesDesc || ''}
			</h2>
			<p>
				{contentInfo.contentInfos &&
					contentInfo.contentInfos.map((item, index) => {
						return (
							<a key={index} className={item.class}>
								{item.info}
							</a>
						);
					})}
			</p>
		</div>
	);
};

export default Title;
