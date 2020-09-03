<template>
<div class="page-full component-drug-list fx-column"> 
   
   <div class="druglist-header">
        <app-header :title="appHeader.title"></app-header>
   </div>

   <div class="page-content fx-1">
        <div class="detail-head detail-bg border-b">
            <h1 class="detail-head-title" v-text="guideDetail.title || '--'"></h1>
        </div>
        <div class="main">
            <pdf :src="src" ref="ref" class="pdf" :page="currentPage" @num-pages="pageCount=$event"
            @page-loaded="currentPage=$event"
            @loaded="loadPdfHandler"></pdf>
        </div>
        <van-pagination class="arrow"
        v-model="currentPage"
        :total-items="pageCount"
        items-per-page="5"/>
   </div>
    <!-- <div style="float:right" >
           <el-button  size="mini" type="primary" @click="download()" >下载</el-button>
    </div> -->  
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import appHeader from '../../components/app-header.vue'
import axios from 'axios'
import pdf from 'vue-pdf'
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
export default {
    components: { appHeader, pdf},
    data (){
        return {
            appHeader: {
                title:"指南详情"
            },
            guideDetail:{
                title: ''
            },
            currentPage: 0, // pdf文件页码
            pageCount: 0, // pdf文件总页数
            fileType: 'pdf', // 文件类型
            src: ''
        }
    },
    methods: {
      download(){
          window.location.href = '/api/guide/download?filename='+this.guideDetail.title
      },
      changePdfPage (val) {
        if (val === 0 && this.currentPage > 1) {
            this.currentPage--
        }
        if (val === 1 && this.currentPage < this.pageCount) {
            this.currentPage++
        }
      },
      // pdf加载时
      loadPdfHandler (e) {
        this.currentPage = 1 // 加载的时候先加载第一页
      }
    },
    mounted () {
        let title = this.$route.query.guideItems[0].title
        console.log(title)
        this.guideDetail.title = title
        this.src = pdf.createLoadingTask({url: '/api/guide/download?filename=' + title, CMapReaderFactory})
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

.page-content fx-1{
    height: 600px;
}
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
.d-header-t{
    width: 30px;
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
.pdf {
margin-left: 0px;
}
.main {
margin-top: -20px;
width: 110%;
margin-left: -20px;
height: 500px;
}
.arrow {
    margin-top: 40px;
}
.line {
display: inline;
}
</style>
