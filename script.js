// Work on the animation first to get use to it

let selectedTip = null;

const buttons = document.querySelectorAll(".tip-button");
const customPercent = document.querySelector(".tip-custom");

function tipButtons() {
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const isActive = button.classList.contains("active");

			// Remove active from all buttons to avoid multiple pick
			buttons.forEach((btn) => btn.classList.remove("active"));
			customPercent.value = "";

			// If the button is NOT using the class active then activate it
			if (!isActive) {
				button.classList.add("active");
				selectedTip = button.dataset.tip;
			} else {
				selectedTip = null;
			}

			totalInformation();
		});
	});
}

function customTip() {
	customPercent.addEventListener("input", () => {
		const custom = Number(customPercent.value);

		buttons.forEach((btn) => btn.classList.remove("active"));

		if (custom <= 0) {
			document.querySelector(".tip-total").textContent = "$0.00";
			document.getElementById("person-total").textContent = "$0.00";
			selectedTip = null;
			return;
		} else {
			selectedTip = custom / 100;
		}

		totalInformation();
	});
}

// Input field needs to return red border when an invalid inputis entered
function inputVerifier() {
	const inputFocus = document.querySelectorAll(
		".bill-placeholder, .people-placeholder, .tip-custom",
	);

	inputFocus.forEach((focus) => {
		focus.addEventListener("input", () => {
			if (focus.value === "" || focus.value <= 0) {
				focus.style.border = "2px solid red";
				document.querySelector(".tip-total").textContent = "$0.00";
				document.getElementById("person-total").textContent = "$0.00";
			} else {
				focus.style.border = "2px solid #26c2ad";
			}

			totalInformation();
		});
	});
}

// Calculate the received bill and tip %
// get tip then multiply the answer to the bill
function totalInformation() {
	const peopleInput = document.querySelector(".people-placeholder");
	const people = Number(peopleInput.value);

	const billInput = document.getElementById("bill");
	const bill = Number(billInput.value);

	if (!bill || !selectedTip || !people) {
		return;
	}

	const billPerPerson = bill / people;
	const tip = billPerPerson * selectedTip;

	const total = tip + billPerPerson;

	const tipDisplay = document.querySelector(".tip-total");
	tipDisplay.textContent = `${tip.toFixed(2)}`;

	const totalDisplay = document.getElementById("person-total");
	totalDisplay.textContent = `${total.toFixed(2)}`;
}

function reset() {
	const resetButton = document.querySelector(".button-reset");

	resetButton.addEventListener("click", () => {
		selectedTip = null;

		document.querySelector(".tip-custom").value = "";
		document.querySelector(".bill-placeholder").value = "";
		document.querySelector(".people-placeholder").value = "";

		document
			.querySelectorAll(".tip-button")
			.forEach((btn) => btn.classList.remove("active"));

		// Reset the border colors
		document
			.querySelectorAll(".bill-placeholder, .people-placeholder, .tip-custom")
			.forEach((input) => {
				input.style.borderColor = "transparent";
			});

		document.querySelector(".tip-total").textContent = "$0.00";
		document.getElementById("person-total").textContent = "$0.00";
	});
}

function init() {
	tipButtons();
	inputVerifier();
	customTip();
	reset();
}
init();
