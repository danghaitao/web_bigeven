$(function(){
    var layer = layui.layer
    getUserInfo()
    
})
// 定义获取用户信息的函数
function getUserInfo(){
    $ajax({
        method: 'GET',
        URL: '/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                return layer.msg('获取用户信息失败')
            }
        }
    })
}