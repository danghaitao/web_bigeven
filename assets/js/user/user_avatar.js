$(function () {
    // 1. 获取裁剪区域
    const $image = $('#image')
  
    // 2. 定义配置对象
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview',
      // 视图模式
      viewMode: 2
    }
  
    $image.cropper(options)
  
    // 为选择图片的按钮绑定点击事件处理函数
    $('#btnChooseImg').on('click', function () {
      // 模拟文件选择框的点击事件
      $('#file').click()
    })
  
    // 为文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
      const files = e.target.files
      if (files.length === 0) return
  
      // 基于给定的文件创建 URL 地址
      const imgURL = URL.createObjectURL(files[0])
      $image.cropper('destroy').attr('src', imgURL).cropper(options)
    })
  
    // 为上传头像的按钮绑定点击事件处理函数
    $('#updateAvatar').on('click', function () {
      var dataURL = $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      $.ajax({
        type: 'PATCH',
        url: '/my/update/avatar',
        data: {
          avatar: dataURL
        },
        success: function (res) {
          layer.msg(res.message)
          window.parent.getUserInfo()
        }
      })
    })
  })