// useage:
// const str = "Hello, World!";
// const interval = 200;
// for await (const char of printString(str, interval)) {
//   document.write(char);
// }
export const printString = (str, interval = 100) => {
	let i = 0;
	return new Promise((resolve) => {
		const intervalId = setInterval(() => {
			const char = str[i];
			i++;
			if (i === str.length) {
				clearInterval(intervalId);
				resolve();
			}
			resolve(char);
		}, interval);
	});
}

/* ------------- 分割线 ---------------  */
const genPromptParam = (params) => {
	let profession = params.profession ? `我的职业是${params.profession},` : ``;
	let wordNum = Number(params.wordNum) !== 0 ? `字数为${params.wordNum}的` : ``;
	let content = !params.content ? `` : `根据'${params.content}'`;

	let simplePrompt =
		`${profession}${content}写一份${wordNum}${params.summaryType}。满足以下要求：不需要写出具体内容;让老板满意,条理清晰,细节丰满;以分点叙述的形式输出;中文回复`;
	let specificPrompt = `${profession}${content}写一份${wordNum}${params.summaryType},中文回复`;

	let prompt = params.genType === 'simple' ? simplePrompt : specificPrompt;
	return prompt;
}

export const genText = async (params) => {
	let rtData = '';
	let prompt = genPromptParam(params);
	console.log({
		prompt
	})
	// return;
	try {
		const response = await uni.request({
			url: `https://api.baobaoai.online/api`,
			method: "post",
			data: {
				"messages": [{
					"role": "user",
					"content": prompt,
					// "content": 'hi',
					'stream': false
				}],
				"temperature": 0.6,
				"password": "",
				"key": "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",
				"model": "gpt-3.5-turbo"
			}
		});
		rtData = response.data;
	} catch (e) {
		//TODO handle the exception
		rtData = '网络似乎出现了点问题，请稍后再试！！';
	}
	return rtData;
}