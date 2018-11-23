<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0 ?'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{ item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
 <script>
import mui from "../../src/lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] //获取所有图片数据
    };
  },
  created() {
    this.getAllCategory(); //进入页面后就进行
    this.getPhotoListByCateId(0); //页面加载后显示id为0的所有图片
  },
  mounted() {
    //因为刚进入图片页面的时候滑动条无法正常的进行工作 如果滑动条要进行初始化,必须要等DOM元素进行加载 当DOM元素渲染到页面时执行这个钩子函数
    //如果要执行DOM元素的话最好放在moutned里面 因为这个时候的DOM元素已经是最新的了
    mui(".mui-scroll-wrapper").scroll({
      //初始化滑动控件
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      // 获取图片列表页面的分类信息
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手动添加对象
          // console.log(result)
          result.body.message.unshift({ title: "全部", id: "0" });
          // 把请求过来的分类数据放入在创建的分类列表数组中
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(id) {
      this.$http.get("api/getimages/" + id).then(result => {
        if (result.body.status === 0) {
          console.log(result);
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less">
* {
  touch-action: pan-y;
} //清除浏览器对于滑动的影响

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: red;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
      background-color: red;
    }
    img[lazy="loading"] {
      width: 100%;
      height: 300px;
      margin: auto;
      background-color:rgb(221, 216, 216) ;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
