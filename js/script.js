import { ELEMENTS } from './html-elements.js'
import { PRIORITY, STATUS, taskList } from './data.js'
import { ERRORS } from './errors.js';
import data from './tasks.json' assert {type: "json"};

ELEMENTS.HIGH_FORM.addEventListener("submit", createTask);
ELEMENTS.LOW_FORM.addEventListener("submit", createTask);
ELEMENTS.HIGH_TASK_WRAP.addEventListener('click', deleteTask);
ELEMENTS.LOW_TASK_WRAP.addEventListener('click', deleteTask);
ELEMENTS.HIGH_TASK_WRAP.addEventListener('click', changeStatus);
ELEMENTS.LOW_TASK_WRAP.addEventListener('click', changeStatus);

data.tasks.forEach(task => {
	taskList.push(task);
})

render(taskList);

function render(arr) {
	removeChildren(ELEMENTS.HIGH_TASK_WRAP);
	removeChildren(ELEMENTS.LOW_TASK_WRAP);

	for (let i = 0; i < taskList.length; i++) {

		const task = buildElement('div', 'to-do__task');
		const checkbox = buildElement('input', 'to-do__checkbox');
		checkbox.type = 'checkbox';
		const taskName = buildElement('p', 'to-do__task-name');
		taskName.textContent = taskList[i].name;
		const btnDeleteTask = buildElement('button', 'to-do__btn-delete-task');
		task.append(checkbox, taskName, btnDeleteTask);

		if (arr[i].priority === PRIORITY.HIGH) {
			ELEMENTS.HIGH_TASK_WRAP.append(task);
		} else {
			ELEMENTS.LOW_TASK_WRAP.append(task);
		}

		if (arr[i].status === STATUS.DONE) {
			checkbox.checked = true;
			task.classList.add('checked')
		}

	}

}

function getInputError(inputValue) {
	const errorHighInput = inputValue.length < 3 || inputValue.length > 35;
	const errorLowInput = inputValue.length < 3 || inputValue.length > 35;

	if (errorHighInput || errorLowInput) {
		throw new Error(ERRORS.LENGTH_ERROR);
	}
}

function createTask(e) {
	e.preventDefault();
	const target = e.target;

	const highInputValue = ELEMENTS.HIGH_FORM_INPUT.value;
	const lowInputValue = ELEMENTS.LOW_FORM_INPUT.value;

	switch (target) {
		case ELEMENTS.HIGH_FORM:

			try {
				getInputError(highInputValue);
			} catch {
				alert(ERRORS.LENGTH_ERROR + ` Вы ввели ${highInputValue.length}`);
				return;
			}

			addTask(taskList, highInputValue, PRIORITY.HIGH);
			resetInput(ELEMENTS.HIGH_FORM_INPUT);
			break;

		case ELEMENTS.LOW_FORM:

			try {
				getInputError(lowInputValue);
			} catch {
				alert(ERRORS.LENGTH_ERROR + ` Вы ввели ${lowInputValue.length}`);
				return
			}

			addTask(taskList, lowInputValue, PRIORITY.LOW);
			resetInput(ELEMENTS.LOW_FORM_INPUT);
			break;
	}

	render(taskList);
}

function addTask(arr, taskName, priority) {

	const newTask = {};
	newTask.name = taskName;
	newTask.status = STATUS.TODO;
	newTask.priority = priority;

	arr.push(newTask);
}

function removeChildren(wrapper) {
	while (wrapper.hasChildNodes()) {
		wrapper.replaceChildren();
	}
}

function resetInput(input) {
	const epmtyStr = '';
	input.value = epmtyStr;
}

function buildElement(tagName, className, text) {
	const tag = document.createElement(tagName);
	tag.classList.add(className);
	tag.textContent = text;
	return tag
}

function deleteTask(event) {
	if (!event.target.classList.contains('to-do__btn-delete-task')) return;

	const oneElement = 1;
	const taskName = event.target.previousSibling.textContent;
	console.log(taskName);

	const position = taskList.findIndex(task => {
		return task.name === taskName;
	})

	taskList.splice(position, oneElement)

	render(taskList)
}

function changeStatus(e) {

	if (!(e.target.classList.contains('to-do__checkbox'))) return;

	const checkbox = e.target;
	console.log(checkbox);
	const checkedElement = e.target.checked;
	// console.log(checkedElement);
	const wrapper = e.target.parentNode;
	console.log(wrapper);

	const taskName = checkbox.nextSibling.textContent;
	// console.log(taskName);

	const position = taskList.findIndex(task => task.name === taskName);
	// console.log(position);

	if (checkedElement === true && !wrapper.classList.contains('checked')) {
		taskList[position].status = STATUS.DONE;
	} else {
		taskList[position].status = STATUS.TODO;
	}

	render(taskList)

}
