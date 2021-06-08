 define("dgShowModalPageUserTaskMixin", [],
    function() {
  		Ext.define("Terrasoft.confuguration.mixins.ShowModalPageUserTaskMixin", {
        	alternateClassName: "Terrasoft.ShowModalPageUserTaskMixin",
          
			dgSubscribeForShowModalWindowServerChannelMessages: function() {
				this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
					this.dgServerChannelMessageHandler, this);
			},
			dgUnsubscribeForShowModalWindowServerChannelMessages: function() {
				this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE,
					this.dgServerChannelMessageHandler, this);
			},
            
          	dgShowModalPageUserTask_procElUId: "",
          
			dgServerChannelMessageHandler: function(scope, message) {
				if (!message) {
					return;
				}
            	if (message.Header && message.Header.Sender !== "dgShowModalPageUserTask") {
                	return;
            	}
                if (message.Body) {
                    var bodyData = this.Ext.decode(message.Body);
                    var dgDialogText = bodyData.dgDialogText;
                    var dgCommaSeparatedReturnCodes = bodyData.dgCommaSeparatedReturnCodes;
                    var returnCodesArray = dgCommaSeparatedReturnCodes.split(",");
                    var procElUId = bodyData.procElUId;
                    dgShowModalPageUserTask_procElUId = procElUId;
                  
                    this.showConfirmationDialog(dgDialogText, this.dgGetConfirmationResult, returnCodesArray);
                  
                }
			},
            dgGetConfirmationResult: function(returnCode) {
            	this.console.log("dgGetConfirmationResult: returnCode = " + returnCode + " dgShowModalPageUserTask_procElUId = " + dgShowModalPageUserTask_procElUId);

				var procElUId = dgShowModalPageUserTask_procElUId;

                // You may wish to use MaskHelper here.
                this.Terrasoft.AjaxProvider.request({
                      url: "../ServiceModel/ProcessEngineService.svc/" + procElUId +
                      "/CompleteExecution" + "?dgReturnCode=" + returnCode,
                      method: "POST",
                      scope: this,
                      callback: function(request, success, response) {
                          // do nothing
                      }
                  });

              
            }
        });
  
});