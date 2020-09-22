<template> 
<div class="page-full component-drug-list fx-column"> 
    <div class="druglist-header">
        <app-header :title="appHeader.title">
            <i slot="right" class="icon-xiaoxi iconfont ac-o"></i>
        </app-header>
    </div>
    <div class="page-content fx-1">
        <ul class="druglist-content">
            <li v-for="(item, index) in drugs" v-bind:key="index" @click="getDrugItems(item)" class="drug-item fx-ac ac">
                <div class="fx-1">{{getChinese(item)}}</div>
            </li>
        </ul>
    </div>
   
    <app-nav></app-nav>
</div>
</template>

<script>
import IScroll from "iscroll";
import Utils from "../../utils";
import { mapGetters, mapActions } from "vuex";
import appHeader from "../../components/app-header.vue";
import appNav from "../../components/app-nav.vue";
import axios from 'axios';

export default {
  components: { appHeader, appNav },
  data() {
    return {
      drugs: null,
      showOtc: false,
      showDrug: false,
      showType: false,
      appHeader: {
        title: this.$route.query.title
      },
      drugList: this.$route.query.name,
      drugDetail: null,
      name: this.$route.query.name,
    };
  },
  methods: {
    selectItem: function(item, index) {
      item.selected = !item.selected;
    },
    toPage: function(item) {
      this.$router.push({ path: "/drugdetail" });
    },
    show(){
    },
    getChemistryData(){
      let url = 'http://localhost:10088/chemical_by_class'
        let data = {'content': this.name}
        axios.post(url, data)
            .then((response) => {
                this.drugs = response.data.data;
                this.appHeader.title = this.getChinese(this.name);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    getDrugItems(name){
      this.$router.push({
        path: "/drugitems",
        query: {name:name, title: this.getChinese(name)}
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
  computed: {},
  created() {
    this.getChemistryData();
    if(this.$route.query) {
    this.drugList = this.$route.query.name;
    this.name = this.$route.query.name;
    this.appHeader.title = this.$route.query.title;
	}
  },
  watch: {
    '$route'(to, from) {
      this.$router.go(0);
    }
  },
  watch: {
    '$route' (to, from) { //监听路由是否变化
		  if(to.query.name != from.query.name && to.query.name != undefined){
        this.drugList = to.query.name;
        this.name = to.query.name;
        this.appHeader.title = to.query.title;
        this.getChemistryData();
		  }
	  }
},
};
</script>

<style lang="less" scoped>
@import "../../assets/css/common.less";
.component-drug-list {
  background-color: #f2f3f5;
}
.druglist-header {
  position: relative;
  z-index: 10;
  font-size: 0.26rem;
  color: #a6dfff;
  background-color: #39b7ff;
}
.druglist-content {
  background-color: #fff;
}
.filter-top {
  height: 0.88rem;
  font-size: 0.26rem;
}
.filter-item {
  color: #a6dfff;
  border-bottom: 0.05rem solid transparent;
  transition: all 0.25s ease-in;
  & .iconfont {
    margin-left: 0.1rem;
    font-size: 0.12rem;
    transition: all 0.25s ease-in;
  }
  &.active {
    color: #fff;
    border-bottom-color: #a6bfff;
    & .iconfont {
      transform: rotate(180deg);
    }
  }
}
.filter-content {
  position: absolute;
  z-index: 10;
  left: 0;
  top: 1.76rem;
  width: 100%;
  max-height: 60%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #fff;
  & li {
    padding: 0 0.2rem;
    height: 0.88rem;
    font-size: 0.28rem;
    color: #3d4550;
    border-bottom: 1px solid #e7ecf2;
    &.active {
      color: #00a2ff;
      & .filter-select {
        background-color: #39b9ff;
      }
    }
    & .filter-select {
      width: 0.32rem;
      height: 0.32rem;
      font-size: 0.12rem;
      color: #fff;
      border-radius: 0.02rem;
      background-color: #dbdde2;
    }
  }
}
.filter-drug {
  height: 3*0.88rem;
  & ul {
    height: 3*0.88rem;
  }
}
.filter-type {
  height: 4*0.88rem;
  & ul {
    height: 4*0.88rem;
  }
}
.drug-item {
  height: 0.88rem;
  padding: 0 0.2rem;
  font-size: 0.28rem;
  color: #3d4550;
  border-bottom: 0.01rem solid #e7ecf2;
  & span {
    font-size: 0.22rem;
    color: #9fa1a9;
  }
}
</style>
