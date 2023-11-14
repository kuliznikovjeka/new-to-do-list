import { HTML_ELEMENTS } from './html-elements.js';

HTML_ELEMENTS.FORM_HIGH_PRIORITY.addEventListener('submit', createTask);
HTML_ELEMENTS.FORM_LOW_PRIORITY.addEventListener('submit', createTask);

function createTask(event) {
	event.preventDefault();
	const target = event.target;

	const highPriorityInputValue = HTML_ELEMENTS.INPUT_HIGH_PRIORITY.value;
	const lowPriorityInputValue = HTML_ELEMENTS.INPUT_LOW_PRIORITY.value;

	const row = createElement('div', 'to-do__row');
	row.classList.add('to-do__row_p');
	const label = createElement('label', 'to-do__checkbox-label');
	const body = createElement('div', 'to-do__body');
	const checkbox = createElement('input', 'to-do__checkbox-input', '', 'checkbox');
	const customCheckbox = createElement('span', 'to-do__checkbox-custom');
	const text = createElement('p', 'to-do__text');
	const btnDelete = createElement('button', 'to-do__btn-delete', '', 'button');
	btnDelete.classList.add('to-do__btn-delete_high', 'btn');
	const img = createElement('img', 'close');
	img.src = './icons/delete.svg';

	row.append(label, btnDelete);
	label.append(body, text);
	btnDelete.append(img);
	body.append(checkbox, customCheckbox);

	switch (target) {
		case HTML_ELEMENTS.FORM_HIGH_PRIORITY:
			text.textContent = highPriorityInputValue;
			HTML_ELEMENTS.FORM_HIGH_PRIORITY.after(row);
			render(HTML_ELEMENTS.INPUT_HIGH_PRIORITY)
			break;
		case HTML_ELEMENTS.FORM_LOW_PRIORITY:
			text.textContent = lowPriorityInputValue;
			HTML_ELEMENTS.FORM_LOW_PRIORITY.after(row);
			render(HTML_ELEMENTS.INPUT_LOW_PRIORITY)
			break;
	}
}

function createElement(tagName, className, text, typeName) {
	const tag = document.createElement(tagName);
	tag.classList.add(className);
	tag.textContent = text;
	tag.type = typeName;
	return tag
}

function render(inputValue) {
	inputValue.value = '';
}



