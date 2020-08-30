<template>
    <div class="page-full component-home fx-column">
        <header class="home-header fx" :style="{ 'backgroundColor': 'rgba(57, 184, 255, '+opacity+')'}">
            <div class="header-content fx">
              <!-- <h1>这是标题 3</h1> -->
                <a class="search fx-1 ac" href="javascript:;">
                  <!-- <h1>这是标题 3</h1> -->
                  <router-link class="fx-c fx-1 ac" to="/interaction/search">
                    <div class="search-content fx" @onclick="click_search()">
                        <i class="icon-tubiao- iconfont"></i>
                        <span class="search-text"><font color="#C4C4C4">搜索药品成分</font></span>
                    </div>
                    </router-link>
                    <br /><br /><br />
                     <font align="center" color="black" style="margin-right:10px;font-size:14px">常用搜索：</font><br /><br />
                     <button type="button" style="margin-right:10px">
                     <font align="center" color="gray">硝苯地平</font>
                     </button>
                     <button type="button" style="margin-right:10px">
                     <font align="center" color="gray">氯沙坦钾</font>
                     </button>
                     <button type="button" style="margin-right:10px">
                     <font align="center" color="gray">阿尔马尔</font>
                     </button>
                </a>
                <a class="message-btn fx-c ac" href="javascript:;"><i class="icon-xiaoxi iconfont fx"></i></a>
            </div>
         <br /><br />
        </header>
        <div class="page-content fx-1 mytxt" @touchstart="startMove" @scroll="onMove" @touchend="stopMove" @touchcancel="stopMove">
        </div>
        <app-nav></app-nav>
    </div>
</template>

<script>
import Utils from '../../utils'
import appNav from '../../components/app-nav.vue'
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
        // this.initMap();
    }
  },
  mounted (){
    // this.initMap();
  },
  click_search(){
    alert("事件！");
  },
}
</script>

<style lang="less" scoped>
@import "../../assets/css/common.less";


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
.mytxt p{
    padding-top: 100px;
    padding-left: 10px;
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
.jibing{
    width: 500px;
    height: 500px;
}

.button
{
	font-family:"Times New Roman";
	font-size:30px;
	color:orange;
	text-align:center;
}
/**
 * 健康资讯
 */
.news-group-item{
    margin-top: -0.1rem;
}
</style>
