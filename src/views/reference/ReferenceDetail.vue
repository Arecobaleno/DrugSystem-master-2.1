<template>
<div class="page-full component-news-detail fx-column"> 
    <app-header title="文献详情">
        <!-- :title="appHeader.title" -->
        <div slot="right">
            <i class="icon-shoucang iconfont ac-o"></i>
            <!-- <i class="icon-fenxiang iconfont ac-o"></i> -->
        </div>
    </app-header>
    <div class="page-content fx-1">
        <!-- 详情标题 -->
        <!-- <div class="detail-head detail-bg border-b">
            <h2 class="detail-head-title" v-text="disease"></h2>
            <p v-if="item.alias" class="detail-head-small" v-text="'别名：'+item.alias"></p>
            <p v-if="item.common_name" class="detail-head-small" v-text="'俗称：'+item.common_name"></p>
            <p v-if="item.advice" class="detail-head-small" v-text="'就诊建议：'+item.advice"></p>
        </div> -->


        <!-- 跳转模块 -->
        <!-- <div class="detail-relevant border-b">
            <ul class="detail-relevant-box fx">
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-1"></i>辅助疗法</li>
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-2"></i>热门医生</li>
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-3"></i>附近医院</li>
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-4"></i>相关药品</li>
            </ul>
        </div> -->
        <!-- 详情内容 -->
        <div class="detail-info">
            <div class="info-group">
                <!-- 分点内容 -->
                <!-- <div class="info-sub">
                    <div class="info-sub-h">药品简介：</div>
                    <p class="info-sub-dd" >--</p>
                </div> -->

                <van-cell-group >
                    <van-cell :title = "bigtitle" size="large" />
                    <van-cell title = "摘要" size="large"  :label="summary" />
                    <van-cell title = "关键字" size="large" :label="keywords" /> 
                    <van-cell title = "作者" size="large" :label="author" />
                    <van-cell title = "期刊" size="large" :label="journal" />
                    
                    <!-- is-link :url="data.url" -->
                    <!-- <van-cell v-for="book in books" :key='book.title' :title = "book.title" :value="book.value" size="large" :label="book.label" is-link url="/vant/mobile.html"/> -->
                    <!-- <van-cell title="单元格" value="内容" size="large" label="描述信息" is-link url="/vant/mobile.html"/>
                    <van-cell title="单元格" value="内容" size="large" label="描述信息" is-link to="/"/> -->
                </van-cell-group>
                
                <van-cell-group >
                    <van-cell  />
                   <van-cell title = "查看原始文献"  size="large" is-link :url="url" />
                </van-cell-group>
                <!-- <div class="info-sub-h">药品简介：：</div> -->
                <!-- 分点内容 -->
                <!-- <div class="info-sub">
                    
                    <div  v-for="detail in detailList" :key="detail">
                        <p class="info-sub-dd">{{detail}}</p>
                    </div>
                   
                </div> -->
                
            </div>
        </div>
    </div>
    <!-- 相关资讯 -->
    <!-- <div v-if="hasInformations" class="detail-bg detail-advice">
        <div class="head-more s-icon-next icon-after"><a :href="'javascript:;'" class="cell">相关资讯</a></div>
        <ul class="advice-con-list">
            <li v-for="(value, key) in informations" class="list-cell border-b" :key="key">
                <a :href="'http://192.168.99.40:8001/news?id='+value.id" class="cell">
                    <div class="fx">
                        <img :src="value.image" class="cell-img" />
                        <div class="fx-cell">
                            <p class="cell-tit" v-text="value.title"></p>
                            <div class="tr">
                                <i class="s-icon icon"></i><span class="read-num" v-text="value.number"></span>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div> -->
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import appHeader from '../../components/app-header.vue'
import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Button);


export default {
    components: { appHeader },
    data (){
        return {
            appHeader: {
                title: this.$route.query.title
            },
            disease: '',
            example: [],
            detailList: [],
            referenceDetail: this.$route.query.referenceDetail, 
            bigtitle: '',
            title: this.$route.query.title,
            author: this.$route.query.author,
            summary: this.$route.query.summary,
            journal: this.$route.query.journal,
            keywords: this.$route.query.keywords,
            url: this.$route.query.url
        }
    },
    activated (){
    },
    deactivated (){
    },
    created () {
        // let content = this.appHeader.title
        // this.disease = content
        // this.showResult(content)
        if(this.$route.query) {
        this.referenceDetail = this.$route.query.referenceDetail;
        this.title = this.$route.query.title;
        this.author = this.$route.query.author;
        this.summary = this.$route.query.summary;
        this.journal = this.$route.query.journal;
        this.keywords = this.$route.query.keywords;
        this.url = this.$route.query.url;
        console.log("create-this.url");
            console.log(this.url);
        this.appHeader.title = this.$route.query.title;
        // console.log("this.referenceDetail");
        // console.log(this.referenceDetail);
        // console.log("this.author");
        // console.log(this.author);
        // console.log("this.title");
        // console.log(this.title);
        // this.init();
        }

        this.getReferenceDetail();
        // this.test1();
    },
    methods: {
        // showResult (content) {
        //     let url = '/api/detail'
        //     let data = {'category': 'disease', 'content': '心力衰竭'}
        //     axios.post(url, data)
        //         .then((response) => {
        //             console.log(response.data)
        //             let res = response.data
        //             for (let index in res) {
        //                 let treatment = []
        //                 let sample = res[index]
        //                 treatment.push(sample.properties.ATC编码,sample.properties.FDA妊娠分级,
        //                 )
        //                 console.log(treatment)
        //                 this.example.push(treatment)
        //             }
        //         })
        // },
        getReferenceDetail(){
            this.detailList.push("标题".concat(' : ', this.title));
            this.detailList.push("摘要".concat(' : ', this.summary));
            this.detailList.push("关键词".concat(' : ', this.keywords));
            this.detailList.push("作者".concat(' : ', this.author));
            this.detailList.push("期刊".concat(' : ', this.journal));

            this.bigtitle = "《".concat(this.title,'》');

            console.log("getReferenceDetail()\nthis.referenceDetail");
            console.log(this.referenceDetail);
            console.log("this.detailList");
            console.log(this.detailList);

        //   for (let index in this.drugDetail) {
        //       let treatment = []
        //       let arr = []
        //       let sample = this.drugDetail[index]
        //       treatment.push(sample.properties)
        //       let arr1 = Object.values(treatment[0])
        //       let arr2 = Object.keys(treatment[0])
        //       for(let i in arr1){
        //           let s1 = arr1[i]
        //           let s2 = arr2[i]
        //           console.log(s2)
        //           s2 = s2.concat(':', s1)
        //           this.example.push(s2)
        //       }
        //       console.log(666)
        //       console.log(treatment[0])
        //       this.example.push(treatment)
        //   }

        },
      
        },
        watch: {
        '$route'(to, from) {
        this.$router.go(0);
        }
    },
    watch: {
      '$route' (to, from) { //监听路由是否变化
		if(to.query.referenceDetail != from.query.referenceDetail){
            this.referenceDetail = to.query.referenceDetail;
            this.title = to.query.title;
            this.author = to.query.author;
            this.summary = to.query.summary;
            this.journal = to.query.journal;
            this.keywords = to.query.keywords;
            this.url = to.query.url;
            console.log("watch-this.url");
            console.log(this.url);
            this.appHeader.title = to.query.title;
			  // this.init();//重新加载数据
          }
        this.detailList = [];
        this.getReferenceDetail();
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
</style>
