<template>
	<div class="page-full component-home fx-column">
		<app-header :title="appHeader.title"></app-header>
		<div class="page-content fx-1">
			<ul class="diseaselist-content" v-if="!isresultEmpty">
				<li v-for="(item, index) in disease" v-bind:key="index" @click="toPage(item)" class="disease-item fx-ac ac">
					<div class="fx-1">{{item.value}}</div>
				</li>
			</ul>
			<ul class="diseaselist-content" v-if="isresultEmpty">
				<li class="disease-item fx-ac ac">
					<div class="fx-1">暂无数据</div>
				</li>
			</ul>
		</div>
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
	export default {
		components: {
			appNav,
			appHeader,
		},
		data() {
			return {
				isResetMap: true,
				disease: [],
				isresultEmpty: false,
				inputMsg:"",
				appHeader: {
     		    	title: "疾病搜索"
				},
			}
		},
		computed: mapGetters({
			ifrmeHwUced: 'ifrmeHwUced',
		}),
		methods: {
			search() {
				this.searchData=this.inputMsg
				if(this.searchData!=""){
					let url = '/api/query'
					let data = {
						'category': 'disease',
						'content': this.searchData
					}
					axios.post(url, data)
						.then((response) => {
							console.log(response.data)
							if(response.data.length==0){
								this.isresultEmpty=true;
								this.disease  = response.data;
							}
							else{
								this.isresultEmpty=false;
								this.disease  = response.data;
							}
						})
				}
				else{
					this.disease  = [];
				}
			},
			
			toPage: function(item) {
				
				this.$router.push({
					name: "disease-detail",
					params: {diseaseName: item.value},
				}) 
				this.inputMsg='';
			},
		},
		created () {
			let storage=window.localStorage;
			if(this.$route.params.diseaseName){
				this.inputMsg = this.$route.params.diseaseName;
				storage.setItem('disease',JSON.stringify(this.inputMsg));
			}
			else{
				this.inputMsg = JSON.parse(storage.getItem('disease'))
			}
			this.search();
		},
	}
</script>

<style lang="less" scoped>
	@import "../../assets/css/common.less";

	.page-content {
		background-color: #f1f4f4;
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
