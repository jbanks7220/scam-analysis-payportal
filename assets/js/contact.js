const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.classList.remove("hidden");
    status.textContent = "Sending...";

    const formData = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        status.textContent = "Message sent successfully. Response within 24–48 hours.";
        status.classList.add("text-green-400");
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.textContent = "Something went wrong. Please try again.";
      status.classList.add("text-red-400");
    }
  });
}
