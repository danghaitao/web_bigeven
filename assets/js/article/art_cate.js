$(function () {
    layui.form.verify({
      cateName: [/^\S{1,10}$/, '分类名称必须是1-10位的字符串！'],
      cateAlias: [/^[a-zA-Z0-9]{1,15}$/, '分类名称必须是1-15位的字母或数字组合！']
    })
  
    let addBoxIndex = null
    let editBoxIndex = null
    // 封装获取文章类别的方法
    function getArtCate() {
      $.get('/my/cate/list', function (res) {
        // TODO：编译模板结构
        const htmlStr = template('tmpl-tr', res)
        $('tbody').html(htmlStr)
      })
    }
  
    getArtCate()
  
    // 点击了添加类别的按钮
    $('#btnAdd').on('click', function () {
      addBoxIndex = layer.open({
        type: 1,
        title: '添加文章分类',
        area: ['500px', '250px'],
        content: $('#tmpl-add').html()
      })
    })
  
    // 监听添加表单的 submit 事件
    $('body').on('submit', '#form-add', function (e) {
      e.preventDefault()
  
      // 发起请求
      $.post('/my/cate/add', $(this).serialize(), function (res) {
        // 添加成功
        // 1. 刷新列表数据
        getArtCate()
        // 2. 关闭弹出层
        layer.close(addBoxIndex)
        // 3. 提示用户
        layer.msg(res.message)
      })
    })
  
    // 点击了编辑按钮
    $('body').on('click', '.btn-edit', function (e) {
      // 1. 展示弹出层
      editBoxIndex = layer.open({
        type: 1,
        title: '修改文章分类',
        area: ['500px', '250px'],
        content: $('#tmpl-edit').html()
      })
  
      // 获取当前分类的 Id
      const id = $(this).attr('data-id')
  
      // 2. 根据 Id 获取弹出层的数据
      $.get('/my/cate/info', { id }, function (res) {
        // 数据请求成功，回显数据
        layui.form.val('form-edit', res.data)
      })
    })
  
    // 通过代理为元素绑定事件
    $('body').on('submit', '[lay-filter="form-edit"]', function (e) {
      // 阻止默认提交行为
      e.preventDefault()
  
      // 发起 Ajax 请求
      $.ajax({
        type: 'PUT',
        url: '/my/cate/info',
        data: $(this).serialize(),
        success: function () {
          layer.close(editBoxIndex)
          getArtCate()
          layer.msg('修改分类成功！')
        }
      })
    })
  
    // 为删除按钮绑定点击事件处理函数
    $('body').on('click', '.btn-delete', function () {
      const id = $(this).attr('data-id')
      // 询问用户是否删除
      layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function (index) {
        // 执行删除的流程
        $.ajax({
          type: 'DELETE',
          url: '/my/cate/del?id=' + id,
          success: function () {
            layer.msg('删除成功！')
            getArtCate()
          }
        })
  
        layer.close(index)
      })
    })
  })