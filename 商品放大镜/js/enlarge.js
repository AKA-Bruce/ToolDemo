var small = document.querySelector(".small");
// console.log(small);
var smallImg = document.querySelector(".small img");
// console.log(smallImg);
var mask = document.querySelector(".mask");
// console.log(mask);
var big=document.querySelector(".big")
// console.log(big)
var bigImg=document.querySelector(".big img")
// console.log(bigImg)

small.addEventListener("mousemove", function (e) {
    //获取鼠标坐标
  var x = e.clientX;
  var y = e.clientY;
  console.log("X:"+x,"Y:"+y)
    //获取元素上边距离页面左边的距离
  var mx = small.getBoundingClientRect().left;
    //元素上边距离页面上边的距离
  var my = small.getBoundingClientRect().top;

    //获取遮罩盒子mask中心点的坐标
  var tx = x - mx - 281.25/2;
  var ty = y - my - 281.25/2;

    //限制遮罩盒子mask移动位置
  if (tx < 0) {tx = 0;}//限制左边
  if (ty < 0) {ty = 0;}//限制上边
  if (tx > 168.75 ) {tx = 168.75;}//限制右边
  if (ty > 168.75) {ty = 168.75;}//限制下边

    //给遮罩盒子mask实现跟随鼠标移动
  mask.style.left = tx + "px";
  mask.style.top = ty + "px";

    //给大图片实现跟随遮罩盒子移动
    //因为mask移动的时候,是往相反的方向挪动,所以给大图添加移动数值的时候取相反数
  bigImg.style.left = -800/450*tx + "px";
  bigImg.style.top = -800/450*ty + "px";
});

    //鼠标移入small的时候显示mask遮罩盒子和bigImg大图
    //把mask内联样式中的display:none去掉
small.addEventListener("mouseover", function (e){
  mask.style.display="";
  big.style.display="";
})
    //鼠标移入small的时候隐藏mask遮罩盒子和bigImg大图
    //把mask内联样式中的display:none加上
small.addEventListener("mouseout", function (e){
  mask.style.display="none";
  big.style.display="none";
})

    //点击按钮实现列表左移右移
var oList_u=document.querySelector("#oList_u")
var temp = document.getElementById('oList_u');
var linum = temp.getElementsByTagName("li").length;
// console.log(linum)
var num=0;
var i=5;

function arrowLeft(){
  console.log(linum)
  console.log("i="+i)
  console.log(1)
  if(i<=5){
    console.log(2)
    return
  }else if(i>5&&i<=linum){
    // console.log(3)
    num+=76;
    console.log(num)
    oList_u.style.left=num+"px"
    --i
  }
}

function arrowRight(){
  console.log(linum)
  console.log("i="+i)
  console.log(1)
  if(i>=linum){
    console.log(2)
    return
  }else if(i>=5&&i<=linum){
    // console.log(3)
    console.log(num)
    num-=76
    oList_u.style.left=num+"px"
    ++i
  }
}
