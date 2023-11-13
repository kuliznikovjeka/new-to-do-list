const calculationDropdown = document.querySelector('.calculation__dropdown');
const calculationSelect = document.querySelector('.calculation__select');
const calculationCaret = document.querySelector('.calculation__caret');
const calculationList = document.querySelector('.calculation__list');
const calculationOptions = document.querySelectorAll('.calculation__item');
const calculationSelected = document.querySelector('.calculation__selected');

calculationSelect.addEventListener('click', () => {
	calculationSelect.classList.toggle('select-clicked');
	calculationCaret.classList.toggle('caret-rotate');
	calculationList.classList.toggle('menu-open');
});

calculationOptions.forEach(option => {
	option.addEventListener('click', () => {
		calculationSelected.innerText = option.innerText;
		calculationSelect.classList.remove('select-clicked');
		calculationCaret.classList.remove('caret-rotate');
		calculationList.classList.remove('menu-open');
	});
	calculationOptions.forEach(option => {
		option.classList.remove('active');
		option.classList.add('active');
	});
})