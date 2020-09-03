<template> 
<div class="page-full component-firstaid fx-column"> 
    <app-header :title="appHeader.title"></app-header>
    <section class="firstaid-search-box ac">;
      
        <!-- <a class="search" href="javascript:;">
            <div class="search-content fx">
                <i class="icon-sousuo iconfont"></i>
                <span class="search-text">搜索症状/疾病/药品</span>
            </div>
        </a> -->
      <div class="header-content fx">
				<el-input v-model="searchData" :placeholder="title"></el-input>
				<el-button type="primary" icon="el-icon-search" style="float:right" @click="search">搜索</el-button>
				<el-button type="primary" style="float:right" @click="backPage">返回</el-button>
			</div>
    </section>
    <div class="blank"></div>
		<div class="page-content fx-1">
			<ul class="interactlist-content">
				<li v-for="(item, index) in interaction" v-bind:key="index" @click="toPage(item)" class="interact-item fx-ac ac">
					<div class="fx-1">{{item.value}}</div>
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
        title: "药品查询"
      },
      drugClass: null,
      drugItems: null,
      searchData: '',
      drug:[],
      title: '',
    };
  },
  methods: {
    search() {
				if(this.searchData!=""){
					let url = 'http://127.0.0.1:10088/query'
					let data = {
						'category': 'drug',
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
							console.log(response.data);
							this.drug = response.data;
						})
				}
				else{
					this.drug = [];
				}
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
    getDrugItems(name){
        let url = 'http://localhost:10088/medicine_by_class'
        //   console.log(name);
        name = name.replace(/\[([^\[\]]*)\]/g, "($1)");
        //   console.log(name);
        let data = {'category': name}
        axios.post(url, data)
            .then((response) => {
                this.drugItems = response.data;
                console.log(111)
                console.log(this.drugItems);
                this.$router.push({
                path: "/drugitems",
                query: {drugItems: this.drugItems, drugList: name}
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

},
// computed: {
//     getDrugItems: function (name){
//         let url = 'http://localhost:10088/medicine_by_class'
//         console.log(name);
//         name = name.replace(/\[([^\[\]]*)\]/g, "($1)");
//         console.log(name);
//         let data = {'category': name}
//         axios.post(url, data)
//             .then((response) => {
//                 console.log(222)
//                 console.log(response.data)
//                 this.drugItems = response.data;
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//         return this.drugItems;
//     }
// },

    mounted (){
    // this.initMap();
    this.getDrugData();
  },
  created() {
      this.getDrugData();
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
  
.blank {
		height: 0.88rem;
	}
</style>
