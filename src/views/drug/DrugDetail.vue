<template>
<div class="page-full component-news-detail fx-column"> 
    <app-header :title="appHeader.title">
        <div slot="right">
            <i class="icon-shoucang iconfont ac-o"></i>
        </div>
    </app-header>
    <div class="page-content fx-1">
        <!-- 详情标题 -->
        <div class="detail-head detail-bg border-b">
            <h2 class="detail-head-title">{{getChinese(example2[0])}}</h2>
            <p v-if="item.alias" class="detail-head-small" v-text="'别名：'+item.alias"></p>
            <p v-if="item.common_name" class="detail-head-small" v-text="'俗称：'+item.common_name"></p>
            <p v-if="item.advice" class="detail-head-small" v-text="'就诊建议：'+item.advice"></p>
        </div>
        <!-- 跳转模块
        <div class="detail-relevant border-b">
            <ul class="detail-relevant-box fx">
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-1"></i>辅助疗法</li>
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-2"></i>热门医生</li>
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-3"></i>附近医院</li>
                <li class="relevant-item fx-1 fx-c fx-column"><i class="flex-icon icon-4"></i>相关药品</li>
            </ul>
        </div> -->
        <!-- 详情内容 -->
        <div class="detail-info">
            <div class="info-group">
                <div class="info-sub">
                    <div class="info-sub-h">成份：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example9" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">相互作用列表：</div>
                    <div>
                        <p class="info-sub-dd router-link-active" @click="toPage(name)">{{ name + "的相互作用列表"}}</p>
                    </div>
                    <div class="info-sub-h">药品相互作用：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example14" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">适应症：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example3" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">药品监管分级：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">ATC编码：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example4" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">MIMS药物分类：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example5" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">不良反应：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example6" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">制造商：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example7" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">包装/零售价：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example8" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">注意事项：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example10" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">用法用量：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example11" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">禁忌：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example12" :key="index">{{item}}</p>
                    </div>
                    <div class="info-sub-h">其他信息：</div>
                    <div >
                        <p class="info-sub-dd" v-for="(item,index) in example13" :key="index">{{item}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 相关资讯 -->
    <div v-if="hasInformations" class="detail-bg detail-advice">
        <div class="head-more s-icon-next icon-after"><a :href="'javascript:;'" class="cell">相关资讯</a></div>
        <ul class="advice-con-list">
            <li v-for="(value, key) in informations" class="list-cell border-b" :key="key">
                <a :href="'http://192.168.99.40:8001/news?id='+value.id" class="cell">
                    <div class="fx">
                        <img :src="value.image" class="cell-img" />
                        <div class="fx-cell">
                            <p class="cell-tit" v-text="value.title"></p>
                            <div class="tr">
                                <i class="s-icon icon"></i><span class="read-num" v-text="value.number"></span>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import appHeader from '../../components/app-header.vue'
import axios from 'axios'
export default {
    components: { appHeader },
    data (){
        return {
            appHeader: {
                title: '药品说明书'
            },
            disease: '',
            example: [],
            example2: [],
            example3: [],
            example4: [],
            example5: [],
            example6: [],
            example7: [],
            example8: [],
            example9: [],
            example10: [],
            example11: [],
            example12: [],
            example13: [],
            example14: [],
            drugDetail: null, 
            drugList: this.$route.query.drugList,
            name: null,
        }
    },
    activated (){
    },
    deactivated (){
    },
    created () {
        this.getDrugDetailData();
        if(this.$route.query) {
        this.drugList = this.$route.query.drugList;
      }
    },
    methods: {
        getDrugDetailData (){
            console.log(81818);
            console.log(this.drugList)
            let url = 'http://localhost:10088/detail'
            let data = {'category': 'drug', 'content': this.drugList}
            axios.post(url, data)
                .then((response) => {
                    this.drugDetail = response.data;
                    console.log('hhh')
                    console.log(this.drugDetail);
                    this.getDrugDetail();
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getDrugDetail(){
            console.log(1)
            console.log(this.drugDetail)
            for (let index in this.drugDetail) {
                let treatment = []
                let tag = [0,0,0,0,0,0,0,0,0,0,0,0,0]
                let sample = this.drugDetail[index]
                console.log(1)
                console.log(this.drugDetail)
                treatment.push(sample.properties)
                let arr1 = Object.values(treatment[0])
                let arr2 = Object.keys(treatment[0])
                for (let i = 0; i < arr2.length; i++){
                    if(this.isInArray(arr2, "药品监管分级")){
                        if(arr2[i] == "药品监管分级"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example.push(s1)
                        }
                    }else{
                        let s1 = '--'
                        let s2 = "药品监管分级"
                        s2 = s2.concat(':', s1)
                        if(tag[0] == 0){
                            this.example.push(s1)
                            tag[0] = 1
                        }
                        
                    }
                    if(this.isInArray(arr2, "name")){
                        if(arr2[i] == "name"){
                            let s1 = arr1[i];
                            let s2 = "名称";
                            s2 = s2.concat(':', s1);
                            this.example2.push(s1);
                            this.name = this.example2[0];
                            this.getChemistry(this.name)
                        }
                    }else{
                        let s1 = '--'
                        let s2 = "名称"
                        s2 = s2.concat(':', s1)
                        if(tag[1] == 0){
                            this.example2.push(s1)
                            tag[1] = 1
                        }
                    }
                    if(this.isInArray(arr2, "药品相互作用")){
                        if(arr2[i] == "药品相互作用"){
                            let s1 = arr1[i]
                            this.example14.push(s1)
                        }
                    }else{
                        let s1 = '--'
                        let s2 = "药品相互作用"
                        s2 = s2.concat(':', s1)
                        if(tag[1] == 0){
                            this.example14.push(s1)
                            tag[1] = 1
                        }
                    }
                    if(this.isInArray(arr2, "适应症")){
                        if(arr2[i] == "适应症"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example3.push(s1)
                        }

                    }else{
                        let s1 = '--'
                        let s2 = "适应症"
                        s2 = s2.concat(':', s1)
                        if(tag[2] == 0){
                            this.example3.push(s1)
                            tag[2] = 1
                        }
                    }
                    if(this.isInArray(arr2, "ATC编码")){
                        if (arr2[i] == "ATC编码"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example4.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "ATC编码"
                        s2 = s2.concat(':', s1)
                        if(tag[3] == 0){
                            this.example4.push(s1)
                            tag[3] = 1
                        }
                    }
                    if(this.isInArray(arr2, "MIMS药物分类")){
                        if(arr2[i] == "MIMS药物分类"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example5.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "MIMS药物分类"
                        s2 = s2.concat(':', s1)
                        if(tag[4] == 0){
                            this.example5.push(s1)
                            tag[4] = 1
                        }
                    }
                    if(this.isInArray(arr2, "不良反应")){
                        if(arr2[i] == "不良反应"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example6.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "不良反应"
                        s2 = s2.concat(':', s1)
                        if(tag[5] == 0){
                            this.example6.push(s1)
                            tag[5] = 1
                        }
                    }
                    if(this.isInArray(arr2, "制造商")){
                        if(arr2[i] == "制造商"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example7.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "制造商"
                        s2 = s2.concat(':', s1)
                        if(tag[6] == 0){
                            this.example7.push(s1)
                            tag[6] = 1
                        }
                    }
                    if(this.isInArray(arr2, "包装/零售价")){
                        if(arr2[i] == "包装/零售价"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example8.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "包装/零售价"
                        s2 = s2.concat(':', s1)
                        if(tag[7] == 0){
                            this.example8.push(s1)
                            tag[7] = 1
                        }
                    }
                    if(this.isInArray(arr2, "成份")){
                        if(arr2[i] == "成份"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example9.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "成份"
                        s2 = s2.concat(':', s1)
                        if(tag[8] == 0){
                            this.example9.push(s1)
                            tag[8] = 1
                        }
                    }
                    if(this.isInArray(arr2, "注意事项")){
                        if(arr2[i] == "注意事项"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example10.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "注意事项"
                        s2 = s2.concat(':', s1)
                        if(tag[9] == 0){
                            this.example10.push(s1)
                            tag[9] = 1
                        }
                    }
                    if(this.isInArray(arr2, "用法用量")){
                        if(arr2[i] == "用法用量"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example11.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "用法用量"
                        s2 = s2.concat(':', s1)
                        if(tag[10] == 0){
                            this.example11.push(s1)
                            tag[10] = 1
                        }
                    }
                    if(this.isInArray(arr2, "禁忌")){
                        if(arr2[i] == "禁忌"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example12.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "禁忌"
                        s2 = s2.concat(':', s1)
                        if(tag[11] == 0){
                            this.example12.push(s1)
                            tag[11] = 1
                        }
                    }
                    if(this.isInArray(arr2, "其他信息")){
                        if(arr2[i] == "其他信息"){
                            let s1 = arr1[i]
                            let s2 = arr2[i]
                            s2 = s2.concat(':', s1)
                            this.example13.push(s1)
                        }
                        
                    }else{
                        let s1 = '--'
                        let s2 = "其他信息"
                        s2 = s2.concat(':', s1)
                        if(tag[12] == 0){
                            this.example13.push(s1) 
                            tag[12] = 1
                        }
                    }

                }

            }
              
        },
        toPage: function(searchMsg) {
            this.$router.push({
            path: "interactDetail",
            query: {interactName: searchMsg[0]},
            })

        },
        getChemistry(){
            let url = 'http://localhost:10088/return_chemical'
            let data = {'content': this.name}
            axios.post(url, data)
                .then((response) => {
                    this.name = response.data;
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
    },
        test1(){
            
            var a={
                "bb":"world",
                    "a0":1,
                    "a1":2,
                    "b0":4,
                    "b1":5,
                    "aa":"hello"
                }
                let arr = Object.values(a);
                console.log(arr);
                let arr1 = Object.keys(a);
        },
        isInArray(arr, value){
            for(let i = 0; i < arr.length; i++){
                if(value == arr[i]){
                    return true;
                }
            }
            return false;
        }

    },
    watch: {
    '$route'(to, from) {
      this.$router.go(0);
    }
  },
  watch: {
      '$route' (to, from) { //监听路由是否变化
		if(to.query.drugList != from.query.drugList && to.query.drugList != undefined){
            this.drugList = to.query.drugList
          }
        this.example = []
        this.example2 = []
        this.example3 = []
        this.example4 = []
        this.example5 = []
        this.example6 = []
        this.example7 = []
        this.example8 = []
        this.example9 = []
        this.example10 = []
        this.example11 = []
        this.example12 = []
        this.example13 = []
        this.example14 = []
        this.getDrugDetailData();
	  }
},
    computed: mapGetters({
        backPath: 'backPath',
        item: 'diseaseItem',
        hasInformations: 'hasInformations',
        informations: 'informations'
    })
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
.router-link-active {
    text-decoration: underline;
    color: blue;
 }
</style>
