// 获取dom元素
const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")


//检查必填项
function checkRequired(inputArr){
  //遍历你传进来的所有的项 那几个输入框
  inputArr.forEach(function(input){
    // console.log(input)
    if(input.value.trim() === ""){
      showError(input,`${getKeyWords(input)}为必填项`)
    }else{
        showSuccess(input)
    }
  })
}

//getKeyWords 截取那个placeholder的关键字 作为错误提示用语
function getKeyWords(input){
    return input.placeholder.slice(3)
}
// console.log('wosh',getKeyWords(username))


// show success 当输入成功的时候边框变绿 
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}
// 显示错误提示 输入失败的时候边框变红 错误提示显示
function showError(input,message){
   const formControl = input.parentElement;
   formControl.className = "form-control error"
   const small = formControl.querySelector("small")
   small.innerText = message;
}
// 验证输入长度
function checkLength(input,min,max){
  if(input.value.length<min){
    showError(input,`${getKeyWords(input)}至少${min}个字符`)
  }else if(input.value.length>max){
    showError(input,`${getKeyWords(input)}最多${max}个字符`)
  }else{
    showSuccess(input)
  }
}

// check email is valid 检查邮箱格式是否正确
function checkEmail(input) {
    // 章哥找的最全的邮箱验证
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, "邮箱格式错误");
    }
  }

  // check password match 确认密码验证
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
      showError(input2, "两次密码不一致");
    }
  }



// 给form绑定事件监听 提交事件
form.addEventListener("submit",function(e){
    // 阻止表单的默认行为
    e.preventDefault();
    // console.log(123)
    // 函数封装的思维 代码复用
  checkRequired([username, email, password, password2]);
//  校验用户名和密码长度
  checkLength(username, 3, 15);
  checkLength(password, 6, 12);
//   校验邮箱格式
  checkEmail(email);
//   校验两次密码是否一致
  checkPasswordsMatch(password, password2);
})
