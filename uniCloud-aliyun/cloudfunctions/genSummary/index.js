'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	console.log('uniCloud.httpclient111 : ', uniCloud.httpclient)
	
	const res = await uniCloud.httpclient('https://api.pancrasxox.xyz/ai/test',{
		method: 'GET',
		dataType: 'json'
	});
	// const res = await uniCloud.httpclient('https://api.pancrasxox.xyz/ai/test');
	// const res = 444;
	console.log('res')
	
	//返回数据给客户端
	return {res:res,aa:111111}
};
