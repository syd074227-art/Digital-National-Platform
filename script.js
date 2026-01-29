const jobSelect = document.getElementById("job");
const jobDetails = document.getElementById("jobDetails");
const submitBtn = document.getElementById("submitBtn");
const demoBtn = document.getElementById("demoBtn");

const jobOptions = {
  "وزارة الداخلية": ["جندي","جندي أول","عريف","وكيل رقيب","رقيب","رقيب أول","رئيس رقباء","ملازم","ملازم أول","نقيب","رائد","مقدم","عقيد","عميد","لواء","فريق","فريق أول","نائب مدير الأمن العام","مدير الأمن العام","نائب وزير الداخلية","وزير الداخلية"],
  "وزارة الصحة": ["مسعف","دكتور عام","دكتور","دكتور متمرس","طبيب عام","استشاري","مدرب صحي","أخصائي","منسوبي الهلال الأحمر","مسؤول مدربين الصحة","نائب مسؤول مدربين الصحة","نائب مسؤول الهلال الأحمر","مسؤول الهلال الأحمر","جراح","جراح مساعد","إدارة الشؤون الصحية","نائب وزير الصحة","وزير الصحة","مدير مستشفى","نائب مدير مستشفى"],
  "وزارة العدل": ["قاضي","قاضي متمرس","محامي","محامي متمرس","قاضي محكمة عليا","إدارة الشؤون العدلية","مستشار وزير العدل","نائب وزير العدل","وزير العدل"]
};

// عرض خيارات كل وزارة
jobSelect.addEventListener("change", function(){
  const selected = this.value;
  jobDetails.innerHTML = '<option value="">اختر الوظيفة</option>';
  if(jobOptions[selected]){
    jobOptions[selected].forEach(opt=>{
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      jobDetails.appendChild(option);
    });
    jobDetails.classList.remove("hidden");
  } else {
    jobDetails.classList.add("hidden");
  }
});

// طلب تفعيل الهوية
submitBtn.addEventListener("click", function(){
  const user = {
    name: document.getElementById("fullName").value,
    age: document.getElementById("age").value,
    job: jobSelect.value,
    jobDetails: jobDetails.value,
    discord: document.getElementById("discord").value,
    mapId: document.getElementById("mapId").value,
    status: "pending"
  };

  const fileInput = document.getElementById("idImage");
  if(fileInput.files.length > 0){
    const reader = new FileReader();
    reader.onload = function(){
      user.image = reader.result;
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("✅ تم إرسال طلب المراجعة، يرجى انتظار الموافقة من الإدارة");
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    alert("⚠️ الرجاء رفع صورة هويتك");
  }
});

// تسجيل الدخول التجريبي
demoBtn.addEventListener("click", function(){
  const demoUser = { name:"تجريبي", status:"approved", image:"" };
  localStorage.setItem("currentUser", JSON.stringify(demoUser));
  window.location.href = "main.html";
});
