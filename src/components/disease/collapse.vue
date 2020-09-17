<template>
    <div>
        <van-collapse-item 
            :title="searchItem.name"
            :name="searchItem.name">
            <div slot="title"><div @click="toPage(searchItem.name,true)">{{searchItem.name}}</div></div> 
            <div v-if="hasChild">
                <collapse v-for="(item, index) in searchItem.subTitle" :key="index" :searchItem="item" :isTreeRoot="false"></collapse>
            </div>
            <div v-else class="text" @click="toPage(item,false)" v-for="(item, index) in searchItem.leafTitle" :key="index">{{item}}</div>
        </van-collapse-item>
    </div>
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
        },
        isTreeRoot: {
            type: [Boolean],
            required: true
        },
    },
    data() {
        return {
            tree: null,
            isShow: false,
        }
    },
    computed: {
        hasChild() {
            return this.searchItem.subTitle && this.searchItem.subTitle.length
        }
    },
    created() {
        if(!this.isTreeRoot){
            let parent = this.$parent
            while(parent && !parent.isTreeRoot) {
                parent = parent.$parent
            }
            this.tree = parent
        }
        else{
            this.tree = this
        }
        
        
    },
    methods: {
        toPage: function(item,ischange) {
            this.isShow = true;
            this.tree.$emit('event',this.isShow,item,ischange)
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
		padding: 10px 32px;
        background-color: #fff;
	}
</style>
