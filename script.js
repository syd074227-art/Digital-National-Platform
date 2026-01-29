// مثال بيانات مستخدمين
const users = [
  { id: "123456", pass: "abc123" },
  { id: "987654", pass: "pass987" }
];

function login() {
  const userId = document.getElementById("id").value;
  const userPass = document.getElementById("pass").value;
  const errMsg = document.getElementById("err");

  // تحقق من البيانات
  const user = users.find(u => u.id === userId && u.pass === userPass);

  if(user) {
    errMsg.style.display = "none";
    alert("تم تسجيل الدخول بنجاح!");
    // هنا ممكن تحويل المستخدم لصفحة أخرى
    // window.location.href = "dashboard.html";
  } else {
    errMsg.style.display = "block";
    errMsg.textContent = "الهوية أو كلمة المرور خاطئة!";
  }
}
