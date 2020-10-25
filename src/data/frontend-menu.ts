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
    "icon": "ApartmentOutlined",
    "title": "部门管理",
    "key": "/department",
    "child": [
      {
        "icon": "AppstoreAddOutlined",
        "title": "添加部门",
        "key": "/department/add",
        "component": "DepartmentAddView"
      },
      {
        "icon": "UnorderedListOutlined",
        "title": "部门列表",
        "key": "/department/list",
        "component": "DepartmentListView"
      }
    ]
  },
  {
    "icon": "ClusterOutlined",
    "title": "职位管理",
    "key": "/position",
    "child": [
      {
        "icon": "AppstoreAddOutlined",
        "title": "添加职位",
        "key": "/position/add",
        "component": "PositionAddView"
      },
      {
        "icon": "UnorderedListOutlined",
        "title": "职位列表",
        "key": "/position/list",
        "component": "PositionListView"
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