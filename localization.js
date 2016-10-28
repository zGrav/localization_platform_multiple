const Localization = {
	defaultLanguageCode: function() {
		let userLang;
		try {
			userLang = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;
			userLang = userLang.substring(0, 2);
		} catch (e) {
			userLang = 'en';
		}
		return userLang;
	},

	userLang: null,

	setUserLang: function(lang) {
		this.userLang = lang;
	},

	getUserLang: function() {
		return this.userLang;
	},
};

Localization.setUserLang(Localization.defaultLanguageCode());

export default Localization;
