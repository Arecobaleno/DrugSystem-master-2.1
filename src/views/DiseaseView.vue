<template>
	<div class="page-full component-home fx-column">
		<app-header :title="appHeader.title"></app-header>
		<section class="page-content" >
			<form action="/">
				<van-search
					v-model="inputMsg"
					show-action
					shape="round"
					placeholder="请输入搜索关键词"
					@search="search"
					@cancel="onCancel"
					@clear="onClear"
                    @focus="onFocus"
				/>
			</form>
		</section>
		<div v-show="isShowData" class="page-content fx fx-1">
			<van-sidebar v-model="activeKey" @change="onChange">
                <div  >
                    <van-sidebar-item 
                        v-for="(item, index) in diseaseTitle" 
                        :key="index" 
                        :title="item.value"  />
                </div>
            </van-sidebar>
            <div class="blank"></div>
            <div class="detail-bg border-b fx-1">
                <h2 class="detail-head-title">{{titleText}}</h2>
                <van-button 
                type="default" 
                class="history_item" 
                round
                
                align="center" 
                v-for="(item, index) in disease" 
                v-bind:key="index" 
                @click="toPage(item)">{{item}}</van-button>
            </div>
		</div>

		<div v-show="isShowData==false" class="page-content fx-1">	
			<a>
				<van-row type="flex" justify="space-between">
					<van-col id="search_history" v-model="history" align="left" class="history" span="11">{{history}}</van-col>
					<van-col id="clear_history" class="clear_history" align="right" @click="clear_history" span="8">清空搜索</van-col>
				</van-row>
				<van-button 
                    type="default" 
                    id="item_history"  
                    class="history_item" 
                    round
                    align="center" 
                    v-for="(item, index) in historySearch" 
                    v-bind:key="index" 
                    @click="onHistory(item)">{{item}}</van-button>
			</a>
		</div>
		<app-nav></app-nav>
	</div>
</template>

<script>
	import Utils from '../utils'
	import appNav from '../components/app-nav.vue'
	import appHeader from '../components/app-header.vue'
	import axios from 'axios';
	import router from '../router';
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
                diseaseTitle: [],
                disease: [],
                activeKey: 0,
                titleText: "",
				isShowData: true,
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
				if(this.inputMsg !=''){
					let storage=window.localStorage
					{
					    {
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
                    //this.isShowData=true;
                    this.$router.push({
                        name: "disease-search",
                        params: {diseaseName: this.inputMsg, type: "text"},
                    })
                }
			},
			onCancel() {
				this.isShowData=true;
				this.inputMsg = "";
			},
			onClear() {
				this.inputMsg = "";
            },
            onFocus() {
                this.isShowData=false;
            },
            onChange(index) {
                this.titleText = this.diseaseTitle[index].value;
            },
			onHistory: function(item) {
				this.history="历史搜索：";
				this.$router.push({
					name: "disease-search",
					params: {diseaseName: item, type: "text"},
				}) 
            },
            toPage: function(item) {
				this.$router.push({
					name: "disease-search",
					params: {diseaseName: item, type: "title"},
				}) 
            },
            
			clear_history(){
				this.history="历史搜索：暂无";
				this.historySearch = [];
				let storage=window.localStorage
				storage.setItem('searchWord',JSON.stringify(this.historySearch))
			},
		},
		created () {
        	this.inputMsg = "";
            this.isShowData=true;
            this.diseaseTitle = [{value:"标签2"}, {value:"标签2"}, {value:"标签3"}];
            this.disease = ["标签1","标签2", "内容3","标签2", "内容3"]
            this.titleText =  this.diseaseTitle[this.activeKey].value;

			var x=document.getElementById("search_history");
			window.localStorage.removeItem('searchWord')
			let storage=window.localStorage
			if(storage.getItem('searchWord')!==null){
				this.historySearch=JSON.parse(storage.getItem('searchWord'))
			} 
		},
		/*watch: {
			'$route'(to,from) {
                if(from.name=="home"){
                    this.inputMsg = "";
				    this.isShowData=true;
                }
        	}
    	},*/
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
				this.history="历史搜索：";
            }
            this.inputMsg = "";
			this.isShowData=true;
		}
	}
</script>

<style lang="less" scoped>
	@import "../assets/css/common.less";
    /deep/ .van-button--default {
        //color: #fff;
        background-color: #ebedf0;
    }

	.page-content {
		background-color: #f1f4f4;
	}

	.history{
		font-family:"Times New Roman";
		font-size:12px;
		margin-top: 10px;
		margin-bottom: 5px;
		color: #1a1b1d;
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
        font-size:10px;
        color: "black";
    }
    .blank{
        width: 10px;
        background-color: #fff;
    }
</style>
