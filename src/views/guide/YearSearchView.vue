<template>
	<div class="page-full component-home fx-column">
	<app-header :title="appHeader.title"></app-header>
     <div class="year">
       <van-dropdown-menu>
         <van-dropdown-item v-model="value1" :options="option1"  @change="searchYear"/>
         <van-dropdown-item v-model="value2" :options="option2"  @change="getOrder"/>
       </van-dropdown-menu>
     </div>
      <div v-for="(treatment,index) in example" v-bind:key="index" @click="getGuideItems(treatment.title)">
       <!-- <van-cell-group> -->
	   <!-- <router-link tag="li" to="firstaid/detail/1"> -->
        <van-cell size="small" class="guide-item">
        <div class="guide-item-1" >{{(treatment.title)}}</div>
        <div class="guide-item-2" >{{treatment.maker}}</div>
        <div class="guide-item-3" >{{treatment.year}}</div>

        <van-divider :style="{ color: '#000000', borderColor: '#000000', padding: '0 1px' } " class="splitline">
        </van-divider>
        </van-cell>

      </div>
		<!-- <app-nav></app-nav> -->
	</div>
</template>

<script>
	import Utils from '../../utils'
	import appNav from '../../components/app-nav.vue'
	import appHeader from "../../components/app-header.vue";
	import axios from 'axios';
	import router from '../../router';
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		components: {
			appNav,
			appHeader
		},
		data() {
			return {
				appHeader: {
				title: "按年份查询"
      },
				isResetMap: true,
				searchData: "",
				interaction: [],

				historySearch:['abc','efg'],
				history:"历史搜索：暂无",
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
				example: [],
			}
		},
		computed: mapGetters({
			ifrmeHwUced: 'ifrmeHwUced',
		}),
		created(){
		    //获取localstorage
			this.searchYear();
		},
		methods: {
        	searchYear() {
                this.example=[]
                let url = '/api/guide/get'
                let data = {'category': 'year','content': this.value1}
           		axios.post(url, data)
           		.then((response)=>{
           			let res = response.data
           			//console.log(res);
           			for (let index in res) {
           				let treatment = []
           				let sample = res[index]
           				treatment.push(sample)
                  		this.example.push({index:index, year:sample.time, title:sample.title, count:sample.count,maker:sample.maker})
       				}
                 // alert(JSON.stringify(this.example));
                 
           			})
           			.catch((error) => {
           				console.log(error);
           			})
         	},
			getGuideItems(name){
                this.$router.push({
                name: "GuideDetail",
                query: {guideItems: name}
            	})
			},
			getSortFun(order, sortBy) {
                var ordAlpah = (order == 'asc') ? '>' : '<';
                var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
                return sortFun;
			},
			getOrder () {
				if(this.value2==1){
                 	this.example.sort(getSortFun('desc', 'year'));
                } else {
                    this.example.sort(getSortFun('desc', 'count'));
                }
			}
		},
		activated() {
			this.$store.dispatch('empty_symptom');
			if (this.ifrmeHwUced && this.isResetMap) {
				this.isResetMap = false;
				// this.initMap();
			}
		},
		mounted() {
			// this.initMap();
		}, 
	}
</script>

<style lang="less" scoped>
	@import "../../assets/css/common.less";

.firstaid-search-box {
padding: 0.18rem 0.2rem;
background-color: #f2f3f5;
& .search {
color: #c5c7ce;
background-color: #fff;
}
}
.page-content {
background-color: #f1f4f4;
}

/**
* 头部
*/
.home-header {
position: absolute;
z-index: 1;
left: 0;
top: 0;
z-index: 1;
width: 100%;
height: 0.88rem;
padding-left: 0.2rem;
padding-right: 0.1rem;
background-color: rgba(57, 184, 255, 0);
}

.blank {
height: 1.0rem;
}

.header-content {
height: 100%;
width: 100%;
align-items: center;
}

.interactlist-content {
background-color: #fff;
}

.interact-item {
height: .88rem;
padding: 0 .2rem;
font-size: .28rem;
color: #3d4550;
border-bottom: .01rem solid #e7ecf2;

& .interact-type {
width: .86*3rem;
font-size: .2rem;
color: #9fa1a9;

& i {
margin-left: .1rem;
width: .76rem;
height: .32rem;
border: 1px solid #9fa1a9;
}
}
}


.el-row {
margin-bottom: 20px;
&:last-child {
margin-bottom: 0;
}
}
.el-col {
border-radius: 4px;
}
.bg-purple-dark {
background: #99a9bf;
}
.bg-purple {
background: #d3dce6;
}
.bg-purple-light {
background: #e5e9f2;
}
.grid-content {
border-radius: 4px;
min-height: 16px;
font-size:10px
}
.row-bg {
padding: 10px 0;
background-color: #f9fafc;
}
.history
{
font-family:"Times New Roman";
font-size:12px;
//color: #53575b;;
color: #1a1b1d;;
}
.clear_history
{
font-family:"Times New Roman";
font-size:10px; 
margin-left:220px;
color: #676b73;;
}
.history_item
{
height: 23px;
margin-top: 8px;
margin-right: 10px;
font-size:10px
}
.telhead {
height: 50px;
width: 100%;
line-height: 50px;
text-align: center;
display: flex;
border-bottom:1px solid #ccc ;
z-index: 50;
position: absolute;
top: 0;
left:0;
}
.fixed {
position: fixed;
top: 0;
left: 0;
}
.telhead .content{
width: 100%;
background-color: #fff;
}
.telhead .left,
.telhead .right{
padding:0 18px;
font-size: 24px;
font-weight: bold;
background: #eee;
}
.telhead {
height: 50px;
width: 100%;
line-height: 50px;
text-align: center;
display: flex;
border-bottom:1px solid #ccc ;
z-index: 50;
position: absolute;
top: 0;
left:0;
}
.fixed {
position: fixed;
top: 0;
left: 0;
}
.telhead .content{
width: 100%;
background-color: #fff;
}
.telhead .left,
.telhead .right{
padding:0 18px;
font-size: 24px;
font-weight: bold;
background: #eee;
}

.guide-item{
margin-bottom: -25px
}
.guide-item-1 {
font-size: 12px;
font-weight: 800;
line-height:15px;
//margin-bottom: -110px
}
.guide-item-2 {
font-size: 10px;
font-weight: 600;
line-height:15px;
// margin-bottom: -1px;
}
.guide-item-3 {
font-size: 10px;
line-height:15px;
// margin-bottom: -6px;
}
.splitline{
margin-top: -2px;
// margin-bottom: 2rem;

padding: '0 3px';
}
</style>
