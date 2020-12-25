var page = new Vue({
  el: "#container",
  data: {
    //轮播图索引
    head_lbt_index: 1,
    
    //数据
    headerNav: [
    "小米商城", "MIUI", "loT", "云服务", "天星数科",
    "有品", "小爱开放平台", "企业团购", "资质团购",
    "协议规则", "下载app", "智能生活", "SelectLocation"
    ],
    navMainList: [
    "小米手机", "Redmi红米", "电视", "笔记本", "家电",
    "路由器", "只能硬件", "服务", "社区"
    ],
    lside_nav: [{
      type: "手机 电话卡",
      phones: [
      "小米10 至尊纪念版", "Readmi K30 Pro 变焦版", "Redmi Note 9 Pro", "Redmi 9",
      "小米10", "Redmi K30 5G", "Redmi Note 9 5G", "Redmi 9A",
      "小米10 青春版", "Redmi K30 4G", "Redmi Note 9 4G", "Redmi 8",
      "Redmi K30S 至尊纪念版", "Redmi 10X Pro", "Redmi Note 8 Pro", "Redmi 8A",
      "Redmi K30 至尊纪念版", "Redmi 10X 5G", "Redmi Note 8", "腾讯黑鲨游戏手机",
      "小米云服务", "Redmi 10X 4G", "手机上门维修", "中国电信"
      ]
    },
    {
      type: "电视 盒子",

    },
    {
      type: "笔记本 显示器"
    },
    {
      type: "家电 插线板"
    },
    {
      type: "出行 穿戴"
    },
    {
      type: "智能 路由器"
    },
    {
      type: "电源 配件"
    },
    {
      type: "健康 儿童"
    },
    {
      type: "耳机 音箱"
    },
    {
      type: "生活 箱包"
    }
    ],

    bottom_left_nav: [{
      title: "小米秒杀",
      imgSrc: "./img/card/0.png"
    },
    {
      title: "企业团购",
      imgSrc: "./img/card/1.png"
    },
    {
      title: "F码通道",
      imgSrc: "./img/card/2.png"
    },
    {
      title: "米粉卡",
      imgSrc: "./img/card/3.png"
    },
    {
      title: "以旧换新",
      imgSrc: "./img/card/4.png"
    },
    {
      title: "话费充值",
      imgSrc: "./img/card/5.png"
    }
    ]
  },
  methods: {
    //图片后退
    lbt_prev_fn: function() {
      if(!head_lbt.off){
        direction = "prev";
        --page.head_lbt_index;
      }
    },
    //图片前进
    lbt_next_fn: function() {
      if(!head_lbt.off){
        direction = "next";
        ++page.head_lbt_index;
      }
    },
    
    //点击小圆点传递索引
    click_radio: function(e) {
      clearInterval(head_lbt_timer);
      var el = e.target;
      if (el.tagName.toLowerCase() === "a") {
        for(let i=0; i<radios.length; i++) {
          if (el === radios[i]) {          
            page.head_lbt_index = i+1;
            direction = "other";
            break;
          }
        }
      }
    },


    //计算图片资源的后缀与路径
    computed_imgName: function(index) {
      let postfix = index == 20 ? '.jpg' : (index == 22 ? '.png' : '.webp')
      return "./img/phone/" + (++index) + postfix;
    }
  },
  watch: {
    //索引监听)
    "head_lbt_index": function(val, oldVal) {
      //肉眼不可见的移动，循环轮播核心语句
      if(0 == val) {
        head_lbt_el.style.left = "-7356px";
        page.head_lbt_index = 5;
      } else if(6 == val) {
        head_lbt_el.style.left = "0px";
        page.head_lbt_index = 1;       
      } else {
      //清除所有圆点样式
        for (var i=0; i<radios.length; radios[i].style.background="#404040",i++);
        switch(direction) {
         case "prev": head_lbt.move(head_lbt_el, 0, 1226, 0, 0); break;
         case "next": head_lbt.move(head_lbt_el, 0, 0, 0, 1226); break;
         case "other": {
            if(val > oldVal)      head_lbt.move(head_lbt_el, 0, 0, 0, (val-oldVal)*1226);
            else if(val < oldVal) head_lbt.move(head_lbt_el, 0, (oldVal-val)*1226, 0, 0);
          }
        }
      //为当前索引的圆点添加样式     
        radios[page.head_lbt_index-1].style.background = "#FFFCF5";
      }
      
    }
  }
})




var head_lbt_el = document.getElementsByClassName("main_lbt")[0];
var head_lbt = new dh(1.1, "Expo", "easeInOut");
var radios = document.querySelectorAll(".lbt_list_radio a");
var direction = "next";
var head_lbt_timer = setInterval(page.lbt_next_fn, 3000);
head_lbt_el.onmouseover = function() {clearInterval(head_lbt_timer)}
head_lbt_el.onmouseout = function() {head_lbt_timer = setInterval(page.lbt_next_fn, 3000);}