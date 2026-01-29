// جلب الهويات من localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// إنشاء حساب Owner إذا ما كان موجود
const ownerExists = users.find(u => u.id === "Owner");

if (!ownerExists) {
  users.push({
    id: "Owner",
    pass: "050910",
    role: "Owner"
  });
  localStorage.setItem("users", JSON.stringify(users));
}

// تسجيل الدخول
function login() {
  const id = document.getElementById("id").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const err = document.getElementById("err");

  const user = users.find(u => u.id === id && u.pass === pass);

  if (!user) {
    err.style.display = "block";
    err.innerHTML =
      "❌ الهوية أو كلمة المرور غير صحيحة.<br>يرجى التوجه إلى سيرفر الإدارة لإنشاء هوية جديدة.";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "admin.html"; // يفتح لوحة تحكم Owner مباشرة
}

// وظيفة إنشاء الهوية الجديدة (للـ Owner)
function createID() {
  const type = document.getElementById("type").value;
  const number = document.getElementById("number").value.trim();
  const pass = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!number || !pass) {
    msg.style.display = "block";
    msg.textContent = "⚠️ الرجاء إدخال جميع الحقول";
    msg.style.color = "red";
    return;
  }

  const fullID = `${type}-${number}`;

  // التحقق من التكرار
  const exists = users.find(u => u.id === fullID);
  if (exists) {
    msg.style.display = "block";
    msg.textContent = "❌ هذه الهوية مستخدمة مسبقًا";
    msg.style.color = "red";
    return;
  }

  // إضافة الهوية
  users.push({
    id: fullID,
    pass: pass,
    role: type
  });

  localStorage.setItem("users", JSON.stringify(users));

  msg.style.display = "block";
  msg.textContent = `✅ تم إنشاء الهوية بنجاح: ${fullID}`;
  msg.style.color = "green";

  document.getElementById("number").value = "";
  document.getElementById("password").value = "";
}
