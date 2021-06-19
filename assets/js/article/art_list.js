$(function () {
    // 查询文章列表数据的参数对象
    let q = {
      pagenum: 1, // 页码值
      pagesize: 2, // 每页显示几条数据
      cate_id: '', // 分类 id
      state: '' // 发布状态
    }
  
    // 定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
      const dt = new Date(dtStr)
  
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1).toString().padStart(2, '0')
      const d = dt.getDate().toString().padStart(2, '0')
  
      const hh = dt.getHours().toString().padStart(2, '0')
      const mm = dt.getHours().toString().padStart(2, '0')
      const ss = dt.getSeconds().toString().padStart(2, '0')
  
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
  
    // 获取文章列表数据的方法
    function getArtList() {
      $.get('/my/article/list', q, function (res) {
        // 调用模板引擎，渲染列表数据
        const htmlStr = template('tmpl-tr', res)
        $('tbody').html(htmlStr)
        renderPage(res.total)
      })
    }
  
    // 获取文章分类的方法
    function getArtCate() {
      $.get('/my/cate/list', function (res) {
        const htmlStr = template('tmpl-cate', res)
        $('[name="cate_id"]').html(htmlStr)
  
        layui.form.render('select')
      })
    }
  
    getArtList()
    getArtCate()
  
    // 监听表单的 submit 提交事件
    $('.form-screen').on('submit', function (e) {
      // 阻止默认行为
      e.preventDefault()
  
      // 准备请求的参数
      q.pagenum = 1
      q.cate_id = $('[name="cate_id"]').val()
      q.state = $('[name="state"]').val()
  
      // 发起请求
      getArtList()
    })
  
    // 监听重置按钮的点击事件
    $('button[type="reset"]').on('click', function (e) {
      // 重置查询参数对象 q
      q = {
        pagenum: 1, // 页码值
        pagesize: 2, // 每页显示几条数据
        cate_id: '', // 分类 id
        state: '' // 发布状态
      }
  
      // 重新发起请求，获取列表数据
      getArtList()
    })
  
    // 渲染分页的方法
    function renderPage(total) {
      layui.laypage.render({
        elem: 'page-box', //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        limit: q.pagesize, // 每页显示几条数据
        limits: [2, 3, 5, 10], // 每页条数的选择项
        curr: q.pagenum, // 当前的页码值
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], // 布局效果
        jump: function (obj, first) {
          // 只要触发了 jump，就立即为 q 的页码值和每页条数赋值
          q.pagenum = obj.curr
          q.pagesize = obj.limit
  
          // 如果当前这次不是首次渲染，则根据最新的 q 重新获取列表数据
          if (!first) {
            getArtList()
          }
        }
      })
    }
  
    // 为删除按钮绑定点击事件处理函数
    $('tbody').on('click', '.btn-delete', function () {
      // 获取文章 id
      const id = $(this).attr('data-id')
      // 询问用户是否删除
      layer.confirm('确认删除此文章吗?', { icon: 3, title: '提示' }, function (index) {
        //do something
        $.ajax({
          type: 'DELETE',
          url: '/my/article/info?id=' + id,
          success: function (res) {
            layer.msg(res.message)
            // 判断页码值是否需要自动 -1
            if (q.pagenum > 1 && $('tbody tr').length === 1) {
              q.pagenum--
            }
            // 获取列表数据
            getArtList()
          }
        })
  
        layer.close(index)
      })
    })
  
    // 为文章标题的链接添加点击事件处理函数
    $('tbody').on('click', '.link-title', function () {
      // 获取文章的 id
      const id = $(this).attr('data-id')
      // 请求文章的数据
      $.get('/my/article/info', { id }, function (res) {
        console.log(res)
        const htmlStr = template('tmpl-artinfo', res.data)
        layer.open({
          type: 1,
          title: '预览文章',
          area: ['80%', '80%'],
          content: htmlStr
        })
      })
    })
  
    // 编辑文章按钮的点击事件处理函数
    $('tbody').on('click', '.btn-edit', function () {
      // 获取要编辑的文章的 id
      const id = $(this).attr('data-id')
      // 跳转到文章编辑页面
      location.href = '/article/art_edit.html?id=' + id
    })
  })