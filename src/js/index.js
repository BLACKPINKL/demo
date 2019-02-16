import $ from 'jquery'
import '../asset/jquery-fullpage/jquery.fullPage.css'
import fullpage from '../asset/jquery-fullpage/jquery.fullPage.js'
import '../css/index.css'

$(function() {
  $('.container').fullpage({
    sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
    verticalCentered: false,
    scrollingSpeed: 1000,
    navigation: true,
    afterLoad: function(anchorLink , index) {
      $('.section').eq(index - 1).addClass('now')
    },
    onLeave: function(index, nextIndex,direction) {
      if (index == 2 && nextIndex == 3) {
        $('.section').eq(index - 1).addClass('leaved')
      }else if (index == 3 && nextIndex == 4) {
        $('.section').eq(index - 1).addClass('leaved')
      }else if (index == 5 && nextIndex == 6) {
        $('.section').eq(index - 1).addClass('leaved')
        $('.screen06').addClass('boxleaved')
      }else if (index == 6 && nextIndex == 7) {
        $('.screen07 .text').addClass('show')
        $('.screen07 .star img').each(function(i, item) {
          // delay 可以做延迟
          // 必须乘以1000 因为单位是毫秒值
          $(this).delay(i * 0.4 * 1000).fadeIn()
        })
      }
    },
    afterRender: function() {
      $('.more').on('click', function() {
        // 这个库的this指向没有moveSectionDown这个方法
        // 只有给jquery挂载这个方法才能使用这个函数
          // $.fn 是jquery挂载方法的入口
        $.fn.fullpage.moveSectionDown()
      })
      // 监听过度结束事件transitionend
      $('.screen04 .cart').on('transitionend', function() {
        $('.screen04 .address img:first').fadeIn(1000)
        $('.screen04 .address img:last').fadeIn(2000)
        $('.screen04 .text').addClass('show')
      })
      //绑定鼠标移动事件
      $('.screen08 .btn').on('mousemove',function() {
          $(this).addClass('active')
      }).on('mouseleave', function() {
          $(this).removeClass('active')
      })

      //移动手的坐标
      $('.screen08').on('mousemove', function(e) {
        $(this).find('.hand').css({
          left: e.clientX - 190,
          top: e.clientY - 100
        })
      })
      $('.screen08 .again').on('click', function() {
        $('.now,.leaved,.show,.active').removeClass('now').removeClass('leaved').removeClass('show')
        .removeClass('active')
        /*2.4 加css属性  后果：加一个style属性*/
        /*2.5 用jquery方法  show() fadeIn() 后果：加一个style属性*/
        $('.content [style]').removeAttr('style');

        /*跳回第一页*/
        $.fn.fullpage.moveTo(1);
      })

    }
  })
})
