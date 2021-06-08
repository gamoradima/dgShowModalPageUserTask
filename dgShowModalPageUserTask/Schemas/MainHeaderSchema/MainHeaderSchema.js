define("MainHeaderSchema", ["dgShowModalPageUserTaskMixin"], function() {
	return { 
        mixins: {
        	ShowModalPageUserTaskMixin: "Terrasoft.ShowModalPageUserTaskMixin"
        },
		methods: {
			_initConfigurationVersion: function() {
				let userName = Terrasoft.SysValue.CURRENT_USER.displayValue;
				let version = userName + " " + Terrasoft.productVersion;
				if (Terrasoft.isDebug) {
					version += " Debug";
				}
				this.set("ConfigurationVersion", version);
			},
			init: function() {
				this.callParent(arguments);
				this.dgSubscribeForShowModalWindowServerChannelMessages();
			},
			destroy: function() {
				this.callParent(arguments);
				this.dgUnsubscribeForShowModalWindowServerChannelMessages();
			}			
		}
	};
});