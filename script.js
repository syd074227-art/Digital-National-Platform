const jobSelect = document.getElementById("job");
const jobDetails = document.getElementById("jobDetails");
const extraJobDetails = document.getElementById("extraJobDetails");

const jobOptions = {
  "وزارة الداخلية": ["جندي","جندي أول","عريف","وكيل رقيب","رقيب","رقيب أول","رئيس رقباء","ملازم","ملازم أول","نقيب","رائد","مقدم","عقيد","عميد","لواء","فريق","فريق أول","نائب مدير الأمن العام","مدير الأمن العام","نائب وزير الداخلية","وزير الداخلية"],
  "وزارة الصحة": ["مسعف","دكتور عام","دكتور","دكتور متمرس","طبيب عام","استشاري","مدرب صحي","أخصائي","منسوبي الهلال الأحمر","مسؤول مدربين الصحة","نائب مسؤول مدربين الصحة","نائب مسؤول الهلال الأحمر","مسؤول الهلال الأحمر","جراح","جراح مساعد","نائب وزير الصحة","وزير الصحة","مدير مستشفى","نائب مدير مستشفى"],
  "وزارة العدل": ["قاضي","قاضي متمرس","محامي","محامي متمرس","قاضي محكمة عليا","مستشار وزير العدل","نائب وزير العدل","وزير العدل"]
};

const extraJobOptions = {
  "وزارة الداخلية": ["إدارة القبول والتجنيد","إدارة شؤون الداخلية","إدارة شؤون الأفراد","سلك الضباط"],
  "وزارة الصحة": ["إدارة القبول والتسجيل","إدارة الشؤون الصحية","مسؤول الشؤون الصحية","إدارة متطوعين الهلال الأحمر","مسؤول الترقيات الصحية","إدارة الشكاوي بوزارة الصحة","إدارة الكلية الصحية"],
  "وزارة العدل": ["إدارة القبول والتسجيل","إدارة الشكاوي بوزارة العدل","إدارة الشؤون العدلية"]
};

jobSelect.addEventListener("change", function(){
  const selected = this.value;

  jobDetails.innerHTML = '<option value="">اختر المنصب</option>';
  extraJobDetails.innerHTML = '';

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
