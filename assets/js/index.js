$(function () {
    getUserInfo()
  
    $('.btn-logout').on('click', function () {
      // 询问用户，是否确认退出
      layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 清空 localStorage 中的数据
        localStorage.clear()
        // 跳转到登录页面
        location.href = 'login.html'
        layer.close(index)
      })
    })
  })
  
  // 获取用户的基本信息
  function getUserInfo() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        // 获取用户的基本信息成功！
        // TODO：渲染用户的基本信息
        renderUserInfo(res)
      }
    })
  }
  
  // 渲染用户的基本信息
  function renderUserInfo(res) {
    res.data.textAvatar = (res.data.nickname || res.data.username)[0].toUpperCase()
    const htmlStrTop = template('tmpl-avatar-top', res)
    $('.header-avatar-box').html(htmlStrTop)
    const htmlStrSide = template('tmpl-avatar-side', res)
    $('.side-avatar-box').html(htmlStrSide)
    layui.element.init('nav')
  }
  
  // 激活文章列表的左侧菜单
  function activeArtList() {
    $('.layui-this').removeClass('layui-this')
    $('#art_list').addClass('layui-this')
  }