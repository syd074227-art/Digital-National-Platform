let users = JSON.parse(localStorage.getItem("users")) || [];

// إنشاء حساب Owner تلقائيًا
if (!users.find(u => u.id === "Owner")) {
  users.push({ id: "Owner", pass: "050910", role: "Owner" });
  localStorage.setItem("users", JSON.stringify(users));
}

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
    setTimeout(() => { err.style.display = "none"; }, 3000);
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.role === "Owner" || user.role === "Admin-2") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "dashboard.html";
  }
}

// ===============================
// Dashboard / Admin Panel
// ===============================
function loadDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) { window.location.href = "index.html"; return; }

  let displayID = currentUser.id;
  if (["Admin-1","Admin-2"].includes(currentUser.role)) {
    displayID += " - " + currentUser.role;
  }

  if (document.getElementById("welcome")) {
    document.getElementById("welcome").innerText = "مرحبا، " + displayID;
    document.getElementById("userID").innerText = displayID;
    document.getElementById("userRole").innerText = currentUser.role;
  }

  if (document.getElementById("servicesList")) {
    const servicesList = document.getElementById("servicesList");
    let services = [];

    switch (currentUser.role) {
      case "CIVID": services = ["الخدمات العامة","الاستعلامات"]; break;
      case "MOAid": services = ["خدمات وزارة الداخلية"]; break;
      case "MOHID": services = ["خدمات وزارة الصحة"]; break;
      case "DOJID": services = ["خدمات وزارة العدل"]; break;
      case "Admin-1": services = ["إدارة بعض الهويات","عرض موظفين محددين"]; break;
      case "Admin-2": services = ["إدارة كل الهويات","عرض جميع الموظفين","الوصول لكل الخدمات"]; break;
      case "Owner": services = ["إدارة كل الهويات","التحكم الكامل بالنظام"]; break;
    }

    servicesList.innerHTML = services.map(s => `<li>${s}</li>`).join("");
  }

  // Admin-2 + Owner: عرض جميع المستخدمين في لوحة الإدارة
  if (document.getElementById("usersList")) {
    const list = document.getElementById("usersList");
    list.innerHTML = users.map(u => `<li>${u.id} - ${u.role}</li>`).join("");
  }
}

loadDashboard();

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
