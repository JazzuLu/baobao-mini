<template>
	<view class="wpg_content">
		<view class="wpg_content_inner">
			<view class="wpg_top">
				<view class="wpg_tit mb">写下工作内容，一键生成{{ genParams.summaryType }}</view>

				<view class="wpg_input mb"><textarea auto-height placeholder="说些什么！~ 比如：做了5个ppt" clearable
						v-model="genParams.content" /></view>
				<!-- 职业 -->
				<view class="wpg_li">
					<view class="tit">职业：</view>
					<view class="wpg_input">
						<input class="des" placeholder="透露一下，会更准确哟~" v-model="genParams.profession" />
					</view>
				</view>
				<!-- 总结的类型 日报/周报... -->
				<view class="wpg_li">
					<view class="tit">类型：</view>
					<radio-group class="wpg_group" @change="e => (genParams.summaryType = e.target.value)">
						<label v-for="item in WorkTypeItems" :key="item.value" :value="item.value">
							<radio class="blue" :value="item.value" :checked="item.value === genParams.summaryType" />
							<text>{{ item.label }}</text>
						</label>
					</radio-group>
				</view>
				<!-- 点击生成 -->
				<button class="w-100 cu-btn bg-blue" @click="handlerGen" :disabled="genResult.generating">
					{{ genResult.generating ? `生成中` : `生成${genParams.summaryType}` }}
					<!-- <LoadingDot v-if="genResult.generating && !genResult.loading" class="loading_dot" /> -->
				</button>
			</view>
			<view class="wpg_result" v-if="genResult.words">
				<text>{{ genResult.words }}</text>
				<view v-if="!genResult.generating" class="wpg_btn_container">
					<button class="cu-btn block line-blue" @click="handlerCopy">一键复制</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	// const message = useMessage();
	import {
		// printStringAsync,
		printString,
		genText,
	} from '../../utils/utils.js'

	import {
		ref
	} from 'vue';

	const WorkTypeItems = [{
			label: '日报',
			value: '日报'
		},
		{
			label: '周报',
			value: '周报'
		},
		{
			label: '月报',
			value: '月报'
		}
		// { label: "述职报告", value: "述职报告" },
		// { label: "年终总结", value: "年终总结" },
	];

	let genResult = ref({
		emptyWords: '写下工作内容，这里会有你想要的...\n(～￣▽￣)～',
		words: ``,
		loading: false,
		generating: false
	});
	let genParams = ref({
		content: '',
		wordNum: 0,
		summaryType: '日报',
		genType: 'simple',
		profession: ''
	});


	async function typeWriter(text, delay = 10) {
		for (let i = 0; i < text.length; i++) {
			genResult.value.words += text.charAt(i);
			await new Promise(resolve => setTimeout(resolve, delay));
		}
	}

	const handlerGen = async () => {
		// genResult.value.loading = true;
		uni.showLoading({
			title: '努力生成中'
		})
		genResult.value.generating = true;

		let text = await genText(genParams.value);

		uni.hideLoading()
		// genResult.value.loading = false;
		await typeWriter(text ?? '');
		genResult.value.generating = false;
	};

	const handlerCopy = async event => {
		uni.setClipboardData({
			data: genResult.value.words,
			success: function() {
				console.log('success');
			},
			fail() {
				console.log('fail');
			}
		});
	};
</script>

<style lang="scss">
	.wpg_content {
		padding: 30rpx;
		height: 100%;

		.wpg_content_inner {
			width: 100%;
			height: 100%;

			.wpg_top {
				width: 100%;
			}

			.wpg_li {
				width: 100%;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;

				.tit {
					width: 180rpx;
				}
			}

			.wpg_group {
				width: 100%;
				display: flex;
				justify-content: space-between;

				radio {
					transform: scale(0.7);
				}
			}

			.loading_dot {
				transform: scale(0.5);
				margin-left: 0;

				.line {
					background-color: var(--n-text-color);
				}
			}
		}
	}

	.mb {
		margin-bottom: 40rpx;
	}

	.w-100 {
		width: 100%;
	}

	.wpg_tit {
		font-size: 50rpx;
		font-weight: 800;
	}

	.wpg_input {
		background-color: #eee;
		border-radius: 10rpx;
		padding: 10rpx 28rpx;
		width: 100%;

		textarea {
			max-height: 96rpx;
		}
	}

	.wpg_result {
		width: 100%;
		margin-top: 30rpx;
		margin-bottom: 40rpx;
		max-height: calc(100vh - 600rpx);
		min-height: 90rpx;
		overflow-y: auto;
		position: relative;
		background-color: #eee;
		border-radius: 10rpx;
		padding: 28rpx;

		&.wpg_empty {
			color: #999;
		}

		pre {
			white-space: pre-wrap;
			margin: 0;
		}

		.wpg_btn_container {
			position: sticky;
			bottom: 20rpx;
			left: 0;
			display: flex;
			justify-content: center;

			.cu-btn {
				margin-top: 40rpx;
				background: rgb(228, 234, 248);
			}
		}
	}
</style>