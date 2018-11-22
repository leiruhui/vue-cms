<template>
   <div class="cmt-container">
        <h3 >发表评论</h3>  
        <hr>
        <textarea placeholder="请输入要BB的内容(最多吐槽12字)" maxlength="120" v-model="msg"></textarea> 

        <mt-button type='primary' size='large' @click="pastComment">发表评论</mt-button>
            <div class="cmt-list">
                <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                    <div class="cmt-title">
                        第{{i+1}}楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateForm }}
                    </div>
                    <div class="cmt-body">
                        {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                    </div>
                </div>
            </div>
        <mt-button type='danger' size='large' plain @click="getMore">加载更多</mt-button>
    </div> 
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            pageIndex:1, //默认展示第一页数据
            comments:[] ,//所有的评论数据
            msg:''//评论输入的内容
        };
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result=>{
                if(result.body.status ==0){
                    // this.comments = result.body.message
                    this.comments = this.comments.concat(result.body.message)
                    console.log(result)
                }else{
                    Toast('获取评论数据失败!!')
                }
            })
        },
    getMore(){
        this.pageIndex++;
        this.getComments();
    },
    pastComment(){
        // 判断内容是否为空
        if(this.msg.trim().length ===0){
            return Toast('内容为空!!');
        }
        // 发表评论用到的是post请求方式
        // 参数1: 请求url地址
        // 参数2: 提交服务器的数据对象{contenr:this.msg}
        // 参数3: 定义提交的时候,表单中数据的格式{emulateJSON:true}
        this.$http.post('api/postcomment/' + this.id,{content:this.msg.trim()}).then(result=>{
            // console.log(1)
            if(result.body.status ===0){
                var cm = {
                    user_name:'匿名用户', //获取用户名
                    add_time:Date.now(),    //获取时间
                    content:this.msg.trim() //获取内容
                };
                this.comments.unshift(cm)   //使用(unshift)本身的数据前添加新的评论内容
                this.msg = '' //清空评论框
            }
        })
    },
    },
   
    props:['id']
}
</script>

<style lang="less">
    .cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: rgba(204, 204, 204, 0.705);
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
