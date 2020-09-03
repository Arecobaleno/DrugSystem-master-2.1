<template> 
    <div class="page-full component-find fx-column"> 
    <app-header :title="appHeader.title"></app-header>
    	<section class="firstaid-search-box" >
			<form action="/">
				<van-search
					v-model="searchData"
					show-action
					shape="round"
					placeholder="请输入搜索关键词"
					@search="onSearch"
					@cancel="onCancel"
					@clear="onClear"
				/>
				</form>
		</section>

    <div class="page-content fx-1">
       <section class="modules">
                <ul class="modules-content fx">
                    <li class="modules-item fx fx-1">
                        <router-link class="fx-c fx-1 ac" to="/goods/yearsearch">
                            <div class="fx">
                                <img src="../../assets/images/disease/drug@2x.png">
                                <p class="fx-1"><strong>按年份查询</strong></p>
                            </div>
                        </router-link>
                    </li>
                    <li class="modules-item fx fx-1">
                        <router-link class="fx-c fx-1 ac" to="/goods/makersearch">
                            <div class="fx">
                                <img src="../../assets/images/find/find_jjcs.png">
                                <p class="fx-1"><strong>按定制者查询</strong></p>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <router-link class="group-more fx-ac ac" to="/news/0">
                    <strong class="fx fx-1">最新指南</strong><p>更多</p>
                </router-link>

        </section>
    
		
		<section>
            <li v-for="(treatment,index) in example" v-bind:key="index" @click="getGuideItems(treatment.title)">
            <div class="modules">
                <p class="Gtitle">{{(treatment.title)}}</p>
                <p class="Gmaker">{{treatment.maker}}</p>
                <p class="Gtime">{{treatment.year}}</p>
            </div>
            </li>
		</section>
				
    </div>
    <app-nav></app-nav>
</div>
</template>

<script>
import IScroll from 'iscroll'
import Utils from '../../utils'
import { mapGetters, mapActions } from "vuex";
import appHeader from "../../components/app-header.vue";
import appNav from "../../components/app-nav.vue"
import axios from 'axios'
export default {
  components: { appNav, appHeader },
  data () {
    return {
         appHeader: {
        title: "临床指南"
      },
    Clinical_literature:[],
       searchData: '',
       guideClass: null,
	   example: [],
       book:[
       ]
    }
  },
    watch: {
	  '$route' (to, from) { //监听路由是否变化
      this.searchData = ""
	  }
  },
  computed: {
  },
   created() {
	 this.getNewGuide(3);
      this.searchData = ""
  },
  methods: {
      onCancel() {
				this.isShowData=false;
				this.searchData = "";
				// this.disease = [];
			},
			onClear() {
				this.searchData = "";
			},
     onSearch() {
				if(this.searchData!=""){
					let url = '/api/guide/get'
					let data = {
                        'category': 'search',
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
                            console.log("6666");
                            console.log(response.data);
                            this.guideClass = response.data;
                            this.$router.push({
					        name:'GuideSearch',
					        query: {guideClass: response.data}
				            });
							// this.disease = response.data;
						})
				}
				else{
					this.Clinical_literature = [];
                }
                
            },
		getNewGuide(num_of_items) {
		
		       this.example=[]
		        let count=0
		       let url = '/api/guide/get'
		       let data = {'category': 'search','content':''}
		
		  			//let details="";
		  			axios.post(url, data)
		  			.then((response)=>{
		  				let res = response.data
		  				//console.log(res);
		  				for (let index in res) {

		  					let treatment = []
		  					let sample = res[index]
		  					treatment.push(sample)
		
		  				//	this.example.push(treatment)
		         this.example.push({index:index, year:sample.time, title:sample.title, count:sample.count,maker:sample.maker})
		         console.log(this.example)
		            
		  				}
		        // alert(JSON.stringify(this.example));
		        function getSortFun(order, sortBy) {
		            var ordAlpah = (order == 'asc') ? '>' : '<';
		            var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
		            return sortFun;
		        }
				
		         this.example.sort(getSortFun('desc', 'year'));
				this.example=this.example.slice(0,num_of_items);
				console.log(7777)
				console.log(this.example)
                //alert(JSON.stringify(this.example))
		  			})
		  			.catch((error) => {
		  				console.log(error);
		  			})
		
		},
		getGuideItems(name){
		   let url = '/api/guide/detail'
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
        getDrugItems(name){

        },
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/common.less";
.firstaid-search-box {
  background-color: #f2f3f5;
  & .search {
    color: #c5c7ce;
    background-color: #fff;
  }
}
.firstaid-content {
  & li {
    margin-top: 20px;
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
  .modules{
    margin-top: .2rem;
    background-color: #fff;
}
.modules-title{
    height: .7rem;
    font-size: .26rem;
    color: #646f7f;
    border-bottom: 1px solid @bg_bd;
    & .iconfont{
        color: #cbdee8;
    }
    & span{
        margin: 0 .2rem;
    }
}
.modules .modules-content{
    border-bottom: 1px solid @bg_bd;
    & li:first-child{
        border-right: 1px solid @bg_bd;
    }
    &:last-child{
        border-bottom-color: transparent;
    }
}
.modules-item{
    height: 1.8rem;
    & a{
        font-size: 0.22rem;
        color: @color_m;
        line-height: 1.65;
        & strong{
            display: block;
            font-size: 0.3rem;
            color: @color_l;
        }
    }
    & img{
        margin-right: 0.18rem;
        width: 0.88rem;
        height: 0.88rem;
    }
}

.scroll-evaluations{
    position: relative;
    overflow: hidden;
    padding: .3rem 0;
    //height: 1.98rem;
    width: 100%;
    & ul{
        width: 3.4*3rem;
    }
    & li{
        margin-left: .2rem;
        float: left;
    }
    & img{
        height: 2rem;
        border-radius: .1rem;
    }
}
.group-more{
    padding: 0 0.2rem;
    height: 0.8rem;
    font-size: 0.26rem;
    color: #646f7f;
}
.Gtitle{
    font-family: "Times New Roman";
    font-weight: 1000;
    font-size: 0.32rem;
    margin: 8px 10px;
}
.newGuides{
    border-radius: 0 2px 2px; 
}
.Gmaker{
    font-size: 0.27rem;
    margin: 8px 10px;
}
.Gtime{
    font-size: 0.26rem;
    margin: 6px 10px;
}
</style>
