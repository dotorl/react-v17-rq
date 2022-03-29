import { FIREBASE_API_KEY } from '@consts/index';
import { FirebaseDynamicLinks } from 'firebase-dynamic-links';
import { isUndefined } from '@utils/utils';
import { encryptExternalData } from '@misc/crypt';
import moment from 'moment';

export const getFirebaseLink = async ({ albumId, catId, serCatId, albumName, synopsis, imgUrl, imgFileName }) => {
	const today = moment().format('YYYYMMDDHHMMSS');
	// const external = `${this.props.authStore.sbcContNo}&${today}`;
	const external = `M20110725000${today}`;
	const externalEncrypted = encryptExternalData(external);

	const link = `https://mobiletv_main/vod_play?main_run=Y&auth_check=Y&backkey_finish=Y&is_splash=Y&contents_id=${albumId}&category_id=${catId}&series_category_id=${
		!isUndefined(serCatId) ? serCatId : ''
	}&vod_type=Vod&external=${externalEncrypted}&auto_play=N`;
	const firebaseDynamicLinks = new FirebaseDynamicLinks(FIREBASE_API_KEY);
	const { shortLink } = await firebaseDynamicLinks.createLink({
		dynamicLinkInfo: {
			domainUriPrefix: 'https://lguplusmobiletv.page.link',
			link,
			androidInfo: {
				androidPackageName: 'com.uplus.onphone',
				androidFallbackLink: 'https://play.google.com/store/apps/details?id=com.uplus.onphone',
			},
			iosInfo: {
				iosBundleId: 'kr.co.lguplus.hdtv',
				iosFallbackLink: 'https://apps.apple.com/kr/app/u-%EB%AA%A8%EB%B0%94%EC%9D%BCtv/id663697257',
				iosIpadFallbackLink: 'https://apps.apple.com/kr/app/u-%EB%AA%A8%EB%B0%94%EC%9D%BCtv/id663697257',
				iosIpadBundleId: 'kr.co.lguplus.hdtv',
			},
			navigationInfo: {
				enableForcedRedirect: false,
			},
			socialMetaTagInfo: {
				socialTitle: `모바일tv ${albumName}`,
				socialDescription: synopsis,
				socialImageLink: `${imgUrl}${imgFileName}`,
			},
		},
		suffix: {
			option: 'SHORT',
		},
	});

	return shortLink;
};
