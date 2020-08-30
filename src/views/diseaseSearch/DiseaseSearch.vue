<template>
	<div class="page-full component-home fx-column">
		<header class="home-header fx" :style="{ 'backgroundColor': 'rgba(57, 184, 255, 0)'}">
			<div class="header-content fx">
				<el-input v-model="searchData" placeholder="搜索疾病"></el-input>
				<el-button type="primary" icon="el-icon-search" style="float:right" @click="search">搜索</el-button>
				<el-button type="primary" style="float:right" @click="backPage">返回</el-button>
			</div>
		</header>
		<div class="blank"></div>
		<div class="page-content fx-1">
			<ul class="diseaselist-content">
				<li v-for="(item, index) in disease" v-bind:key="index" @click="toPage(item)" class="disease-item fx-ac ac">
					<div class="fx-1">{{item.value}}</div>
				</li>
			</ul>
		</div>
		<app-nav></app-nav>
	</div>
</template>

<script>
	import Utils from '../../utils'
	import appNav from '../../components/app-nav.vue'
	import axios from 'axios';
	import router from '../../router';
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		components: {
			appNav
		},
		data() {
			return {
				isResetMap: true,
				searchData: "",
				disease: []
			}
		},
		computed: mapGetters({
			ifrmeHwUced: 'ifrmeHwUced',
		}),
		methods: {
			search() {
				if(this.searchData!=""){
					let url = 'http://127.0.0.1:10088/query'
					let data = {
						'category': 'disease',
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
							console.log(response.data);
							this.disease = response.data;
						})
				}
				else{
					this.disease = [];
				}
			},
			toPage: function(item) {
				this.$router.push({
					name:'disease-detail',
					params: {diseaseName: item.value}
				});
			},
			backPage: function() {
				this.searchData = "";
				this.disease = [];
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
		activated() {
			this.$store.dispatch('empty_symptom');
			if (this.ifrmeHwUced && this.isResetMap) {
				this.isResetMap = false;
				// this.initMap();
			}
		},
		mounted() {
			// this.initMap();
		}
	}
</script>

<style lang="less" scoped>
	@import "../../assets/css/common.less";


	.page-content {
		background-color: #f1f4f4;
	}

	/**
 * 头部
 */
	.home-header {
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
		z-index: 1;
		width: 100%;
		height: 0.88rem;
		padding-left: 0.2rem;
		padding-right: 0.1rem;
		background-color: rgba(57, 184, 255, 0);
	}

	.blank {
		height: 0.88rem;
	}

	.header-content {
		height: 100%;
		width: 100%;
		align-items: center;
	}

	.diseaselist-content {
		background-color: #fff;
	}

	.disease-item {
		height: .88rem;
		padding: 0 .2rem;
		font-size: .28rem;
		color: #3d4550;
		border-bottom: .01rem solid #e7ecf2;

		& .disease-type {
			width: .86*3rem;
			font-size: .2rem;
			color: #9fa1a9;

			& i {
				margin-left: .1rem;
				width: .76rem;
				height: .32rem;
				border: 1px solid #9fa1a9;
			}
		}
	}
</style>
