let users = JSON.parse(localStorage.getItem("users")) || [];

// إنشاء Owner إذا ما موجود
if (!users.find(u => u.id === "Owner")) {
  users.push({ id: "Owner", pass: "050910", role: "Owner" });
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
      "الهوية أو كلمة المرور غير صحيحة.<br>يرجى التواصل مع إدارة السيرفر لإنشاء الهوية.";
    setTimeout(() => err.style.display = "none", 3000);
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
}

// ===============================
// تحميل Dashboard فقط لو العنصر موجود
// ===============================
function loadDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) { window.location.href = "index.html"; return; }

  const welcome = document.getElementById("welcome");
  if (welcome) welcome.innerText = "مرحبا، " + currentUser.id;

  const userRoleEl = document.getElementById("userRole");
  if (userRoleEl) userRoleEl.innerText = currentUser.role;

  // إظهار الإعدادات فقط للمدراء
  if(["Admin-2","Owner"].includes(currentUser.role)){
    document.querySelectorAll(".adminOnly").forEach(el => el.style.display="block");
  }

  const cardsContainer = document.getElementById("servicesCards");
  if(cardsContainer){
    const services = {
      "CIVID": ["الخدمات العامة"],
      "MOAid": ["خدمات وزارة الداخلية"],
      "MOHID": ["خدمات وزارة الصحة"],
      "DOJID": ["خدمات وزارة العدل"],
      "Admin-1": ["إدارة محدودة"],
      "Admin-2": ["إدارة كاملة","عرض المستخدمين"],
      "Owner": ["التحكم الكامل بالنظام"]
    };
    cardsContainer.innerHTML = (services[currentUser.role] || []).map(s => `<div class="card">${s}</div>`).join("");
  }
}

// عرض أي قسم
function showSection(id){
  document.querySelectorAll(".section").forEach(s => s.style.display="none");
  const sec = document.getElementById(id);
  if(sec) sec.style.display="block";
}

// إعدادات منبثقة
function toggleSettings(){
  const sec = document.getElementById("settingsSection");
  if(sec) sec.style.display = (sec.style.display==="block") ? "none" : "block";
}

// تسجيل الخروج
function logout(){
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// ===============================
// نفذ Dashboard فقط لو الصفحة تحتوي البطاقة
// ===============================
if(document.getElementById("servicesCards")){
  loadDashboard();
}
