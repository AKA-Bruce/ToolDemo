

// 获取-------------------------------------------------------------------------

var lid = location.search.split("=")[1];//获取页面lid，类似获取商品id
console.log("🚀 ~ file: enlarge1.js ~ line 6 ~ lid", lid)

var mImgSmall = document.getElementById("oSmall");//通过元素id查找元素，返回对象，如果找不到返回null
console.log("🚀 ~ file: enlarge1.js ~ line 9 ~ mImgSmall", mImgSmall)

var mImg = mImgSmall.querySelector("img");//通过CSS选择器查找展示原图片的img
console.log("🚀 ~ file: enlarge1.js ~ line 12 ~ mImg", mImg)

var lgImgs = document.getElementById("oBig");
console.log("🚀 ~ file: enlarge1.js ~ line 15 ~ lgImgs", lgImgs)

var lgImg = lgImgs.querySelector("img");
console.log("🚀 ~ file: enlarge1.js ~ line 18 ~ lgImg", lgImg)

var ul = document.getElementById("oList_u");
console.log("🚀 ~ file: enlarge1.js ~ line 21 ~ ul", ul)

var lis = ul.getElementsByTagName("li");
console.log("🚀 ~ file: enlarge1.js ~ line 24 ~ lis", lis)

var html = ``;

// onload事件------------------------------------------------------------------------

function enlarge() {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "/enlarge/" + lid, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.responseText == 0) {
        alert("数据不存在");
      } else {
        var obj = JSON.parse(xhr.responseText);
        console.log("🚀 ~ file: enlarge1.js ~ line 39 ~ enlarge ~ obj", obj)
        for (var pics in obj) {
          var pic = obj[pics];
          console.log("🚀 ~ file: enlarge1.js ~ line 42 ~ enlarge ~ pic", pic)
          html += `<li id="oList_u_l"><img src=${pic.sm} alt="" /></li>`;
        }
        ul.innerHTML = html;
        var lis = ul.getElementsByTagName("li");
        console.log("🚀 ~ file: enlarge1.js ~ line 47 ~ enlarge ~ lis", lis)
        for (var i = 0; i < lis.length; i++) {
          lis[i].index = i;
          lis[i].onmouseover = function () {
            mImg.src = obj[this.index].md;
            lgImg.src = obj[this.index].lg;
          };
        }
      }
    }
  };
  xhr.send();
}


// 左右按钮图标-------------------------------------------------------------

var num = 0;
var i = 5;
function arrowLeft() {
  if (i <= 5) {
    return;
  } else if (i > 5 && i <= lis.length) {
    num += 76;
    ul.style.left = num + "px";
    --i;
  }
}

function arrowRight() {
  if (i >= lis.length) {
    return;
  } else if (i >= 5 && i <= lis.length) {
    num -= 76;
    ul.style.left = num + "px";
    ++i;
  }
}



// 鼠标跟随-------------------------------------------------------------------------

var mask = document.querySelector(".mask");
var big=document.querySelector(".big")

//鼠标移入small的时候显示mask遮罩盒子和bigImg大图
//把mask内联样式中的display:none去掉
mImgSmall.addEventListener("mouseover", function (e) {
  mask.style.display = "";
  big.style.display = "";
});
//鼠标移入small的时候隐藏mask遮罩盒子和bigImg大图
//把mask内联样式中的display:none加上
mImgSmall.addEventListener("mouseout", function (e) {
  mask.style.display = "none";
  big.style.display = "none";
});

//获取大图img元素
var bigImg=document.querySelector(".big img")

mImgSmall.addEventListener("mousemove", function (e) {
  //获取鼠标坐标
var x = e.clientX;
var y = e.clientY;
  //获取元素上边距离页面左边的距离
var mx = mImgSmall.getBoundingClientRect().left;
  //元素上边距离页面上边的距离
var my = mImgSmall.getBoundingClientRect().top;

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