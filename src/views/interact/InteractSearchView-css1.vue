<template>

	<div class="page-full component-home fx-column">
		<app-header :title="appHeader.title"></app-header>
		<section class="firstaid-search-box ac">
        <div>
			<form action="/">
				<van-search
				v-model="searchMsg[0]"
				show-action
				shape="round"
				placeholder="请输入搜索关键词"
				@click="search(0)"
				@input="search(0)"
				@search="search(0)"
				@clear="onClear"
				@change="search(0)"
				>
				  <template slot="action">
				    <van-icon name="plus"  @click="addSearchItem"/>
					<!-- <van-icon name="plus" class="blank_item" @click="delSearchItem"/> -->
				  </template>
				</van-search>
			</form>
      </div>
		</section>
		
		<section class="firstaid-search-box ac">
        <div v-for="(item, index) in searchNum" v-bind:key="item" >
			<form action="/">
				<van-search
				  v-model="searchMsg[index+1]"
				  show-action
          shape="round"
				  placeholder="请输入搜索关键词"
          @click="search(index+1)"
          @input="search(index+1)"
				  @search="search(index+1)"
          @clear="onClear"
				>
				  <template  slot="action">
				    <!-- <van-icon name="plus"  @click="addSearchItem"/> -->
					<van-icon name="cross"  @click="delSearchItem(index+1)"/>
				  </template>
				</van-search>
			</form>
      </div>

		</section>

		<div v-show="isShowData" class="page-content fx-1">
			<ul class="interactlist-content">
				<li v-for="(item, index) in interaction" v-bind:key="index"  @click="click_item(item,'history',search_index)" class="interact-item fx-ac ac">
					<div align="left">{{item}}</div>
				</li>
			</ul>
			<ul class="interactlist-content" v-if="isresultEmpty">
				<li class="interact-item fx-ac ac">
					<div class="fx-1">暂无数据</div>
				</li>
			</ul>
		</div>
		<!-- <div class="blank"></div> -->
		<div v-show="isShowData==false" class="page-content">

			<a>
				<van-row type="flex" justify="space-between">
					<van-col id="search_history" v-model="history" align="left" class="history" span="11">{{history}}</van-col>
					<van-col id="clear_history" class="clear_history" align="right" @click="clear_history" span="8">清空搜索</van-col>
				</van-row>
				<van-button type="default" id="item_history"  class="history_item" align="center" v-for="(item, index) in historySearch" v-bind:key="index" @click="click_item(item,'history',search_index)">{{item}}</van-button>
			</a>

		</div>
    <div class="panel_back">
     <div class="click_search" @click="toPage">点击搜索</div>
      </div>
	  <app-nav style="position: fixed;bottom: 0px;"></app-nav>
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
				title: "相互作用"
      },
				searchMsg: [],
				searchNum: 0,
				isResetMap: true,
				searchData: "",
				interaction: [],
				isShowData: false,
				isresultEmpty: false,
				inputMsg:"",
				historySearch:["尼卡地平 Nicardipine","asdsadsa","ewqe1ew"],
				history:"历史搜索：暂无",
				repeat:0,
				search_index:0
			}
		},
		computed: mapGetters({
			ifrmeHwUced: 'ifrmeHwUced',
		}),
		created(){
			this.searchData = "";
			this.interaction = [];
			this.isShowData=false;
			//获取localstorage
			var x=document.getElementById("search_history");


			window.localStorage.removeItem('searchWord')
			let storage=window.localStorage

			if(storage.getItem('searchWord')!==null){
				this.historySearch=JSON.parse(storage.getItem('searchWord'))
			} 
		},
		watch: {
			'$route'(to,from) {
				this.searchData = "";
				this.interaction = [];
				this.isShowData=false;
        	}
    	},
		mounted(){
			if(this.historySearch.length==0){
				this.history="历史搜索：暂无";}
			else{
				this.history="历史搜索";
			}
		},
		methods: {
			showData(){
			   console.log(this.searchMsg);
			},
			addSearchItem() {
			  this.searchNum+=1;
			  console.log(this.searchMsg);
			},
			delSearchItem(index) {
			  this.searchNum-=1
			  this.searchMsg.splice(index,1);
			  console.log(this.searchMsg);
			},
			search(index) {
			
			  this.inputMsg=this.searchMsg[index];
			  this.search_index=index;
			  console.log(this.search_index)
			  if(this.inputMsg==null)
			  return 0
				//document.getElementById("clear_history").style.display="none"
				//document.getElementById("search_history").style.display="none"
				//document.getElementById("item_history").style.display="none"
				// if (this.historySearch.indexOf(this.inputMsg) != -1){
				// 	this.repeat=1;
				// }
			  console.log(this.inputMsg)
				if(this.inputMsg !=''){
					let storage=window.localStorage
					{//console.log(444)
					    {//console.log(this.historySearch.indexOf(this.inputMsg))
						//console.log(444)
							if (this.historySearch.indexOf(this.inputMsg) != -1) { // 有相同的，先删除 再添加
			
							          this.historySearch.splice(this.historySearch.indexOf(this.inputMsg), 1);
							          this.historySearch.unshift(this.inputMsg);
									  console.log(88888)
									  console.log(this.historySearch)
									  console.log(88888)
							 }else{
									   this.historySearch.unshift(this.inputMsg)
									}
			
					        if( this.historySearch.length >= 6){
					                this.historySearch.pop()
					            }
			
					            storage.setItem('searchWord',JSON.stringify(this.historySearch))
					    }
					}
						//console.log(storage.getItem('searchWord'))
				}
			
				this.isShowData=true;
				this.searchData=this.inputMsg
				if(this.searchData!=""){
					let url = '/api/interaction_candidate'
					let data = {
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
			
							if(response.data.length==0){
								this.isresultEmpty=true;
								this.interaction = response.data;
			
							}
							else{
								this.isresultEmpty=false;
								this.interaction = response.data;
			          console.log(this.interaction)
							}
						})
				}
				else{
					this.interaction = [];
					this.isShowData=false;
				}
			//this.inputMsg='';
			},
			onCancel() {
				this.isShowData=false;
				this.searchData = "";
				this.interaction = [];
			},
			onClear() {
				this.isShowData=false;
				this.searchData = "";
				this.interaction = [];
			},
			clear_history(){
				this.history="历史搜索：暂无";
				this.historySearch = [];
				let storage=window.localStorage
				storage.setItem('searchWord',JSON.stringify(this.historySearch))
			},
			click_item(item,type,index){
			  if(type=="page"){
			  this.searchMsg[index]=item.value;
			  this.isShowData=false;
			 console.log(this.searchMsg)
			     }
			     else{
			       this.searchMsg[index]=item;
			       this.isShowData=false;
			       console.log(this.searchMsg)
			       console.log(index)
			     }
			  this.search(index)
			  this.isShowData=false;
			},
			toPage: function() {

			console.log(this.searchMsg);
				this.$router.push({
					path: "interactDetail",
					query: {interactName: this.searchMsg},
				})
				console.log(12321321)
				console.log(this.inputMsg)

			//this.inputMsg=''
     // this.isShowData=false

			},
			
		},
		activated() {
			this.$store.dispatch('empty_symptom');
			if (this.ifrmeHwUced && this.isResetMap) {
				this.isResetMap = false;
				// this.initMap();
			}
		},
	}
</script>

<style lang="less" scoped>
	@import "../../assets/css/common.less";

	/*.firstaid-search-box {
		padding: 0.18rem 0.2rem;
		background-color: #f2f3f5;
		& .search {
			color: #c5c7ce;
			background-color: #fff;
		}
	}*/
	.page-content {
		background-color: #f1f4f4;
		//margin-bottom: 10px;
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

	.history{
		font-family:"Times New Roman";
		font-size:12px;
		margin-top: 10px;
		margin-bottom: 5px;
		//color: #53575b;;
		color: #1a1b1d;;
	}
	.clear_history{
		font-family:"Times New Roman";
		font-size:10px;
		margin-top: 4px;
		color: #676b73;;
	}
	.history_item{
		height: 23px;
		margin-top: 6px;
		margin-right: 10px;
		font-size:10px
	}
	.tip {
		margin-top:20px;
		font-size:12px;
	}
	.blank {
		height: 0.10rem;
	}
  .button {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
    background-color: yellow;
  }
  .blank_item {
    visibility: hidden
  }
  .panel_back{
    background-color:white;
    // margin-top: 100px;
    // height: .88rem;
  }
  .click_search{
	 float:right;
	 font-family: 'Avenir', Helvetica, Arial, sans-serif;
	 color:#2c3e50;
	 margin-top: 30px;
  }
</style>
