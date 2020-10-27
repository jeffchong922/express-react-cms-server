export default Object.freeze([
  {
    "icon": "DashboardOutlined",
    "title": "控制台",
    "key": "/dashboard",
    "component": "DashboardView"
  },
  {
    "icon": "UserOutlined",
    "title": "用户管理",
    "key": "/user",
    "child": [
      {
        "icon": "UserAddOutlined",
        "title": "添加用户",
        "key": "/user/add",
        "component": "UserAddView"
      },
      {
        "icon": "UnorderedListOutlined",
        "title": "用户列表",
        "key": "/user/list",
        "component": "UserListView"
      }
    ]
  },
  {
    "icon": "CoffeeOutlined",
    "title": "请假",
    "key": "/take-off",
    "component": "TakeOffView"
  },
  {
    "icon": "CompressOutlined",
    "title": "加班",
    "key": "/overtime",
    "component": "OvertimeView"
  }
])