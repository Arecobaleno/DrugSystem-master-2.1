<template>
    <div class="page-full component-find fx-column">
        <div class="page-content fx-1">
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


            <van-dropdown-menu>
                <van-dropdown-item v-model="value1" :options="option1"  @change="searchYear"/>
                <van-dropdown-item v-model="value2" :options="option2"  @change="getOrder"/>
            </van-dropdown-menu>


      <!-- <van-cell is-link v-for="item in station" :key="item.Id" :id="item.Id" :title="item.Name" @click="onClick"/> -->
            <van-cell-group >
                <van-cell v-for="data in returnData" :key='data.title' :title = "data.title" size="large" :label="data.summary|ellipsis" @click="getReferenceDetail(data.title)"/>
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
            value1: 1,
            value2: 1,
            option1: [
                { text: '所有年份', value: 1 },
                { text: '2020', value: 2020 },
                { text: '2019', value: 2019 },
                { text: '2018', value: 2018 },
                { text: '2017', value: 2017 },
                { text: '2016', value: 2016 },
            ],
            option2: [
                { text: '按时间排序', value: 1 },
                { text: '按热度排序', value: 2 },
            ],
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
            let url = '/api/reference/get'
            let data = {
                'category': this.category,
                'content': this.content
            }        
            const _this = this;
            axios.post(url, data).then((response) => {
                _this.returnData = response.data;
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
            let url = '/api/reference/detail'
            console.log("title");
            console.log(title);
            let data = {'content': title}
            axios.post(url, data)
            .then((response) => {
                this.referenceDetail = response.data;
                this.$router.push({
                    path: "/referencedetail",
                    query: {referenceDetail: this.referenceDetail[0],url: this.referenceDetail[0].url, title: title, author: this.referenceDetail[0].author, summary: this.referenceDetail[0].summary, journal: this.referenceDetail[0].journal, keywords: this.referenceDetail[0].keywords,}
                });
            })
            .catch((error) => {
                console.log(error);
            })
        },
        searchYear() {
            this.returnData=[]
            let url = '/api/reference/get'
            let data = {'category': 'year','content': this.value1}
            axios.post(url, data)
            .then((response)=>{
                this.returnData=response.data              
            })
            .catch((error) => {
                    console.log(error)
            })
        },
        getOrder () {
            if(this.value2==1){
                this.returnData.sort(function(a,b){return b.year-a.year})
            } else {
                this.returnData.sort(function(a,b){return b.count-a.count})
            }
        }
    },
    created() {
        this.ask()
        this.getOrder()
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
