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
    err.innerText = "الهوية أو كلمة المرور غير صحيحة. يرجى التواصل مع إدارة السيرفر لإنشاء الهوية.";
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

  if(["Admin-2","Owner"].includes(user.role)){
    document.querySelectorAll(".adminOnly").forEach(el=>el.style.display="block");
  }

  // الخدمات لكل وزارة
  const services = {
    "MOAid": ["خدمة 1", "خدمة 2"],
    "MOHID": ["خدمة 1", "خدمة 2"],
    "DOJID": ["خدمة 1", "خدمة 2"]
  };

  const col1 = document.getElementById("servicesCol1");
  const col2 = document.getElementById("servicesCol2");
  const col3 = document.getElementById("servicesCol3");

  if(col1 && col2 && col3){
    col1.innerHTML = "";
    col2.innerHTML = "";
    col3.innerHTML = "";

    (services["MOAid"] || []).forEach(s => col1.innerHTML += `<div class="card">${s}</div>`);
    (services["MOHID"] || []).forEach(s => col2.innerHTML += `<div class="card">${s}</div>`);
    (services["DOJID"] || []).forEach(s => col3.innerHTML += `<div class="card">${s}</div>`);
  }
}

function toggleSettings(){
  const sec = document.getElementById("settingsSection");
  sec.style.display = (sec.style.display==="block")?"none":"block";
}

function logout(){
  localStorage.removeItem("currentUser");
  window.location.href="index.html";
}

function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior: 'smooth'});
}

// تنفيذ Dashboard عند وجود الأعمدة
if(document.getElementById("servicesCol1")) loadDashboard();
