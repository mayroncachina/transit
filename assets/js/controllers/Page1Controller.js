var Page1Controller = function () {};

Page1Controller.prototype = {
	onScroll: Function,
	self: Object,
	initialize: function () {
		self = this;
		//scroll listener
		//FG.$scrollApp.addEventListener("scroll", self.onScroll);
	},
	onScroll: function (e) {
		//checkscrol
	},
	destroy: function () {
		// unset events
		// stop ajax
		//remove listener scroll
		//FG.$scrollApp.removeEventListener("scroll", self.onScroll);
		PageLoad.ajxHandle = null;
	}
};