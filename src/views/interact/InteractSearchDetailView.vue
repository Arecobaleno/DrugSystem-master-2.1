<template>
<div class="page-full component-news-detail fx-column"> 

    <app-header :title="appHeader.title">
        <div slot="right">
            <i class="icon-shoucang iconfont ac-o"></i>
            <i class="icon-fenxiang iconfont ac-o"></i>
        </div>
    </app-header>
    <div class="page-content fx-1">
        <!-- 详情标题 -->
        <div class="detail-head detail-bg border-b">
            <h2 class="detail-head-title" v-text="search_data"></h2>
        </div>
        <!-- 跳转模块 -->
        <div class="detail-relevant border-b">
            <ul class="detail-relevant-box fx">
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-1"></i>辅助疗法</li>
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-2"></i>热门医生</li>
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-3"></i>附近医院</li>
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-4"></i>相关药品</li>
            </ul>
        </div>
        <!-- 详情内容 -->
        <div class="detail-info">
            <div class="info-group">
                <!-- 分点内容 -->
                <div class="info-sub">
                    <div v-if="no_inter" class="info-sub-h">
                        <h2>无此成份相互作用数据</h2>
                    </div>
                    <div v-else class="info-sub-h">相互作用：</div>
                    <div v-for="(treatment,index) in example" :key="index">
                       <p class="info-sub-d2">{{treatment[0]}}</p>
                        <font class="info-sub-d2">临床建议：</font><font  class="info-sub-dd">{{treatment[1]}}</font><br />
                        <font class="info-sub-d2">临床证据：</font><font  class="info-sub-dd">{{treatment[2]}}</font><br />
                        <font class="info-sub-d2">作用机制：</font><font  class="info-sub-dd">{{treatment[3]}}</font><br />
                        <font class="info-sub-d2">证据级别：</font><font  class="info-sub-dd">{{treatment[4]}}</font><br />
                        <font class="info-sub-d2">参考文献：</font><font  class="info-sub-dd">{{treatment[5]}}</font>
                        <p class="info-sub-dd">___________________________________________</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>
</template>


<script>
import appHeader from '../../components/app-header.vue'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
	components: { appHeader },
	data () {
		return {
            appHeader: {
                title: '相互作用详情'},
            interaction: [],
            example:[],
            search_data:"",
            no_inter: false,
		}
	},
	computed: mapGetters({
	    backPath: 'backPath',
	    item: 'diseaseItem',
	    hasInformations: 'hasInformations',
	    informations: 'informations'
	}),
	created () {
		console.log("detail!!!!!");
	    this.interaction =  this.$route.query.interactName.split(',');
		this.getDrugData(this.interaction);
	},
	watch: {
		'$route'(to,from) {
            this.no_inter = false
			this.example = [];
			this.interaction = this.$route.query.interactName.split(',');
			if(this.interaction!=null)
				this.getDrugData(this.interaction);
		}
	},
	methods: {
		getChinese(name) {
		        let isletter = /^[a-zA-Z]+$/.test(name);
		        if(isletter){
		          return name
		        }
		        else{
		          name = name.replace(/[a-zA-Z]/g, "");
		          name = name .replace(" ","");
		          return name;
		        }
		    },
		getDrugData(content){
			let url=''
			let data={}
			console.log(this.interaction.length)
			let len=this.interaction.length
			if(len==1)
			{
			   url = '/api/detail'
			   data = {'category': 'interaction', 'content':this.interaction[0]}
			}
			else{
			 url = '/api/interaction_accurate'
			// data = { 'content': ['卡托普利 Captopril','卡托普利 Captopril']},
			  data = { 'content': this.interaction}
			  console.log(666)
			  console.log(this.interaction)
			}
			axios.post(url, data)
			.then((response)=>{
				let res = response.data
                console.log(res);
                
                if((this.interaction.length)==1){
                    this.search_data=this.getChinese(this.interaction[0]);
                    if(res.length == 0){
                        this.no_inter = true
                    }
                    else{
                        for (let index in res) {
                            let treatment = []
                            let sample = res[index]
                            treatment.push(content+"+"+sample.targetName, sample.edgeResult.properties.临床建议,
                            sample.edgeResult.properties.临床证据, sample.edgeResult.properties.作用机制,
                            sample.edgeResult.properties.证据级别, sample.edgeResult.properties.参考文献)
                            console.log(treatment)
                            this.example.push(treatment)
                        }
                    }
                }else{
                    let search_content=""
                    let i
                    for(i=0; i < (this.interaction.length)-1; i++){
                            search_content+=this.interaction[i];
                            search_content+="+";
                        }
                    search_content+=this.interaction[i];
                    this.search_data=this.getChinese(search_content);
                    if(res.length == 0){
                        this.no_inter = true
                    }
                    else {
                        for (let index in res) {
                            let treatment = []
                            let sample = res[index]
                            treatment.push(search_content, sample.edgeResult.properties.临床建议,
                            sample.edgeResult.properties.临床证据, sample.edgeResult.properties.作用机制,
                            sample.edgeResult.properties.证据级别, sample.edgeResult.properties.参考文献)
                            console.log(treatment)
                            this.example.push(treatment)
                        }
                    }
                }
                
			})
			.catch((error) => {
				console.log(error);
			})
		},
	},
}
</script>

<style lang="less" scoped>
@import "../../assets/css/common.less";

.page-full{
    background-color: #fff;
}

// .detail-relevant{
// }
.relevant-item{
    height: 1.9rem;
    color: @color_l;
}

.flex-icon {
    display: block;
    width: 0.88rem;
    height: 0.88rem;
    margin-bottom: 0.18rem;
    background-size: 0.88rem 0.88rem;
}

.flex-icon.icon-1 {
    background-image: url(../../assets/images/disease/therapy@2x.png);
}

.flex-icon.icon-2 {
    background-image: url(../../assets/images/disease/doctor@2x.png);
}

.flex-icon.icon-3 {
    background-image: url(../../assets/images/disease/hospital@2x.png);
}

.flex-icon.icon-4 {
    background-image: url(../../assets/images/disease/drug@2x.png);
}

/*页面其他小图标*/
.s-icon {
    margin-right: .06rem;
    width: 0.26rem;
    height: 0.2rem;
    vertical-align: middle;
}


/*图标">"*/

.s-icon-next:after {
    content: '';
    width: 0.16rem;
    height: 0.28rem;
    position: absolute;
    right: 0.2rem;
    top: 0.02rem;
    cursor: pointer;
}

/*症状详情*/

.info-sub-dd {
    color: @color;
    line-height: 0.52rem;
}

.info-sub-d2 {
    color: @color;
    line-height: 0.52rem;
    font-weight:bold;
}

.button
{
	font-family:"Times New Roman";
	font-size:30px;
	color:orange;
	text-align:center;
}

/*相关资讯*/
.detail-advice {
    margin-top: .32rem;
    padding-top: 0.2rem;
}

.head-more {
    color: @color;
    font-size: .26rem;
    height: .4rem;
    line-height: .4rem;
    position: relative;
    padding: 0 .2rem;
    overflow: hidden;
}

.detail-advice .cell {
    display: block;
    width: 100%;
    color: @color;
}

.list-cell .cell {
    color: @color_l;
}

.list-cell {
    padding: 0 .2rem;
    position: relative;
}

.list-cell .cell-img {
    width: 1.6rem;
    height: 1.2rem;
    border-radius: .05rem;
    margin: .26rem .23rem .26rem 0;
}

.list-cell .fx-cell {
    flex: 1;
    margin-top: .26rem;
    line-height: .4rem;
    font-size: .3rem;
}

.list-cell .cell-tit {
    overflow: hidden;
    height: 0.91rem;
    line-height: 0.45rem;
    font-size: .3rem;
    color: #3d4550;
    .elsn();
}

.list-cell .fx-cell .tr {
    position: absolute;
    right: .2rem;
    bottom: .17rem
}

.list-cell .read-num {
    color: @color_s;
    font-size: .24rem;
}
</style>
