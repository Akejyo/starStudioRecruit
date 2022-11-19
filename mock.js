 //页面box出现的动画
 window.onload = function() {

     var timer = setInterval(appear, 1);
     var val1 = 0.01;
     var Box = document.getElementById('body_box');


     function appear() {
         Box.style.opacity = val1;
         val1 += 0.01;
         if (val1 >= 1.0) { //把setInterval关了
             clearInterval(timer);
         }
     }
 }
 var responsecontent;

 function SendXMLHttpRequest() {
     var xmlhttp, url = "https://631333b8a8d3f673ffc6500b.mockapi.io/users";
     if (window.XMLHttpRequest) {
         xmlhttp = new XMLHttpRequest(); //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
     } else {
         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5 浏览器执行代码
     }
     xmlhttp.onreadystatechange = function() {

         responsecontent = xmlhttp.responseText;
         var Res = "Get results successfully.\n" + responsecontent;
         document.getElementById("result").innerText = Res;
         document.getElementById("jsonresult").innerText = "";

     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
 }

 function ShowInfo() {
     var MockJson = JSON.parse(responsecontent);
     var idMock = Number(document.getElementById("id").value);
     idMock--; //索引从0开始的
     var imgMock = document.getElementById("detailImg");
     var nameMock = document.getElementById("detailName");
     var infoMock = document.getElementById("detailInfo");
     console.log(nameMock);
     console.log(MockJson[idMock]);
     imgMock.src = MockJson[idMock].avatar;
     nameMock.innerHTML = MockJson[idMock].name;
     infoMock.innerHTML = "Created at: " + MockJson[idMock].createdAt;
 }