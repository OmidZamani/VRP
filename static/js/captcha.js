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
