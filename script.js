let requests = JSON.parse(localStorage.getItem("requests")) || [];

// معاينة الصورة
function previewImage(event){
    const preview = document.getElementById("preview");
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(){
            preview.src = reader.result;
            preview.style.display = "block";
        }
        reader.readAsDataURL(file);
    }
}

// تحديث الوظائف حسب المهنة
const professionSelect = document.getElementById("profession");
const roleSelect = document.getElementById("role");

professionSelect.addEventListener("change", function(){
    const profession = this.value;
    let roles = [];

    if(profession === "وزارة الداخلية"){
        roles = ["جندي","جندي أول","عريف","وكيل رقيب","رقيب","رقيب أول","رئيس رقباء","ملازم","ملازم أول","نقيب","رائد","مقدم","عقيد","عميد","لواء","فريق","فريق أول","نائب مدير الأمن العام","مدير الأمن العام","نائب الوزير الداخلية","وزير الداخلية"];
    } else if(profession === "وزارة الصحة"){
        roles = ["مسعف","دكتور عام","دكتور","دكتور متمرس","طبيب عام","استشاري","مدرب صحي","أخصائي","منسوبي الهلال الأحمر","مسؤول مدربين الصحة","نائب مسؤول مدربين الصحة","نائب مسؤول الهلال الأحمر","مسؤول الهلال الأحمر","جراح","جراح مساعد","إدارة الشؤون الصحية","نائب وزير الصحة","وزير الصحة","مدير مستشفى","نائب مدير مستشفى"];
    } else if(profession === "وزارة العدل"){
        roles = ["قاضي","قاضي متمرس","محامي","محامي متمرس","قاضي محكمة عليا","إدارة الشؤون العدلية","مستشار وزير العدل","نائب وزير العدل","وزير العدل"];
    }

    if(roles.length > 0){
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
        roleSelect.innerHTML = "";
    }
});

// إرسال طلب التفعيل → الانتقال لصفحة التأكيد
function submitRequest(){
    const fullName = document.getElementById("fullName").value.trim();
    const age = document.getElementById("age").value.trim();
    const userID = document.getElementById("userID").value.trim();
    const discordUsername = document.getElementById("discordUsername").value.trim();
    const profession = professionSelect.value;
    const role = roleSelect.value;
    const picInput = document.getElementById("profilePic");
    const err = document.getElementById("err");

    if(!fullName || !age || !userID || !discordUsername || !profession || (roleSelect.style.display !== "none" && !role) || picInput.files.length === 0){
        err.style.display = "block";
        err.innerText = "يرجى تعبئة كل المعلومات المطلوبة ورفع الصورة.";
        setTimeout(()=>err.style.display="none",3000);
        return;
    }

    const file = picInput.files[0];
    const reader = new FileReader();
    reader.onload = function(){
        const picData = reader.result;

        const request = {
            id: userID,
            name: fullName,
            age: age,
            discordUsername: discordUsername,
            profession: profession,
            role: role || "مواطن",
            profilePic: picData,
            status: "pending"
        };

        requests.push(request);
        localStorage.setItem("requests", JSON.stringify(requests));

        // الانتقال لصفحة التأكيد بعد حفظ البيانات
        window.location.href = "confirmation.html";
    }
    reader.readAsDataURL(file);
}
