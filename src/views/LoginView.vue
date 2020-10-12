<template>
    <div class="page-full component-my fx-column"> 
        <div class="page-content fx-1">   
            <header class="mine-cover cover-bg">
                <div class="user-header tc" id="login">
                    <div class="user-pic">
                        <img src="../assets/images/my/record@2x.png" alt="我的头像">
                    </div>
                </div>
                <div class="user-score clearfix">
                    <div class="mine-coin fl"><i class="iconfont icon-jinbi"></i></div>
                </div>
            </header>
            <div class="mine-bar">
            
                <van-tabs v-model="active">
                <van-tab title="登录">
                    
                    <van-form @submit="onSubmitLogin">
                        <van-field
                            v-model="nickname"
                            name="用户名"
                            label="用户名"
                            placeholder="用户名"
                            :rules="[{ required: true, message: '请填写用户名' }]"
                        />
                        <van-field
                            v-model="password"
                            type="password"
                            name="密码"
                            label="密码"
                            placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <div style="margin: 16px;">
                            <van-button round block type="info" native-type="submit">
                            登录
                            </van-button>
                        </div>
                    </van-form>

                </van-tab>
                <van-tab title="注册">
                    <van-form @submit="onSubmitNew">
                        <van-field
                            v-model="realname"
                            name="真实姓名"
                            label="真实姓名"
                            placeholder="真实姓名"
                            :rules="[{ required: true, message: '请填写真实姓名' }]"
                        />
                        <van-field
                            v-model="new_nickname"
                            name="用户名"
                            label="用户名"
                            placeholder="用户名"
                            :rules="[{ required: true, message: '请填写用户名' }]"
                        />
                        <van-field
                            v-model="new_password"
                            type="password"
                            name="密码"
                            label="密码"
                            placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <van-field
                            v-model="phone"
                            name="手机号"
                            label="手机号"
                            placeholder="手机号"
                            :rules="[{ required: true, message: '请填写手机号' }]"
                        />
                        <van-field
                            v-model="mail"
                            name="邮箱"
                            label="邮箱"
                            placeholder="邮箱"
                            :rules="[{ required: true, message: '请填写邮箱' }]"
                        />
                        <div style="margin: 16px;">
                            <van-button round block type="info" native-type="submit">
                            注册
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>
                </van-tabs>

            </div>
        </div>
        <!-- <app-nav></app-nav> -->
    </div>
</template>

<script>
import IScroll from 'iscroll'
import Utils from '../utils'
import { mapGetters, mapActions } from 'vuex'

import axios from "axios";
import Vue from 'vue';
// import { Toast } from 'vant';
// import { Search } from 'vant';
// import { Button } from 'vant';
// import { Cell, CellGroup } from 'vant';

// Vue.use(Cell);
// Vue.use(CellGroup);

// Vue.use(Button);

// Vue.use(Search);
import { Form } from 'vant';
import { Tab, Tabs } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Form);
var myScroll = null;


import appNav from '../components/app-nav.vue'
export default {
  components: { appNav },
  data () {
    return {
        bannerHeight: 0,
        opacity: 0,
        timer: null,
        active: 0,
        nickname: '',
        password: '',
        new_nickname: '',
        new_password: '',
        realname: '',
        phone: '',
        mail: '',
        returnData: {},
        new_returnData:{}
    }
  },
  created () {
        if(this.$route.query) {
            this.nickname = this.$route.query.nickname;
            this.password = "";
            this.active = 0;
            console.log("create-this.url");
            console.log(this.url);
        }
    },
    mounted () {
        if(this.$route.query) {
            this.nickname = this.$route.query.nickname;
            this.password = "";
            this.active = 0;
            console.log("create-this.url");
            console.log(this.url);
        }
    },
    watch: {
      '$route' (to, from) { //监听路由是否变化
        this.username = to.query.username;
        this.$router.go(0);

	}
},
  methods: {
    onSubmitLogin(values) {
        console.log('submit', values);
        let url = '/api/my/login'
            let data = {
                'nickname': this.nickname,
                'password': this.password
            }        
            const _this = this;
            axios.post(url, data).then((response) => {
                _this.returnData = response.data;
                
                console.log("_this.returnData");
                console.log(_this.returnData);
                if(_this.returnData.flag == true && _this.returnData.code == 20000){
                     //在这里可以转去用户详情页了！！！！！！！！！
                    this.$router.push({
                        path: "/home",  //改这里！！！！！！！！！！
                        // query: {nickname: this.nickname}
                    });
                    window.sessionStorage.setItem("username", this.nickname);
                }
                else{
                    Toast.fail('用户名或密码错误，请重试');
                }

            }, err => {
                Toast.fail(err);
            });
    },
    onSubmitNew(values) {
        console.log('submit', values);
        let url = '/api/my/register'
            let data = {
                'mail': this.mail,
                'nickname': this.new_nickname,
                'password': this.new_password,
                'phone': this.phone,
                'realname': this.realname,
                
            }        
            const _this = this;
            axios.post(url, data).then((response) => {
                _this.returnData = response.data;
                
                console.log("_this.returnData");
                console.log(_this.returnData);
                if(_this.returnData.flag == true && _this.returnData.code == 20000){
                    
                    // _this.nickname = _this.new_nickname;
                    this.$router.push({
                        path: "/login",  
                        // query: {nickname: this.new_nickname}
                    });
                }
                else{
                    Toast.fail('注册失败，请重试');
                }

            });
    },
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/common.less";

.login-box{
		// width:500px;
		// height:400px;
	    // margin: -200px 0 0 -250px;
	    position: absolute;
	    // top: 20%;
	    // left: 15%;
	}

.page-content{
    background-color: #f1f4f4; 
}

.cover-bg{
    width: 100%;
    height: 3.84rem;
    background-image: url(../assets/images/my/head.png); 
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
}
.mine-cover{
    position: relative;
}
.user-header{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    & .user-pic{
        width: 1.4rem;
        height: 1.4rem;
        display: inline-block;
        border: 1px solid @color_f;
        border-radius: 50%;
        box-shadow: 0 .1rem .18rem rgba(0,107,167,0.4);
        overflow: hidden;
        & a{
            display: inline-block;
        }
        & img{
            width: 100%;
            height: 100%;
            display: inline-block;
        }
    }
    & .user-name{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0.15rem 0.2rem;
        font-size: 0.32rem;
        color: @color_f;
    }
    & .user-login{
        width: 3.2rem;
        height: .9rem;
        line-height: .9rem;
        background: rgba(255,255,255,0.25);
        border-radius: 0.45rem;
        color: @color_f;
        display: inline-block;
        top: 1.48rem;
        & a{
            color: @color_f;
            font-size: .36rem;
        }
    }
}
.user-score{
    width: 100%;
    height: 0.68rem;
    line-height: .68rem;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 0.28rem;
    padding: 0 .2rem;
    & .mine-coin, .mine-level{
        display: inline-block;
        color: @color_f;
        max-width: 45%;
        overflow: hidden;
        -ms-word-break: break-all;
        word-break: break-all;
        & .iconfont{
            font-size: 0.28rem;
            display: inline-block;
            vertical-align: middle;
            margin-right: .1rem;
        }
}
}
.mine-coin{
    left: .2rem;
}
.mine-level{
    right: .2rem;
}
.i-coin,
.i-mall,
.i-order,
.i-record{
    width: 0.88rem;
    height: 0.88rem;
    display: inline-block;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
}
.i-coin{
    background-image: url(../assets/images/my/task@2x.png);
}
.i-mall{
    background-image: url(../assets/images/my/mall@2x.png);
}
.i-order{
    background-image: url(../assets/images/my/order@2x.png);
}
.i-record{
    background-image: url(../assets/images/my/record@2x.png);
}
.mine-tab{
    height: 2rem;
    margin-bottom: .2rem;
    background-color: @color_f;
    & .mine-tabs{
        height: 100%;
        & li{
            height: 100%;
        }
        & .tab-item{
            color: #646f7f;
            width: 100%;
            height: 100%;
            & .tab-title{
                margin: .1rem 0;
                font-size: 0.26rem;
            }
        }
    }
}
.mine-list{
    background-color: @color_f;
}
.mine-list-item{
    position: relative;
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid @bg_bd;
    margin-left: 0.98rem;
    color: @color_l;
    & .iconfont{
        font-size: 0.44rem;
        vertical-align: middle;
    }
    & .icon-list-item{
        margin-left: -0.68rem;
        margin-right: 0.3rem;
    }
}
.mine-list-items:last-child .mine-list-item{
    border-bottom: none;
}
.icon-shoucang1{
    color: #53c4ff;
}
.icon-yaoqing{
    color: #ff938a;
}
.icon-saoma{
    color: #33ddf6;
}
.icon-yijian{
    color: #f0c365;
}
.icon-shezhi{
    color: #45e1c3;
}
.icon-jinru, .iconfont.icon-jinru{
    color: #d4dbe8;
    font-size: 0.36rem;
    position: absolute;
    right: .2rem;
}
.mine-header-box{
    position: relative;
    & .back-icon{
        position: absolute;
        left: 0;
        top: 0.26rem;
    }
}
.mine-cover{
    position: relative;
}
.cover-bg{
    width: 100%;
    height: 3.84rem;
    background-image: url(../assets/images/my/head.png); 
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
}
.user-header{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    & .user-pic{
        width: 1.4rem;
        height: 1.4rem;
        display: inline-block;
        border: 1px solid @color_f;
        border-radius: 50%;
        box-shadow: 0 .1rem .18rem rgba(0,107,167,0.4);
        overflow: hidden;
        & a{
            display: inline-block;
        }
        & img{
            width: 100%;
            height: 100%;
            display: inline-block;
        }
    }
    & .user-name{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0.15rem 0.2rem;
        font-size: 0.32rem;
        color: @color_f;
    }
    & .user-login{
        width: 3.2rem;
        height: .9rem;
        line-height: .9rem;
        background: rgba(255,255,255,0.25);
        border-radius: 0.45rem;
        color: @color_f;
        display: inline-block;
        top: 1.48rem;
        & a{
            color: @color_f;
            font-size: .36rem;
        }
    }
}
.user-score{
    width: 100%;
    height: 0.68rem;
    line-height: .68rem;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 0.28rem;
    padding: 0 .2rem;
    & .mine-coin, .mine-level{
        display: inline-block;
        color: @color_f;
        max-width: 45%;
        overflow: hidden;
        -ms-word-break: break-all;
        word-break: break-all;
        & .iconfont{
            font-size: 0.28rem;
            display: inline-block;
            vertical-align: middle;
            margin-right: .1rem;
        }
    }
}
.mine-coin{
    left: .2rem;
}

.mine-bar{
	background-color: @color_f;
	margin-top: .2rem;
	& .mine-data-head{
		display: block;
		height: 1.6rem;
		line-height: 1.6rem;
		color: @color_l;
		font-size: .3rem;
		padding-left: 0.2rem;
	}
	& .data-list-head{
		height: 0.7rem;
		line-height: .7rem;
		color: @color_m;
		font-size: .26rem;
	}
	& .list-line{
		border-bottom: 1px solid @bg_bd;
		padding: 0 0.2rem;
	}
	& .list-line:last-child{
		border-bottom: none;
	}
	& .data-list-item{
		height: .88rem;
		line-height: .88rem;
		font-size: .3rem;
		color: @color_l;
	}
	& .item-data{
		color: @color_m;
	}
	& .num-mark{
		font-size: .4rem;
		color: #ff8177;
		position: absolute;
		right: 1.56rem;
		width: 1rem;
		overflow: hidden;
	}
	& .tips-m{
		color: @color_m;
		font-size: .22rem;
		margin: 0 0.41rem 0 0.2rem;
	}
}
</style>
