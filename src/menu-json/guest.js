const guest = [{
    name: '首页',
    path: '/overview',
    icon: 'fa-circle-o-notch'
  },
  {
    name: '项目前期',
    icon: 'fa-navicon',
    expand: false,
    children: [{
        name: '项目填报',
        path: '/projectprepare/add',
        icon: 'fa-pencil'
      },
      {
        name: '项目概览',
        path: '/projectprepare/projectoverview',
        icon: 'fa-building'
      },
      {
        name: '前期工作',
        path: '/projectprepare/preparetask',
        icon: 'fa-newspaper-o'
      }
    ]
  },
  {
    name: '招标管理',
    path: '/tenders',
    icon: 'fa-paste'
  },
  {
    name: '合同备案',
    path: '/contracts',
    icon: 'fa-file-text-o'
  },
  {
    name: '项目月报',
    icon: 'fa-table',
    expand: false,
    children: [{
        name: '月报填写',
        path: '/monthpaper/add',
        icon: 'fa-edit'
      },
      {
        name: '月报管理',
        path: '/monthpaper/management',
        icon: 'fa-list'
      }
    ]
  },
  {
    name: '投融资',
    path: '/investmentfinancing',
    icon: 'fa-line-chart'
  }
]

export default guest
