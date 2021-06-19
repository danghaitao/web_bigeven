$(function () {
    // 自定义表单的校验规则
    layui.form.verify({
      // 密码长度的校验规则
      pwd: [/^\S{6,15}$/, '密码长度为6到15个字符，且不能包含空格!'],
      // 新旧密码不能相同
      samePwd: function (val) {
        // 获取旧密码
        const oldPwd = $('[name="old_pwd"]').val().trim()
        if (oldPwd === val) {
          return '新密码不能与原密码一致！'
        }
      },
      // 两次新密码必须一致
      rePwd: function (val) {
        // 获取新密码
        const newPwd = $('[name="new_pwd"]').val().trim()
        if (val !== newPwd) {
          return '两次新密码必须一致！'
        }
      }
    })
  
    // 绑定表单的 submit 提交事件
    $('form').on('submit', function (e) {
      e.preventDefault()
  
      $.ajax({
        type: 'PATCH',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
          layer.msg(res.message)
          $('form')[0].reset()
        }
      })
    })
  })