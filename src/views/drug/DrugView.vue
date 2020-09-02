<template> 
<div class="page-full component-firstaid fx-column"> 
    <app-header :title="appHeader.title">
      <i slot="right" class="icon-xiaoxi iconfont ac-o"></i>
    </app-header>
    <section class="firstaid-search-box ac">
        <!-- <a class="search" href="javascript:;">
            <div class="search-content fx">
                <i class="icon-sousuo iconfont"></i>
                <span class="search-text">搜索症状/疾病/药品</span>
            </div>
        </a> -->
      <!-- <div class="header-content fx">
				<el-input v-model="searchData" placeholder="搜索症状/疾病/药品"></el-input>
				<el-button type="primary" icon="el-icon-search" style="float:right" @click="search">搜索</el-button>
				<el-button type="primary" style="float:right" @click="backPage">返回</el-button> -->
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
    <section class="firstaid-search-box ac">
      <div class="header-content fx">
        <span class="fx-1" size="10"><strong>药品</strong>/基于ATC编码</span>
      </div>
    </section>
    <div class="page-content fx-1">
        <ul class="firstaid-content">
            <li class="fx-ac" v-for="(item, index) in drugClass" v-bind:key="index">
                <span class="fx-1" @click="getDrugChemistry(item.value)" v-if="item.value != undefined">
                    {{getChinese(item.value)}}
                </span>
                <span class="fx-1" @click="useMethod(item)" v-if="item.name != undefined">
                    {{getChinese(item.name)}}
                </span>
                <i class="iconfont icon-qianjin"></i>
            </li>
        </ul>
    </div>
    <app-nav></app-nav>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import appHeader from "../../components/app-header.vue";
import appNav from "../../components/app-nav.vue"
import axios from 'axios'

export default {
  components: { appHeader , appNav},
  data() {
    return {
      appHeader: {
        title: "药品搜索"
      },
      drugClass: null,
      drugItems: null,
      searchData: '',
      drug:[],
      drugClass1: null,
      head: '',
    };
  },
  watch: {
    '$route'(to, from) {
      this.$router.go(0);

    }
  },
  watch: {
	  '$route' (to, from) { //监听路由是否变化
		  // if(to.query.drugClass != from.query.drugClass && to.query.drugClass != undefined && Object.prototype.toString.call(to.query.drugClass[0]) != '[object String]'){
      //   console.log(333);
      //   console.log(to.query.drugClass);
      //   console.log(Object.prototype.toString.call(to.query.drugClass[0]))
      //   this.drugClass = to.query.drugClass;
			//   // this.init();//重新加载数据
      // }
      this.getDrugData();
      this.searchData = ""
	  }
  },
  methods: {
    useMethod(item){
      if(item.label == '药品商品名'){
        this.getDrugDetail(item.name);
      }
      else if(item.label == '药品分类'){
        this.getDrugChemistry(item.name);
      }
      else{
        this.getDrugItems(item.name);
      }

    },
    search() {
				if(this.searchData!=""){
					let url = 'http://127.0.0.1:10088/medicine_query'
					let data = {
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
              this.drug = response.data;
              console.log(1313)
              console.log(this.drug)
              this.drugClass = response.data;
              this.drugClass1 = response.data;
            })
          // this.$router.push({
          //       path: "/drugitems",
          //       query: {drugItems: this.drugItems, drugList: name}
          //   });
				}
				else{
					this.drug = [];
				}
      },
    onCancel() {
				// this.isShowData=false;
				this.searchData = "";
				this.drugClass = this.drugClass1;
			},
    onClear() {
      this.searchData = "";
    },
    getDrugData(){
        let url = 'http://localhost:10088/medicine_class'
        axios.get(url)
            .then((response)=>{
                console.log(response);
                this.drugClass = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
    },
    getDrugChemistry(name){
        let url = 'http://localhost:10088/chemical_by_class'
        //   console.log(name);
        // name = name.replace(/\[([^\[\]]*)\]/g, "($1)");
        //   console.log(name);
        let data = {'content': name}
        axios.post(url, data)
            .then((response) => {
                // console.log(222)
                // console.log(response.data)
                this.drugItems = response.data;
                this.head = this.getChinese(name);
                this.$router.push({
                path: "/drugchemistry",
                query: {drugItems: this.drugItems, drugList: name, title: this.head}
            });
            })
            .catch((error) => {
                console.log(error);
            })
    },
    getDrugItems(name){
        let url = 'http://localhost:10088/medicine_by_chemical'
        //   console.log(name);
        // name = name.replace(/\[([^\[\]]*)\]/g, "($1)");
        //   console.log(name);
        let data = {'content': name}
        axios.post(url, data)
            .then((response) => {
                // console.log(222)
                // console.log(response.data)
                this.drugItems = response.data;
                console.log(222222)
                console.log(this.drugItems);
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
        let url = 'http://localhost:10088/detail'
        console.log(name);
        // name = name.replace(/\[([^\[\]]*)\]/g, "($1)");
        //   console.log(name);
        let data = {'category': 'drug', 'content': name}
        axios.post(url, data)
            .then((response) => {
                // console.log(222)
                // console.log(response.data)
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
      getChinese: function (name) {
        let isletter = /^[a-zA-Z]+$/.test(name);
        if(isletter){
          return name
        }
        else{
          return name = name.replace(/[^\u4e00-\u9fa5]/gi, "");
        }
        
        
    }

},
// computed: {
    
// },

    mounted (){
    // this.initMap();
    // this.getDrugData();
  },
  created() {
  //   if(this.$route.query) {
  //   this.drugClass = this.$route.query.drugItems;
  //   this.drugList = this.$route.query.drugList;
  //   this.appHeader.title = this.$route.query.drugList;
	// 	// this.init();
	// }
      this.getDrugData();
      this.searchData = ""
  }
};


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
</style>
