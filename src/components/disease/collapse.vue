<template>
    <div v-if="hasChild">
        <van-collapse-item 
            :title="searchItem.value"
            :name="searchItem.value">
            <collapse v-for="(item, index) in searchItem.data" :key="index" :searchItem="item"></collapse>
        </van-collapse-item>
    </div>
    <div v-else class="text" @click="toPage(searchItem)">{{searchItem.value}}</div>
</template>

<script>
import collapse from '../../components/disease/collapse.vue'
export default {
    name: 'collapse',
    components: {collapse},
    props: {
        searchItem: {
            type: [Object, Array],
            required: true
        }
    },
    computed: {
        hasChild() {
            return this.searchItem.data && this.searchItem.data.length
        }
    },
    methods: {
        toPage: function(item) {
            this.$router.push({
                name: "disease-detail",
                params: {diseaseName: item.value},
            }) 
        },
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
    
    .van-collapse-item >>> .van-collapse-item__wrapper {
		background-color: #fff;
    }

	.text {
		padding: 10px 16px;
        background-color: #fff;
	}
</style>
