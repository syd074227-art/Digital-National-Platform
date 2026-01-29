const jobSelect = document.getElementById("job");
const jobDetails = document.getElementById("jobDetails");
const submitBtn = document.getElementById("submitBtn");
const demoBtn = document.getElementById("demoBtn");
const messageDiv = document.getElementById("message");
const fileInput = document.getElementById("idImage");
const idExample = document.getElementById("idExample");

// خيارات الوزارات بعد التعديل النهائي
const jobOptions = {
  "وزارة الداخلية": [
    "جندي","جندي أول","عريف","وكيل رقيب","رقيب","رقيب أول","رئيس رقباء",
    "ملازم","ملازم أول","نقيب","رائد","مقدم","عقيد","عميد","لواء",
    "فريق","فريق أول","نائب مدير الأمن العام","مدير الأمن العام","نائب وزير الداخلية",
    "وزير الداخلية","إدارة القبول والتجنيد"
  ],
  "وزارة الصحة": [
    "مسعف","دكتور عام","دكتور","دكتور متمرس","طبيب عام","استشاري",
    "مدرب صحي","أخصائي","منسوبي الهلال الأحمر","مسؤول مدربين الصحة",
    "نائب مسؤول مدربين الصحة","نائب مسؤول الهلال الأحمر","مسؤول الهلال الأحمر",
    "جراح","جراح مساعد","إدارة الشؤون الصحية","نائب وزير الصحة",
    "وزير الصحة","مدير مستشفى","نائب مدير مستشفى","إدارة القبول والتسجيل"
  ],
  "وزارة العدل": [
    "قاضي","قاضي متمرس","محامي","محامي متمرس","قاضي محكمة عليا",
    "إدارة الشؤون العدلية","مستشار وزير العدل","نائب وزير العدل",
    "وزير العدل","إدارة القبول والتسجيل"
  ]
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

// تحميل نماذج face-api
async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models'); // ضع مجلد models على موقعك
  console.log("Face API جاهز");
}
loadModels();

// تحقق من الوجه عند رفع الصورة
fileInput.addEventListener("change", async function() {
  if(fileInput.files && fileInput.files[0]){
    const reader = new FileReader();
    reader.onload = async function(e){
      idExample.src = e.target.result;

      const img = new Image();
      img.src = e.target.result;
      img.onload = async () => {
        const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions());
        if(!detection){
          showError("⚠️ لم يتم العثور على وجه واضح في الصورة، يرجى رفع صورة مع الوجه واضح!");
        } else {
          console.log("الوجه واضح ✅");
        }
      }
    }
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    idExample.src = "https://image2url.com/r2/default/images/1769695282320-2ade9dfa-ea7d-4f34-b1f5-81fd757f4464.jpeg";
  }
});

// طلب تفعيل الهوية
submitBtn.addEventListener("click", function(){
  const fullName = document.getElementById("fullName").value.trim();
  const age = document.getElementById("age").value.trim();
  const job = jobSelect.value;
  const jobPos = jobDetails.value;
  const discord = document.getElementById("discord").value.trim();
  const mapId = document.getElementById("mapId").value.trim();

  let errorMsg = "";
  if(!fullName) errorMsg += "⚠️ يرجى كتابة اسمك الكامل\n";
  if(!age) errorMsg += "⚠️ يرجى كتابة العمر\n";
  if(!job) errorMsg += "⚠️ يرجى اختيار مهنتك\n";
  if(job && !jobPos) errorMsg += "⚠️ يرجى اختيار المنصب\n";
  if(!discord) errorMsg += "⚠️ يرجى كتابة اسمك في Discord\n";
  if(!mapId) errorMsg += "⚠️ يرجى كتابة رقم الهوية بالماب (مثال [30919918])\n";
  if(!fileInput.files.length) errorMsg += "⚠️ يرجى رفع صورة الهوية مع الوجه\n";

  if(errorMsg){
    showError(errorMsg);
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

// عرض رسالة الخطأ 4.5 ثواني
function showError(msg){
  messageDiv.textContent = msg;
  messageDiv.className = "";
  messageDiv.id = "error-msg";
  messageDiv.classList.remove("hidden");
  setTimeout(()=>{
    messageDiv.className = "hidden";
    messageDiv.id = "";
    messageDiv.textContent = "";
  }, 4500);
}

// دخول تجريبي
demoBtn.addEventListener("click", function(){
  const demoUser = { name:"تجريبي", status:"approved", image:"" };
  localStorage.setItem("currentUser", JSON.stringify(demoUser));
  window.location.href = "main.html";
});
