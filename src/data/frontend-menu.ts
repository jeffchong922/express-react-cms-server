export default Object.freeze([
  {
    "icon": "DashboardOutlined",
    "title": "控制台",
    "key": "/dashboard"
  },
  {
    "icon": "UserOutlined",
    "title": "用户管理",
    "key": "/user",
    "child": [
      {
        "icon": "UserAddOutlined",
        "title": "添加用户",
        "key": "/user/add"
      },
      {
        "icon": "UnorderedListOutlined",
        "title": "用户列表",
        "key": "/user/list"
      }
    ]
  },
  {
    "icon": "ApartmentOutlined",
    "title": "部门管理",
    "key": "/department",
    "child": [
      {
        "icon": "AppstoreAddOutlined",
        "title": "添加部门",
        "key": "/department/add"
      },
      {
        "icon": "UnorderedListOutlined",
        "title": "部门列表",
        "key": "/department/list"
      }
    ]
  },
  {
    "icon": "CoffeeOutlined",
    "title": "请假",
    "key": "/take-off"
  },
  {
    "icon": "CompressOutlined",
    "title": "加班",
    "key": "/overtime"
  }
])