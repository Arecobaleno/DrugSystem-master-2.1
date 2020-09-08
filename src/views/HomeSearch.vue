<template> 
<div class="page-full component-firstaid fx-column"> 
    <app-header :title="appHeader.title">
      <i slot="right" class="icon-xiaoxi iconfont ac-o"></i>
    </app-header>
    <section class="firstaid-search-box ac">
			<form action="/">
        <van-search
            v-model="searchData"
            show-action
            shape="round"
            placeholder="请输入搜索关键词"
            @search="search"
            @cancel="onCancel"
            @clear="onClear"
          />
      </form>
    </section>

		<div v-show="isShowData==true">
			
			<a>
				<van-row type="flex" justify="space-between">
					<van-col id="search_history" v-model="history" align="left" class="history" span="11">{{history}}</van-col>
					<van-col id="clear_history" class="clear_history" align="right" @click="clear_history" span="8">清空搜索</van-col>
				</van-row>
				<van-button type="default" id="item_history"  class="history_item" align="center" v-for="(item, index) in historySearch" v-bind:key="index" @click="toPage(item,'history')">{{item}}</van-button>
			</a>
			
		</div>	



  <div class="page-content fx-1"  v-show="isShowSearch==true" @touchstart="startMove" @scroll="onMove" @touchend="stopMove" @touchcancel="stopMove">

	<van-tabs v-model="active" @click="onClick" color="#39b7ff">
      <van-tab title="全部" name="first"></van-tab>
      <van-tab title="药品" name="second"></van-tab>
      <van-tab title="疾病" name="third"></van-tab>
      <van-tab title="相互作用" name="fourth"></van-tab>
    </van-tabs>

	<section class="drug" v-show="isShowDrug==true" >
    <section class="firstaid-search-box">
      <div class="header-content fx">
        <span class="act fx fx-1"><h1 class="act">药品分类</h1>/基于ATC编码</span><p @click="changeShowType(1)" v-show="isShowmore==true">更多</p>
      </div>
    </section>
    <div class="page-content fx-1">
        <ul class="firstaid-content">
            <li class="fx-ac" v-for="(item, index) in drugClass" v-bind:key="index">
                <span class="fx-1" @click="useMethod(item)" v-if="item.value != undefined">
                    {{item.value}}
                </span>
                <i class="iconfont icon-qianjin"></i>
            </li>
        </ul>
    </div>
    </section>



     <section class="disease" v-show="isShowDisease==true">
    <section class="firstaid-search-box">
      <div class="header-content fx">
        <span class="act fx fx-1"><h1 class="act">疾病分类</h1></span><p @click="changeShowType(2)"  v-show="isShowmore==true">更多</p>
      </div>
    </section>
    <div class="page-content fx-1">
        <ul class="firstaid-content">
            <li class="fx-ac" v-for="(item, index) in diseaseClass" v-bind:key="index">
                <span class="fx-1" @click="toDesease(item.value)" v-if="item.value != undefined">
                     {{item.value}}
                </span>
                <i class="iconfont icon-qianjin"></i>
            </li>
        </ul>
    </div>
    </section>

    <section class="interact" v-show="isShowInteract==true" >
    <section class="firstaid-search-box">
      <div class="header-content fx">
        <span class="act fx fx-1"><h1 class="act">相互作用</h1></span><p @click="changeShowType(3)"  v-show="isShowmore==true">更多</p>
      </div>
    </section>
    <div class="page-content fx-1">
        <ul class="firstaid-content">
            <li class="fx-ac" v-for="(item, index) in interactClass" v-bind:key="index">
                 <span class="fx-1" @click="toInteraction(item.value)" v-if="item.value != undefined">
                     {{item.value}}
                </span>
                <i class="iconfont icon-qianjin"></i>
            </li>
        </ul>
    </div>
    </section>

  </div>

    <app-nav style="position: fixed;bottom: 0px;"></app-nav>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import appHeader from "../components/app-header.vue";
import appNav from "../components/app-nav.vue"
import axios from 'axios'
// import func from '../vue-temp/vue-editor-bridge';

export default {
  components: { appHeader , appNav},

  data() {
    return {
      appHeader: {
        title: "全局搜索"
      },
	  searchAll: 0, //0 代表只显示部分，1代表全部显示
      searchData: '',
      drugClass: [],
      diseaseClass: [],
      interactClass: [],
	  active:"",

	  isShowData: true,
	  isresultEmpty: false,
	  isShowSearch: false,
	  isShowDrug: false,
	  isShowmore: false,
	  isShowDisease:false,
	  isShowInteract:false,
	  inputMsg:"",
	  historySearch:['心力衰竭'],
	  history:"历史搜索："
	  
    };
  },
  watch: {
    '$route'(to, from) {
      this.$router.go(0);

    }
  },
  watch: {
	  '$route' (to, from) { //监听路由是否变化
    this.getDrugData();
    this.searchData = ""
	  }
  },
  methods: {
     startMove: function(){

    },
    stopMove: function(){
        setTimeout(() => {
            clearInterval(this.timer);
        }, 2000)
    },
    onMove: function(){
        const top = document.querySelector('.page-content').scrollTop;
        if(top < this.bannerHeight){
            this.opacity = top/this.bannerHeight;
        }else{
            this.opacity = 1;
        }
    },
	onClick(name,title){
		if(title=="全部"){
			this.showAll()
		};
		if(title=="药品"){
			this.showDrug()
		};
		if(title=="疾病"){
			this.showDisease()
		};
		if(title=="相互作用"){
			this.showInteract()
		}
	},
	
	// searchDrug(){
	// 	 this.drugClass = [];

	// 					if(this.searchData!=""){
	// 						let url = '/api/medicine_query'
	// 						let data = {
	// 							'content': this.searchData
	// 						}
	// 						axios.post(url, data)
	// 							.then((response) => {
	// 	        let drug = response.data
	// 			let len=3 //默认显示长度
	// 			if(this.searchAll==1){
	// 				len=drug.length
	// 			}
	// 			for(var i=0; i<len;i++){
	// 				this.drugClass.push({"value":drug[i].name,"label":drug[i].label})
	// 			}
	// 			console.log(666666);
	// 	        console.log(this.drugClass)

	// 	      })
	// 					}
	// 					else{
	// 						this.drugClass = [];
	// 					}
	// },
	// searchDisease(){
	// this.diseaseClass = [];

	// 				if(this.searchData!=""){
	// 					let url = '/api/query'
	// 					let data = {
	// 					'category':"disease",
	// 					'content': this.searchData
	// 					}
	// 					axios.post(url, data)
	// 						.then((response) => {
	// 	    let disease = response.data
	// 		let len=3 //默认显示长度
	// 		if(this.searchAll==1){
	// 			len=disease.length
	// 		}
	// 			for(var i=0; i<len;i++){
	// 				this.diseaseClass.push({"value":disease[i].value,"label":disease[i].label})
	// 			}
	// 		console.log(77777);
	//         console.log(this.diseaseClass)
	
	//       })
	// 				}
	// 				else{
	// 					this.diseaseClass = [];
	// 				}
	// },
	// searchInteraction(){
	// 		this.interactClass=[];
	// 			if(this.searchData!=""){
	// 				let url = '/api/interaction_candidate'
	// 				let data = {
	// 					'content': this.searchData
	// 				}
	// 				axios.post(url, data)
	// 					.then((response) => {
	// 						{
	// 							let interaction = response.data
	// 							let len=3 //默认显示长度
	// 							if(this.searchAll==1){
	// 								len=interaction.length
	// 							}
	// 								for(var i=0; i<len;i++){
	// 									this.interactClass.push({"value":interaction[i]})
	// 								}
	// 							console.log(88888);
	// 							console.log(this.interactClass);
	// 						}

	// 					})
	// 			}
	// 			else{
	// 				this.interactClass = []
	// 			}

	// },
	searchDrug(){
		 this.drugClass = [];

						if(this.searchData!=""){
							let url = '/api/medicine_query'
							let data = {
								'content': this.searchData
							}
							axios.post(url, data)
								.then((response) => {
		        let drug = response.data
				let len=3 //默认显示长度
				if(this.searchAll==1 || len>drug.length){
					len=drug.length
				}
				if(drug.length==0){
					this.isShowDrug=false;
				}else{
					this.isShowDrug=true;
				for(var i=0; i<len;i++){
					this.drugClass.push({"value":drug[i].name,"label":drug[i].label})
				}
				}
				console.log(666666);
		        console.log(this.drugClass)
				
		      })
						}
						else{
							this.drugClass = [];
						}
	},
	searchDisease(){
	this.diseaseClass = [];

					if(this.searchData!=""){
						let url = '/api/query'
						let data = {
						'category':"disease",
						'content': this.searchData
						}
						axios.post(url, data)
							.then((response) => {
		    let disease = response.data
			let len=3 //默认显示长度
			if(this.searchAll==1 || len>disease.length){
				len=disease.length
			}
			if(disease.length==0){
				this.isShowDisease=false;
			}
			else{
				this.isShowDisease=true;
				for(var i=0; i<len;i++){
					this.diseaseClass.push({"value":disease[i].value,"label":disease[i].label})
				}
				}
			console.log(77777);
	        console.log(this.diseaseClass)
	
	      })
					}
					else{
						this.diseaseClass = [];
					}
	},
	searchInteraction(){
			this.interactClass=[];

				if(this.searchData!=""){
					let url = '/api/interaction_candidate'
					let data = {
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
							{
								let interaction = response.data
								let len=3 //默认显示长度
								if(this.searchAll==1 || len>interaction.length){
									len=interaction.length
								}
									if(interaction.length==0){
										this.isShowInteract=false;
									}else{
									this.isShowInteract=true;
									for(var i=0; i<len;i++){
										this.interactClass.push({"value":interaction[i]})
									}
									}
								console.log(88888);
								console.log(this.interactClass);
							}

						})
				}
				else{
					this.interactClass = []
				}


	},
    search() {
		
		this.showAll();
		
		this.inputMsg=this.searchData;
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
		
		this.isShowSearch=true;

      },
    onCancel() {

			},
    onClear() {
     this.searchData="";
     this.drugClass = [];
	 this.diseaseClass =[];
	 this.interactClass = [];
	 
	 this.isShowData=true;
	 this.isShowSearch=false;

    // this.search();
    },
    getData(){
       
    },
   useMethod(item){
     if(item.label == '药品商品名'){
       this.getDrugDetail(item.value);
     }
     else if(item.label == '药品分类'){
       this.getDrugChemistry(item.value);
     }
     else{
       this.getDrugItems(item.value);
     }
   
   },
   getDrugChemistry(name){
       this.$router.push({
         path: "/drugchemistry",
         query: {name:name, title: this.getChinese(name)}
       });
       
   },
   getDrugItems(name){
       let url = '/api/medicine_by_chemical'
       let data = {'content': name}
       axios.post(url, data)
           .then((response) => {
               this.drugItems = response.data;
               this.head = this.getChinese(name);
               this.$router.push({
               path: "/drugitems",
               query: {drugItems: this.drugItems, drugList: name, title: this.head}
           });
           })
           .catch((error) => {
               console.log(error);
           })
   },
   getDrugDetail(name){
       let url = '/api/detail'
       let data = {'category': 'drug', 'content': name}
       axios.post(url, data)
           .then((response) => {
               this.drugDetail = response.data;
               console.log(111)
               console.log(this.drugDetail);
               this.$router.push({
               path: "/drugdetail",
               query: {drugDetail: this.drugDetail, drugList: name}
           });
           })
           .catch((error) => {
               console.log(error);
           })
       
   },
    backPage: function() {
				this.searchData = "";
				this.interaction = [];
				if (this.backUrl) {
					router.push({
						path: this.backUrl
					})
				} else if (window.history.length > 1) {
					router.back()
				} else {
					router.push({
						name: 'home'
					})
				}
      },
		clear_history(){
				this.history="历史搜索：暂无";
				this.historySearch = [];
				let storage=window.localStorage
				storage.setItem('searchWord',JSON.stringify(this.historySearch))
			},
	  showAll(){
		  this.isShowData=false;
		  this.isShowSearch=true;
		  this.searchAll=0;
		  this.drugClass = [];
		  this.diseaseClass =[];
		  this.interactClass = [];
		  this.searchDrug();
		  this.searchDisease();
		  this.searchInteraction();
		  this.isShowSearch= true;
		//   this.isShowDrug= true;
		//   this.isShowDisease= true;
		//   this.isShowInteract= true;
		  this.isShowmore = true;
	  },
	  showDrug(){
		   this.searchAll=1;
		   this.searchDrug();
	
		   this.isShowSearch= true;
		   this.isShowDrug= true;
		   this.isShowDisease= false;
		   this.isShowInteract= false;
		   this.isShowmore = false;
	  },
	  showDisease(){
		   this.searchAll=1;
		   this.searchDisease();
		   
		   this.isShowSearch= true;
		   this.isShowDrug= false;
		   this.isShowDisease= true;
		   this.isShowInteract= false;
		   this.isShowmore = false;
	  },
	  showInteract(){
		   this.searchAll=1;
		   this.searchInteraction();
		   
		   this.isShowSearch= true;
		   this.isShowDrug= false;
		   this.isShowDisease= false;
		   this.isShowInteract= true;
		   this.isShowmore = false;
	  },
	toInteraction: function(searchMsg)
	{

		this.$router.push({
		     path: "/interactDetail",
		     query: {interactName: searchMsg},
		    })
	},
	toPage(item,label){
		this.searchData = item;
	},
	toDesease: function(item) {
				// let storage=window.localStorage;
				// storage.setItem('isShowData',JSON.stringify(true));
				console.log("item: "+item);
				this.$router.push({
					name: "disease-detail",
					params: {diseaseName: item},
				}) 
            },
	changeShowType(index){
			  let types=["first","second","third","fourth"];
			  this.active=types[index];
			  if(index==0){
				  this.showAll();
				  this.isShowmore =true;
			  }
			  if(index==1){
				  this.showDrug();
				  this.isShowmore =false;
			  }
			  if(index==2){
				  this.showDisease();
				  this.isShowmore =false;
			  }
			  if(index==3){
				  this.showInteract();
				  this.isShowmore =false;
			  }
	},

},
    mounted (){

  },
  created() {
    if(this.historySearch.length==0)
	{
		this.history="历史搜索：暂无"
	}else{
		this.history="历史搜索："
	}
  }
};


</script>

<style lang="less" scoped>
@import "../assets/css/common.less";
// .page-content{
//     background-color: #f1f4f4; 
// }
.drug{
padding: 0 0.13rem 0.14rem 0.13rem;
    & a{
        margin: 0 0.07rem 0.14rem 0.07rem;
        height: 0.6rem;
        font-size: 0.28rem;
        color: #5583b8;
        background-color: #f6faff;
    }
}
.disease{
padding: 0 0.13rem 0.14rem 0.13rem;
    & a{
        margin: 0 0.07rem 0.14rem 0.07rem;
        height: 0.6rem;
        font-size: 0.28rem;
        color: #5583b8;
        background-color: #f6faff;
    }
}
.interact{
padding: 0 0.13rem 0.14rem 0.13rem;
    & a{
        margin: 0 0.07rem 0.14rem 0.07rem;
        height: 0.6rem;
        font-size: 0.28rem;
        color: #5583b8;
        background-color: #f6faff;
    }
}
.firstaid-search-box {
  padding: 3px 0px;
  background-color: #f2f3f5;
  & .search {
    color: #c5c7ce;
    background-color: #fff;
  }
}
.firstaid-content {
  & li {
    padding: 0 0.2rem;
    height: 0.88rem;
    font-size: 0.22rem;
    color: #9fa1a9;
    border-bottom: 1px solid #e7ecf2;
  }
  & .iconfont {
    font-size: 0.28rem;
    margin-right: 0.1rem;
  }
  & span {
    font-size: 0.28rem;
    color: #3d4550;
  }
}
.header-content {
		height: 100%;
		width: 100%;
		align-items: center;
}
.act {
  margin-left: 5px;
  display: inline;
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
</style>
