const stripe = Stripe("YOUR_STRIPE_PUBLIC_KEY");

document.querySelectorAll(".payment-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const amount = btn.dataset.amount;
    const product = btn.dataset.product;

    const res = await fetch("/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, product })
    });

    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  });
});
