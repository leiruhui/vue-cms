<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time | dateForm}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>

    <hr>
    <div class="content" v-html="newsinfo.content"></div>
    <comment-box :id='this.id'></comment-box>
    </div>
</template>
<script>
import { Toast} from 'mint-ui'
// 引用评论的子组件
import comment from '../comment'
export default {
    data(){
        return {
            id:this.$route.params.id ,//将url的id值挂载到data上,方便以后调用
            newsinfo:{}
        };
    },
    created() {
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo() {
            this.$http.get('api/getnew/'+this.id).then(resulte=>{
                if(resulte.body.status==0){
                    this.newsinfo = resulte.body.message[0]
                    // console.log(resulte)
                }else{
                    Toast('获取新闻详情失败!!')
                }
            })
        }
    },
    components:{
        // 用来注册子组件的节点
        "comment-box":comment
    }
}
</script>
<style lang="less">
    .newsinfo-container{
        padding: 0.4px;
        .title{
            font-size: 14px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
</style>


