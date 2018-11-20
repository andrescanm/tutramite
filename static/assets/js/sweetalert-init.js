const beforeSend = (xhr, settings) => {
	function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			let cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				let cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
		// Only send the token to relative URLs i.e. locally.
		xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
	}
};

function actionCommand(options) {
	let {path, data, method, msg} = options;
	$.ajax({
		beforeSend,
		url: path,
		method,
		data,
		success: (resp) => swal('Operación Exitosa!', msg, 'success'),
		error: (error) => swal(
			'Operación Fallída!',
			error.statusText,
			'error'
		)
	});
}

function getObject(modelNamePlural, slug, callback) {
	$.ajax({
		beforeSend,
		url: `/${modelNamePlural}/listar?slug=${slug}`,
		method: 'get',
		success: resp => callback(resp),
		error: error => swal(
			'Operación Fallída!',
			error.statusText,
			'error'
		)
	});
	return callback;
}

document.body.addEventListener('click', (evt) => {
	const elementClicked = evt.target;
	let modelName = '';
	let modelNamePlural = '';
	let slug = '';
	let objectName = '';
	let options = {};

	if (elementClicked.classList.contains('eliminar')) {
		modelName = elementClicked.dataset.modelName;
		slug = elementClicked.dataset.slug;
		objectName = slug.split('-').join(' ');
		modelNamePlural = elementClicked.dataset.modelPlural;
		options = {
			path: `/${modelNamePlural}/eliminar/${slug}/`,
			method: 'post',
			msg: `${modelName} ${objectName} ha sido eliminado.`,
		};
		actionCommand(options);
		const div = elementClicked.parentElement.parentElement;
		div.parentElement.parentElement.remove();
	} else if (elementClicked.classList.contains('editar')) {
		modelName = elementClicked.dataset.modelName;
		slug = elementClicked.dataset.slug;
		objectName = slug.split('-').join(' ');
		modelNamePlural = elementClicked.dataset.modelPlural;

		getObject(modelNamePlural, slug, data => {
				const form = document.getElementById('modal-form');
				const allInputs = [];

				['input', 'select', 'textarea'].forEach(tag => {
					allInputs.push(...form.getElementsByTagName(tag));
				});

				allInputs.forEach(input => {
					const attr = input.getAttribute('name');
					if (input.type !== 'file')
						input.value = data[attr];
				});

				const sendBtn = document.getElementById('send');
				sendBtn.addEventListener('click', evt => {
					const data = {};
					// agregar la información a enviar...
				});
			}
		)
	}
});

const validateErrors = Array.from(document.querySelectorAll('.validate-error'));
let isError = validateErrors.some(error => error.innerText.length > 0);
if (isError) {
	const message = `Verifíque los mensajes de validación`;
	swal('Operación Fallída!', message, 'error');
}

const alert = document.querySelector('.alert');
if (alert) {
	setTimeout(() => {
		alert.classList.add('hide-alert');
		alert.remove();
	}, 5000);
}

const successMessage = document.getElementById('success');
if (successMessage)
	swal('Operación Exitosa!', successMessage.dataset.message, 'success');


