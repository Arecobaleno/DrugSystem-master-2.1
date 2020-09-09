<template>
	<div class="page-full component-home fx-column">
		<app-header :title="appHeader.title" ref="header" :backUrl="appHeader.backUrl"></app-header>
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
			<van-sidebar v-model="activeKey" @change="onChange" class="sidebar">
                <div>
                    <van-sidebar-item 
                        v-for="(item, index) in diseaseTitle" 
                        :key="index" 
                        :title="item.value"  />
                </div>
            </van-sidebar>
            <div class="blankW"></div>
            <div class="detail-bg border-b fx-1">
				<div v-for="(item, index) in titleText" v-bind:key="index">
					<h2 class="detail-head-title">{{item}}</h2>
					<van-button 
					type="default" 
					class="history_item" 
					round
					align="center" 
					v-for="(item, index1) in disease[index]" 
					v-bind:key="index1" 
					@click="toPage(item)">{{item}}</van-button>
					<div class="blankH"></div>
				</div>
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
                activeKey: 0,
				titleText: [],
				disease: [],
				dataSet: [],
				isShowData: true,
				inputMsg:"",
				appHeader: {
					 title: "疾病",
					 backUrl: "/home"
				},
				historySearch:['心力衰竭'],
                history:"历史搜索：暂无",
			}
		},
		computed: mapGetters({
			ifrmeHwUced: 'ifrmeHwUced',
		}),
		methods: {
			search() {
				if(this.inputMsg !=''){
					let storage=window.localStorage
					{
					    {
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
                    storage.setItem('isShowData',JSON.stringify(false));
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
				/*this.titleText = this.diseaseTitle[index].value;
				if(this.titleText == "高血压"){
					this.disease = ["高血压合并心肌梗死","高血压并发症"]	
				}
				else{
					this.disease = [];
				}*/
				this.titleText.length = 0;
				this.disease.length = 0;
				for(var i = 0; i < this.dataSet[index].length; i++){
					this.titleText.push(this.dataSet[index][i].title)
					this.disease.push(this.dataSet[index][i].value)
				}
            },
			onHistory: function(item) {
				let storage=window.localStorage;
				storage.setItem('isShowData',JSON.stringify(false));
				this.history="历史搜索：";
				this.$router.push({
					name: "disease-search",
					params: {diseaseName: item, type: "text"},
				}) 
            },
            toPage: function(item) {
				let storage=window.localStorage;
				storage.setItem('isShowData',JSON.stringify(true));
				this.$router.push({
					name: "disease-detail",
					params: {diseaseName: item},
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
            this.diseaseTitle = [{value:"高血压"}, {value:"心血管疾病"}, {value:"消化系统疾病"}];
			this.dataSet = [
				[
					{title: "高血压", value: ["高血压合并心肌梗死","高血压并发症","继发性高血压"]}
				],
				[
					{title: "冠心病", value: ["冠心病合并症","心肌梗死","稳定型冠心病"]},
					{title: "心力衰竭", value: ["慢性心衰","急性心衰","心衰合并症"]}
				],
				[
					{title: "肝炎", value: ["甲型肝炎","乙型肝炎"]}
				]
			]
			for(var i = 0; i < this.dataSet[0].length; i++){
				this.titleText.push(this.dataSet[0][i].title)
				this.disease.push(this.dataSet[0][i].value)
			}
        },
        
	    beforeRouteEnter(to, from, next) {
            next(vm => {
                let storage=window.localStorage;
                if(from.name == "home"){
                    storage.setItem('isShowData',JSON.stringify(true));
                }
                else{
                    //storage.setItem('isShowData',JSON.stringify(false));
                }
            })
        },
		mounted() {
            this.$nextTick(()=>{
                let storage=window.localStorage;
                this.inputMsg = "";
                this.isShowData = true;
                if(storage.getItem('isShowData')) {
                    this.isShowData = JSON.parse(storage.getItem('isShowData'))
                }
            })
            let storage=window.localStorage;
            var x=document.getElementById("search_history");
			//window.localStorage.removeItem('searchWord')
			if(storage.getItem('searchWord')!==null){
                this.historySearch=JSON.parse(storage.getItem('searchWord'))
			} 
			if(this.historySearch.length==0){
				this.history="历史搜索：暂无";}
			else{
				this.history="历史搜索：";
			}
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
    .blankW{
        width: 10px;
        background-color: #fff;
	}
	.blankH{
        height: 40px;
        background-color: #fff;
	}
	.sidebar{
		width: 108px;
	}
</style>
