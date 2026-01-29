const jobSelect = document.getElementById("job");
const jobDetails = document.getElementById("jobDetails");
const extraJobDetails = document.getElementById("extraJobDetails");
const submitBtn = document.getElementById("submitBtn");
const demoBtn = document.getElementById("demoBtn");
const fileInput = document.getElementById("idImage");
const idExample = document.getElementById("idExample");
const messageDiv = document.getElementById("message");

let faceDetected = false;

// الرتب لكل وزارة (القائمة الأصلية)
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
    "جراح","جراح مساعد","نائب وزير الصحة","وزير الصحة","مدير مستشفى","نائب مدير مستشفى",
    "إدارة القبول والتسجيل"
  ],
  "وزارة العدل": [
    "قاضي","قاضي متمرس","محامي","محامي متمرس","قاضي محكمة عليا",
    "مستشار وزير العدل","نائب وزير العدل","وزير العدل","إدارة القبول والتسجيل"
  ]
};

// المنصب الإضافي يرجع نفس المنصب الرئيسي + خيار "لا يوجد"
jobSelect.addEventListener("change", function(){
  const selected = this.value;
  jobDetails.innerHTML = '<option value="">اختر المنصب</option>';
  extraJobDetails.innerHTML = '<option value="none">لا يوجد</option>';

  if(jobOptions[selected]){
    jobOptions[selected].forEach(opt=>{
      // المنصب الرئيسي
      const option1 = document.createElement("option");
      option1.value = opt;
      option1.textContent = opt;
      jobDetails.appendChild(option1);

      // المنصب الإضافي
      const option2 = document.createElement("option");
      option2.value = opt;
      option2.textContent = opt;
      extraJobDetails.appendChild(option2);
    });

    jobDetails.classList.remove("hidden");
    extraJobDetails.classList.remove("hidden");
  } else {
    jobDetails.classList.add("hidden");
    extraJobDetails.classList.add("hidden");
  }
});

// باقي السكربت كما هو (Face Detection، التحذيرات، حفظ البيانات)
