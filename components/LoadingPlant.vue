<template>
  <view :className="`loading_plant ${type}`">
    <view className="content" :style="{ transform: `scale(${size / 300})` }">
      <view className="planet">
        <view className="ring" />
        <view className="cover-ring" />
        <view className="spots">
          <text />
          <text />
          <text />
          <text />
          <text />
          <text />
          <text />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
	console.log(111)
	interface Props {
	  type?: "fullScreen" | "container";
	  size: number;
	}
	// pass props options with default values to defineProps
	withDefaults(defineProps<Props>(), {
	  type: "fullScreen",
	  size: 300,
	});
</script>

<style lang="scss">

.loading_plant {
  $m-01: #3c4359cc;
  $m-02: #546c8c;
  $m-03: #7ea1bf;
  $m-04: #bacbd9;
  $m-05: #bf80a9;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: $m-01;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;

  &.container {
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .content {
    width: 300rpx;
    height: 300rpx;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .planet {
      width: 65%;
      height: 65%;
      background-color: $m-02;
      border-radius: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      transform-origin: center center;
      box-shadow: inset 2rpx -10rpx 0rpx rgba(0, 0, 0, 0.1);
      animation: planet 5s ease infinite alternate;

      @keyframes planet {
        0% {
          transform: rotate(10deg);
        }

        100% {
          transform: rotate(-10deg);
        }
      }

      /* planet ring */
      .ring {
        position: absolute;
        width: 300rpx;
        height: 300rpx;
        border-radius: 100%;
        background-color: $m-04;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: 33% center;
        box-shadow: 2rpx -10rpx 0rpx rgba(0, 0, 0, 0.1),
          inset -5rpx -10rpx 0rpx rgba(0, 0, 0, 0.1);
        animation: ring 3s ease infinite;

        @keyframes ring {
          0% {
            transform: rotateX(110deg) rotateZ(0deg) translate(-50rpx, 5rpx);
          }
          100% {
            transform: rotateX(110deg) rotateZ(360deg) translate(-50rpx, 5rpx);
          }
        }

        /* small ball */
        &:before {
          content: "";
          position: absolute;
          width: 10rpx;
          height: 30rpx;
          border-radius: 100%;
          background-color: $m-03;
          z-index: 2;
          left: calc(0rpx - 5rpx);
          box-shadow: inset -3rpx 3rpx 0rpx rgba(0, 0, 0, 0.2);
        }

        /* inner ring */
        &:after {
          content: "";
          position: absolute;
          width: 240rpx;
          height: 240rpx;
          border-radius: 100%;
          background-color: $m-03;
          box-shadow: inset 2rpx -10rpx 0rpx rgba(0, 0, 0, 0.1);
        }
      }

      /* to cover the back of the ring */
      .cover-ring {
        position: absolute;
        width: 100%;
        height: 50%;
        border-bottom-left-radius: 80%;
        border-bottom-right-radius: 80%;
        border-top-left-radius: 100rpx;
        border-top-right-radius: 100rpx;
        transform: translate(0rpx, -17rpx);
        background-color: $m-02;
        z-index: 2;
        box-shadow: inset 0rpx -2rpx 0rpx rgba(0, 0, 0, 0.1);
      }

      /* planet spots */
      .spots {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        text {
          width: 30rpx;
          height: 30rpx;
          background-color: $m-01;
          position: absolute;
          border-radius: 100%;
          box-shadow: inset -2rpx 3rpx 0rpx rgba(0, 0, 0, 0.3);
          animation: dots 5s ease infinite alternate;

          @keyframes dots {
            0% {
              box-shadow: inset -3rpx 3rpx 0rpx rgba(0, 0, 0, 0.3);
            }
            100% {
              box-shadow: inset 3rpx 3rpx 0rpx rgba(0, 0, 0, 0.3);
            }
          }

          &:nth-child(1) {
            top: 20rpx;
            right: 50rpx;
          }

          &:nth-child(2) {
            top: 40rpx;
            left: 50rpx;
            width: 15rpx;
            height: 15rpx;
          }

          &:nth-child(3) {
            top: 80rpx;
            left: 20rpx;
            width: 25rpx;
            height: 25rpx;
          }

          &:nth-child(4) {
            top: 80rpx;
            left: 90rpx;
            width: 40rpx;
            height: 40rpx;
          }

          &:nth-child(5) {
            top: 160rpx;
            left: 70rpx;
            width: 15rpx;
            height: 15rpx;
          }

          &:nth-child(6) {
            top: 165rpx;
            left: 125rpx;
            width: 10rpx;
            height: 10rpx;
          }

          &:nth-child(7) {
            top: 90rpx;
            left: 150rpx;
            width: 15rpx;
            height: 15rpx;
          }
        }
      }
    }

    p {
      color: $m-04;
      font-size: 14rpx;
      z-index: 2;
      position: absolute;
      bottom: -20rpx;
      font-family: "Roboto Mono", monospace;
      animation: text 4s ease infinite;
      width: 100rpx;
      text-align: center;

      @keyframes text {
        0% {
          transform: translateX(-30rpx);
          letter-spacing: 0rpx;
          color: $m-04;
        }

        25% {
          letter-spacing: 3rpx;
          color: $m-03;
        }

        50% {
          transform: translateX(30rpx);
          letter-spacing: 0rpx;
          color: $m-04;
        }

        75% {
          letter-spacing: 3rpx;
          color: $m-03;
        }

        100% {
          transform: translateX(-30rpx);
          letter-spacing: 0rpx;
          color: $m-04;
        }
      }
    }
  }
}
</style>