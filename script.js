// ===============================
// إعداد المستخدمين
// ===============================
let users = JSON.parse(localStorage.getItem("users")) || [];

// إنشاء حساب Owner تلقائيًا
if (!users.find(u => u.id === "Owner")) {
  users.push({
    id: "Owner",
    pass: "050910",
    role: "Owner" // صلاحيات كاملة
  });
  localStorage.setItem("users", JSON.stringify(users));
}

// ===============================
// تسجيل الدخول
// ===============================
function login() {
  const id = document.getElementById("id").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const err = document.getElementById("err");

  users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.id === id && u.pass === pass);

  if (!user) {
    err.style.display = "block";
    err.innerHTML =
      "الهوية أو كلمة المرور غير صحيحة.<br>يرجى التواصل مع إدارة السيرفر لإنشاء الهوية.";

    setTimeout(() => {
      err.style.display = "none";
    }, 3000);

    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.role === "Owner" || user.role === "Admin-2") {
    window.location.href = "admin.html"; // لوحة الإدارة الكاملة
  } else {
    window.location.href = "dashboard.html"; // لوحة الموظف العادي / Admin-1
  }
}

// ===============================
// Dashboard
// ===============================
if (document.getElementById("welcome")) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "index.html";
  }

  // تحديد عرض الهوية
  let displayID = currentUser.id;

  // تحديد نوع الإداري
  if (currentUser.role === "Admin-1" || currentUser.role === "Admin-2") {
    displayID += " - " + currentUser.role;
  }

  document.getElementById("welcome").innerText = "مرحبا، " + displayID;
  document.getElementById("userID").innerText = displayID;
  document.getElementById("userRole").innerText = currentUser.role;

  // تحديد الخدمات حسب الدور
  const servicesList = document.getElementById("servicesList");
  let services = [];

  switch (currentUser.role) {
    case "CIVID":
      services = ["الخدمات العامة", "الاستعلامات"];
      break;
    case "MOAid":
      services = ["خدمات وزارة الداخلية"];
      break;
    case "MOHID":
      services = ["خدمات وزارة الصحة"];
      break;
    case "DOJID":
      services = ["خدمات وزارة العدل"];
      break;
    case "Admin-1":
      services = ["إدارة بعض الهويات", "عرض الموظفين المحددين"];
      break;
    case "Admin-2":
      services = ["إدارة جميع الهويات", "عرض جميع الموظفين", "الوصول لكل الخدمات"];
      break;
    case "Owner":
      services = ["إدارة كل الهويات", "التحكم الكامل بالنظام"];
      break;
  }

  servicesList.innerHTML = services.map(s => `<li>${s}</li>`).join("");
}

// ===============================
// تسجيل الخروج
// ===============================
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
