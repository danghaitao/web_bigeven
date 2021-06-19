$(function () {
    layui.form.verify({
      nickname: [/^\S{1,10}$/, '昵称的长度为1-10个字符!']
    })
  
    // 封装获取用户基本信息的方法
    function initUserInfo() {
      $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
          layui.form.val('user-form', res.data)
        }
      })
    }
  
    initUserInfo()
  
    $('form [type="reset"]').on('click', function (e) {
      e.preventDefault()
      initUserInfo()
    })
  
    $('form').on('submit', function (e) {
      e.preventDefault()
      $.ajax({
        type: 'PUT',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
          layer.msg(res.message)
          window.parent.getUserInfo()
        }
      })
    })
  })