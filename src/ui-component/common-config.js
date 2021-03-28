/**
 * 基础数据
 */
class Config {
    constructor () {
        this.state = {
            datas: {
	            padding_top: { title: '上边距', type: 'number', value: 0, col: 4, },
	            padding_bottom: { title: '下边距', type: 'number', value: 0, col: 4, },
	            padding_left: { title: '左边距', type: 'number', value: 0, col: 4, },
	            padding_right: { title: '右边距', type: 'number', value: 0, col: 4, },
            },
            styles: {}
        }
    }

    /**
     * 合并数据
     * @param {Object} datas
     * @param {Object} styles
     * @returns {Object}
     */
    merge (data) {
        const __data = data;
        Object.keys(this.state).map(key => {
            __data[key] = Object.assign(__data[key], this.state[key]);
        });
        return __data;
    }
}

export default new Config();
