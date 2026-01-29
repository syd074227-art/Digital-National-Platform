// تحقق المستخدم
const user = JSON.parse(localStorage.getItem("currentUser"));
if(!user || user.status !== "approved"){
  alert("لم يتم تفعيل الهوية بعد");
  window.location.href="index.html";
}

document.getElementById("userName").innerText = user.name;
if(user.image) document.getElementById("userImage").src = user.image;

// زر الخدمات يظهر الكروت
function toggleServices() {
  const container = document.getElementById("servicesContainer");
  container.classList.toggle("hidden");
}

// فتح / غلق الخدمات الفرعية لكل وزارة
function toggleSub(id){
  const el = document.getElementById(id);
  el.classList.toggle("hidden");
}

// الإعدادات
function toggleSettings(){
  document.getElementById("settingsMenu").classList.toggle("hidden");
}

// البحث عن أي خدمة
function searchServices(){
  const filter = document.getElementById("searchInput").value.toLowerCase();
  const services = document.querySelectorAll(".service-card, .sub-services div");
  services.forEach(s => {
    if(s.innerText.toLowerCase().includes(filter)){
      s.style.display = "block";
    } else {
      s.style.display = "none";
    }
  });
}
