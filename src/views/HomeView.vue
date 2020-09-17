<template>
    <div class="page-full component-home fx-column"> 
        <header class="home-header fx" :style="{ 'backgroundColor': 'rgba(57, 184, 255, '+opacity+')'}">
            <div class="header-content fx">
                <a class="search fx-1 ac" href="javascript:;">
                    <div class="search-content fx">
                        <i class="icon-tubiao- iconfont"></i>
                         <router-link class="fx-c fx-1 ac" to="/homesearch">
                        <span class="search-text">搜索疾病/药品/相互作用</span>
                         </router-link>
                    </div>
                </a>
                <a class="message-btn fx-c ac" href="javascript:;"><i class="icon-xiaoxi iconfont fx"></i></a>
            </div>
        </header>
        <div class="page-content fx-1" @touchstart="startMove" @scroll="onMove" @touchend="stopMove" @touchcancel="stopMove">
            <section class="banner-box">
                <a class="banner-item ac" href="javascript:;"><img @load="imgLoad" src="../assets/images/index/hypertension.jpg"></a>
            </section>
            <section class="modules">
                <ul class="modules-content fx">
                    <li class="modules-item fx fx-1">
                        <router-link class="fx-c fx-1 ac" to="/disease">
                            <div class="fx">
                                <img src="../assets/images/index/diagnose@2x.png">
                                <p class="fx-1"><strong>疾病</strong>自查症状&nbsp;了解疾病</p>
                            </div>
                        </router-link>
                    </li>
                    <li class="modules-item fx fx-1">
                        <router-link class="fx-c fx-1 ac" to="/yaopin">
                            <div class="fx">
                                <img src="../assets/images/index/disease@2x.png">
                                <p class="fx-1"><strong>药品</strong>解析疾病&nbsp;加强诊疗</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <!-- <ul class="modules-content fx"> -->
                    <!-- <li class="modules-item fx fx-1">
                        <a class="fx-c fx-1 ac" href="javascript:;">
                            <div class="fx">
                                <img src="../assets/images/index/melancholy@2x.png">
                                <p class="fx-1"><strong>寻医</strong>自查症状&nbsp;了解疾病</p>
                            </div>
                        </a>
                    </li> -->
                    <li class="modules-item fx fx-1">
                        <router-link class="fx-c fx-1 ac" to="/interaction">
                            <div class="fx">
                                <img src="../assets/images/index/accompanying@2x.png">
                                <p class="fx-1"><strong>相互作用</strong>解析疾病&nbsp;加强诊疗</p>
                            </div>
                        </router-link>
                    </li>
                <!-- </ul> -->
            </section>
            <section class="diseases-group group-item">
                <router-link class="group-more fx-ac ac" to="/disease">
                    <strong class="fx fx-1">常见疾病</strong><i class="icon-jinru iconfont"></i>
                </router-link>
                <div class="fx diseases-group-item">
                    <router-link class="fx-c fx-1 ac" to="/disease/diseaseDetail/高血压病">高血压</router-link>
                    <router-link class="fx-c fx-1 ac" to="/disease/1">冠心病</router-link>
                    <router-link class="fx-c fx-1 ac" to="/disease/1">心力衰竭</router-link>
                </div>
                <div class="fx diseases-group-item">
                    <router-link class="fx-c fx-1 ac" to="/disease/diseaseDetail/%E9%AB%98%E8%A1%80%E5%8E%8B%E5%B9%B6%E5%8F%91%E7%97%871">高血压并发症</router-link>
                    <router-link class="fx-c fx-1 ac" to="/disease/diseaseDetail/%E9%AB%98%E8%A1%80%E5%8E%8B%E5%90%88%E5%B9%B6%E5%BF%83%E8%82%8C%E6%A2%97%E6%AD%BB">高血压合并心肌梗死</router-link>
                </div>
            </section>
            <!-- <section class="news-group group-item">
                <router-link class="group-more fx-ac ac" to="/news/0">
                    <strong class="fx fx-1">健康资讯</strong><i class="icon-jinru iconfont"></i>
                </router-link>
                <div class="news-group-item">
                    <ul>
                        <li>
                            <router-link to="/news/detail/168" class="news-item fx ac">
                                <img class="news-item-img" src="../assets/images/index/news-list@2x.jpg">
                                <div class="fx-1">
                                    <p class="news-item-text">得了痛风怎么办，一日三餐如何吃？控 制嘌呤摄入是关键。得了痛风怎么办，一日三餐如何吃？控 制嘌呤摄入是关键。</p>
                                    <div class="news-item-icon">
                                        <i class="icon-chakan iconfont"></i><span class="news-item-number">1025</span>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/news/detail/168" class="news-item fx ac">
                                <img class="news-item-img" src="../assets/images/index/news-list@2x.jpg">
                                <div class="fx-1">
                                    <p class="news-item-text">得了痛风怎么办，一日三餐如何吃？控 制嘌呤摄入是关键。得了痛风怎么办，一日三餐如何吃？控 制嘌呤摄入是关键。</p>
                                    <div class="news-item-icon">
                                        <i class="icon-chakan iconfont"></i><span class="news-item-number">1025</span>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/news/detail/168" class="news-item fx ac">
                                <img class="news-item-img" src="../assets/images/index/news-list@2x.jpg">
                                <div class="fx-1">
                                    <p class="news-item-text">得了痛风怎么办，一日三餐如何吃？控 制嘌呤摄入是关键。得了痛风怎么办，一日三餐如何吃？控 制嘌呤摄入是关键。</p>
                                    <div class="news-item-icon">
                                        <i class="icon-chakan iconfont"></i><span class="news-item-number">1025</span>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/news/detail/168" class="news-item fx ac">
                                <img class="news-item-img" src="../assets/images/index/news-list@2x.jpg">
                                <div class="fx-1">
                                    <p class="news-item-text">得了痛风怎么办，一日三餐如何吃？控 制嘌呤摄入是关键。得了痛风怎么办，一日三餐如何吃？控 制嘌呤摄入是关键。</p>
                                    <div class="news-item-icon">
                                        <i class="icon-chakan iconfont"></i><span class="news-item-number">1025</span>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </section> -->
        </div>
        <app-nav></app-nav>
    </div>
</template>

<script>
import Utils from '../utils'
import appNav from '../components/app-nav.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { appNav },
  data () {
    return {
        bannerHeight: 0,
        opacity: 0,
        timer: null,
        isResetMap: true,
    }
  },
  computed: mapGetters({
    ifrmeHwUced: 'ifrmeHwUced',
  }),
  methods: {
    imgLoad: function(){
        this.bannerHeight = document.querySelector('.banner-box').offsetHeight;
    },
    MonitorTop: function(){
        clearTimeout(this.timer);
        this.timer = setInterval(() => {
            const top = document.querySelector('.page-content').scrollTop;
            if(top < this.bannerHeight){
                this.opacity = top/this.bannerHeight;
            }else{
                this.opacity = 1;
            }
        }, 10)
    },
    startMove: function(){
        this.MonitorTop();
    },
    stopMove: function(){
        setTimeout(() => {
            clearInterval(this.timer);
        }, 2000)
    },
    onMove: function(){
        const top = document.querySelector('.page-content').scrollTop;
        if(top < this.bannerHeight){
            this.opacity = top/this.bannerHeight;
        }else{
            this.opacity = 1;
        }
    },
    initMap (){
        let canvas = document.getElementById('map');
        let {ctx, scale} = new Utils.CircularRing().drawMap(canvas);
        let fontStr = 'px Helvetica Neue, Helvetica, Arial, sans-serif';
        let n = 2;

        ctx.save(); 
        ctx.font = n*50/scale + fontStr;
        ctx.fillStyle = '#646f7f';
        ctx.fillText("50", n*36/scale, n*72/scale);

        ctx.save(); 
        ctx.font = n*18/scale + fontStr;
        ctx.fillStyle = '#7b8ea9';
        ctx.fillText("%", n*92/scale, n*72/scale);

        ctx.save(); 
        ctx.font = n*22/scale + fontStr;
        ctx.fillStyle = '#7b8ea9';
        ctx.textAlign = 'center';
        ctx.fillText("完成", n*70/scale, n*106/scale);
    }
  },
  activated () {
    this.$store.dispatch('empty_symptom');
    if(this.ifrmeHwUced && this.isResetMap){
        this.isResetMap = false;
        //this.initMap();
    }
  },
  mounted (){
    this.$nextTick(()=>{
        //this.initMap();
    })
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/common.less";

.page-content{
    background-color: #f1f4f4; 
}

#map{
    width: 100%;
    height: 100%;
}

/**
 * 头部
 */
.home-header{
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
.message-btn{
    margin-left: 0.2rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    height: 0.54rem;
    border-radius: .05rem;
    & .icon-xiaoxi{
        font-size: 0.38rem;
        color: #fff;
    }
}
.header-content{
    height: 100%;
    width: 100%;
    align-items: center;
}

/**
 * 滚动图片
 */
.banner{
    background-color: #fff;
}
.banner-item{
    display: block;
    max-height: 4.08rem;
    overflow: hidden;
    & img{
        width: 100%;
    }
}

/**
 * 模块入口
 */
.modules{
    background-color: #fff;
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

/**
 * 模块
 */
.group-item{
    margin-top: 0.2rem;
    background-color: #fff;
}
.group-more{
    padding: 0 0.2rem;
    height: 0.8rem;
    font-size: 0.26rem;
    color: #646f7f;
}
.group-small{
    margin-left: 0.16rem;
    line-height: 0.26rem;
    font-size: 0.18rem;
    color: #7b8ea9;
}
.group-gold{
    margin-right: 0.05rem;
    padding: 0 0.12rem;
    height: 0.28rem;
    font-size: 0.16rem;
    color: #fe5823;
    border: 1px solid #fe5823;
    border-radius: 0.28rem;
}
.icon-jinru{
    color: #d4dbe8;
    font-size: 0.36rem;
}

/**
 * 常见疾病
 */
.diseases-group-item{
    padding: 0 0.13rem 0.14rem 0.13rem;
    & a{
        margin: 0 0.07rem 0.14rem 0.07rem;
        height: 0.6rem;
        font-size: 0.28rem;
        color: #5583b8;
        background-color: #f6faff;
    }
}

/**
 * 健康计步
 */
.step-group-item{
    padding-bottom: 0.38rem;
    font-size: 0.22rem;
    color: @color_m;
    & p{
        margin-top: 0.22rem;
    }
    & .iconfont{
        margin-right: 0.1rem;
        color: #d3d3d3;
        vertical-align: middle;
    }
}
.step-map{
    width: 1.4rem;
    height: 1.4rem;
}
.step-strong{
    font-size: 0.36rem;
    color: #646f7f;
    font-weight: bold;
}
.step-small{
    margin-left: 0.05rem;
    font-size: 0.18rem;
    color: #7b8ea9;
    font-weight: normal;
}

/**
 * 健康资讯
 */
.news-group-item{
    margin-top: -0.1rem;
}
.search-text{
    color: black;
}
</style>
