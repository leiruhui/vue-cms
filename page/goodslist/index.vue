<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag='div'>
            <img :src="item.img_url">
            <h1 class="itile">
                {{ item.itile }}    
            </h1> 
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余:{{item.stock_quantity}}件</span>
                </p>    
            </div>  
        </router-link>    -->
        <!-- 在网页中有两种跳转形式 -->
        <!-- 第一种:使用a标签的叫做标签跳转 -->
        <!-- 第二种:使用window.location.href的形式叫做编程式导航跳转 -->
         <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)" >
            <img :src="item.img_url">
            <h1 class="itile">
                {{ item.itile }}    
            </h1> 
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余:{{item.stock_quantity}}件</span>
                </p>    
            </div>  
        </div>   


        <mt-button type='danger' size='large' @click="getMore">加载更多</mt-button>
    </div>    
</template>

<script>
export default {
    data(){
        return{
            pageindex:1, //代表着页数
            goodslist:[] //存放商品列表的数组
        }
    },
    created(){ //当data()和methods()都初始化以执行页面数据
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            // 获取商品列表数据
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                if(result.body.status===0){
                    this.goodslist = this.goodslist.concat(result.body.message); //数据点击加载通过concat方法让之前的数据加载到新的页数下
                }
            })
        },
        getMore(){
            // 当触发点击事件后页数加一
            this.pageindex++
            // 在重新刷新页面的数据
            this.getGoodsList();
        },
        getDetail(id){
            // 注意:一定要区分this.$route 和this.$router 这两个对象
            // 其中:this.$route 是路由[参数对象] ,所有路由中的参数,params,query 都属于它
            // 其中:this.$router 是一个路由对象,用它可以方便的使用JS代码,实现路由前进,后退,跳转到新的URL地址
            // console.log(this)
            // 第一种:最简单的,一般我们都选择第一种方式
            this.$router.push('/home/goodsinfo/'+id)
            // 2.传递对象
            // this.$router.push({ path: '/home/goodsinfo/'+id})
            // 3.传递命名的路由
            // this.$router.push({ name: 'goodsinfo', params: { id }})
        }
    }
}
</script>

<style lang="less">
    .goods-list{
        display: flex;
        flex-wrap:wrap;
        padding: 7px;
        .goods-item{
            width: 49%;
            margin: 4px 0;
            padding: 2px;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            img {
                width: 100%;
            }
            .itile{
                font-size: 14px;
            }
            .info{
                background-color:  tan;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    height: 30px;
                    .now{
                        font-size: 18px;
                        color: red;
                        float: left;
                        margin-left: 5px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        float:right;
                        margin-right: 5px;
                    }
                }
                .sell{
                   display: flex;
                   justify-content: space-between;
                   font-size: 12px;
                }
            }
        }
    }
</style>
