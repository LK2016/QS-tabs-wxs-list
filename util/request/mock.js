// 用于示例的模拟测试数据
let n = 0;
let tab = Array(10).fill('').map(() => 'tab_' + n++);
let DATA = {};
for (let i = 0; i < tab.length; i++) {
	const arr = [];
	for (let k = 0; k < 20; k++) {
		arr.push(tab[i] + ' ' + k);
	}
	DATA[tab[i]] = arr;
}

function mock(obj) {
	return new Promise((resolve, reject) => {
		const {
			url,
			pageNum,
			pageSize,
			tabId
		} = obj;
		if (url === '1/testUrl') {
			const data = DATA[tabId];
			if (data) {
				const sendData = getData(data, pageNum, pageSize);
				setTimeout(()=>{
					resolve(sendData);
				}, 300)
			}else{
				reject();
			}
		}else{
			reject();
		}
	})
}

function getData(data, pno, psize) {
	const obj = {msg: 'success', code: 0};
	const page = {};
	let size = data.length;
	page.size = size;
	let lastPage = Math.ceil(size/psize);
	page.lastPage = lastPage;
	let startIndex = (pno-1)*psize;
	let endIndex = startIndex + psize - 1;
	endIndex = endIndex > size-1 ? size: endIndex;
	let d = data.slice(startIndex, endIndex);
	page.list = d;
	obj.page = page;
	return obj;
}

module.exports = {
	mock
}
