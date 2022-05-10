export default {
  pages: [
    'pages/list/list',
    'pages/post/post',
    'pages/home/home',
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    color: "#000",
    selectedColor: "#00F",
    backgroundColor: "#FFF",
    borderStyle: "black",
    list: [
      {
        pagePath: 'pages/list/list',
        text: "植入单",
        iconPath: "assets/icons/bill-fill.png",
        selectedIconPath: "assets/icons/bill-fill-blue.png",
      },
      {
        pagePath: 'pages/home/home',
        text: "我的",
        iconPath: "assets/icons/home.png",
        selectedIconPath: "assets/icons/home-blue.png",
      },
    ]
  }

}
