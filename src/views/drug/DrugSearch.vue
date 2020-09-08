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
            @search="search"
            @cancel="onCancel"
            @clear="onClear"
          />
      </form>
    </section>
    <section class="firstaid-search-box">
      <div class="header-content fx">
        <span class="act"><h1 class="act">药品分类</h1>/基于ATC编码</span>
      </div>
    </section>
    <div class="page-content fx-1">
        <ul class="firstaid-content">
            <li class="fx-ac" v-for="(item, index) in drugClass" v-bind:key="index">
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
      searchData: this.$route.query.keywords,
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
      this.getDrugData();
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
      console.log('hhh');
      console.log('12312313');
				if(this.searchData!=""){
					let url = 'http://127.0.0.1:10088/medicine_query'
					let data = {
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
              this.drug = response.data;
              console.log(this.drug)
              this.drugClass = response.data;
            })
				}
				else{
					this.drug = [];
				}
      },
    onCancel() {
				this.searchData = "";
				this.$router.push({
          path: "/yaopin"
        });
			},
    onClear() {
      this.searchData = "";
    },
    getDrugData(){
        let url = 'http://127.0.0.1:10088/medicine_query'
        console.log(88888888888888888);
        console.log(this.$route.query.keywords);
        console.log(this.searchData);
        this.searchData = this.$route.query.keywords;
					let data = {
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
              this.drug = response.data;
              console.log(this.drug);
              this.drugClass = response.data;
              this.drugClass1 = response.data;
            })
    },
    getDrugChemistry(name){
        this.$router.push({
          path: "/drugchemistry",
          query: {name:name, title: this.getChinese(name)}
        });
    },
    getDrugItems(name){
      this.$router.push({
        path: "/drugitems",
        query: {name:name, title: this.getChinese(name)}
      });
    },
    getDrugDetail(name){
      this.$router.push({
        path: "/drugdetail",
        query: {drugList: name}
        });
        
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
    mounted (){

  },
  created() {
    this.getDrugData();
  }
};


</script>

<style lang="less" scoped>
@import "../../assets/css/common.less";
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
</style>
