import { rest } from 'msw';

export const getSetting = rest.get('/setting', (req, res, ctx) => {
	return res(
		ctx.status(200),
		ctx.json({
			flag: '0000',
			member_group: 'Test4',
			message: '성공',
			total_cnt: 0,
		}),
	);
});
