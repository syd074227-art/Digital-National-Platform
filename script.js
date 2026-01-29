let users = JSON.parse(localStorage.getItem("users")) || [];

// إنشاء حساب Owner تلقائيًا
if (!users.find(u => u.id === "Owner")) {
  users.push({
    id: "Owner",
    pass: "050910",
    role: "Owner"
  });
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
      "الهوية أو كلمة المرور غير صحيحة.<br>يرجى التواصل مع إدارة السيرفر لإنشاء هوية.";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.id === "Owner") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "dashboard.html";
  }
}
