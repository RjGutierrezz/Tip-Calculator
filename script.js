// Work on the animation first to get use to it

let selectedTip = null;

function tipButtons() {
	const buttons = document.querySelectorAll(".tip-button");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const isActive = button.classList.contains("active");

			// Remove active from all buttons to avoid multiple pick
			buttons.forEach((btn) => btn.classList.remove("active"));

			// If the button is NOT using the class active then activate it
			if (!isActive) {
				button.classList.add("active");
        selectedTip = button.dataset.tip;
			}

      totalInformation();
		});
	});
}
tipButtons();


// Input field needs to return red border when an invalid inputis entered
function inputVerifier() {
  const inputFocus = document.querySelectorAll(".bill-placeholder, .people-placeholder");
  
  inputFocus.forEach((focus) => {
    focus.addEventListener("input", () => {
      if (focus.value === '' || focus.value <= 0) {
        focus.style.border = "2px solid red";
      } else {
        focus.style.border = "2px solid #26c2ad"
      }
    })
  })

}
inputVerifier();


// Calculate the received bill and tip %
// get tip then multiply the answer to the bill
function totalInformation() {
  const billInput = document.getElementById('bill');
  const bill = Number(billInput.value)

  if (!bill || !selectedTip) {
    return
  }

  const total = bill * selectedTip;

  const totalDisplay = document.querySelector(".tip-total")
  totalDisplay.textContent = `${total.toFixed(2)}`;
}
