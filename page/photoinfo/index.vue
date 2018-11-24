<template>
    <div class="photoinfo-container">
        <h3>{{photninfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间{{photninfo.add_time |dateForm}} </span>
            <span>点击次数:{{photninfo.click}}次</span>
        </p>
        <hr>
        <!-- 图片预览插件 -->
             <div class="thumbs">
      <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
    </div>

            <!-- 内存区域 -->
        <div class="content" v-html='photninfo.content'></div>

        <!-- 评论区域 -->
     <comment-box :id="this.id"></comment-box>
    </div>    
</template>

<script>
import comment from '../comment/'
export default {
    data(){
        return{
        id:this.$route.params.id, //从路由中获取到的图片id
        photninfo:{},
        list:[]
        }
    },
    created(){
        this.getPhotoinfo();
        this.getThumbs();
    },
    methods:{
        getPhotoinfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                if(result.body.status ===0){
                    this.photninfo=result.body.message[0]
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/' +this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(item=>{
                        item.w = 600;
                        item.h =400;
                    });
                    this.list = result.body.message;
                }
            })
        }
    },
     components:{ //注册子组件
            'comment-box':comment
        }
}
</script>

<style lang="less">
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs{
    img{
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
//   .preview-img{
//       background-color: red;
//       width: 300px;
//       height: 300px;
//   }
}
</style>
