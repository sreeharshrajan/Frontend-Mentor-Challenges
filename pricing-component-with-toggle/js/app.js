const result = document.querySelector('.pricing-container');
const togglePriceInputs = Array.from(document.querySelectorAll('[name="pay-type"]'));

function toggleMonthly() {
  result.classList.toggle('js-show-monthly');
}

togglePriceInputs.forEach(input => input.addEventListener('input', () => toggleMonthly()));
