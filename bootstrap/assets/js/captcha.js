//
// // var canvas = document.getElementById('captcha');
// // canvas.addEventListener('click', createCaptcha);
//
//
// createCaptcha()
//
// // تصویر تأیید هویت را ایجاد می کند
// function createCaptcha() {
//   // کاراکترهای مجاز برای کپچا را تعریف می کنیم
//   var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
//   var length = 5;
//   var captcha = "";
//
//   // رندوم سازی کاراکترهای کپچا
//   for (var i = 0; i < length; i++) {
//     var randomNumber = Math.floor(Math.random() * chars.length);
//     captcha += chars.substring(randomNumber, randomNumber + 1);
//   }
//   // تصویر کپچا را رسم می کنیم
//   var canvas = document.getElementById('captcha');
//   var context = canvas.getContext('2d');
//
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.font = "bold 20px Arial";
//   context.fillText(captcha, 110, 30);
//
// }
//
// function checkCaptcha() {
//   var canvas = document.getElementById("captcha");
//   var ctx = canvas.getContext("2d");
//   var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   var captchaText = "";
//   for (var i = 0; i < imgData.data.length; i += 4) {
//     var r = imgData.data[i];
//     var g = imgData.data[i + 1];
//     var b = imgData.data[i + 2];
//     var a = imgData.data[i + 3];
//     if (r === 255 && g === 255 && b === 255) {
//       captchaText += " ";
//     } else if (r === 0 && g === 0 && b === 0) {
//       captchaText += "X";
//     }
//   }
//   var userInput = document.getElementById("captchaInput").value;
//   console.log('userInput', userInput)
//   console.log('captchaText', captchaText)
//   var result = true;
//   for (var i = 0; i < userInput.length; i++) {
//     var userChar = userInput.charCodeAt(i);
//     var captchaChar = captchaText.charCodeAt(i);
//     console.log('userChar', userChar)
//     console.log('captchaChar', captchaChar)
//     if (userChar !== captchaChar) {
//       result = false;
//       break;
//     }
//   }
//   return result;
// }
//
// // تصویر ورودی کاربر را بررسی می کند
// // function checkCaptcha() {
// //   var input = document.getElementById('captcha-input').value;
// //   var canvas = document.getElementById('captcha');
// //   var context = canvas.getContext('2d');
// //   var captcha = context.getImageData(0, 0, canvas.width, canvas.height);
// //
// //   console.log('canvas', canvas)
// //   console.log('context', context)
// //   console.log('captcha', captcha)
// //
// //   for (var i = 0; i < captcha.data.length; i += 4) {
// //     var r = captcha.data[i];
// //     var g = captcha.data[i + 1];
// //     var b = captcha.data[i + 2];
// //     var a = captcha.data[i + 3];
// //
// //     // می توانید رنگ پس زمینه تصویر کپچا را در اینجا مشخص کنید
// //     if (r === 255 && g === 255 && b === 255 && a === 255) {
// //       captcha.data[i] = 0;
// //       captcha.data[i + 1] = 0;
// //       captcha.data[i + 2] = 0;
// //       captcha.data[i + 3] = 255;
// //     }
// //   }
// //
// //   // تصویر کپچا را با تصویر ورودی کاربر مقایسه می کنیم
// //   var inputImageData = context.createImageData(canvas.width, canvas.height);
// //
// //   console.log('inputImageData', inputImageData)
// //
// //
// //   var captchaString = ''
// //
// //   for (var i = 0; i < inputImageData.data.length; i += 4) {
// //     var charIndex = Math.floor(i / 20);
// //     var char = captchaString.charAt(charIndex);
// //     var charCode = char.charCodeAt(0);
// //     var r = (charCode & 0xff0000) >> 16;
// //     var g = (charCode & 0x00ff00) >> 8;
// //     var b = (charCode & 0x0000ff);
// //     var a = 255;
// //
// //     if (input.charAt(charIndex) === char) {
// //       inputImageData.data[i] = r;
// //       inputImageData.data[i + 1] = g;
// //       inputImageData.data[i + 2] = b;
// //       inputImageData.data[i + 3] = a;
// //     } else {
// //       inputImageData.data[i] = 255 - r;
// //       inputImageData.data[i + 1] = 255 - g;
// //       inputImageData.data[i + 2] = 255 - b;
// //       inputImageData.data[i + 3] = a;
// //     }
// //   }
// //
// //   console.log('input', input)
// //   console.log('captchaString', captchaString)
// //
// //   // تصویر کپچا را با تصویر ورودی کاربر مقایسه می کنیم
// //   for (var i = 0; i < captcha.data.length; i += 4) {
// //     var isMatch = true;
// //
// //     for (var j = 0; j < 4; j++) {
// //       if (captcha.data[i + j] !== inputImageData.data[i + j]) {
// //         isMatch = false;
// //         break;
// //       }
// //     }
// //
// //     if (!isMatch) {
// //       console.log('nok')
// //       createCaptcha()
// //       return false;
// //     }
// //   }
// //
// //
// //
// //   console.log('ok')
// //   createCaptcha()
// //   return true;
// // }

init()

// Generate a random CAPTCHA string
function generateCaptcha() {
  let captcha = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 4; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

// Draw the CAPTCHA image on a canvas element
function drawCaptcha(captcha, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "20px Arial";
  ctx.fillText(captcha, 95, 30);
}

// Verify the user's response to the CAPTCHA
function verifyCaptcha(captcha, response) {
  return captcha.toLowerCase() === response.toLowerCase();
}

function init() {
  let captcha = generateCaptcha();
  let canvas = document.getElementById("captchaCanvas");
  drawCaptcha(captcha, canvas);
  sessionStorage.setItem("captcha", captcha);
}

function checkCaptcha() {
  let response = document.getElementById("captchaInput").value;
  let captcha = sessionStorage.getItem("captcha");
  if (verifyCaptcha(captcha, response)) {
    // alert("آفرین! شما ربات نیستید.");
    init();
    return true
  } else {
    alert("کپچا اشتباه است! دوباره تلاش کنید.");
    init();
    return false
  }
}
