import { isAdultPrInfo, getResizedThumbnailUrl, getWatchaRating, isUndefined, runtimeToDataSize } from '@utils/utils';

export enum ContentLayoutMode {
	TV = 0,
	Movie = 1,
}

export enum PreviewFlag {
	P = 'P', // 예약정보​
	R = 'R', // 예약구매
	V = 'V', // 시청가능​
	X = 'X', // 판매중지
}

export default interface ContentInfo {
	layoutMode: ContentLayoutMode;
	albumId: string;
	albumName: string;
	actors: string[];
	contsType: string;
	dataSizeMessage?: string;
	directors: string[];
	contentInfos: Array<{ class: string; info: string }>;
	commentCount: number | undefined;
	canDownload: boolean;
	dataFreeBillFlag: string;
	imgFileName: string;
	isSeason: boolean;
	isSetPoint: boolean;
	isFaceMatch: boolean;
	is360: boolean;
	isRealHD: boolean;
	imgUrl: string;
	faceMatchAssetId: string;
	prevAlbumId: string;
	previewFlag: PreviewFlag;
	prInfo: string;
	isAdult: boolean;
	runtime: string;
	runtimeSeconds: number;
	runtimeMinutes: number;
	terrCh: string;
	terrChName: string;
	thumbnailUrl: string;
	seriesNo: number;
	realSeriesNo: string;
	seriesDesc: string;
	seriesTitle: string;
	serviceGb: string;
	stillFileNames: string[];
	stillImageUrls: string[];
	surtaxRatio?: number;
	synopsis: string;
	watchaPointCount: number | undefined;
	watchaPoint: number | undefined;
	watchaPointRating: number;
	price: number | undefined;
	promotion: string | undefined;
	inAppPrice: number | undefined;
	reservedDate: string | undefined;
	liveInfo?: LiveInfo;
	onairDate: string;
	isLivePpv: boolean;
	catId?: string;
	genreLarge: string;
}

interface LiveInfo {
	concertImageUrls?: string[];
	existAll?: boolean;
}

export function loadContentInfo(data: any, liveData?: any, catId?: string): ContentInfo {
	const layoutMode = data.onair_date && data.onair_date.length > 0 ? ContentLayoutMode.TV : ContentLayoutMode.Movie;
	const terrChName = terrChNameMapper[data.terr_ch];
	const runtimeMinutes = getRuntimeMinutes(data.runtime);
	const runtimeMinutesMessage = runtimeMinutes ? `${runtimeMinutes}분` : undefined;
	const prInfo = prInfoMapper[data.pr_info];
	let contentInfos;
	if (layoutMode === ContentLayoutMode.TV) {
		contentInfos = [
			{ class: 'bc', info: terrChName },
			{ class: 'genre', info: data.genre_mid },
			{ class: 'running', info: runtimeMinutesMessage },
			{ class: 'grade', info: prInfo },
		].filter((item) => !isUndefined(item.info));
	} else {
		const releaseDate = data.release_date
			? data.release_date.length > 7
				? `${data.release_date.substring(0, 4)}.${data.release_date.substring(4, 6)}.${data.release_date.substring(6, 8)}`
				: data.release_date
			: undefined;
		contentInfos = [
			{ class: 'genre', info: data.genre_mid },
			{ class: 'date', info: releaseDate },
			{ class: 'running', info: runtimeMinutesMessage },
			{ class: 'grade', info: prInfo },
		].filter((item) => !isUndefined(item.info));
	}

	if (!isUndefined(data.smi_languages)) {
		if (data.smi_languages.length === 1 && data.smi_languages.includes('한국어')) {
			contentInfos.push({ class: 'language', info: '자막' });
		} else {
			contentInfos.push({ class: 'language', info: '다국어 자막' });
		}
	}

	const watchaPoint = !isUndefined(data.point_watcha) ? Number(data.point_watcha) : undefined;
	const seriesDesc = data.series_desc;

	let synopsis = '';
	if (!isUndefined(data.synopsis)) {
		const tmp = data.synopsis.join(', ');
		synopsis = tmp.replace(/(\\n)/gi, '<br />');
		synopsis = synopsis.replace(/(\<)/gi, '&lt;');
		synopsis = synopsis.replace(/(\>)/gi, '&gt;');
	}

	const stillImageUrls = (data.still_file_names || []).map((stillFileName) => `${data.still_url}${stillFileName}`);

	let liveInfo: LiveInfo;
	if (!isUndefined(liveData)) {
		const liveImageUrls = [`${liveData.img_url}${liveData.guide_img_file}`, `${liveData.img_url}${liveData.concert_noti}`];
		liveInfo = {
			concertImageUrls: liveImageUrls,
			existAll: !isUndefined(liveData.img_url) && !isUndefined(liveData.guide_img_file) && !isUndefined(liveData.concert_noti),
		};
	} else {
		liveInfo = {
			concertImageUrls: [],
			existAll: false,
		};
	}

	return {
		layoutMode,
		albumId: data.album_id,
		albumName: data.album_name,
		actors: data.actor
			? data.actor
					.split(':')
					.pop()
					.split(',')
					.map((actor) => actor.trim())
			: [],
		contsType: data.conts_type && data.conts_type.length > 0 ? data.conts_type.join('') : undefined,
		dataSizeMessage: !isUndefined(data.runtime) ? runtimeToDataSize(runtimeMinutes || 0, false) : undefined,
		commentCount: !isUndefined(data.comment_cnt) ? Number(data.comment_cnt) : 0,
		canDownload: data.download_yn === 'Y',
		dataFreeBillFlag: data.datafree_bill_flag,
		directors: data.overseer_name
			? data.overseer_name
					.split(':')
					.pop()
					.split(',')
					.map((overseerName) => overseerName.trim())
			: [],
		contentInfos,
		imgFileName: data.img_file_name,
		isSeason: data.season_yn === 'Y',
		isSetPoint: data.set_point_yn === 'Y', // TODO
		isFaceMatch: data.fm_yn === 'Y', // TODO
		is360: data.genre_uxten === '360도',
		isRealHD: data.real_hd === 'Y',
		imgUrl: data.img_url,
		faceMatchAssetId: data.asset_id && data.asset_id.length > 0 ? data.asset_id[0] : undefined, // TODO
		prevAlbumId: data.prev_album_id,
		previewFlag: data.preview_flag,
		prInfo: data.pr_info,
		isAdult: isAdultPrInfo(data.pr_info),
		runtime: data.runtime,
		runtimeSeconds: getRuntimeSeconds(data.runtime) || 0,
		runtimeMinutes: runtimeMinutes || 0,
		terrCh: data.terr_ch,
		terrChName,
		thumbnailUrl: getThumbnailUrl(data),
		seriesNo: data.series_desc,
		realSeriesNo: data.series_no,
		seriesDesc,
		seriesTitle: getSeriesTitle(data, seriesDesc),
		serviceGb: data.service_gb,
		stillFileNames: (data.still_file_names || []).map((stillFileName) => `${stillFileName}`).concat(`${data.still_file_name}`),
		stillImageUrls: !isUndefined(data.still_file_name) ? stillImageUrls.concat(`${data.still_url}${data.still_file_name}`) : stillImageUrls,
		synopsis,
		watchaPointCount: !isUndefined(data.point_cnt_watcha) ? Number(data.point_cnt_watcha) : undefined,
		watchaPoint,
		watchaPointRating: !isUndefined(watchaPoint) ? getWatchaRating(watchaPoint || 0) : 0,
		price: !isUndefined(data.price) ? parseInt(data.price, 10) : undefined,
		promotion: !isUndefined(data.promotion) ? data.promotion : undefined,
		inAppPrice: !isUndefined(data.inapp_price) ? parseInt(data.inapp_price, 10) : undefined,
		reservedDate: !isUndefined(data.reserved_date) ? data.reserved_date : undefined,
		liveInfo: liveInfo,
		onairDate: !isUndefined(data.onair_date) ? data.onair_date : '',
		isLivePpv: !isUndefined(data.live_ppv_yn) && data.live_ppv_yn === 'Y',
		catId,
		genreLarge: data.genre_large,
	};
}

function getSeriesTitle(data: any, seriesDesc: string | undefined): string {
	if (isUndefined(seriesDesc) && isUndefined(data.onair_date)) {
		return data.album_name;
	}

	const onAirDate = data.onair_date ? ` ${data.onair_date}` : '';

	return `${seriesDesc ? `[${seriesDesc}]` : ''}${onAirDate}`;
}

function getRuntimeSeconds(runtime: string): number | undefined {
	if (runtime) {
		const hours = parseInt(runtime.substring(0, 2), 10);
		const minutes = parseInt(runtime.substring(2, 4), 10);
		const seconds = parseInt(runtime.substring(4), 10);
		return (hours * 60 + minutes) * 60 + seconds;
	}

	return undefined;
}

function getRuntimeMinutes(runtime: string): number | undefined {
	if (runtime) {
		const hour = parseInt(runtime.substring(0, 2), 10);
		const minute = parseInt(runtime.substring(2, 4), 10);
		return hour * 60 + minute;
	}

	return undefined;
}

function getThumbnailUrl(data: any): string {
	return getResizedThumbnailUrl(data.img_url, data.img_file_name);
}

const terrChNameMapper = {
	'01': 'KBS',
	'02': 'MBC',
	'03': 'SBS',
	'04': 'EBS',
	'05': 'CJ',
	'06': 'TV조선',
	'07': 'JTBC',
	'08': '채널A',
	'09': 'MBN',
	'10': 'Mnet',
	'11': '올리브',
	'12': 'tvN',
	'13': 'XtvN',
	'14': '온스타일',
	'15': '스토리온',
	'16': 'OCN',
	'17': 'CGV',
	'18': 'OGN',
	'19': '수퍼액션',
	'20': '바둑TV',
	'21': '서울경제TV',
	'22': 'OBS',
	'23': 'MBC PLUS',
	'24': 'QTV',
	'25': '코미디TV',
	'26': 'SBS PLUS',
	'27': 'Trend E',
	'28': 'YTN',
	'29': 'etomato',
	'30': '중화TV',
	'31': '연합뉴스',
	'32': 'ABC',
	'33': 'O tvN',
	'34': 'K STAR',
	'35': 'SBS비디오머그',
	'36': 'SPOTV',
	'37': '기타케이블',
	'38': '라이프타임',
};

const prInfoMapper = {
	'01': '일반',
	'02': '7세 이상',
	'03': '12세이상',
	'04': '15세이상',
	'05': '청소년 관람불가',
	'06': '방송불가',
};
