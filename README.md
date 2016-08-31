# GustScroll
A full browser compatible custom scroll bar solution

<h3>前置条件: </h3>
<h5>&nbsp;&nbsp;依赖的JS库: </h5>
      // 引入jQuery 
      <script src="jquery.1.11.3.min.js"></script>
      // 引入jQuery.mousewheel
      <script src="jquery.mousewheel.min.js"></script>;
      // 引入GustScroll 
      <script src="GustScroll.js"></script>;
<h5>&nbsp;&nbsp;依赖的样式表: </h5>
      // 引入GustScroll 
      <link rel="stylesheet" href="gust-scroll.css" />
<h3>API: </h3>
<h5>&nbsp;&nbsp;enable: </h5>
      // 启动自定义滚动条
      GustScroll.enable($('.test-container'));
<h5>&nbsp;&nbsp;disable: </h5>
      // 取消自定义滚动条
      GustScroll.disable($('.test-container'));
<h5>&nbsp;&nbsp;update: </h5>
      // 更新自定义滚动条
      GustScroll.update($('.test-container'));
<h5>&nbsp;&nbsp;scrollTo: </h5>
      // 滚动滚动条到指定位置
      GustScroll.scrollTo($('.test-container'), -50, true);
<h5>&nbsp;&nbsp;scrollToTop: </h5>
      // 滚动滚动条到顶部
      GustScroll.scrollToTop($('.test-container'), true);
<h5>&nbsp;&nbsp;scrollToBottom: </h5>
      // 滚动滚动条到底部
      GustScroll.scrollToBottom($('.test-container'), true);
