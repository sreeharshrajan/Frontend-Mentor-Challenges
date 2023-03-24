const submit = document.querySelector(".email__submit")
const error = document.querySelector(".form__error")
const form = document.querySelector("form")
const input = document.querySelector(".email__input")
const label = document.querySelector(".form__error-icon")

form.addEventListener("submit", validate)
submit.addEventListener("click", validate)

function validate(e) {
  e.preventDefault()

  const inputValue = input.value.trim()

  if (!isEmail(inputValue)) {
    error.style.display = "block"
    label.style.display = "block"
    form.style.border = "2px solid var(--color-error)"
    submit.style.backgroundImage = "var(--gradient-error)"
    submit.style.outline = "3px solid hsl(358, 76%, 92%)"
    submit.style.boxShadow = "var(--box-shadow-error)"


  } else {
    error.style.display = "none"
    label.style.display = "none"
    form.style.border = "1px solid var(--color-gray)"
    submit.style.backgroundImage = "var(--gradient-submit)"
  }
}

function isEmail(input) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)
}