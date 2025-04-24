var lang = navigator.language || navigator.userLanguage; 
var $ = Dom7;
var app = new Framework7({
	name: 'childrencontests', // App name
	theme: 'auto', // Automatic theme detection
	el: '#app', // App root element
	browserHistory: false,
	browserHistorySeparator: '',
	browserHistoryOnLoad: false,
	browserHistoryRoot: 'https://lk.sergivanov.ru/',
	pushStateSeparator: '',
	mdTouchRipple: false,
	touchRippleElements: '',
	store: store,
	routes: routes,
	dialog: {
		title: 'Внимание!',
		buttonOk: 'Продолжить',
		closeByBackdropClick: true,
	},
	lazy: {
		threshold: 50,
		sequential: false,
	},
	on: {
		init: function () {
			moment.locale(lang);
			if(this.form.getFormData('token')){				
				//this.dialog.alert('Инициализация пройдена. Токен записан');
				this.request.setup({
					headers: {
						'Authorization': this.form.getFormData('token')
					}
				});
			} else {
				//this.dialog.alert('Инициализация пройдена. Токен отсутствует.');
				this.request.setup({
					headers: {
						'Authorization': false
					}
				});
			}
			if(this.form.getFormData('copied')){				
			} else {
				this.form.storeFormData('copied', 0);
			}
		},
		pageInit: function () {
			console.log('Page initialized');
		},
	}
});

app.on('init', function () {
	console.log('Приложение загружено и инициализированно.');
});
app.on('connection', function (isOnline) {
	if (isOnline) {
		console.log('app is online now')
	} else {
		console.log('app is offline now')
	}
});
function showUrl(url){
	location.href = url
}

$(document).on('keypress', '.js-input-absint', function (event) {
	var allowed = /^[0-9]|Arrow(Left|Right)|Backspace|Home|End|Delete$/;
	return allowed.test(event.key);
}).on('focusout paste', '.js-input-absint', function () {
	var $input = $(this);
	var defaultValue = this.defaultValue || $input.attr('min');
	// Important(!): Timeout for the updated value
	setTimeout(function () {
		var current = $input.val();
		var regexNumbers = new RegExp(/^[0-9]*$/, 'g');
		var isNumbersOnly = regexNumbers.test(current);
		// Clear wrong value (not numbers)
		if ((current === '' || !isNumbersOnly) && defaultValue.length) {
			$input.val(defaultValue);
			current = defaultValue;
		}
		// Min/Max
		var min = parseInt($input.attr('min'), 10);
		var max = parseInt($input.attr('max'), 10);
		var currentInt = parseInt(current, 10);
		if (!isNaN(min) && !isNaN(currentInt) && currentInt < min) {
			$input.val(min);
		}
		if (!isNaN(max) && !isNaN(currentInt) && currentInt > max) {
			$input.val(max);
		}
	}, 100);

});

function headers(){
	let head = {};
	head['Accept'] = "application/json";
	head['Content-Type'] = "application/json";	
	if(app.form.getFormData('token')){
		head['Authorization'] = app.form.getFormData('token');
	}
	return head;
}

function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}