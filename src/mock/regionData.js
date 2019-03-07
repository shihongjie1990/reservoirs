const regionData = [{
    name: '贵阳水务局',
    regionId: 1,
    value: 9999,
    totalInvestment: 9999,
    investmentSofar: 8965,
    availableInvestmentSofar: 7460,
    children: [{
        name: '贵阳市',
        regionId: 11,
        value: 4454,
        totalInvestment: 4454,
        investmentSofar: 4100,
        availableInvestmentSofar: 3105,
        children: [{
            name: '南明区',
            value: 1643,
            totalInvestment: 1643,
            investmentSofar: 1430,
            availableInvestmentSofar: 956,
            regionId: 111
          },
          {
            name: '金阳区',
            value: 2340,
            regionId: 111,
            totalInvestment: 2340,
            investmentSofar: 1980,
            availableInvestmentSofar: 1536
          },
          {
            name: '花溪区',
            value: 468,
            totalInvestment: 468,
            investmentSofar: 458,
            availableInvestmentSofar: 416
          }
        ]
      },
      {
        name: '清镇市',
        regionId: 12,
        value: 5310,
        totalInvestment: 5310,
        investmentSofar: 5120,
        availableInvestmentSofar: 4865,
        children: [{
            name: '清镇1街',
            regionId: 121,
            value: 3648,
            totalInvestment: 3648,
            investmentSofar: 3620,
            availableInvestmentSofar: 2650
          },
          {
            name: '清镇二街',
            value: 1842,
            totalInvestment: 1842,
            investmentSofar: 1230,
            availableInvestmentSofar: 950,
            regionId: 122
          }
        ]
      },
      {
        name: '开阳市',
        regionId: 13,
        value: 1235,
        totalInvestment: 1235,
        investmentSofar: 964,
        availableInvestmentSofar: 640,
        children: [{
            name: '开阳大街1号',
            value: 368,
            regionId: 131,
            totalInvestment: 368,
            investmentSofar: 320,
            availableInvestmentSofar: 260
          },
          {
            name: '开阳大街2号',
            value: 867,
            regionId: 132,
            totalInvestment: 867,
            investmentSofar: 765,
            availableInvestmentSofar: 436
          }
        ]
      }
    ]
  },
  {
    name: '遵义水务局',
    value: 8888,
    totalInvestment: 8888,
    investmentSofar: 7462,
    availableInvestmentSofar: 3950,
    regionId: 2,
    children: [{
        name: '遵义市',
        value: 6541,
        regionId: 21,
        totalInvestment: 6541,
        investmentSofar: 6350,
        availableInvestmentSofar: 5730,
        children: [{
            name: '遵义路',
            value: 3256,
            regionId: 211,
            totalInvestment: 3256,
            investmentSofar: 2840,
            availableInvestmentSofar: 2640
          },
          {
            name: '实习路',
            value: 3285,
            regionId: 212,
            totalInvestment: 3285,
            investmentSofar: 2940,
            availableInvestmentSofar: 2658
          }
        ]
      },
      {
        name: '桐梓',
        value: 2437,
        regionId: 22,
        totalInvestment: 2437,
        investmentSofar: 2160,
        availableInvestmentSofar: 1680,
        children: [{
            name: '桐梓店铺1',
            value: 1335,
            regionId: 221,
            totalInvestment: 1335,
            investmentSofar: 1156,
            availableInvestmentSofar: 850
          },
          {
            name: '筒子店铺2',
            vlaue: 1102,
            regionId: 222,
            totalInvestment: 1102,
            investmentSofar: 960,
            availableInvestmentSofar: 765
          }
        ]
      }
    ]
  },
  {
    name: '铜仁水务局',
    value: 7777,
    regionId: 3,
    totalInvestment: 7777,
    investmentSofar: 6830,
    availableInvestmentSofar: 4620,
    children: [{
        name: '铜仁市',
        value: 2658,
        regionId: 31,
        totalInvestment: 2658,
        investmentSofar: 2360,
        availableInvestmentSofar: 2160,
        children: [{
            name: '铜仁门户1',
            value: 1111,
            regionId: 311,
            totalInvestment: 1111,
            investmentSofar: 860,
            availableInvestmentSofar: 580
          },
          {
            name: '铜仁门户2',
            value: 1547,
            regionId: 312,
            totalInvestment: 1547,
            investmentSofar: 1260,
            availableInvestmentSofar: 870
          }
        ]
      },
      {
        name: '石阡',
        value: 1456,
        regionId: 32,
        totalInvestment: 1456,
        investmentSofar: 1250,
        availableInvestmentSofar: 630,
        children: [{
            name: '石阡府衙',
            value: 658,
            regionId: 321,
            totalInvestment: 658,
            investmentSofar: 590,
            availableInvestmentSofar: 470
          },
          {
            name: '石阡学堂',
            value: 798,
            totalInvestment: 798,
            investmentSofar: 730,
            availableInvestmentSofar: 420
          }
        ]
      },
      {
        name: '思南',
        value: 2475,
        regionId: 33,
        totalInvestment: 2475,
        investmentSofar: 2160,
        availableInvestmentSofar: 1980,
        children: [{
            name: '府后街',
            value: 1113,
            regionId: 331,
            totalInvestment: 1113,
            investmentSofar: 1070,
            availableInvestmentSofar: 860
          },
          {
            name: '思南中学',
            value: 1362,
            regionId: 332,
            totalInvestment: 1362,
            investmentSofar: 1130,
            availableInvestmentSofar: 590
          }
        ]
      },
      {
        name: '印江',
        value: 1188,
        regionId: 34,
        totalInvestment: 1188,
        investmentSofar: 940,
        availableInvestmentSofar: 470,
        children: [{
            name: '梵净山',
            value: 238,
            regionId: 341,
            totalInvestment: 238,
            investmentSofar: 206,
            availableInvestmentSofar: 135
          },
          {
            name: '印江一绝',
            value: 950,
            regionId: 342,
            totalInvestment: 950,
            investmentSofar: 860,
            availableInvestmentSofar: 740
          }
        ]
      }
    ]
  }
]

export default regionData
