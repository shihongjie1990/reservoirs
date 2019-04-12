import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import home from '@/Home'
// import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/test'
import empty from '@/components/empty'
import MainContent from '@/MainContent'
// 登陆
import login from '@/Login'
import binduser from '@/bind_user'
// 项目管理部
import publishnotice from '@/components/engineerDepartment/notice/publish_notice'
import notice from '@/components/engineerDepartment/notice/notice'
import noticemanager from '@/components/engineerDepartment/notice/notice_manager'
import reservoirlist from '@/components/engineerDepartment/reservoir/reservoir_list'
import reservoirdetail from '@/components/engineerDepartment/reservoir/reservoir_detail'
import detail from '@/components/engineerDepartment/reservoir/reservoirItem/detail'
import waterrain from '@/components/engineerDepartment/reservoir/reservoirItem/water_rain'
import monthpaper from '@/components/engineerDepartment/reservoir/reservoirItem/month_paper'
import reservoirmodify from '@/components/engineerDepartment/reservoir/operation/reservoir_modify'
import invitation from '@/components/engineerDepartment/tenderMsg/invitation'
import tenders from '@/components/engineerDepartment/tenderMsg/tenders'
// 业主方
import overview from '@/components/owner/overview'
import ownernotice from '@/components/owner/notice'
// import projectoverview from '@/components/owner/projectPrepare/project_overview'
import projectprepareAdd from '@/components/owner/projectPrepare/projectOverview/add_project'
import tenderadd from '@/components/owner/projectPrepare/invitationOfTender/add'
import tender from '@/components/owner/projectPrepare/invitationOfTender/tender'
import contractFiling from '@/components/owner/projectPrepare/invitationOfTender/contract_filing'
import paperadd from '@/components/owner/monthPaper/add'
import papermanagement from '@/components/owner/monthPaper/management'
import usermanagement from '@/components/engineerDepartment/user/management'
import projectoverview from '@/components/owner/projectPrepare/projectOverview/project_overview'
import statistics from '@/components/engineerDepartment/statistics/index'
import preparetask from '@/components/owner/projectPrepare/prepareTask/prapare_task'
import investmentfinancing from '@/components/owner/investmentFinancing/management'
import imageManagement from '@/components/owner/projectPrepare/imageManagement/imageManager'
import projectprocess from '@/components/owner/projectPrepare/projectProcess/management'
import waterrainfall from '@/components/owner/monitoring/waterRain'
import video from '@/components/owner/monitoring/video'
// 备用
import projectinfo from '@/components/owner/projectPrepare/projectOverview/project_info'
import projectattachment from '@/components/owner/projectPrepare/projectOverview/project_attachment'
import managementindex from '@/components/owner/monthPaper/management/management_index'
import paperinfo from '@/components/owner/monthPaper/management/detail'
import addcontract from '@/components/owner/projectPrepare/invitationOfTender/contract/add'
// import selecttree from '@/components/widget/SelectTree'
import userlimit from '@/components/engineerDepartment/user/user_limit'
import testChart from '@/components/engineerDepartment/statistics/test'
// import attachmentfiles from '@/components/owner/projectPrepare/prepareTask/attachmentFiles'

import indexTest from '@/components/owner/index_test'
import calendar from '@/components/widget/calendar'

Vue.use(Router)

/**
 *  页面路由规则：如果只有一级，则在路由的子节点加上'--'符号
 */
const currentRouter = new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/binduser',
      name: 'binduser',
      component: binduser
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/',
      name: '（空）',
      component: empty
    },
    {
      path: '/notice',
      name: '公告',
      component: MainContent,
      children: [{
          path: '/test',
          component: Test,
          name: 'test'
        },
        {
          path: '/notice/publishnotice',
          component: publishnotice,
          name: '发布公告'
        },
        {
          path: '/notice/overview',
          component: notice,
          name: '公告详情'
        },
        {
          path: '/notice/management',
          component: noticemanager,
          name: '公告管理'
        }
      ]
    },
    {
      path: '/tenderMsg',
      name: '招投标信息',
      component: MainContent,
      children: [{
          path: '/tenderMsg/invitation',
          component: invitation,
          name: '招标信息'
        },
        {
          path: '/tenderMsg/tenders',
          component: tenders,
          name: '中标信息'
        }
      ]
    },
    {
      path: '/reservoirs',
      name: '水库字典',
      component: MainContent,
      children: [{
          path: '/',
          component: reservoirlist,
          name: '水库字典--父节点'
        },
        {
          path: '/reservoirs/modify',
          component: reservoirmodify,
          name: '修改水库信息'
        },
        {
          path: '/reservoirs/detail',
          component: reservoirdetail,
          name: '水库详情'
        },
        { // 测试块
          path: '/detail',
          component: detail,
          name: 'detail'
        },
        { // 测试块
          path: '/waterrain',
          component: waterrain,
          name: 'waterrain'
        },
        { // 测试块
          path: '/monthpaper',
          component: monthpaper,
          name: 'monthpaper'
        }
      ]
    },
    {
      path: '/statistics',
      name: '统计分析',
      component: MainContent,
      children: [{
        path: '/',
        component: statistics,
        name: '统计分析--父节点'
      }]
    },
    {
      path: '/users',
      name: '用户管理',
      component: MainContent,
      children: [{
        path: '/',
        component: usermanagement,
        name: '用户管理--父节点'
      }]
    },
    {
      path: '/',
      name: '首页',
      component: MainContent,
      children: [{
        path: '/overview',
        name: '首页--父节点',
        component: overview
      }]
    },
    // --------------------------------------------- 测试
    {
      path: '/',
      name: '测试首页',
      component: MainContent,
      children: [{
        path: '/indexTest',
        name: '首页--父节点',
        component: indexTest
      }]
    },
    {
      path: '/calendar',
      name: '日历',
      component: calendar
    },
    // ------------------------------------------------- 测试
    {
      path: '/',
      name: '公告展示--父节点',
      component: MainContent,
      children: [{
        path: '/noticedetail',
        name: '公告展示',
        component: ownernotice
      }]
    },
    {
      path: '/projectprepare',
      name: '项目资料',
      component: MainContent,
      children: [{
          path: '/projectprepare/projectoverview',
          name: '项目概览',
          // component: projectoverview
          component: projectoverview
        },
        {
          path: '/projectprepare/add',
          name: '项目填报',
          component: projectprepareAdd
        },
        {
          path: '/projectprepare/preparetask',
          name: '前期工作',
          component: preparetask
        },
        {
          path: '/projectprepare/projectprocess',
          name: '形象进度',
          component: projectprocess
        },
        {
          path: '/projectprepare/imageManagement',
          name: '水库图片',
          component: imageManagement
        },
        { // 测试块
          path: '/projectprepare/projectinfo',
          name: 'projectinfo',
          component: projectinfo
        },
        { // 测试块
          path: '/projectprepare/projectattachment',
          name: 'projectattachment',
          component: projectattachment
        },
        {
          path: '/tenders',
          name: '招标管理',
          component: tender
        },
        {
          path: '/contracts',
          name: '合同备案',
          component: contractFiling
        }
      ]
    },
    {
      path: '/tenders',
      name: '招标管理',
      component: MainContent,
      children: [{
        path: '/tenders/add',
        name: '新增标书',
        component: tenderadd
      }]
    },
    {
      path: '/tenders',
      name: '合同备案',
      component: MainContent,
      children: [{
        path: '/contracts/add',
        name: '新增合同',
        component: addcontract
      }]
    },
    {
      path: '/monthpaper',
      name: '项目月报',
      component: MainContent,
      children: [{
          path: '/monthpaper/add',
          name: '月报填写',
          component: paperadd
        },
        {
          path: '/monthpaper/management',
          name: '月报管理',
          component: papermanagement
        },
        {
          path: '/monthpaper/management/detail',
          name: '月报详情',
          component: managementindex
        },
        { // 测试块
          path: '/monthpaper/management/detailinfo',
          name: 'paperinfo',
          component: paperinfo
        }
      ]
    },
    {
      path: '/applyfund',
      name: '资金申请',
      component: MainContent,
      children: [{
        path: '/investmentfinancing',
        name: '投融资',
        component: investmentfinancing
      }]
    },
    {
      path: '/monitoring',
      name: '实时监测',
      component: MainContent,
      children: [{
          path: '/monitoring/waterrain',
          name: '水雨情',
          component: waterrainfall
        },
        {
          path: '/monitoring/video',
          name: '视频监控',
          component: video
        }
      ]
    },
    // 测试组件
    {
      path: '/userlimit',
      name: 'userlimit',
      component: userlimit
    },
    {
      path: '/testChart',
      name: testChart,
      component: testChart
    }
  ]
})

// 全局路由守卫
currentRouter.beforeEach((to, from, next) => {
  let nodes = to.matched
  let menuNode = []
  if (nodes && nodes.length > 0) {
    nodes.map(item => {
      if (typeof (item.name) === 'string' && item.name.indexOf('--') < 0) {
        let node = {
          name: item.name,
          path: item.path
        }
        menuNode.push(node)
      }
    })
  }
  store.dispatch('setMenuNodes', menuNode)
  next()
})

export default currentRouter
