 //页面box出现的动画
 window.onload = function() {

     var timer = setInterval(appear, 1);
     var val1 = 0.01;
     startGame();
     var Box = document.getElementById('body_box');

     function appear() {

         Box.style.opacity = val1;

         val1 += 0.01;

         if (val1 >= 1.0) { //把setInterval关了
             clearInterval(timer);

             return;
         }
     }
 }
 var border_now = ["N", "N", "N", "N", "N", "N", "N", "N", "N"];
 var ai_check = [
     [0, 0, 0],
     [0, 0, 0],
     [0, 0, 0]
 ];
 const start_dex = [0, 2, 6, 8]; //开局用的下标

 var turn = "player";
 var cell_all;
 var step;

 function startGame() {
     turn = "player";
     step = 0;
     cell_all = document.querySelectorAll(".cell");
     for (var i = 0; i < cell_all.length; i++) {
         cell_all[i].innerHTML = "";
         border_now[i] = "N";
     }
 }

 function click_chess(cell_id) {
     //player落子
     var cell_now = document.getElementById(cell_id);
     var dex = Number(cell_id);
     if (border_now[dex] == "N" && turn == "player") {
         cell_now.innerHTML = "O";
         border_now[dex] = "O";
         turn = "ai";
         step++;
         ai_playing();
     }
 }

 function ai_xiazi(cell_id) {
     //ai落子
     var cell_now = document.getElementById(cell_id);
     var dex = Number(cell_id);
     cell_now.innerHTML = "X";
     border_now[dex] = "X"
     if (if_win("X")) {
         alert(":) Hello, loser~");
         return;
     }
     turn = "player";
 }
 //min~max之间取随机
 //Math.floor(Math.random()*(max-min+1)+min);
 function ai_playing() {
     var chess_dex;
     var danger = 0;
     if (step == 1) { //开局特殊情况
         //四角随机下一个
         while (1) {
             chess_dex = start_dex[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
             if (border_now[chess_dex.toString(10)] == "N") {
                 break;
             }
         }
         ai_xiazi(chess_dex.toString(10));
         return;
     }
     if (ai_want2Win()) { //ai如果一步就赢
         return;
     }
     if (get_danger()) { //Player如果一步就赢
         return;
     }
     for (var i = 0; i <= 8; i++) {
         if (border_now[i] == "N") {
             ai_xiazi(i);
             return;
         }
     }
 }

 function ai_want2Win() {
     for (var i = 0; i <= 8; i++) {
         if (border_now[i] == "N") {
             border_now[i] = "X";
             if (if_win("X")) {
                 border_now[i] = "N";
                 ai_xiazi(i);
                 return true;
             }
             border_now[i] = "N";
         }
     }
     return false;
 }

 function get_danger() { //检测是否Player快赢了
     for (var i = 0; i <= 8; i++) {
         //console.log("border_now[" + i + "]=" + border_now[i]);
         if (border_now[i] == "N") {
             border_now[i] = "O";
             if (if_win("O")) {
                 border_now[i] = "N";
                 ai_xiazi(i);
                 return true;
             }
             border_now[i] = "N";
         }
     }
     return false;
 }
 const win_dex = [ //获胜的下标
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [6, 4, 2]
 ];

 function if_win(Who) { //Player是否赢了
     //for (var i = 0; i <= 8; i++) console.log(i + border_now[i]);
     for (var i = 0; i < 8; i++) {
         var flag = true;
         for (var j = 0; j < 3; j++) {
             if (border_now[win_dex[i][j]] != Who) {
                 flag = false;
             }
         }

         if (flag) {
             return true;
         }
     }
     return false;
 }