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
        <!-- van-pagination总页数参数为page-count 总记录数即total-items不大一样 -->
        <van-pagination class="arrow"
        v-model="currentPage"
        :page-count="pageCount"
        items-per-page="5"/>
        
   </div>
    <div class='download'>
           <el-button class='download_button' size="normal" type="primary" @click="download()" >下载</el-button>
    </div>  
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import appHeader from '../../components/app-header.vue'
// import pdfLib from '../../../static/js/build/pdf'
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
      stringToUint8Array(str){
        var rawLength = str.length;  
        //转换成pdf.js能直接解析的Uint8Array类型,见pdf.js-4068  
        var array = new Uint8Array(new ArrayBuffer(rawLength));    
        for(var i = 0; i < rawLength; i++) {  
        array[i] = str.charCodeAt(i) & 0xff;  
        }  
        return array;  
    },
      // pdf加载时
      loadPdfHandler (e) {
        this.currentPage = 1 // 加载的时候先加载第一页
      }
    },
    created () {
        let title = this.$route.query.guideItems
        this.src = pdf.createLoadingTask({url:'/api/guide/download?filename=' + title, cMapUrl: '../../../static/js/', cMapPacked: true})
        console.log(this.src)
        this.guideDetail.title = title
    },
    destroyed(){
        let url = '/api/guide/detail'
        let data = {'content': title}
    	axios.post(url, data)
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
.download_button{
width: 100%;
height: 50px;
}
.pdf {
margin-left: 0px;
}
.main {
margin-top: -20px;
width: 110%;
margin-left: -20px;
height: 500px;
overflow: scroll;
}
.arrow {
    margin-top: 40px;
}
.line {
display: inline;
}
</style>
