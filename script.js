const jobSelect = document.getElementById("job");
const jobDetails = document.getElementById("jobDetails");
const extraJobDetails = document.getElementById("extraJobDetails");
const submitBtn = document.getElementById("submitBtn");
const demoBtn = document.getElementById("demoBtn");
const fileInput = document.getElementById("idImage");
const idExample = document.getElementById("idExample");
const messageDiv = document.getElementById("message");

let faceDetected = false;

// الرتب لكل وزارة
const jobOptions = {
  "وزارة الداخلية": [
    "جندي","جندي أول","عريف","وكيل رقيب","رقيب","رقيب أول","رئيس رقباء",
    "ملازم","ملازم أول","نقيب","رائد","مقدم","عقيد","عميد","لواء",
    "فريق","فريق أول","نائب مدير الأمن العام","مدير الأمن العام","نائب وزير الداخلية",
    "وزير الداخلية"
  ],
  "وزارة الصحة": [
    "مسعف","دكتور عام","دكتور","دكتور متمرس","طبيب عام","استشاري",
    "مدرب صحي","أخصائي","منسوبي الهلال الأحمر","مسؤول مدربين الصحة",
    "نائب مسؤول مدربين الصحة","نائب مسؤول الهلال الأحمر","مسؤول الهلال الأحمر",
    "جراح","جراح مساعد","نائب وزير الصحة","وزير الصحة","مدير مستشفى","نائب مدير مستشفى"
  ],
  "وزارة العدل": [
    "قاضي","قاضي متمرس","محامي","محامي متمرس","قاضي محكمة عليا",
    "مستشار وزير العدل","نائب وزير العدل","وزير العدل"
  ]
};

// المناصب الإضافية حسب الوزارة
const extraJobOptions = {
  "وزارة الداخلية": [
    "إدارة القبول والتجنيد",
    "إدارة شؤون الداخلية",
    "إدارة شؤون الأفراد",
    "سلك الضباط"
  ],
  "وزارة الصحة": [
    "إدارة القبول والتسجيل",
    "إدارة الشؤون الصحية",
    "مسؤول الشؤون الصحية",
    "إدارة متطوعين الهلال الأحمر",
    "مسؤول الترقيات الصحية",
    "إدارة الشكاوي بوزارة الصحة",
    "إدارة الكلية الصحية"
  ],
  "وزارة العدل": [
    "إدارة القبول والتسجيل",
    "إدارة الشكاوي بوزارة العدل",
    "إدارة الشؤون العدلية"
  ]
};

// عند تغيير الوزارة
jobSelect.addEventListener("change", function(){
  const selected = this.value;
  jobDetails.innerHTML = '<option value="">اختر المنصب</option>';
  extraJobDetails.innerHTML = '<option value="none">لا يوجد</option>';

  if(jobOptions[selected]){
    jobOptions[selected].forEach(opt=>{
      const option1 = document.createElement("option");
      option1.value = opt;
      option1.textContent = opt;
      jobDetails.appendChild(option1);
    });
    if(extraJobOptions[selected]){
      extraJobOptions[selected].forEach(opt=>{
        const option2 = document.createElement("option");
        option2.value = opt;
        option2.textContent = opt;
        extraJobDetails.appendChild(option2);
      });
    }
    jobDetails.classList.remove("hidden");
    extraJobDetails.classList.remove("hidden");
  } else {
    jobDetails.classList.add("hidden");
    extraJobDetails.classList.add("hidden");
  }
});

// تحميل Face API
async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  console.log("Face API جاهز");
}
loadModels();

// التحقق من الوجه عند رفع الصورة
fileInput.addEventListener("change", async function() {
  faceDetected = false;
  if(fileInput.files && fileInput.files[0]){
    const reader = new FileReader();
    reader.onload = async function(e){
      idExample.src = e.target.result;
      const img = new Image();
      img.src = e.target.result;
      img.onload = async () => {
        const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions());
        if(!detection){
          faceDetected = false;
          showError("⚠️ لم يتم العثور على وجه واضح في الصورة، يرجى رفع صورة مع الوجه واضح!");
        } else {
          faceDetected = true;
          console.log("الوجه واضح ✅");
        }
      }
    }
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    faceDetected = false;
    idExample.src = "https://image2url.com/r2/default/images/1769695282320-2ade9dfa-ea7d-4f34-b1f5-81fd757f4464.jpeg";
  }
});

// عرض رسالة التحذير
function showError(msg){
  messageDiv.textContent = "⚠️ " + msg;
  messageDiv.id = "error-msg";
  messageDiv.classList.remove("hidden");

  setTimeout(()=>{
    messageDiv.className = "hidden";
    messageDiv.id = "";
    messageDiv.textContent = "";
  }, 4500);
}

// زر تفعيل الهوية
submitBtn.addEventListener("click", function(){
  if(!faceDetected){
    showError("⚠️ لا يمكن إرسال الطلب، يجب رفع صورة تحتوي على الوجه بوضوح!");
    return;
  }

  const fullName = document.getElementById("fullName").value.trim();
  const age = document.getElementById("age").value.trim();
  const job = jobSelect.value;
  const jobPos = jobDetails.value;
  const extraJobPos = extraJobDetails.value;
  const discord = document.getElementById("discord").value.trim();
  const mapId = document.getElementById("mapId").value.trim();

  let errorMsg = "";
  if(!fullName) errorMsg += "⚠️ يرجى كتابة اسمك الكامل\n";
  if(!age) errorMsg += "⚠️ يرجى كتابة العمر\n";
  if(!job) errorMsg += "⚠️ يرجى اختيار مهنتك\n";
  if(job && !jobPos) errorMsg += "⚠️ يرجى اختيار المنصب\n";
  if(!discord) errorMsg += "⚠️ يرجى كتابة اسمك في Discord\n";
  if(!mapId) errorMsg += "⚠️ يرجى كتابة رقم الهوية بالماب (مثال [39193738])\n";
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
    extraJobDetails: extraJobPos !== "none" ? extraJobPos : null,
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

// زر دخول تجريبي
demoBtn.addEventListener("click", function(){
  const demoUser = { name:"تجريبي", status:"approved", image:"" };
  localStorage.setItem("currentUser", JSON.stringify(demoUser));
  alert("✅ دخول تجريبي");
});
