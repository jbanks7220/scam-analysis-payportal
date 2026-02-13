document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".payment-btn");

  buttons.forEach(button => {
    button.addEventListener("click", async function () {

      const amount = this.getAttribute("data-amount");
      const product = this.getAttribute("data-product");

      try {
        const response = await fetch("/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount, product })
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          alert("Payment initialization failed.");
        }

      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      }

    });
  });

});
