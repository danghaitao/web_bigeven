$(function(){
// 自定义校验规则
var form = layui.form
var layer = layui.layer
form.verify({
    // 自定义的校验规则（验证两个密码框的值是否相等：如果相等则校验通过；否则校验失败！）
    repwd:function(val){
        const pwd = $('.reg-box [name="password"]').val().trim()
        if (pwd !== val) {
            // 两个密码框的值不一致
            return '输入的两次密码不一致！'
          }
          // 如果校验通过，不需要做任何处理
        },
        // 校验密码长度的验证规则
        pwd: [/^[\S]{6,15}$/, '密码的长度为6-15个字符，且不能包含空格！'],
        username: [/^[a-zA-Z0-9]{1,10}$/, '用户名为字母或数字的组合，且长度小于10！']
    
    })
})
// 点击去注册的链接
$("#link-reg").on('click',function(){
    // 展示注册盒子
    $(".reg-box").show()
    // 隐藏登录盒子
    $(".login-box").hide()
})
// 点击去登录链接
$("#link-login").on('click',function(){
   // 隐藏注册盒子  
    $(".reg-box").hide()
    // 展示登录盒子
    $(".login-box").show()
})
 // 为注册的表单绑定 submit 事件
 $("#form_reg").on('submit',function(e){
    e.preventDefault()
    var data = {
        username:$("#form_reg [name=username]").val(),
        password:$("#form_reg [name=password]").val()
    }
    $.post('/api/reguser',data,function(res){
        if(res.status !== 0){
            return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录')
        $("#link-login").click()
    })
     // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
 })