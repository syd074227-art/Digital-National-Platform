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
    err.innerHTML = "الهوية أو كلمة المرور غير صحيحة.<br>يرجى التواصل مع إدارة السيرفر لإنشاء الهوية.";
    setTimeout(() => err.style.display="none", 3000);
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
}

// Dashboard
function loadDashboard(){
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if(!user){ window.location.href="index.html"; return; }

  document.getElementById("welcome").innerText = "مرحبا، " + user.id;
  document.getElementById("userRole").innerText = user.role;

  // إظهار الإعدادات للمدراء
  if(["Admin-2","Owner"].includes(user.role)){
    document.querySelectorAll(".adminOnly").forEach(el=>el.style.display="block");
  }

  // توزيع الخدمات على الأعمدة الثلاثة
  const services = {
    "CIVID":["الخدمات العامة"],
    "MOAid":["خدمات وزارة الداخلية"],
    "MOHID":["خدمات وزارة الصحة"],
    "DOJID":["خدمات وزارة العدل"],
    "Admin-1":["إدارة محدودة"],
    "Admin-2":["إدارة كاملة","عرض المستخدمين"],
    "Owner":["التحكم الكامل بالنظام"]
  };

  const col1 = document.getElementById("servicesCol1");
  const col2 = document.getElementById("servicesCol2");
  const col3 = document.getElementById("servicesCol3");

  if(col1 && col2 && col3){
    col1.innerHTML = "";
    col2.innerHTML = "";
    col3.innerHTML = "";

    (services[user.role] || []).forEach((s,i)=>{
      if(i===0) col1.innerHTML += `<div class="card">${s}</div>`;
      else if(i===1) col2.innerHTML += `<div class="card">${s}</div>`;
      else col3.innerHTML += `<div class="card">${s}</div>`;
    });
  }
}

function showSection(id){
  document.querySelectorAll(".section").forEach(s=>s.style.display="none");
  const sec = document.getElementById(id);
  if(sec) sec.style.display="block";
}

function toggleSettings(){
  const sec = document.getElementById("settingsSection");
  sec.style.display = (sec.style.display==="block")?"none":"block";
}

function logout(){
  localStorage.removeItem("currentUser");
  window.location.href="index.html";
}

// نفذ Dashboard فقط لو الصفحة تحتوي servicesCol1
if(document.getElementById("servicesCol1")) loadDashboard();
