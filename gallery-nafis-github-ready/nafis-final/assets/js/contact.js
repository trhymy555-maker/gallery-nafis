(() => {
const form=document.querySelector("#contact-form"),status=document.querySelector("#form-status");
if(!form)return;
form.addEventListener("submit",async e=>{
 e.preventDefault();if(!form.reportValidity())return;
 const data=new FormData(form);
 const subject=`[گالری نفیس] ${data.get("subject")}`;
 const body=`نام: ${data.get("name")}\nایمیل: ${data.get("email")}\nموضوع: ${data.get("subject")}\n\n${data.get("message")}`;
 try{await navigator.clipboard.writeText(`موضوع: ${subject}\n\n${body}`);status.textContent="متن پیام کپی شد؛ می‌توانید آن را برای گالری ارسال کنید."}
 catch(err){status.textContent="فرم اعتبارسنجی شد، اما کپی خودکار در این مرورگر در دسترس نیست. متن پیام را انتخاب و کپی کنید.";const area=document.createElement("textarea");area.value=`موضوع: ${subject}\n\n${body}`;area.readOnly=true;area.style.width="100%";area.style.minHeight="130px";form.appendChild(area);area.focus();area.select()}
});
})();