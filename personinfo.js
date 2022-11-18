 //页面box出现的动画
 window.onload = function() {

     var timer = setInterval(appear, 1);
     var val1 = 0.01;
     var Box = document.getElementById('body_box'),
         aside = document.getElementById('aside'),
         title = document.getElementById('title');

     function appear() {
         aside.style.opacity = val1;
         Box.style.opacity = val1;
         title.style.opacity = val1;
         val1 += 0.01;
         if (val1 >= 1.0) { //把setInterval关了
             clearInterval(timer);
         }
     }
 }