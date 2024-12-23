var lang = navigator.language || navigator.userLanguage; 
var $ = Dom7;
var app = new Framework7({
	name: 'childrencontests', // App name
	theme: 'auto', // Automatic theme detection
	el: '#app', // App root element
	browserHistory: true,
	browserHistorySeparator: '',
	browserHistoryRoot: 'https://bugsm.ru/',
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