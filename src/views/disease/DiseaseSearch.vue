<template>
	<div class="page-full component-home fx-column">
		<app-header :title="appHeader.title"></app-header>
		<section class="page-content fx-1" >
			<van-collapse v-model="activeNames">
				<collapse v-for="(item, index) in dataSet" :key="index" :searchItem="item"></collapse>
			</van-collapse>
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
				isShowData: false,
				isresultEmpty: false,
				inputMsg:"",
				appHeader: {
     		    	title: "疾病"
				},
				dataSet: [],
			}
		},
		computed: mapGetters({
			ifrmeHwUced: 'ifrmeHwUced',
		}),
		methods: {
			search() {
				/*this.isShowData=true;
				this.searchData=this.inputMsg
				if(this.searchData!=""){
					let url = 'http://127.0.0.1:10088/query'
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
					this.isShowData=false;
				}*/
			},
			
			toPage: function(item) {
				this.inputMsg=item.value;
				this.$router.push({
					name: "disease-detail",
					params: {diseaseName: this.inputMsg},
				}) 
				this.inputMsg='';
			},
			findActiveName(item) {
				var flag = -1;
				if(item.data.length==0||!item.data){
					if(item.value.search(this.disease) != -1){
						flag = 0;
					}
					else{
						flag = 1;
					}
				}
				else{
					for (var i = 0; i < item.data.length; i++){
						if(this.findActiveName(item.data[i])==0){
							flag = 0;
							this.activeNames.push(item.value);
						}
						if(item.value.search(this.disease) != -1){
							flag = 0;
						}
					}
				}
				return flag
			},
		},
		created () {
			this.dataSet=[{
				value: "标签1",
				data: [{
					value: "标签2",
					data: [{
						value: "标签c",
						data: [{
							value: "心力衰竭",
							data: []
						}]
					}]
				}]
			},{
				value: "标签a",
				data: [{
					value: "心力衰竭",
					data: []
				}]
			},{
				value: "标签b",
				data: [{
					value: "标签c",
					data: []
				}]
			},
			];
			if(this.$route.params.diseaseName){
				this.disease = this.$route.params.diseaseName;
				this.type = this.$route.params.type;
				this.search();
				if(this.type=="text"){
					for (var i = 0; i < this.dataSet.length; i++){
						this.findActiveName(this.dataSet[i]);
					}
				}
				else{
					this.activeNames.push(this.disease);
				}
			}
			else{
				let storage=window.localStorage;
				if(!this.$route.params.diseaseName){
					this.disease = JSON.parse(storage.getItem('disease'));
					this.activeNames = JSON.parse(storage.getItem('activeNames'));
				}
			}
			
			
		},
		destroyed() {
			let storage=window.localStorage;
			storage.setItem('disease',JSON.stringify(this.disease));
			storage.setItem('activeNames',JSON.stringify(this.activeNames));
		},
	}
</script>

<style scoped="">
	@import "../../assets/css/common.less";

	.page-content {
		background-color: #f1f4f4;
	}

	.van-collapse-item >>> .van-collapse-item__content {
		padding: 0px 16px;
	}

	
</style>
