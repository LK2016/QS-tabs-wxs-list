function QSTabsWxsListMixin(){
	return {
		props: {
			tab: {
				type: [Object, String],
				default () {
					return {}
				}
			},
			index: { // 保证性能勿删
				type: [String, Number],
				default: ''
			},
			current: { // 保证性能勿删
				type: [String, Number],
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			show: {
				type: [Boolean, String],
				default: false
			},
			readyRefresh: {
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				scrollTop: 0, // 保证性能勿删
				oldScrollTop: 0, // 保证性能勿删
				setScrollTopcount: 0 // 保证性能勿删
			}
		},
		watch: {
			// 保证性能勿删
			show(newValue, oldValue) {
				if (newValue === true) {
					this.toOldScrollTop();
				}
			}
		},
		computed: {
			// 保证性能勿删
			getShow() {
				return String(this.show)==='true';
			},
			getFixedClass() {
				// #ifndef MP
				return String(this.readyRefresh)==='true'&&String(this.getShow)==='true'?'freeze':'';
				// #endif
				// #ifdef MP
				return '';
				// #endif
			}
		},
		methods: {
			scrollFn(e) { // 保证性能勿删
				if (e.detail.scrollTop !== 0) {
					this.oldScrollTop = e.detail.scrollTop;
				}
			},
			toOldScrollTop() { // 保证性能勿删
				let _this = this;
				_this.$nextTick(() => {
					setTimeout(() => {
						_this.scrollTop = (_this.setScrollTopcount++ % 2 === 0) ? _this.oldScrollTop + 0.00001 : _this.oldScrollTop - 0.00001;
						if(_this.setScrollTopcount >= 3000) _this.setScrollTopcount = 0;
					}, 0)
				})
			}
		}
	}
}

module.exports = {
	QSTabsWxsListMixin
}