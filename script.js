const form = document.querySelector("#feedback-form");
const message = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const ratingFeedback = document.querySelector("#rating-feedback");
const formContent = document.querySelector("#form-content");
const successPanel = document.querySelector("#success-panel");
const formStatus = document.querySelector("#form-status");
message.addEventListener("input", () => {
    characterCount.textContent = `${message.value.length} / ${message.maxLength}`;
});
const db = supabase.createClient("https://ckghzgvllutzhkbnwrfs.supabase.co", "sb_publishable_tlCwTgc5dQVYW2FMA6yqmA_iF7EE_t2");

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
const { error } = await db.from("feedback_form").insert({
  name: data.get("name"),
  email: data.get("email"),
  message: data.get("message"),
});
  alert(error ? "Something went wrong" : "Thank you for your feedback!");
  alert(error ? error.message : "Thank you for your feedback!");
});
form.addEventListener("change", (event) => {
    if (event.target.name === "message") {
        ratingFeedback.textContent = ratingMessages[message];
    }
    formStatus.textContent = "";
});
form.addEventListener("input", () => {
    formStatus.textContent = "";
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) {
        return;
    }
    const name = form.elements.name.value.trim();
    document.querySelector("#success-name").textContent = name.split(/\s+/)[0] || "there";
    formContent.hidden = true;
    successPanel.classList.add("is-visible");
    document.querySelector("#send-another").focus();
});
document.querySelector("#send-another").addEventListener("click", () => {
    form.reset();
    characterCount.textContent = `0 / ${message.maxLength}`;
    ratingFeedback.textContent = "";
    formStatus.textContent = "";
    successPanel.classList.remove("is-visible");
    formContent.hidden = false;
    document.querySelector("#name").focus();
});
