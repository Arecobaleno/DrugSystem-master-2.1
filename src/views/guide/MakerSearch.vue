<template>
	<div class="page-full component-home fx-column">

     <div class="druglist-header">
        <app-header :title="appHeader.title"></app-header>
   </div>


 <div class="page-content fx-1" >
	  <div class="list">
      <ul v-for="(item,index) in newArr" v-bind:key="index" class="list-ul">
          <h6 ref="listsix">{{item.title}}</h6>
          <li class="div"  v-for="(user,index) in item.items" v-bind:key="index"  @click="getGuideItems(user.name)">
			  {{user.name}}
			   <!-- <div class="fx-1">{{user.name}}</div> -->
			</li>
      </ul>
    </div>
</div>

	</div>

	
</template>

<script>
	import Utils from '../../utils'
	import appNav from '../../components/app-nav.vue'
	import appHeader from "../../components/app-header.vue";
	import axios from 'axios';
	import router from '../../router';
	// import pinyin from 'js-pinyin' 
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import vPinyin from './vue-py.js'
// import func from '../../../vue-temp/vue-editor-bridge';
	export default {
		components: {
			appNav,
			appHeader
		},
		data() {
			return {
				appHeader: {
				title: "按定制者查询"
      },
				searchData: "",
				guideClass:null,
				example:[],
				// array:[],
				newArr:[],
				// map_array : {},
			}
		},
		watch: {
    '$route'(to, from) {
      this.$router.go(0)
     
    }
  },
  watch: {
	  '$route' (to, from) { //监听路由是否变化
      this.getGuideData();
	  }
  },
		// computed: mapGetters({
		// 	ifrmeHwUced: 'ifrmeHwUced',
		// }),
		// computed:{
			
		// 	reorder:function(){
		// 		return this.example.sort(function(x,y){
		// 			return x["name".localeCompare(y["name"])];
		// 		})
		// 	}
		// },
		created(){
		    //获取localstorage
			this.getGuideData();
		},
		methods: {
			
			mounted(){
				if(this.historySearch.length==0){
					this.history="历史搜索：暂无";}
				else{
					this.history="历史搜索";
				}
			},
			  getGuideData(){
        		let url = 'http://localhost:10088/guide/maker'
        		axios.get(url)
            	.then((response)=>{
						// console.log("000000000000")
                		// console.log(response.data);
						// this.guideClass = response.data;
						this.example = [];
						//获取数据
						for(var i=0;i<response.data.length;i++){
							// console.log(response.data[i]);
							// console.log(response.data[i].name);
							this.example.push({name: response.data[i].name,pinyin:null,index:null});
						};
						//转成拼音
						for(var i=0;i<this.example.length;i++){
							this.example[i].pinyin = vPinyin.chineseToPinYin(this.example[i].name)
							// console.log("1111111111")
							// console.log(this.example[i].pinyin)
							this.example[i].index = this.example[i].pinyin.charAt(0) 
						}
						// console.log(this.example);
						//进行字典排序
						this.example.sort(function(a,b){
							return (a.pinyin+'').localeCompare(b.pinyin+'')
						})
						//赋值给一个新数组
						// for(var i=0;i<this.example.length;i++){
						// 	this.array.push(this.example[i].pinyin)
						// }
						//分组
						let map = {};
						for(let i = 0; i < 26; i++)
						{
    						const key = String.fromCharCode(65 + i) //A-Z赋给key当作键
							map[key] = 
							{
        						title: key,
        						items: []
    						}
    						this.example.map((v,k)=>{      //遍历数组
        					let firstIndex = v.pinyin.charAt(0).toUpperCase();//首字母
							if(firstIndex.toUpperCase() == String.fromCharCode(65+i))
							{//统一转成大写进行逐个判断
            					map[key].items.push({name:v.name})//push进相对应的数组里头
        					}
    						})
    						// //如果当前的数组里头为空，则跳过。
						if(map[key].items === undefined || map[key].items.length == 0)
						{
        						continue;
    					}else{
        						this.newArr.push(map[key])//将分类好的每个对象 合并在一个数组里面
   						}
						}

					
						console.log("newArr "+this.newArr[0])
						console.log("newArr "+this.newArr[0].title)
						console.log("newArr "+this.newArr[0].items)

						
            			})
            	.catch((error) => {
                console.log(error);
            		})
    },
			  getGuideItems(name){
				//   console.log("7777"+name)
       			console.log("哈哈哈哈哈哈哈哈哈哈哈哈哈哈:   "+ name)
               let url = 'http://localhost:10088/guide/get'
			   let data = {'category': "maker",'content': name}
               axios.post(url, data)
            .then((response) => {				
				this.guideItems = response.data;
				  console.log(111)
				console.log(this.guideItems);
				console.log(this.guideItems.length);
				let maker_detail = [{name:null}];
				if(this.guideItems.length>0){
					maker_detail = [];
					// for(var i=0;i<this.guideItems.length;i++)
					for (let item in this.guideItems)
					{
						// console.log("item: "+item)
						// console.log("guideItems[item]: "+this.guideItems[item])
						console.log("guideItems[item].title: "+this.guideItems[item].title)
					maker_detail.push({name:this.guideItems[item].title})
					}
				}
				console.log("maker_detail: "+maker_detail[0].name)
                this.$router.push({
                name: "MakerDetail",
                query: {guideItems: maker_detail}
            });
            })
        	},
			
		

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

	.page-content {
		background-color: #f1f4f4;
	}

	.list {
  position: relative;
  top: 50px;
  overflow: hidden;
}
.list-ul li{
	text-align:center;
  list-style: none;
//   text-align: left;
  padding: 10px 0;
   padding-right: 10px;
   padding-left: 10px;
  font-size: 18px;
  text-indent: 20px;
}
// .list-ul li:nth-child(odd){
// //   background-color: #efefef;
// }
.list-ul h6{
  margin: 5px 0;
  text-align: left;
  text-indent: 10px;
  background-color: #cecece;
}
</style>
