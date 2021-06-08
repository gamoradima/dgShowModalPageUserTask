namespace Terrasoft.Core.Process.Configuration
{

	using Newtonsoft.Json;
	using Newtonsoft.Json.Linq;
	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Globalization;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Process;
	using Terrasoft.UI.WebControls.Controls;
    using global::Common.Logging;
    using Terrasoft.Configuration;

	#region Class: dgShowModalPageUserTask

	/// <exclude/>
	public partial class dgShowModalPageUserTask
	{
        private static readonly ILog _log = LogManager.GetLogger("dgShowModalPageUserTask");
        private const string MessageSender = "dgShowModalPageUserTask";

		#region Methods: Protected

		protected override bool InternalExecute(ProcessExecutingContext context) {
            _log.InfoFormat("UserTask works well. dgDialogText = {0}, dgCommaSeparatedReturnCodes = {1}",
                dgDialogText, dgCommaSeparatedReturnCodes);
            var messageData = new
            {
                dgDialogText = dgDialogText,
                dgCommaSeparatedReturnCodes = dgCommaSeparatedReturnCodes,
                procElUId = UId
            };
            string messageBody = JsonConvert.SerializeObject(messageData);
            MsgChannelUtilities.PostMessage(UserConnection, MessageSender, messageBody);
			return false;
		}

		#endregion

		#region Methods: Public

		public override bool CompleteExecuting(params object[] parameters) {
			return base.CompleteExecuting(parameters);
		}

		public override void CancelExecuting(params object[] parameters) {
			base.CancelExecuting(parameters);
		}

		public override string GetExecutionData() {
			return string.Empty;
		}

		public override ProcessElementNotification GetNotificationData() {
			return base.GetNotificationData();
		}

		#endregion

	}

	#endregion

}

