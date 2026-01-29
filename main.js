// جلب المستخدم الحالي من LocalStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const usernameDisplay = document.getElementById("username-display");
if(currentUser){
    usernameDisplay.innerText = `مرحباً، ${currentUser.name}`;
}else{
    // إذا لم يوجد مستخدم، العودة لتسجيل الدخول
    window.location.href = "index.html";
}

// تسجيل الخروج
function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
