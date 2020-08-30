<template> 
<div class="page-full component-drug-list fx-column"> 
    <div class="druglist-header">
        <app-header :title="appHeader.title"></app-header>
        
    <!-- <section class="firstaid-search-box ac">
            <div class="header-content fx">
				<el-input v-model="searchData" placeholder="搜索指南"></el-input> 
				<el-button type="primary" icon="el-icon-search" style="float:right" @click="search">搜索</el-button>
			</div>
    </section> -->

    </div>
    <div class="page-content fx-1">
        <!-- <ul class="druglist-content" v-for="(item, index) in guideContent" v-bind:key="index"> -->
          <ul  class="druglist-content" >
            <li v-for="(guide, index) in guideContent" v-bind:key="index" @click="getGuideItems(guide.name)" class="drug-item fx-ac ac">
                <div class="fx-1">{{guide.name}}</div>
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
    appHeader: {title: "临床指南"},
    guideContent:this.$route.query.guideItems,
    searchData: "",
    guideItems:null,
    };
  },
    watch: {
    '$route'(to, from) {
      this.$router.go(0);

    }
  },
  watch: {
	  '$route' (to, from) { //监听路由是否变化
     this.searchData=''
    }
  },
  methods: 
  {
    
     getGuideItems(name){
       console.log("哈哈哈哈哈哈哈哈哈哈哈哈哈哈:   "+ name)
               let url = 'http://localhost:10088/guide/detail'
               let data = {'content': name}
               axios.post(url, data)
            .then((response) => {
                    this.guideItems = response.data;
                console.log(111)
                console.log(this.guideItems);
                console.log(this.guideItems[0].time);
                console.log(this.guideItems[0].maker);

                this.$router.push({
                name: "GuideDetail",
                query: {guideItems: this.guideItems}
            });
            })
        },
  },
   created () {
        // let content = this.appHeader.title
        // this.disease = content
        // this.showResult(content)
        if(this.$route.query) {
            this.guideContent = this.$route.query.guideItems
      
      }
      this.searchData = ""
      console.log("888"+this.$route.query.guideItems);
}

}
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
