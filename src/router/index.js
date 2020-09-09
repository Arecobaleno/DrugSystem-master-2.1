import Vue from 'vue'
import Router from 'vue-router'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.use(Router)

import HomeView from '../views/HomeView.vue'

import NewsView from '../views/NewsView.vue'
import NewsDetailView from '../views/news/NewsDetailView.vue'
import CommentsView from '../views/news/CommentsView.vue'
import CommentView from '../views/news/CommentView.vue'


import SymptomView from '../views/SymptomView.vue'
import SymptomSelectView from '../views/symptom/SymptomSelectView.vue'
import MySymptomView from '../views/symptom/MySymptomView.vue'
import SymptomResultView from '../views/symptom/SymptomResultView.vue'


import AccompanyView from '../views/AccompanyView.vue'
import SelectcityView from '../views/accompany/SelectcityView.vue'
import AppointmentView from '../views/accompany/AppointmentView.vue'
import HospitalView from '../views/accompany/HospitalView.vue'
import PaylView from '../views/accompany/PaylView.vue'

import PatientView from '../views/PatientView.vue'
import AddPatientView from '../views/patient/AddPatientView.vue'
import EditPatientView from '../views/patient/EditPatientView.vue'

import FindView from '../views/FindView.vue'
import ReferenceDetail from '../views/reference/ReferenceDetail.vue'

import FirstaidView from '../views/FirstaidView.vue'
import FirstaidDetailView from '../views/firstaid/FirstaidDetailView.vue'

import AidView from '../views/AidView.vue'
import DrugListView from '../views/aid/DrugListView.vue'
import DrugsView from '../views/aid/DrugsView.vue'
import DrugDetailView from '../views/aid/DrugDetailView.vue'
import DrugChemistry from '../views/drug/DrugChemistry.vue'
import DrugSearch from '../views/drug/DrugSearch.vue'

import MyView from '../views/MyView.vue'
import InvitationView from '../views/my/InvitationView.vue'
import InputcodeView from '../views/my/InputcodeView.vue'
import FeedbackView from '../views/my/FeedbackView.vue'
import UserinfoView from '../views/my/UserinfoView.vue'

import SetView from '../views/SetView.vue'
import AgreementView from '../views/set/AgreementView.vue'


import DrugView from '../views/drug/DrugView.vue'
import DrugItems from '../views/drug/DrugItems.vue'
import DrugDetail from '../views/drug/DrugDetail.vue'
import DiseaseView from '../views/DiseaseView.vue'
import DiseaseSearchView from '../views/disease/DiseaseSearch.vue'
import DiseaseSearchDetailView from '../views/disease/DiseaseDetailView.vue'

import InteractSearchView from '../views/interact/InteractSearchView.vue'
import InteractSearchDetailView from '../views/interact/InteractSearchDetailView'

import GuideView from '../views/guide/GuideView.vue'
import GuideSearch from '../views/guide/GuideSearch.vue'
import GuideDetail from '../views/guide/GuideDetail.vue'
import YearSearch from '../views/guide/YearSearchView.vue'
import MakerSearch from '../views/guide/MakerSearch.vue'
import GuideMakerDetail from '../views/guide/GuideMakerDetail.vue'

import HomeSearch from '../views/HomeSearch.vue'
// const HomeView = resolve => require(['../views/HomeView.vue'], resolve)

const Parent = {
    data() {
        return {
            transitionName: ''
        }
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.name.split('-').length
            const fromDepth = from.name.split('-').length
            if (toDepth != fromDepth) {
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            } else {
                this.transitionName = '';
            }
        }
    },
    template: `
        <div class="child-wraper">
            <transition :name="transitionName">
                    <router-view class="child-view"></router-view>
            </transition>
        </div>
    `
}

export default new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: [{ // 首页
            path: '/home',
            component: Parent,
            children: [{
                path: '',
                name: 'home',
                component: HomeView,
                meta: { requiresAuth: false }
            }]
        },
        { //全局搜索
            path: '/homesearch',
            name: 'homesearch',
            component: HomeSearch,
            meta: { requiresAuth: false }
        },
        { // 症状自诊
            path: '/symptom',
            component: Parent,
            children: [{
                    path: '',
                    name: 'h-symptom',
                    component: SymptomView,
                    meta: { requiresAuth: false }
                }, {
                    path: 'select',
                    name: 'h-symptom-select',
                    alias: '/symptom-select',
                    component: SymptomSelectView,
                    meta: { requiresAuth: false }
                }, {
                    path: 'my-symptom',
                    name: 'h-symptom-select-my',
                    alias: '/my-symptom',
                    component: MySymptomView,
                    meta: { requiresAuth: false }
                }, {
                    path: 'symptom-result',
                    name: 'h-symptom-select-my-result',
                    alias: '/symptom-result',
                    component: SymptomResultView,
                    meta: { requiresAuth: false }
                },
            ]
        },
        { // 陪诊
            path: '/accompany',
            component: Parent,
            children: [{
                path: '',
                name: 'h-accompany',
                component: AccompanyView,
                meta: { requiresAuth: false }
            }, {
                path: 'selectcity',
                alias: '/selectcity',
                name: 'h-accompany-selectcity',
                component: SelectcityView,
                meta: { requiresAuth: false }
            }, {
                path: 'appointment',
                alias: '/appointment',
                name: 'h-accompany-selectcity-appointment',
                component: AppointmentView,
                meta: { requiresAuth: false }
            }, {
                path: 'hospital',
                alias: '/hospital',
                name: 'h-accompany-selectcity-appointment-hospital',
                component: HospitalView,
                meta: { requiresAuth: false }
            }, {
                path: 'pay',
                alias: '/pay',
                name: 'h-accompany-selectcity-appointment-pay',
                component: PaylView,
                meta: { requiresAuth: false }
            }]
        },
        { // 就诊档案
            path: '/patient',
            component: Parent,
            children: [{
                path: '',
                name: 'h-accompany-selectcity-appointment-patient',
                component: PatientView,
                meta: { requiresAuth: false }
            }, {
                path: 'add',
                alias: '/patient-add',
                name: 'h-accompany-selectcity-appointment-patient-add',
                component: AddPatientView,
                meta: { requiresAuth: false }
            }, {
                path: 'edit/:id',
                name: 'h-accompany-selectcity-appointment-patient-edit',
                component: EditPatientView,
                meta: { requiresAuth: false }
            }]
        },
        { // 资讯
            path: '/news',
            component: Parent,
            children: [{
                path: '',
                name: 'news',
                component: NewsView,
                meta: { requiresAuth: false }
            }, {
                path: 'detail/:id',
                name: 'news-detail',
                component: NewsDetailView,
                meta: { requiresAuth: false }
            }, {
                path: 'comments',
                alias: '/comments',
                name: 'news-detail-comments',
                component: CommentsView,
                meta: { requiresAuth: false }
            }, {
                path: 'comment',
                alias: '/comment',
                name: 'news-detail-comments-comment',
                component: CommentView,
                meta: { requiresAuth: false }
            }]
        },
        { // 指南
            path: '/goods',
            component: Parent,
            children: [{
                    path: '',
                    name: 'GuideView',
                    component: GuideView,
                    meta: { requiresAuth: false }
                },
                {
                    path: 'search',
                    name: 'GuideSearch',
                    component: GuideSearch,
                    meta: { requiresAuth: false }
                },
                {
                    path: 'detail',
                    name: 'GuideDetail',
                    component: GuideDetail,
                    meta: { requiresAuth: false }
                },
                {
                    path: 'yearsearch',
                    name: 'YearSearch',
                    component: YearSearch,
                    meta: { requiresAuth: false }
                },
                {
                    path: 'makersearch',
                    name: 'MakerSearch',
                    component: MakerSearch,
                    meta: { requiresAuth: false }
                },
                {
                    path: 'makerdetail',
                    name: 'MakerDetail',
                    component: GuideMakerDetail,
                    meta: { requiresAuth: false }
                }
            ]
        },
        { // 发现
            path: '/find',
            component: Parent,
            children: [{
                    path: '',
                    name: 'find',
                    component: FindView,
                    meta: { requiresAuth: false }
                },
            ]
        },
        {
            path: '/referencedetail',
            name: 'reference-detail',
            component: ReferenceDetail,
            meta: { requiresAuth: false }
        },
        { // 急救常识
            path: '/firstaid',
            component: Parent,
            children: [{
                path: '',
                name: 'find-firstaid',
                component: FirstaidView,
                meta: { requiresAuth: false }
            }, {
                path: 'detail/:id',
                name: 'find-firstaid-detail',
                component: FirstaidDetailView,
                meta: { requiresAuth: false }
            }]
        },
        { // 用药助手
            path: '/aid',
            component: Parent,
            children: [{
                path: '',
                name: 'find-aid',
                component: AidView,
                meta: { requiresAuth: false }
            }, {
                path: 'list',
                alias: '/drug-list',
                name: 'find-aid-list',
                component: DrugListView,
                meta: { requiresAuth: false }
            }, {
                path: 'drugs',
                alias: '/drugs',
                name: 'find-aid-list-drugs',
                component: DrugsView,
                meta: { requiresAuth: false }
            }, {
                path: 'drug/:id',
                alias: '/drug/:id',
                name: 'find-aid-list-drugs-drug',
                component: DrugDetailView,
                meta: { requiresAuth: false }
            }]
        },
        { // 我的
            path: '/my',
            component: Parent,
            children: [{
                path: '',
                name: 'my',
                component: MyView,
                meta: { requiresAuth: false }
            }, {
                path: 'invitation',
                name: 'my-invitation',
                alias: '/invite',
                component: InvitationView,
                meta: { requiresAuth: false }
            }, {
                path: 'inputcode',
                name: 'my-inputcode',
                alias: '/inputcode',
                component: InputcodeView,
                meta: { requiresAuth: false }
            }, {
                path: 'feedback',
                name: 'my-feedback',
                alias: '/feedback',
                component: FeedbackView,
                meta: { requiresAuth: false }
            }, {
                path: 'userinfo',
                name: 'my-userinfo',
                alias: '/userinfo',
                component: UserinfoView,
                meta: { requiresAuth: false }
            }]
        },
        { // 设置
            path: '/set',
            component: Parent,
            children: [{
                path: '',
                name: 'my-set',
                component: SetView,
                meta: { requiresAuth: false }
            }, {
                path: 'agreement',
                name: 'my-set-agreement',
                alias: '/agreement',
                component: AgreementView,
                meta: { requiresAuth: false }
            }]
        },
        //药品功能
        { path: '/', redirect: '/home' },
        {
            path: '/yaopin',
            name: 'drug-view',
            component: DrugView,
            meta: { requiresAuth: false }
        },
        {
            path: '/drugchemistry',
            name: 'drug-chemistry',
            component: DrugChemistry,
            meta: { requiresAuth: false }
        },
        {
            path: '/drugitems',
            name: 'drug-items',
            component: DrugItems,
            meta: { requiresAuth: false }
        },
        {
            path: '/drugdetail',
            name: 'drug-detail',
            component: DrugDetail,
            meta: { requiresAuth: false }
        },
        {
            path: '/drugsearch',
            name: 'drug-search',
            component: DrugSearch,
            meta: { requiresAuth: false }
        },
        { // 疾病
            path: '/disease',
            component: Parent,
            children: [{
                path: '',
                name: 'disease',
                component: DiseaseView,
                meta: { requiresAuth: false }
            }, {
                path: 'diseaseSearch',
                name: 'disease-search',
                alias: '/diseaseSearch',
                component: DiseaseSearchView,
                meta: { requiresAuth: false }
            }, {
                path: 'diseaseDetail/:diseaseName',
                name: 'disease-detail',
                alias: '/diseaseDetail/:diseaseName',
                component: DiseaseSearchDetailView,
                meta: { requiresAuth: false }
            }]
        },
        { //相互作用
            path: '/interaction',
            component: Parent,
            children: [{
                    path: '',
                    name: 'interact-view',
                    component: InteractSearchView,
                    meta: { requiresAuth: false }
                },
                {
                    path: '/interactDetail/',
                    name: 'interact-view-search-detail',
                    component: InteractSearchDetailView,
                    meta: { requiresAuth: false }
                }
            ],
        }

    ]
})