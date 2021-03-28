// 公共配置项
import commonConfig from '../../../common-config';
// 模版
import template1 from './template1';

// 数据配置
const datas = {
	video_url: {
		title: "媒体文件",
		type: "video",
		tips: '媒体文件中全部的样式都是系统自带，不同的系统可能会出现不同的样式，样式无法自定义。 选择不自定义封面在IOS系统中默认视频封面全黑',
		value: {
			video_url: '',
			isShowPoster: '0',
			poster: ''
		}
	},
	padding_top: { title: '上边距', type: 'number', value: 0, col: 4, },
	padding_bottom: { title: '下边距', type: 'number', value: 0, col: 4, },
	padding_left: { title: '左边距', type: 'number', value: 0, col: 4, },
	padding_right: { title: '右边距', type: 'number', value: 0, col: 4, },
};

// 样式配置
const styles = {};

export const config = commonConfig.merge({
	datas,
	styles,
	layout: [
		template1
	]
});
