<template>
    <div class="page-full component-find fx-column">
        <div class="page-content fx-1">
            <!-- <section class="banner-box">
                <a class="banner-item ac" href="javascript:;"><img src="../assets/images/find/find_banner.jpg"></a>
            </section>
            <section class="modules">
                <h3 class="modules-title fx-c"><i class="iconfont icon-xiaoaixin"></i><span>优质服务</span><i class="iconfont icon-xiaoaixin"></i></h3>
                <ul class="modules-content fx">
                    <li class="modules-item fx fx-1">
                        <router-link class="fx-c fx-1 ac" to="/aid">
                            <div class="fx">
                                <img src="../assets/images/disease/drug@2x.png">
                                <p class="fx-1"><strong>用药助手</strong>自查症状&nbsp;了解疾病</p>
                            </div>
                        </router-link>
                    </li>
                    <li class="modules-item fx fx-1">
                        <router-link class="fx-c fx-1 ac" to="/firstaid">
                            <div class="fx">
                                <img src="../assets/images/find/find_jjcs.png">
                                <p class="fx-1"><strong>急救常识</strong>解析疾病&nbsp;加强诊疗</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </section>
            <section class="modules">
                <h3 class="modules-title fx-c"><i class="iconfont icon-xiaoaixin"></i><span>健康测评</span><i class="iconfont icon-xiaoaixin"></i></h3>
                <div class="scroll-evaluations">
                    <ul class="clearfix">
                        <li @click="toPage(0)"><img src="../assets/images/find/evaluation1.jpg"></li>
                        <li @click="toPage(1)"><img src="../assets/images/find/evaluation2.jpg"></li>
                        <li @click="toPage(2)"><img src="../assets/images/find/evaluation1.jpg"></li>
                    </ul>
                </div>
            </section> -->
            <app-header title="相关文献">
                
                <div slot="right">
                    <i class="icon-shoucang iconfont ac-o"></i>
                    <!-- <i class="icon-fenxiang iconfont ac-o"></i> -->
                </div>
            </app-header>
            
            <form action="/">
                <van-search
                    v-model="value"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    @cancel="onCancel"
                />
            </form>

      <!-- <van-cell is-link v-for="item in station" :key="item.Id" :id="item.Id" :title="item.Name" @click="onClick"/> -->
            <van-cell-group >
                <van-cell v-for="data in returnData" :key='data.title' :title = "data.title" size="large" :label="data.summary|ellipsis" @click="getReferenceDetail(data.title)"/>
                <!-- is-link :url="data.url" -->
                <!-- <van-cell v-for="book in books" :key='book.title' :title = "book.title" :value="book.value" size="large" :label="book.label" is-link url="/vant/mobile.html"/> -->
                <!-- <van-cell title="单元格" value="内容" size="large" label="描述信息" is-link url="/vant/mobile.html"/>
                <van-cell title="单元格" value="内容" size="large" label="描述信息" is-link to="/"/> -->
            </van-cell-group>

        </div>
        <app-nav></app-nav>
    </div>
</template>

<script>
import IScroll from 'iscroll'
import Utils from '../utils'
import appNav from '../components/app-nav.vue'
import { mapGetters, mapActions } from 'vuex'
import appHeader from '../components/app-header.vue'

import axios from "axios";
import Vue from 'vue';
import { Toast } from 'vant';
import { Search } from 'vant';
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Button);

Vue.use(Search);



var myScroll = null;

export default {
    components: {appHeader , appNav },
    data () {
        return {
            value: '',
            category: 'new',
            content: '',
            returnData:[],
            referenceDetail: null,
        }
    },
    filters: {
        ellipsis (value) {
        if (!value) return ''
        if (value.length > 200) {
            return value.slice(0,200) + '...'
        }
        return value
        }
    },

    methods: {
        ask(){
            let url = 'http://localhost:10088/reference/get'
            let data = {
                'category': this.category,
                'content': this.content
            }        
            const _this = this;
            axios.post(url, data).then((response) => {
                _this.returnData = response.data;
                
                console.log("_this.returnData");
                console.log(_this.returnData);
            });
        },
        onSearch(val) {
            if(val != ''){
                this.category = 'search';
                this.content = val;
                Toast(val);
            }
            else{
                this.category = 'new';
                this.content = val;
            }
            this.ask();
        },
        onCancel() {
            this.category = 'new';
            this.content = '';
            this.ask();
            Toast('取消');
        },
        getReferenceDetail(title){
            let url = 'http://localhost:10088/reference/detail'
            console.log("title");
            console.log(title);
            let data = {'content': title}
            axios.post(url, data)
            .then((response) => {
                // console.log(222)
                // console.log(response.data)
                this.referenceDetail = response.data;
                // console.log("this.referenceDetail")
                // console.log(this.referenceDetail);
                this.$router.push({
                    path: "/referencedetail",
                    query: {referenceDetail: this.referenceDetail[0],url: this.referenceDetail[0].url, title: title, author: this.referenceDetail[0].author, summary: this.referenceDetail[0].summary, journal: this.referenceDetail[0].journal, keywords: this.referenceDetail[0].keywords,}
                });
            })
            .catch((error) => {
                console.log(error);
            })
        },
        toPage: function(index){
            this.$store.dispatch('set_iframe_info', {
                url: this.evaluations[index],
                title: '健康测评'
            });
            this.$router.push({ path: 'evaluation'});
            }
        },
        mounted () {
            // this.$nextTick(() => {
            //     myScroll = new IScroll('.scroll-evaluations', { scrollX: true, scrollY: false, mouseWheel: false, click: Utils.iScrollClick() });
            // })
        },
        created() {
            this.ask();
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
@import "../assets/css/common.less";

.page-content{
    padding-bottom: .2rem;
    background-color: #f1f4f4;
}

.banner{
    background-color: #fff;
}
.banner-item{
    display: block;
    max-height: 4.08rem;
    overflow: hidden;
    & img{
        width: 100%;
    }
}
/**
 * 模块入口
 */
.modules{
    margin-top: .2rem;
    background-color: #fff;
}
.modules-title{
    height: .7rem;
    font-size: .26rem;
    color: #646f7f;
    border-bottom: 1px solid @bg_bd;
    & .iconfont{
        color: #cbdee8;
    }
    & span{
        margin: 0 .2rem;
    }
}
.modules .modules-content{
    border-bottom: 1px solid @bg_bd;
    & li:first-child{
        border-right: 1px solid @bg_bd;
    }
    &:last-child{
        border-bottom-color: transparent;
    }
}
.modules-item{
    height: 1.8rem;
    & a{
        font-size: 0.22rem;
        color: @color_m;
        line-height: 1.65;
        & strong{
            display: block;
            font-size: 0.3rem;
            color: @color_l;
        }
    }
    & img{
        margin-right: 0.18rem;
        width: 0.88rem;
        height: 0.88rem;
    }
}

.scroll-evaluations{
    position: relative;
    overflow: hidden;
    padding: .3rem 0;
    //height: 1.98rem;
    width: 100%;
    & ul{
        width: 3.4*3rem;
    }
    & li{
        margin-left: .2rem;
        float: left;
    }
    & img{
        height: 2rem;
        border-radius: .1rem;
    }
}
</style>
