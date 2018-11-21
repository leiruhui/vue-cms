<template>
    <div>
        <ul class="mui-table-view">
					<!-- 把数据进行循环 有id的情况下最好把key绑定给id -->
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key='item.id'>
					<rounter-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h3>{{ item.title }}</h3>
							<!-- 进行管道符 实行过滤器 -->
							<span class='mui-ellipsis'>发布时间:{{ item.add_time | dateForm}}</span>
                            <span class='mui-ellipsis mui-pull-right' >点击:{{ item.click }}次</span>
						</div>
					</rounter-link>
				</li>
			</ul>
    </div>
</template>

<script>
// 引用mint-ui中的弹框
import { Toast } from 'mint-ui'
// 暴露目标
export default {
    data(){
        return {
            newsList:[] //新闻列表直接设置一个空的数组就可以
		};
	},
	created (){
		this.getNewsList();
	},
	methods:{
		getNewsList(){ //get请求中一种方法 名字可以随便起主要还是看方法中的get的请求
			this.$http.get('api/getnewslist').then(resulte =>{
				// 判断resulte中的status是否为0 如果为0 的话就是判断获取成功就进行下一步的代码
				if(resulte.body.status==0){
					// 把resulte中的message数据赋值到直接创建的空的数组(this.newsList)中
					this.newsList = resulte.body.message
					console.log(resulte)
				}else{//判断失败
					Toast('获取新闻列表失败!!')
				}
			})
		}
	}
}
</script>

<style lang="less">
	.mui-media-body{
		h3{
			font-size: 18px;
		}
		.mui-ellipsis{
			font-size: 15px;
			color: #226aff;	 
		}
	}
</style>
