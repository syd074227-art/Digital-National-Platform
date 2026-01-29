let requests = JSON.parse(localStorage.getItem("requests")) || [];

// معاينة الصورة
function previewImage(event) {
  const preview = document.getElementById("preview");
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    preview.src = reader.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

// الوظائف حسب الجهة
const professionSelect = document.getElementById("profession");
const roleSelect = document.getElementById("role");

professionSelect.addEventListener("change", () => {
  let roles = [];

  if (professionSelect.value === "وزارة الداخلية") {
    roles = ["جندي","جندي أول","عريف","وكيل رقيب","رقيب","رقيب أول","رئيس رقباء","ملازم","ملازم أول","نقيب","رائد","مقدم","عقيد","عميد","لواء","فريق","فريق أول","مدير الأمن العام","وزير الداخلية"];
  }

  if (professionSelect.value === "وزارة الصحة") {
    roles = ["مسعف","دكتور","استشاري","جراح","إدارة الشؤون الصحية","وزير الصحة","مدير مستشفى"];
  }

  if (professionSelect.value === "وزارة العدل") {
    roles = ["قاضي","محامي","قاضي محكمة عليا","نائب وزير العدل","وزير العدل"];
  }

  if (roles.length > 0) {
    roleSelect.style.display = "block";
    roleSelect.innerHTML = "<option value=''>اختر الوظيفة</option>";
    roles.forEach(r => {
      const opt = document.createElement("option");
      opt.value = r;
      opt.textContent = r;
      roleSelect.appendChild(opt);
    });
  } else {
    roleSelect.style.display = "none";
  }
});

// إرسال الطلب
function submitRequest() {
  const fullName = document.getElementById("fullName").value.trim();
  const age = document.getElementById("age").value.trim();
  const userID = document.getElementById("userID").value.trim();
  const discord = document.getElementById("discordUsername").value.trim();
  const pic = document.getElementById("profilePic").files[0];
  const err = document.getElementById("err");

  if (!fullName || !age || !userID || !discord || !pic || !professionSelect.value) {
    err.style.display = "block";
    err.innerText = "يرجى تعبئة جميع الحقول ورفع الصورة";
    setTimeout(() => err.style.display = "none", 3000);
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    requests.push({
      id: userID,
      name: fullName,
      age,
      discord,
      profession: professionSelect.value,
      role: roleSelect.value || "",
      image: reader.result,
      status: "pending"
    });

    localStorage.setItem("requests", JSON.stringify(requests));
    window.location.href = "confirmation.html";
  };

  reader.readAsDataURL(pic);
}
