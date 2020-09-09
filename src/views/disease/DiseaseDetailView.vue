<template>
	<div class="page-full component-home fx-column">
		<app-header :title="appHeader.title"></app-header>
		<section class="page-content fx-1" >
			<van-collapse v-model="activeNames">
				<collapse @event="change" v-for="(item, index) in dataSet" :key="index" :searchItem="item" :isTreeRoot="true"></collapse>
			</van-collapse>
            <van-popup
                v-model="isShow"
                closeable
                position="bottom"
                :style="{ height: '90%' }">
                <div class="page-content fx-1">
                    <!-- 详情标题 -->
                    <div class="detail-head detail-bg border-b">
                        <h2 class="detail-head-title" v-text="detailName"></h2>
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
                            <!-- 分点内容 -->
                            <div class="info-sub">
                                <div class="info-sub-h">疾病简介：</div>
                                <p class="info-sub-dd" >--</p>
                            </div>
                            <!-- 分点内容 -->
                            <div class="info-sub">
                                <div class="info-sub-h">适应药物：</div>
                                <div v-for="(treatment, index) in example" :key="index">
                                    <p class="info-sub-dd">药品：<a class="router-link-active" @click="toDrug(treatment[0])">{{treatment[0]}}</a></p>
                                    <p class="info-sub-dd">建议：{{treatment[1]}}</p>
                                    <p class="info-sub-dd">参考文献：{{treatment[2]}}</p>
                                    <p class="info-sub-dd">临床证据：{{treatment[3]}}</p>
                                    <p class="info-sub-dd">证据级别：{{treatment[4]}}</p>
                                    <span class="info-sub-dd">禁用人群：<span class="info-sub-dd" v-for="(item, index) in treatment[5]" :key="index">{{item+" "}}</span></span>
                                    <p class="info-sub-dd">目的：{{treatment[6]}}</p>
                                    <p>--</p>
                                </div>
                            </div>
                            <div class="info-sub">
                                <div class="info-sub-h">禁忌药物：</div>
                                <div v-for="(treatment, index) in exampleCon" :key="index">
                                    <p class="info-sub-dd">药品：<a class="router-link-active" @click="toDrug(treatment[0])">{{treatment[0]}}</a></p>
                                    <p class="info-sub-dd">建议：{{treatment[1]}}</p>
                                    <p class="info-sub-dd">参考文献：{{treatment[2]}}</p>
                                    <p class="info-sub-dd">临床证据：{{treatment[3]}}</p>
                                    <p class="info-sub-dd">证据级别：{{treatment[4]}}</p>
                                    <span class="info-sub-dd">禁用人群：<span class="info-sub-dd" v-for="(item, index) in treatment[5]" :key="index">{{item+" "}}</span></span>
                                    <p class="info-sub-dd">目的：{{treatment[6]}}</p>
                                    <p>--</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 相关资讯 -->
                <div v-if="hasInformations" class="detail-bg detail-advice">
                    <div class="head-more s-icon-next icon-after"><a :href="'javascript:;'" class="cell">相关资讯</a></div>
                    <ul class="advice-con-list">
                        <li v-for="(value, key) in informations" class="list-cell border-b" v-bind:key="key">
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
            </van-popup>



		</section>
        
		<app-nav></app-nav>
	</div>
</template>

<script>
	import Utils from '../../utils'
	import appNav from '../../components/app-nav.vue'
	import appHeader from '../../components/app-header.vue'
	import axios from 'axios';
	import router from '../../router';
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import collapse from '../../components/disease/collapse.vue'
	export default {
		components: {
			appNav,
			appHeader,
			collapse
		},
		data() {
			return {
				isResetMap: true,
				disease: "",
				type: "",
				activeNames: [],
				isresultEmpty: false,
				appHeader: {
                     title: "疾病",
                     backUrl: "/disease"
				},
                dataSet: [],
                isShow: false,
                detailName: '',
                example: [],
                exampleCon: []
			}
		},
		computed: mapGetters({
            ifrmeHwUced: 'ifrmeHwUced',
            backPath: 'backPath',
            item: 'diseaseItem',
            hasInformations: 'hasInformations',
            informations: 'informations'
		}),
		methods: {
			search() {
				if(this.disease!=""){
					let url = '/api/disease_tree'
					let data = {
						'content': this.disease
					}
					axios.post(url, data)
						.then((response) => {
							if(response.data.length!=0){
                                console.log(response.data)
								this.isresultEmpty=true;
                                this.dataSet[0]  = response.data.diseaseTree;
                                this.activeNames = response.data.path;
							}
						})
				}
				else{
					this.disease  = [];
				}
			},
			change(isShow,detailName) {
                this.isShow = isShow;
                this.detailName = detailName;
                this.showResult(this.detailName)
            },
            toDrug (drug) {
                  this.$router.push({ path: "/drugsearch" ,query: {keywords: drug}});
            },
            showResult (content) {
                let url = '/api/disease_detail'
                let data = {'content': content}
                axios.post(url, data)
                    .then((response) => {
                        console.log(response.data)
                        let res = response.data.indication
                        for (let index in res) {
                            let treatment = []
                            let sample = res[index]
                            treatment.push(sample.drugName, sample.property.建议,
                            sample.property.参考文献, sample.property.临床证据,
                            sample.property.证据级别, sample.banPeople, sample.purpose)
                            this.example.length = 0;
                            this.example.push(treatment)
                        }
                        let resCon = response.data.contraindication
                        for (let index in resCon) {
                            let treatment = []
                            let sampleCon = resCon[index]
                            treatment.push(sampleCon.drugName, sampleCon.property.建议,
                            sampleCon.property.参考文献, sampleCon.property.临床证据,
                            sampleCon.property.证据级别, sampleCon.banPeople, sampleCon.purpose)
                            this.exampleCon.length = 0;
                            this.exampleCon.push(treatment)
                        }
                    })
            }
			
		},
		created () {
            this.disease = this.$route.params.diseaseName;
            this.search();

		},
		
	}
</script>

<style lang="less" scoped>
	@import "../../assets/css/common.less";

	.page-content {
		background-color: #f1f4f4;
	}

	/deep/ .van-collapse-item__content {
		padding: 0px 16px;
	}

    .page-full{
    background-color: #fff;
    }

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
