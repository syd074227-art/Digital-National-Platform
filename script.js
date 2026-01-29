const jobSelect = document.getElementById("job");
const jobDetails = document.getElementById("jobDetails");
const submitBtn = document.getElementById("submitBtn");
const demoBtn = document.getElementById("demoBtn");
const messageDiv = document.getElementById("message");
const fileInput = document.getElementById("idImage");
const idExample = document.getElementById("idExample");

const jobOptions = {
  "وزارة الداخلية": ["جندي","جندي أول","عريف","وكيل رقيب","رقيب","رقيب أول","رئيس رقباء","ملازم","ملازم أول","نقيب","رائد","مقدم","عقيد","عميد","لواء","فريق","فريق أول","نائب مدير الأمن العام","مدير الأمن العام","نائب وزير الداخلية","وزير الداخلية"],
  "وزارة الصحة": ["مسعف","دكتور عام","دكتور","دكتور متمرس","طبيب عام","استشاري","مدرب صحي","أخصائي","منسوبي الهلال الأحمر","مسؤول مدربين الصحة","نائب مسؤول مدربين الصحة","نائب مسؤول الهلال الأحمر","مسؤول الهلال الأحمر","جراح","جراح مساعد","إدارة الشؤون الصحية","نائب وزير الصحة","وزير الصحة","مدير مستشفى","نائب مدير مستشفى"],
  "وزارة العدل": ["قاضي","قاضي متمرس","محامي","محامي متمرس","قاضي محكمة عليا","إدارة الشؤون العدلية","مستشار وزير العدل","نائب وزير العدل","وزير العدل"]
};

// عرض خيارات كل وزارة
jobSelect.addEventListener("change", function(){
  const selected = this.value;
  jobDetails.innerHTML = '<option value="">اختر المنصب</option>';
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

// عرض صورة الهوية المرفوعة
fileInput.addEventListener("change", function(){
  if(fileInput.files && fileInput.files[0]){
    const reader = new FileReader();
    reader.onload = function(e){
      idExample.src = e.target.result;
    }
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    idExample.src = "https://image2url.com/r2/default/images/1769695282320-2ade9dfa-ea7d-4f34-b1f5-81fd757f4464.jpeg";
  }
});

// طلب تفعيل الهوية
submitBtn.addEventListener("click", function(){
  const fullName = document.getElementById("fullName").value;
  const age = document.getElementById("age").value;
  const job = jobSelect.value;
  const jobPos = jobDetails.value;
  const discord = document.getElementById("discord").value;
  const mapId = document.getElementById("mapId").value;

  if(!fullName || !age || !job || !jobPos || !discord || !mapId || !fileInput.files.length){
    showError("⚠️ يرجى تعبئة جميع الحقول ورفع صورة الهوية");
    return;
  }

  const user = {
    name: fullName,
    age,
    job,
    jobDetails: jobPos,
    discord,
    mapId,
    status: "pending"
  };

  const reader = new FileReader();
  reader.onload = function(){
    user.image = reader.result;
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("✅ تم إرسال طلب المراجعة، يرجى انتظار الموافقة من الإدارة");
  };
  reader.readAsDataURL(fileInput.files[0]);
});

// عرض رسالة خطأ حمراء لمدة 3 ثواني
function showError(msg){
  messageDiv.textContent = msg;
  messageDiv.className = "";
  messageDiv.id = "error-msg";
  messageDiv.classList.remove("hidden");
  setTimeout(()=>{
    messageDiv.className = "hidden";
    messageDiv.id = "";
    messageDiv.textContent = "";
  }, 3000);
}

// تسجيل الدخول التجريبي
demoBtn.addEventListener("click", function(){
  const demoUser = { name:"تجريبي", status:"approved", image:"" };
  localStorage.setItem("currentUser", JSON.stringify(demoUser));
  window.location.href = "main.html";
});
