const form = document.querySelector("#feedback-form");
const message = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const ratingFeedback = document.querySelector("#rating-feedback");
const formContent = document.querySelector("#form-content");
const successPanel = document.querySelector("#success-panel");
const formStatus = document.querySelector("#form-status");
const ratingMessages = ["Sorry to hear that", "Could be better", "It was okay", "Pretty good", "Loved it"];
message.addEventListener("input", () => {
    characterCount.textContent = `${message.value.length} / ${message.maxLength}`;
});
form.addEventListener("change", (event) => {
    if (event.target.name === "rating") {
        ratingFeedback.textContent = ratingMessages[Number(event.target.value) - 1];
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