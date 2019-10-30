import Vue from 'vue'

// 注册一个全局自定义指令 `v-checkSubmit`
Vue.directive('some', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vNode) {
    el.addEventListener('click', function(event) {
      console.log(binding.value.model)
      var elements = document.getElementsByClassName('v-check')
      var evObj = document.createEvent('Event')
      evObj.initEvent('keyup', true, true);


      for (var element in elements) {
        //console.log(element);
        // 待异步函数执行完再继续
        (function(element) {
          // if (document.all.length) {
          //   element.fireEvent(evObj);
          // }
          // else{
            element.dispatchEvent(evObj)
          //}
          //elements[element].dispatchEvent(evObj)
        })(elements[element])
        if (elements[element].className.indexOf('input-error') != -1) {
          return false;
        } else {
          console.log('eheh');
        }

      }

      var errorInputs = document.getElementsByClassName('input-error');
      if (errorInputs.length === 0) {
        alert('通过了')
        vNode.context.submit();
      } else {
        alert('出错了')
      }
    })
  }
})
