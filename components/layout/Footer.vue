<template>
	  <view class="wpg_footer">
		  111111111
	    <!-- <n-divider>
	      <n-icon size="24"> <img src="/img/logo.svg" alt="" /></n-icon>
	    </n-divider> -->
	    <!-- <div class="wpg_fb"><ThemeSwitch /></div> -->
	    <p class="copyright gray">
	      Copyright © 2022-2023 Pancras Lu | <a href="/privacy">《隐私声明》</a>
	    </p>
	  </view>
</template>

<script>
</script>

<style lang="scss">
	.wpg_footer {
	  width: 100%;
	  position: absolute;
	  bottom: 0;
	  .n-divider {
	    margin-bottom: 10rpx;
	  }
	  .wpg_fb {
	    width: 100%;
	    display: flex;
	    align-self: center;
	    justify-content: center;
	    margin-bottom: 20rpx;
	  }
	}
	.gray {
	  color: #999;
	}
	.copyright {
	  width: 100%;
	  text-align: center;
	  font-weight: 500;
	  line-height: 1;
	  font-size: 12rpx;
	  a {
	    color: #999;
	  }
	}
</style>