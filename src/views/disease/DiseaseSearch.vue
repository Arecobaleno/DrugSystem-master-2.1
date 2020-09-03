<template>
<div>
	<div class="page-full component-home fx-column">
		<app-header :title="appHeader.title"></app-header>
		<section class="firstaid-search-box ac" >
			<form action="/">
				<van-search
					v-model="inputMsg"
					show-action
					shape="round"
					placeholder="请输入索关键词"
					@search="search"
					@cancel="onCancel"
					@clear="onClear"
				/>
			</form>
		</section>
		<div v-show="isShowData" class="page-content fx-1">
			<ul class="diseaselist-content" v-if="!isresultEmpty">
				<li v-for="(item, index) in disease" v-bind:key="index" @click="toPage(item,'page')" class="disease-item fx-ac ac">
					<div class="fx-1">{{item.value}}</div>
				</li>
			</ul>
			<ul class="diseaselist-content" v-if="isresultEmpty">
				<li class="disease-item fx-ac ac">
					<div class="fx-1">暂无数据</div>
				</li>
			</ul>
		</div>
		<div v-show="isShowData==false" class="page-content fx-1">
			
			<a>
				<van-row type="flex" justify="space-between">
					<van-col id="search_history" v-model="history" align="left" class="history" span="11">{{history}}</van-col>
					<van-col id="clear_history" class="clear_history" align="right" @click="clear_history" span="8">清空搜索</van-col>
				</van-row>
				<van-button type="default" id="item_history"  class="history_item" align="center" v-for="(item, index) in historySearch" v-bind:key="index" @click="toPage(item,'history')">{{item}}</van-button>
			</a>
		</div>
		<app-nav></app-nav>
	</div>
</div>
</template>

<script>
	import Utils from '../../utils'
	import appNav from '../../components/app-nav.vue'
	import appHeader from '../../components/app-header.vue'
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
				isResetMap: true,
				searchData: "",
				disease: [],
				isShowData: false,
				isresultEmpty: false,
				inputMsg:"",
				appHeader: {
     		    	title: "疾病"
				},
				historySearch:['心力衰竭'],
				history:"历史搜索：暂无"
			}
		},
		computed: mapGetters({
			ifrmeHwUced: 'ifrmeHwUced',
		}),
		methods: {
			search() {
				console.log(this.inputMsg)
				//document.getElementById("clear_history").style.display="none"
				//document.getElementById("search_history").style.display="none"
				//document.getElementById("item_history").style.display="none"
        
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
					let url = 'http://127.0.0.1:10088/query'
					let data = {
						'category': 'disease',
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
							console.log(response.data)
							if(response.data.length==0){
								this.isresultEmpty=true;
								this.disease  = response.data;
							}
							else{
								this.isresultEmpty=false;
								this.disease  = response.data;
							}
						})
				}
				else{
					this.disease  = [];
					this.isShowData=false;
				}
			//this.inputMsg='';
			},
			onCancel() {
				this.isShowData=false;
				this.searchData = "";
				this.disease = [];
			},
			onClear() {
				this.searchData = "";
			},
			toPage: function(item,type) {
				this.history="历史搜索：";
				//console.log(111111);
				this.inputMsg=item.value;
				if(type=="history"){
					this.inputMsg=item;
				}else{
					this.inputMsg=item.value;
				}
				//console.log(this.inputMsg);
				//console.log(111111);
				if(this.inputMsg !=''){
					let storage=window.localStorage
					{//console.log(444)
					    {//console.log(this.historySearch.indexOf(this.inputMsg))
						//console.log(444)
							if (this.historySearch.indexOf(this.inputMsg) != -1) { // 有相同的，先删除 再添加
							
							          this.historySearch.splice(this.historySearch.indexOf(this.inputMsg), 1);
							          this.historySearch.unshift(this.inputMsg);
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
				if(type!="history"){
				this.$router.push({
					name: "disease-detail",
					params: {diseaseName: this.inputMsg},
				}) 
				this.inputMsg='';
				}
				else{
					this.inputMsg=item;
					//console.log(this.searchData)
					console.log(666);
					this.search();
				}
		//	this.inputMsg=''
			},
			clear_history(){
				this.history="历史搜索：暂无";
				this.historySearch = [];
				let storage=window.localStorage
				storage.setItem('searchWord',JSON.stringify(this.historySearch))
			},
		},
		created () {
        	this.searchData = "";
			this.disease = [];
			this.isShowData=false;

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
				this.disease = [];
				this.isShowData=false;
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
			if(this.historySearch.length==0){
				this.history="历史搜索：暂无";}
			else{
				this.history="历史搜索";
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../assets/css/common.less";


	.page-content {
		background-color: #f1f4f4;
	}

	.diseaselist-content {
		background-color: #fff;
	}

	.disease-item {
		height: .88rem;
		padding: 0 .2rem;
		font-size: .28rem;
		color: #3d4550;
		border-bottom: .01rem solid #e7ecf2;

		& .disease-type {
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
</style>
