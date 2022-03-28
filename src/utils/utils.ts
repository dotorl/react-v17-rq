export function getResizedImageUrl(server: string, filename: string, width: number | string = '', height: number | string = '', type?: string): string {
	let finalType = type;
	if (!finalType) {
		const formatField = filename.substring(filename.length - 2);
		finalType = formatField === '60' || formatField === '70' ? 'poster' : 'thumbnail';
	}

	const finalServer = !isUndefined(server) ? server.replace(/poster\/|image\//gi, '') : '';

	return `${finalServer}resize.php?filename=${filename}&width=${width}&height=${height}&type=${finalType}`;
}

export function isAdultPrInfo(prInfo) {
	return prInfo === '05' || prInfo === '06';
}

export function getResizedThumbnailUrl(server: string, filename: string, width?: number, height?: number): string {
	return getResizedImageUrl(server, !isUndefined(filename) ? filename.replace(/[0-9]{2}\./, '30.') : filename, width, height, 'thumbnail');
}

export function getWatchaRating(rating: number): number {
	return (rating / 5) * 100;
}

export function isUndefined(value?: any): boolean {
	return typeof value === 'undefined';
}

export function runtimeToDataSize(runtime: number, is360: boolean) {
	const bitRate = is360 ? 5.5 : 2.5;
	const size = ((runtime * 60 * bitRate) / 8) * 1000 * 1000;
	return formatSizeString(size);
}

export function formatSizeString(bytes: number, decimals = 2) {
	if (bytes === 0) {
		return '0 Byte';
	}
	const k = 1000;
	const dm = decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
