<template> 
<div class="page-full component-drug-list fx-column"> 
    <div class="druglist-header">
        <app-header :title="appHeader.title">
            <i slot="right" class="icon-xiaoxi iconfont ac-o"></i>
        </app-header>
        <!-- <div class="filter-top fx">
            <div class="fx-1 fx-c filter-item" :class="{active: showDrug}" @click="showOtc = false, showType = false, showDrug = !showDrug">药品类别<i class="icon-sanjiaoxia iconfont"></i></div>
            <div class="fx-1 fx-c filter-item" :class="{active: showOtc}" @click="showOtc = !showOtc, showType = false, showDrug = false">OTC/非OTC<i class="icon-sanjiaoxia iconfont"></i></div>
            <div class="fx-1 fx-c filter-item" :class="{active: showType}" @click="showOtc = false, showType = !showType, showDrug = false">医保类别<i class="icon-sanjiaoxia iconfont"></i></div> -->
        <!-- </div> --> 
    </div>
    <div class="page-content fx-1">
        <ul class="druglist-content">
            <li v-for="(item, index) in drugs" v-bind:key="index" @click="getDrugDetail(item.value)" class="drug-item fx-ac ac">
                <div class="fx-1">{{getChinese(item.value)}}</div>
            </li>
        </ul>
    </div>
    <!-- <transition name="downup">
        <div v-show="showDrug" class="filter-content filter-drug">
        <ul class="fx-column">
            <li v-for="(item, index) in drugItems" v-bind:key="index" @click="selectItem(item)" :class="{active: item.selected}" class="fx-1 fx-ac ac"><p class="fx-1">{{item.name}}</p><span class="filter-select fx-c" :class="{active: item.selected}"><i class="iconfont" :class="{'icon-gou': item.selected}"></i></span></li>
        </ul>
    </div>
    </transition>
    <transition name="downup">
    <div v-show="showOtc" class="filter-content filter-type">
        <ul class="fx-column">
            <li v-for="(item, index) in otcItems" v-bind:key="index" @click="selectItem(item)" :class="{active: item.selected}" class="fx-1 fx-ac ac"><p class="fx-1">{{item.name}}</p><span class="filter-select fx-c" :class="{active: item.selected}"><i class="iconfont" :class="{'icon-gou': item.selected}"></i></span></li>
        </ul>
    </div>
    </transition>
    <transition name="downup">
    <div v-show="showType" class="filter-content filter-type">
        <ul class="fx-column">
            <li v-for="(item, index) in typeItems" v-bind:key="index" @click="selectItem(item)" :class="{active: item.selected}" class="fx-1 fx-ac ac"><p class="fx-1">{{item.name}}</p><span class="filter-select fx-c" :class="{active: item.selected}"><i class="iconfont" :class="{'icon-gou': item.selected}"></i></span></li>
        </ul>
    </div>
    </transition>
    <div v-show="showOtc || showType || showDrug" @click="showOtc = false, showType = false, showDrug = false" class="mask"></div> -->
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
      // drugItems: [
      //   { name: "西药", selected: false },
      //   { name: "中成药", selected: false },
      //   { name: "其它类", selected: false }
      // ],
      // otcItems: [
      //   { name: "处方药", selected: false },
      //   { name: "OTC甲", selected: false },
      //   { name: "OTC乙", selected: false },
      //   { name: "未知类别", selected: false }
      // ],
      // typeItems: [
      //   { name: "医保甲", selected: false },
      //   { name: "医保乙", selected: false },
      //   { name: "非医保", selected: false },
      //   { name: "未知类别", selected: false }
      // ],
      drugs: this.$route.query.drugItems,
      showOtc: false,
      showDrug: false,
      showType: false,
      appHeader: {
        title: this.$route.query.title
      },
      drugList: this.$route.query.drugList,
      drugDetail: null
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
      // console.log(111)
      // console.log(this.drugs);
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
    this.show();
    if(this.$route.query) {
    this.drugs = this.$route.query.drugItems;
    this.drugList = this.$route.query.drugList;
    this.appHeader.title = this.$route.query.title;
		// this.init();
	}

  },
  watch: {
    '$route'(to, from) {
      this.$router.go(0);

    }
  },
  watch: {
	  '$route' (to, from) { //监听路由是否变化
		  if(to.query.drugItems != from.query.drugItems && to.query.drugItems != undefined && Object.prototype.toString.call(to.query.drugItems[0]) != '[object String]'){
        console.log(333);
        console.log(to.query.drugItems);
        console.log(Object.prototype.toString.call(to.query.drugItems[0]))
        this.drugs = to.query.drugItems;
        this.drugList = to.query.drugList
        this.appHeader.title = to.query.title;
			  // this.init();//重新加载数据
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
