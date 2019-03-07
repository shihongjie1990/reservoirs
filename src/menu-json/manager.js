const manager = [{
    name: '首页',
    path: '/home',
    icon: 'fa-circle-o-notch'
  },
  {
    name: '公告',
    icon: 'fa-bookmark',
    expand: false,
    children: [{
        name: '发布公告',
        path: '/notice/publishnotice',
        icon: 'fa-edit'
      },
      {
        name: '公告管理',
        path: '/notice/management',
        icon: 'fa-navicon'
      }
    ]
  },
  {
    name: '招投标信息',
    icon: 'fa-newspaper-o',
    expand: false,
    children: [{
        name: '招标信息',
        path: '/tenderMsg/invitation',
        icon: 'fa-files-o'
      },
      {
        name: '中标信息',
        path: '/tenderMsg/tenders',
        icon: 'fa-paste'
      }
    ]
  },
  {
    name: '水库字典',
    path: '/reservoirs',
    icon: 'fa-book'
  },
  {
    name: '统计分析',
    path: '/statistics',
    icon: 'fa-pie-chart'
  },
  {
    name: '用户管理',
    path: '/users',
    icon: 'fa-users'
  }
]

export default manager
