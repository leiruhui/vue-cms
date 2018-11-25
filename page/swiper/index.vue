<template>
    <!-- 轮播图区域 -->
  
      <mt-swipe class="binner-container" :auto="4000">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
              <a :href="item.url">
                  <img :src="item.img">
              </a>
          </mt-swipe-item>
      </mt-swipe>
  
</template>

<script>
export default {
    props:['bannerList']
};
</script>

<style lang="less">

// 轮播图样式
.binner-container {
    height: 200px;

    .mint-swipe-item {
      
      &:nth-child(1) {
        background-color: yellow;
      }
      &:nth-child(2) {
        background-color: blue;
      }
      &:nth-child(3) {
        background-color: skyblue;
      }

      a {
        display: block;
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
      }
    }
  }
</style>
