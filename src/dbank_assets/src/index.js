import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {
  update();
});

document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault; //to keep the submit

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(
      document.getElementById("input-amount").value
    );
    const outputAmount = parseFloat(
      document.getElementById("withdrawal-amount").value
    );

    button.disabled = true;
    if (document.getElementById("input-amount").value.length != 0) {
      await dbank.topUp(inputAmount);
    }
    update();
    if (document.getElementById("withdrawal-amount").value.length != 0) {
      await dbank.withdraw(outputAmount);
    }
    update();
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";

    button.disabled = false;
  });

async function update() {
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
}
