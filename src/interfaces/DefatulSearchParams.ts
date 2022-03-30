// 1. 실시간 채널
export interface IdefaultParamsType1 {
	a_rtype: string;
	i_rtype: string;
	service_id: string;
	multi_channel: string;
	is_splash: string;
}

export const mapDefaultParamsType1 = (param): IdefaultParamsType1 => {
	return {
		a_rtype: param.a_rtype || '',
		i_rtype: param.i_rtype || '',
		service_id: param.service_id || '',
		multi_channel: param.multi_channel || '',
		is_splash: param.is_splash || '',
	};
};

// 2. VOD 재생(본편보기)
export interface IdefaultParamsType2 {
	a_rtype: string;
	i_rtype: string;
	i_vod_type: string;
	vod_type: string;
	contents_id: string;
	category_id: string;
	series_num: string;
	is_splash: string;
}

export const mapDefaultParamsType2 = (param): IdefaultParamsType2 => {
	return {
		a_rtype: param.a_rtype || '',
		i_rtype: param.i_rtype || '',
		i_vod_type: param.i_vod_type || '',
		vod_type: param.vod_type || '',
		contents_id: param.contents_id || '',
		category_id: param.category_id || '',
		series_num: param.series_num || '',
		is_splash: param.is_splash || '',
	};
};

// 3. 하이라이트재생
export interface IdefaultParamsType3 {
	a_rtype: string;
	i_rtype: string;
	title: string;
	start_time: string;
	end_time: string;
	contents_id: string;
	category_id: string;
	seriesNo: string;
	i_contents_id: string;
	i_category_id: string;
	is_splash: string;
}

export const mapDefaultParamsType3 = (param): IdefaultParamsType3 => {
	return {
		a_rtype: param.a_rtype || '',
		i_rtype: param.i_rtype || '',
		title: param.title || '',
		start_time: param.start_time || '',
		end_time: param.end_time || '',
		contents_id: param.contents_id || '',
		category_id: param.category_id || '',
		seriesNo: param.seriesNo || '',
		i_contents_id: param.i_contents_id || '',
		i_category_id: param.i_category_id || '',
		is_splash: param.is_splash || '',
	};
};

// 4. 탭 메뉴 바로가기(마이컷, 선물함추가)
export interface IdefaultParamsType4 {
	a_rtype: string;
	i_rtype: string;
	cat_depth1: string;
	cat_depth2: string;
	cat_depth3: string;
	cat_depth4: string;
}

export const mapDefaultParamsType4 = (param): IdefaultParamsType4 => {
	return {
		a_rtype: param.a_rtype || '',
		i_rtype: param.i_rtype || '',
		cat_depth1: param.cat_depth1 || '',
		cat_depth2: param.cat_depth2 || '',
		cat_depth3: param.cat_depth3 || '',
		cat_depth4: param.cat_depth4 || '',
	};
};

// 5. 이벤트 페이지
export interface IdefaultParamsType5 {
	a_rtype: string;
	i_rtype: string;
	bbs_id: string;
	reg_id: string;
	is_splash: string;
}

export const mapDefaultParamsType5 = (param): IdefaultParamsType5 => {
	return {
		a_rtype: param.a_rtype || '',
		i_rtype: param.i_rtype || '',
		bbs_id: param.bbs_id || '',
		reg_id: param.reg_id || '',
		is_splash: param.is_splash || '',
	};
};

// 6. VOD 상세페이지
export interface IdefaultParamsType6 {
	a_rtype: string;
	i_rtype: string;
	vod_type: string;
	i_vod_type: string;
	contents_id: string;
	category_id: string;
	series_category_id: string;
	series_num: string;
	is_splash: string;
	appType: string;
	share_type: string;
}

export const mapDefaultParamsType6 = (param): IdefaultParamsType6 => {
	return {
		a_rtype: param.a_rtype || '',
		i_rtype: param.i_rtype || '',
		vod_type: param.vod_type || '',
		i_vod_type: param.i_vod_type || '',
		contents_id: param.contents_id || '',
		category_id: param.category_id || '',
		series_category_id: param.series_category_id || '',
		series_num: param.series_num || '',
		is_splash: param.is_splash || '',
		appType: param.appType || '',
		share_type: param.share_type || '',
	};
};

// 7. 하이라이트 상세화면
export interface IdefaultParamsType7 {
	a_rtype: string;
	i_rtype: string;
	contents_title: string;
	contents_id: string;
	category_id: string;
	i_contents_id: string;
	i_category_id: string;
	is_splash: string;
}

export const mapDefaultParamsType7 = (param): IdefaultParamsType7 => {
	return {
		a_rtype: param.a_rtype || '',
		i_rtype: param.i_rtype || '',
		contents_title: param.contents_title || '',
		contents_id: param.contents_id || '',
		category_id: param.category_id || '',
		i_contents_id: param.i_contents_id || '',
		i_category_id: param.i_category_id || '',
		is_splash: param.is_splash || '',
	};
};

// 8. 비디오포털 메인화면
export interface IdefaultParamsType8 {
	a_rtype: string;
	i_rtype: string;
	is_splash: string;
}

export const mapDefaultParamsType8 = (param): IdefaultParamsType8 => {
	return {
		a_rtype: param.a_rtype || '',
		i_rtype: param.i_rtype || '',
		is_splash: param.is_splash || '',
	};
};
