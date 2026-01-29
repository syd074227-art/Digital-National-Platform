// ==============================
// Users + تسجيل الدخول + Dashboard
// ==============================

// جلب قائمة المستخدمين من localStorage أو إنشاء مصفوفة جديدة
let users = JSON.parse(localStorage.getItem("users")) || [];

// إنشاء حساب Owner تلقائيًا إذا لم يكن موجود
if (!users.find(u => u.id === "Owner")) {
    users.push({ id: "Owner", pass: "050910", role: "Owner" });
    localStorage.setItem("users", JSON.stringify(users));
}

// ==============================
// وظيفة تسجيل الدخول
// ==============================
function login() {
    const id = document.getElementById("id").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const err = document.getElementById("err");

    const user = users.find(u => u.id === id && u.pass === pass);

    if (!user) {
        // ظهور رسالة الخطأ 3 ثوانٍ مع نبض
        err.style.display = "block";
        err.innerText = "الهوية أو كلمة المرور غير صحيحة. يرجى التواصل مع إدارة السيرفر لإنشاء الهوية.";
        setTimeout(() => err.style.display = "none", 3000);
        return;
    }

    // حفظ المستخدم الحالي
    localStorage.setItem("currentUser", JSON.stringify(user));

    // الانتقال إلى Dashboard
    window.location.href = "dashboard.html";
}

// ==============================
// وظيفة تحميل Dashboard
// ==============================
function loadDashboard() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    // عرض الترحيب والوظيفة
    document.getElementById("welcome").innerText = "مرحبا، " + user.id;
    document.getElementById("userRole").innerText = user.role;

    // إظهار إعدادات فقط للمستخدمين الأعلى رتبة
    if (["Admin-2", "Owner"].includes(user.role)) {
        document.querySelectorAll(".adminOnly").forEach(el => el.style.display = "block");
    }

    // تعريف الخدمات لكل وزارة
    const services = {
        "MOAid": ["خدمة عامة 1", "خدمة عامة 2", "خدمة عامة 3"],
        "MOHID": ["خدمة صحية 1", "خدمة صحية 2"],
        "DOJID": ["خدمة عدلية 1", "خدمة عدلية 2"],
        "Admin-1": ["إدارة محدودة"],
        "Admin-2": ["إدارة كاملة", "عرض المستخدمين"],
        "Owner": ["التحكم الكامل بالنظام"]
    };

    // الأعمدة في Dashboard
    const col1 = document.getElementById("servicesCol1");
    const col2 = document.getElementById("servicesCol2");
    const col3 = document.getElementById("servicesCol3");

    if (col1 && col2 && col3) {
        col1.innerHTML = "";
        col2.innerHTML = "";
        col3.innerHTML = "";

        // تعبئة الأعمدة حسب الوزارة
        (services["MOAid"] || []).forEach(s => col1.innerHTML += `<div class="card">${s}</div>`);
        (services["MOHID"] || []).forEach(s => col2.innerHTML += `<div class="card">${s}</div>`);
        (services["DOJID"] || []).forEach(s => col3.innerHTML += `<div class="card">${s}</div>`);
    }
}

// ==============================
// إعدادات منبثقة
// ==============================
function toggleSettings() {
    const sec = document.getElementById("settingsSection");
    sec.style.display = (sec.style.display === "block") ? "none" : "block";
}

// ==============================
// تسجيل الخروج
// ==============================
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// ==============================
// تنفيذ Dashboard عند تحميل الصفحة
// ==============================
if (document.getElementById("servicesCol1")) {
    loadDashboard();
}
