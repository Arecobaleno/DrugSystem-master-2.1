<template>
<div class="page-full component-drug-list fx-column"> 
   
   <div class="druglist-header">
        <app-header :title="appHeader.title"></app-header>
   </div>

   <div class="page-content fx-1">

        <div class="d-header"  >
            <h2 class="d-header-t">
                 <div class="drug-main fx-3">
                     <!-- <div class="fx-colum"> -->
                        <p class="Guide_Title fx-ac" v-text="guideDetail.title || '--'"></p>
                    <!-- </div> -->
                 </div>
            </h2>
            <!-- <p class="d-header-d" v-text="guideDetail.title || '--'"></p> -->
        </div>

       <div class="drug-main">
       <!-- <div class="drug-item">
           <strong>标题</strong>
           <p v-html="guideDetail.title || '--'"></p>
       </div> -->
        <div class="drug-item">
           <strong>时间</strong>
           <p v-html="guideDetail.time || '--'"></p>
       </div>
        <div class="drug-item">
           <strong>作者</strong>
           <p v-html="guideDetail.maker || '--'"></p>
       </div>
        <!-- <div class="drug-item" > -->
          
       <!-- </div>   -->
       </div>

        <div style="float:right" >
           <el-button  size="mini" type="primary" @click="download()" >下载</el-button>
            </div>
   </div>
    
    <app-nav></app-nav>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import appHeader from '../../components/app-header.vue'
import axios from 'axios'
export default {
    components: { appHeader },
    data (){
        return {
            appHeader: {
                title:"指南详情"
            },
            guideDetail:{
                title: this.$route.query.guideItems[0].title,
                time:this.$route.query.guideItems[0].time,
                maker: this.$route.query.guideItems[0].maker,
            } 
        }
    },
    activated (){
    },
    deactivated (){
    },
    created () {
   
    //     if(this.$route.query) {
    //     this.guideDetail = this.$route.query.guideItems;
    //     // this.appHeader.title = this.$route.query.drugList;
 
    //   }
     
    },
    methods: {
      download(){
          window.location.href = 'http://127.0.0.1:10088/guide/download?filename='+this.guideDetail.title
      }
    },
    watch: {
    '$route'(to, from) {
      this.$router.go(0);

    }
  },
   watch: {
	  '$route' (to, from) { //监听路由是否变化
		  if(to.query.guideItems != from.query.guideItems && to.query.guideItems != undefined && Object.prototype.toString.call(to.query.guideItems[0]) != '[object String]'){
        console.log(333);
        console.log(to.query.guideItems);
        console.log(Object.prototype.toString.call(to.query.guideItems[0]))
       this.guideDetail.time = to.query.guideItems[0].time;
       this.guideDetail.maker = to.query.guideItems[0].maker;
       this.guideDetail.title = to.query.guideItems[0].title;
			  // this.init();//重新加载数据
		  }
	  }
},
    computed: mapGetters({
        backPath: 'backPath',
        item: 'diseaseItem',
        hasInformations: 'hasInformations',
        informations: 'informations'
    })
}
</script>

<style lang="less" scoped>
@import "../../assets/css/common.less";
.page-full{
    background-color: #fff;
}

// .detail-relevant{
// }
.relevant-item{
    height: 1.9rem;
    color: @color_l;
}

.flex-icon {
    display: block;
    width: 0.88rem;
    height: 0.88rem;
    margin-bottom: 0.18rem;
    background-size: 0.88rem 0.88rem;
}

.flex-icon.icon-1 {
    background-image: url(../../assets/images/disease/therapy@2x.png);
}

.flex-icon.icon-2 {
    background-image: url(../../assets/images/disease/doctor@2x.png);
}

.flex-icon.icon-3 {
    background-image: url(../../assets/images/disease/hospital@2x.png);
}

.flex-icon.icon-4 {
    background-image: url(../../assets/images/disease/drug@2x.png);
}

/*页面其他小图标*/
.s-icon {
    margin-right: .06rem;
    width: 0.26rem;
    height: 0.2rem;
    vertical-align: middle;
}


/*图标">"*/

.s-icon-next:after {
    content: '';
    width: 0.16rem;
    height: 0.28rem;
    position: absolute;
    right: 0.2rem;
    top: 0.02rem;
    cursor: pointer;
}


/*症状详情*/

.info-sub-dd {
    color: @color;
    line-height: 0.52rem;
}


/*相关资讯*/

.detail-advice {
    margin-top: .32rem;
    padding-top: 0.2rem;
}

.head-more {
    color: @color;
    font-size: .26rem;
    height: .4rem;
    line-height: .4rem;
    position: relative;
    padding: 0 .2rem;
    overflow: hidden;
}

.detail-advice .cell {
    display: block;
    width: 100%;
    color: @color;
}

.list-cell .cell {
    color: @color_l;
}

.list-cell {
    padding: 0 .2rem;
    position: relative;
}

.list-cell .cell-img {
    width: 1.6rem;
    height: 1.2rem;
    border-radius: .05rem;
    margin: .26rem .23rem .26rem 0;
}

.list-cell .fx-cell {
    flex: 1;
    margin-top: .26rem;
    line-height: .4rem;
    font-size: .3rem;
}

.list-cell .cell-tit {
    overflow: hidden;
    height: 0.91rem;
    line-height: 0.45rem;
    font-size: .3rem;
    color: #3d4550;
    .elsn();
}

.list-cell .fx-cell .tr {
    position: absolute;
    right: .2rem;
    bottom: .17rem
}

.list-cell .read-num {
    color: @color_s;
    font-size: .24rem;
}
.drug-main{
    padding: 0.28rem 0.2rem 0 0.2rem;
    font-size: 0.28rem;
    background-color: @bg_cont;
}
.drug-item{
    padding-bottom: 0.3rem;
    line-height: 0.5rem;
    & strong{
        font-weight: bold;
        color: @color_l;
    }
}
.d-header-d{
    margin-bottom: 0.12rem;
    line-height: 1.2em;
    font-size: 0.24rem;
    color: @color_s;
    &:last-child{
        margin-bottom: 0;
    }
    & strong{
        font-weight: bold;
        color: @color_l;
    }
}

.tag-group{
    .clearfix()
}
// .tag-i{
//     float: right;
// }
.Guide_Title{
    text-transform: uppercase;
    font-size: 0.3rem;
      font-weight: 900;
      overflow: hidden;
      color: #000000;
}
.download_buttonn{
float: right;
}
</style>
