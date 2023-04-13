


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent"
], function (Controller, History, JSONModel, Fragment, Filter, FilterOperator, MessageBox) {
    "use strict";

    return Controller.extend("moc.controller.View2", {
        onInit: function () {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("View2").attachPatternMatched(this._onRouteMatched, this);
            this.codenumber = "";

            var that = this;
            this.obj = {};
            var oIconTab = this.getView().byId("idIconTabBarNoIcons");
            this.setDefaultModel();
            var ardca;
            var arcad;
            var itcn;
            var ipgtr;
            var dratc;
            var rev1;
            var rev2;
            var rev3;
            var rev4;
            var rev5;


        },


        getEmptyReportModel: function () {
            var oEntity = {
                "Code": "",
                "RequestedBy": "",
                "Status": "",
                "Plant": "",
                "ChangeDate": "",
                "ObjOfChange": "",
                "CreatedBy": "",
                "TypeOfChange": "",
                "RequestDate": "",
                "Department": "",
                "ChngTitleOrg": "",
                "ChngTitlePerson": "",
                "ChngTitleSys": "",
                "ChngTitlePro": "",
                "ChngTitleRig": "",
                "ChngTitleEqui": "",
                "ChngTitleMat": "",
                "ChngTitleLaws": "",
                "DetailsOfChange": "",
                "ReasonOfChange": "",
                "ProposeChange": "",
                "PersonName": "",
                "PersonPosition": "",
                "PersonDate": "",
                "ApprovalName": "",
                "ApprovalPos": "",
                "ApprovalDate": "",
                "RiskChange": "",
                "RiskDate": "",
                "People": "",
                "Environment": "",
                "Material": "",
                "RiskPlant": "",
                "Summary": "",
                "ProcUpdate": "",
                "AffectChange": "",
                "CompletionDate": "",
                "EstimateCost": "",
                "ImpMigration": "",
                "ImpNotification": "",
                "ImpUpdated": "",
                "ImpConducted": "",
                "ImpCommunicated": "",
                "ImpCompleted": "",
                "ImpTargetDate": "",
                "ImpApprovalDate": "",
                "ImpExtendDate": "",
                "ImpName": "",
                "ImpPosition": "",
                "ImpDate": "",
                "Title": "",
                "AppDetChange": "",
                "AppReasonChange": "",
                "AppNecessary": "",
                "AppRiskApproval": "",
                "AppRiskComplete": "",
                "AppRiskDate": "",
                "ReviewProcess": "",
                "ReviewEffective": "",
                "ReviewComplete": "",
                "ReviewMgmt": "",
                "ReviewQMS": "",

            };
            return oEntity;
        },

        setDefaultModel: function () {
            var oModel = new sap.ui.model.json.JSONModel(this.getEmptyReportModel());
            oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
            //sap.ui.getCore().setModel(oModel, "ReportModel");
            this.getView().setModel(oModel, "ReportModel");

            // this._data = {
            //   ZACC_ACTIONLOGSet: [{}]
            // };
            // this.ActionLogModel = new sap.ui.model.json.JSONModel();
            // this.ActionLogModel.setData(this._data);

        },

        _onRouteMatched: function (oEvent) {

            this.ReportModel = this.getView().getModel("ReportModel");
            this.ReportId = oEvent.getParameter("arguments").codeno;
            if (this.ReportId) {
                this.bindData(this.ReportId);
            } else {
                this.ReportModel.setData(this.getEmptyReportModel());
                // this._data.ZACC_ACTIONLOGSet = [];
                // this.ActionLogModel.refresh();
                //this.setDefaultReportType("");
                // this.byId(sap.ui.core.Fragment.createId("InjuredFra", "codeinp")).setShowValueHelp(false);
                // var oTitleInputbox = this.byId(sap.ui.core.Fragment.createId("GeneralFra", "inpGen_title"));
                // oTitleInputbox.focus();

            }
            this.byId("idIconTabBarNoIcons").setSelectedKey("Gen"); //set general tab as a default
            var oAddedBy = this.byId(sap.ui.core.Fragment.createId("external", "addedin"));
            var oDesc = this.byId(sap.ui.core.Fragment.createId("external", "comments"));
            oAddedBy.setValue("");
            oDesc.setValue("");
            //Clear attachments 
            //   var oAttachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
            //   var oData = { results: [] };
            //   var oAttachmentsModel = new JSONModel(oData);
            //   oAttachmentUpl.removeAllItems();
            //   oAttachmentUpl.destroyItems();
            //   oAttachmentUpl.destroyIncompleteItems();
            //   oAttachmentUpl.setModel(oAttachmentsModel).bindAggregation("items", {
            //     path: "/results", templateShareable: true, template: new sap.m.upload.UploadSetItem({
            //       fileName: "{FILE_NAME}", mediaType: "{MIME_TYPE}", visibleEdit: false, visibleRemove: false,
            //       url: "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/ZMOC_EXT_FILESet(CODE_NO='" + this.ReportId + "',FILE_NAME='" + "{FILE_NAME}" + "')/$value"
            //     })
            //   });

            //this.oRadioGroup.setSelectedIndex(null);
            // var oViwewModel = new sap.ui.model.json.JSONModel({ saveBtnVisibility: true, printBtnVisibility: true });
            // this.getView().setModel(oViwewModel, "viewModel");
            var oViwewModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oViwewModel, "viewModel");
        },

        bindData: function (sReportNo) {
            var that = this;

            if (sReportNo) {
                this.ReportModel = this.getView().getModel("ReportModel");

                var sServiceurl = "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/";
                var omodel = new sap.ui.model.odata.ODataModel(sServiceurl, true);
                var url = "/ZMOC_DETSet?$filter=(Code eq '" + sReportNo + "')";
                sap.ui.core.BusyIndicator.show();
                omodel.read(url, null, null, true, function (data, reponse) {
                    sap.ui.core.BusyIndicator.hide();
                    that.ReportModel.setData(data.results[0]);
                    // that.getView().setModel(that.ReportModel, "ReportModel");
                },
                    function (err, orepnse) {

                    });

                // this.getView().getModel().read(url, null, null, true,
                //   {
                //     // urlParameters: {
                //     //     "$expand": "ZACC_ACTIONLOGSet,ZACC_COSTSet"
                //     // },
                //     success: function (data, oresponse) {
                //       sap.ui.core.BusyIndicator.hide();
                //       that.ReportModel.setData(data);
                //       // that._data.ZACC_ACTIONLOGSet = data.ZACC_ACTIONLOGSet.results;
                //       // that.ActionLogModel.refresh();
                //       //that.setDefaultReportType(data.TYPE);
                //       // if (data.STATUS === "Filed" || data.STATUS === "Closed") {
                //       //   that.getView().getModel("viewModel").setProperty("/saveBtnVisibility", false);
                //       //   that.getView().getModel("viewModel").setProperty("/printBtnVisibility", true);
                //       // }
                //       // var oTitleInputbox = that.byId(Fragment.createId("GeneralFra", "inpGen_title"));
                //       // oTitleInputbox.focus();
                //       // var inpStatus = that.byId(Fragment.createId("GeneralFra", "inpStatus")).getValue();



                //     },
                //     error: function (e) {
                //       sap.ui.core.BusyIndicator.hide();
                //       //sap.m.MessageBox.show("SomeThing Went Wrong.", sap.m.MessageBox.Icon.ERROR, "Warning", [sap.m.MessageBox.Action.CLOSE]);
                //     }
                //   });

                // this.loadAttachments(); //Bind attachment list
            }

            // var sEntity = "/ZMOC_DETSet('" + sReportNo + "')";
            // sap.ui.core.BusyIndicator.show();
            // this.getView().getModel().read(sEntity, {

            //   success: function (data) {
            //     sap.ui.core.BusyIndicator.hide();
            //     that.ReportModel.setData(data);
            // that._data.ZACC_ACTIONLOGSet = data.ZACC_ACTIONLOGSet.results;
            // that.ActionLogModel.refresh();
            //that.setDefaultReportType(data.TYPE);
            // if (data.STATUS === "Filed" || data.STATUS === "Closed") {
            // that.getView().getModel("viewModel").setProperty("/saveBtnVisibility", false);
            // that.getView().getModel("viewModel").setProperty("/printBtnVisibility", true);
            // }
            // var oTitleInputbox = that.byId(Fragment.createId("GeneralFra", "inpGen_title"));
            // oTitleInputbox.focus();
            // var inpStatus = that.byId(Fragment.createId("GeneralFra", "inpStatus")).getValue();

            /*var tItems = that.byId(Fragment.createId("ActionLogFra", "idActionLogTable")).getItems();
            var loggedUser = parent.sap.ushell.Container.getUser().getFullName();
            if (inpStatus == "Action Closure" && loggedUser == "HSE.VK01") {   //Final Draft
                for (var i = 0; i < tItems.length; i++) {
                    tItems[i].getCells()[4].setEnabled(true);
                }
            } else {
                for (var i = 0; i < tItems.length; i++) {
                    tItems[i].getCells()[4].setEnabled(false);
                }
            }*/

            // },
            // error: function (e) {
            //   sap.ui.core.BusyIndicator.hide();
            //sap.m.MessageBox.show("SomeThing Went Wrong.", sap.m.MessageBox.Icon.ERROR, "Warning", [sap.m.MessageBox.Action.CLOSE]);
            // }
            // });

            this.loadAttachments(); //Bind attachment list
            // }
            ///(sEntity, null, null, false, function (oData, oResponse) {
            //    that.ReportModel.setData(oData);
            //  }, function (err) { });

        },

        //-------------------------------------File Upload-----------------------------------
        handleFileSizeExceed: function (oEvent) {
            sap.m.MessageBox.show("File size limit exceeded 2 MB. Choose a file below 2 MB to continue file upload.", sap.m.MessageBox.Icon.WARNING, "Alert", [sap.m.MessageBox.Action.CLOSE]);
        },



        handleTypeMissmatch: function (oEvent) {
            var fileType = oEvent.getSource().getFileType();
            jQuery.each(fileType, function (key, value) { fileType[key] = "*." + value; });
            var supportedFileTypes = fileType.join(", ");
            sap.m.MessageBox.show("The file type *." + oEvent.getParameter("fileType") + " is not supported. Choose one of the following types : " + supportedFileTypes,
                sap.m.MessageBox.Icon.ERROR, "Error", [sap.m.MessageBox.Action.CLOSE]);
        },

        handleValueChange: function (oEvent) {

        },

        handleUploadPress: function (type) {
            var that = this;
            var txt = "fileUploader";
            //this.byId(Fragment.createId("external", "fileUploader"));
            var fileUploder = this.byId(sap.ui.core.Fragment.createId("external", "fileUploader"));
            if (!fileUploder.getValue()) {
                sap.m.MessageBox.show("Choose a file first.", sap.m.MessageBox.Icon.WARNING, "Alert", [sap.m.MessageBox.Action.CLOSE]);
            } else {
                if (!this.busyDialogTab) {
                    this.busyDialogTab = new sap.m.BusyDialog({ text: 'Please Wait...' });
                }
                this.busyDialogTab.open();
                var fileName = fileUploder.getValue();
                this.byId(sap.ui.core.Fragment.createId("external", "filename")).setValue(fileName);
                //this.getView().byId("filename").setValue(fileName);
                /*if(this.DocNumber !== "0000000000000000000000000"){
                    this.getView().byId("docNumber").setValue(this.DocNumber);
                }else{
                    this.getView().byId("docNumber").setValue("0000000000000000000000000");
                }*/

                var oDataModel = new sap.ui.model.odata.v2.ODataModel(this.sServiceURL, true);
                oDataModel.setTokenHandlingEnabled(true);
                oDataModel.refreshSecurityToken(function () {
                    var token = oDataModel.getSecurityToken();
                    that.byId(sap.ui.core.Fragment.createId("external", "CsrfId")).setValue(token);
                    //that.getView().byId("CsrfId").setValue(token);
                });
                fileUploder.upload();
            }
        },

        handleUploadComplete: function (oEvent) {
            this.busyDialogTab.close();
            var flag = 1;
            var response = oEvent.getParameters("OData").responseRaw;
            var startlen = response.search("<d:DocNumber>");
            startlen += 13;
            var endlen = response.search("</d:DocNumber>");
            endlen -= 0;
            var msg = response.slice(startlen, endlen);

            //var sResponse = oEvent.getParameter("response");
            var m = oEvent.getParameter("status");
            if (m === 201) {
                sap.m.MessageBox.show("File Uploaded Successfully.", sap.m.MessageBox.Icon.SUCCESS, "Warning", [sap.m.MessageBox.Action.CLOSE]);
                this.DocNumber = msg;
                flag = 0;
                this.byId(sap.ui.core.Fragment.createId("external", "fileUploader")).setValue("");
                this.byId(sap.ui.core.Fragment.createId("external", "Upload")).setEnabled(true);
                //this.getView().byId("Upload").setEnabled(true);
            } else if (m === 400) {
                sap.m.MessageBox.show("File NOT Uploaded Successfully.", sap.m.MessageBox.Icon.WARNING, "Alert", [sap.m.MessageBox.Action.CLOSE]);
            } else if (m === 500) {
                sap.m.MessageBox.show("500 Connection timed out", sap.m.MessageBox.Icon.WARNING, "Alert", [sap.m.MessageBox.Action.CLOSE]);
            }
            return (flag);
        },//end file upoad

        //UPload attachment new
        loadAttachments: function () {
            var that = this;
            var sPath = "/ZMOC_EXT_FILESet";
            var oAttachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
            var Filter = new sap.ui.model.Filter({
                path: "Code",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: this.ReportId
            });
            var oReportIdFilter = [];
            oReportIdFilter.push(Filter);
            //oAttachmentUpl.getList().setMode("MultiSelect");
            this.getView().getModel().read(sPath, {
                filters: oReportIdFilter,
                success: function (oData) {
                    var oAttachmentsModel = new JSONModel(oData);
                    oAttachmentUpl.setModel(oAttachmentsModel).bindAggregation("items", {
                        path: "/results", templateShareable: true, template: new sap.m.upload.UploadSetItem({
                            fileName: "{FILE_NAME}", mediaType: "{MIME_TYPE}", visibleEdit: false, visibleRemove: false,
                            url: "/sap/opu/odata/sap/ZOD_ACCIDENT_DATA_SRV/ZACC_EXT_FILESet(Code='" + that.ReportId + "',FILE_NAME='" + "{FILE_NAME}" + "')/$value"
                        })
                    });
                    /*.bindAggregation("attributes", {
                            path: "/results", templateShareable: false, template: new sap.m.ObjectAttribute({ title: "Uploaded By", text: "{DOC_ADD}" })
                        })*/
                    if (oAttachmentUpl.getItems().length > 0) {
                        that.byId(sap.ui.core.Fragment.createId("external", "inAttachmentAddedBy")).setValue(oData.results[0].DOC_ADD);
                        that.byId(sap.ui.core.Fragment.createId("external", "inAttachmentDesc")).setValue(oData.results[0].DOC_DESC);
                        //that.byId('checkbox').setVisible(true);
                    } else {
                        that.byId(sap.ui.core.Fragment.createId("external", "inAttachmentAddedBy")).setValue("");
                        that.byId(sap.ui.core.Fragment.createId("external", "inAttachmentDesc")).setValue("");
                    }
                },
                error: function (oError) { that.parseErrorMsg() }
            });
        },
        onBeforeUploadStarts: function (oEvent) { //track file upload progress
            // var oUploadSet = oEvent.getSource(),
            //     iOldList = oUploadSet.getIncompleteItems().length;
            //setTimeout(() => this.checkFileUploadFailed(oUploadSet, iOldList), 10000); // recursive func that checks status of itemslist
        },
        checkFileUploadFailed: function (oUploadSet, iOldList) {
            /* if (iOldList !== 0) {
                 var iNewList = oUploadSet.getIncompleteItems().length;
                 if (iNewList === iOldList) {
                     MessageToast.show("File upload(s) pending");
                     if (!this.iPendingFilesCounter) this.iPendingFilesCounter = 0;
                     this.iPendingFilesCounter += 1;
                     if (this.iPendingFilesCounter === 3) {
                         MessageBox.error("File uploads taking longer than expected.");
                         oUploadSet.setBusy(false);
                     }
                     var iOldList = iNewList;
                     setTimeout(() => this.checkFileUploadFailed(oUploadSet, iOldList), 10000);
                 }
             }*/
        },
        onFileTypeMismatch: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl")).removeIncompleteItem(oItem); //remove pending item user tried to add
            new sap.m.MessageToast.show(oItem.getProperty("fileName").split(".")[1] + " file type is not supported"); //show message toast with the specific fileType that isn't supported
        },
        onFileSizeExceeded: function (oEvent) {
            var oAttachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl")),
                oItem = oEvent.getParameter("item");
            oAttachmentUpl.removeIncompleteItem(oItem); //remove pending item user tried to add
            new sap.m.MessageToast.show("Maximum file size of " + oAttachmentUpl.getMaxFileSize() + " MB exceeded"); //show message toast with the max file size supported
        },
        onRemove: function (oEvent) {
            var oAttachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
            oAttachmentUpl.setBusy(true);
            oAttachmentUpl.getItems().forEach(oItem => {
                if (oItem.getListItem().getSelected()) {
                    var sPath = oItem.getProperty("url").split("SRV")[1]; //eg /ZACC_EXT_FILESet
                    this.getView().getModel().remove(sPath, {
                        success: function () {
                            oAttachmentUpl.removeItem(oItem); //remove from displayed list
                        },
                        error: function (oError) {
                            that.parseErrorMsg();
                        }
                    });
                }
            });
            oEvent.getSource().setEnabled(false);
            this.byId("download").setEnabled(false);

            if (oAttachmentUpl.getItems().length > 0) {
                this.byId('checkbox').setVisible(true);
            } else {
                this.byId('checkbox').setVisible(false);
            }
            oAttachmentUpl.setBusy(false);
        },
        onDownload: function (oEvent) {
            var oAttachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
            oAttachmentUpl.setBusy(true);
            oAttachmentUpl.getItems().forEach(oItem => {
                if (oItem.getListItem().getSelected()) {
                    oItem.download(true);
                    oItem.getListItem().setSelected(false);
                }
            });
            oAttachmentUpl.setBusy(false);
            oEvent.getSource().setEnabled(false);
        },
        onStartUpload: function () {
            var that = this;
            var oAttachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
            var sAddedBy = this.byId(sap.ui.core.Fragment.createId("external", "inAttachmentAddedBy")).getValue();
            var sDescription = this.byId(sap.ui.core.Fragment.createId("external", "inAttachmentDesc")).getValue();
            var aIncompleteItems = oAttachmentUpl.getIncompleteItems();
            this.iIncompleteItems = aIncompleteItems.length; //used to turn off busy indicator upon completion of all pending uploads
            if (this.iIncompleteItems !== 0) {
                that.byId("iconTabBarInlineIcons").setSelectedKey("extFiles");
                oAttachmentUpl.setBusy(true);
                this.i = 0; //used to turn off busy indicator when all uploads complete
                for (var i = 0; i < this.iIncompleteItems; i++) {
                    var sFileName = aIncompleteItems[i].getProperty("fileName");
                    var oXCSRFToken = new sap.ui.core.Item({
                        key: "X-CSRF-Token",
                        text: this.getOwnerComponent().getModel().getSecurityToken()
                    });
                    var oSlug = new sap.ui.core.Item({
                        key: "SLUG",
                        text: this.ReportId + "/" + sFileName + "/" + sAddedBy + "/" + sDescription,
                    });
                    oAttachmentUpl.addHeaderField(oXCSRFToken).addHeaderField(oSlug).uploadItem(aIncompleteItems[i]);
                    oAttachmentUpl.removeAllHeaderFields(); //at least slug header field must be reset after each upload
                }
            } else {
                var sDispMessage = "Report " + this.ReportId + " Saved Successfully.";
                sap.m.MessageBox.success(sDispMessage, {
                    actions: [sap.m.MessageBox.Action.OK],
                    emphasizedAction: sap.m.MessageBox.Action.OK,
                    onClose: function (sAction) {
                        that.onNavBack();
                    }
                });
            }
        },
        onUploadCompleted: function () {
            var that = this;
            this.i += 1;
            if (this.i === this.iIncompleteItems) { //turn off busy indicator when all attachments have completed uploading
                this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl")).setBusy(false);
                var sDispMessage = "Report " + this.ReportId + " Saved Successfully.";
                sap.m.MessageBox.success(sDispMessage, {
                    actions: [sap.m.MessageBox.Action.OK],
                    emphasizedAction: sap.m.MessageBox.Action.OK,
                    onClose: function (sAction) {
                        that.onNavBack();
                    }
                });
            }
        },
        parseErrorMsg: function (oError) { //parses oData error messages dependent on different return values
            var oMessage, sType;
            if (oError) { //for update
                if (oError.response) {
                    sType = typeof oError.response;
                    if (sType === "string" || sType === "object") oMessage = JSON.parse(oError.response.body).error.message.value;
                    else return MessageBox.error("Unhandled server error:\n\n" + oError.response + "\n\nReport this issue to Admin for a future fix.");
                } else if (oError.responseText) { //for create
                    sType = typeof oError.responseText;
                    if (sType === "string" || sType === "object") oMessage = JSON.parse(oError.responseText).error.message.value;
                    else return MessageBox.error("Unhandled server error:\n\n" + oError.responseText + "\n\nReport this issue to Admin for a future fix.");
                }
            } else {
                return MessageToast.show("Error message is undefined");
            }
            MessageBox.error(oMessage);
        },  //Upload attachment new end here

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
                this.onReset.call(this);
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("View1", {}, true);
                this.getOwnerComponent().setModel(null, "selectedData");
                this.onReset.call(this);
            }
        },


        onReset: function () {

            // var oModel = new sap.ui.model.json.JSONModel(this.getEmptyReportModel());
            // this.getView().setModel(oModel, "ReportModel");
            // var codei = this.byId(sap.ui.core.Fragment.createId("generalfrag", "_IDGenInput1")).setValue("");
            var objc = this.byId(sap.ui.core.Fragment.createId("generalfrag", "_IDGenInput2")).setValue("");
            var reqd = this.byId(sap.ui.core.Fragment.createId("generalfrag", "DP1")).setValue("");
            var reqb = this.byId(sap.ui.core.Fragment.createId("generalfrag", "_IDGenInput3")).setValue("");
            var toc = this.byId(sap.ui.core.Fragment.createId("generalfrag", "typeofc")).setValue("");
            var creb = this.byId(sap.ui.core.Fragment.createId("generalfrag", "_IDGenInput4")).setValue("");
            var dept = this.byId(sap.ui.core.Fragment.createId("generalfrag", "_IDGenInput5")).setValue("");
            var cod = this.byId(sap.ui.core.Fragment.createId("generalfrag", "DP2")).setValue("");
            var stat = this.byId(sap.ui.core.Fragment.createId("generalfrag", "_IDGenInput9")).setValue("");

            //Checkboxes
            var checkb1 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "org")).setSelected(false);
            var checkb2 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "personnel")).setSelected(false);
            var checkb3 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "system")).setSelected(false);
            var checkb4 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "process")).setSelected(false);
            var checkb5 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "rig")).setSelected(false);
            var checkb6 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "equip")).setSelected(false);
            var checkb7 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "material")).setSelected(false);
            var checkb8 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "lawandreg")).setSelected(false);

            //Text Areas
            var doc = this.byId(sap.ui.core.Fragment.createId("generalfrag", "mno")).setValue("");
            var rfc = this.byId(sap.ui.core.Fragment.createId("generalfrag", "pqr")).setValue("");
            var ptfc = this.byId(sap.ui.core.Fragment.createId("generalfrag", "vwx")).setValue("");

            // Approval fragment fields
            //Approval to continue change
            var docd = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "_IDGenRadioButtonGroup1")).setSelectedButton("");
            var rocd = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "_IDGenRadioButtonGroup2")).setSelectedButton("");
            var cnec = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "_IDGenRadioButtonGroup3")).setSelectedButton("");
            var agtr = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "_IDGenRadioButtonGroup4")).setSelectedButton("");
            var drat = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "_IDGenRadioButtonGroup5")).setSelectedButton("");
            var atcdate = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "_IDGenDatePicker1")).setValue("");

            //Approval of change.Risk Assessment Review
            var aocname = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "weq")).setValue("");
            var aocpos = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "dog")).setValue("");
            var aocdate = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "DP6")).setValue("");

            //Reponsible Person
            var repname = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "_IDGenInput19")).setValue("");
            var reppos = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "_IDGenInput21")).setValue("");
            var repdate = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "_IDGenDatePicker2")).setValue("");

            //Risk Assessment
            var risname = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "abc3")).setValue("");
            var risdate = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "abc5")).setValue("");

            //Result of Risk Assessment
            var rispep = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "people")).setValue("");
            var risenv = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "env")).setValue("");
            var risprp = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "prop")).setValue("");
            var rispla = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "plant")).setValue("");

            var mpdwu = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "boom")).setValue("");
            var sokma = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "onam")).setValue("");
            var iptac = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "badam")).setValue("");
            var trdat = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date15")).setValue("");
            var ecoc = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "wnkj")).setValue("");

            //Implementation
            var dat1 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date1")).setValue("");
            var dat2 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date2")).setValue("");
            var dat3 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date3")).setValue("");
            var dat4 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date4")).setValue("");
            var dat5 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date5")).setValue("");
            var dat6 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date6")).setValue("");
            var dat7 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date7")).setValue("");
            var dat8 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date8")).setValue("");
            var dat9 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date9")).setValue("");
            var impn = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "inp1")).setValue("");
            var impp = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "inp2")).setValue("");
            var dat10 = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "date10")).setValue("");

            //Review
            var wcpf = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "req1")).setSelectedButton("");
            var wcpe = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "req2")).setSelectedButton("");
            var niar = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "req3")).setSelectedButton("");
            var wmcp = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "req4")).setSelectedButton("");
            var ictq = this.byId(sap.ui.core.Fragment.createId("approvalfrag", "req5")).setSelectedButton("");

        },
        radioselect: function (oEvent) {
            var ab = oEvent.mParameters.selectedIndex;
            switch (ab) {
                case 0:
                    // console.log("Yes");
                    this.ardca = "Y";
                    // code block
                    break;
                case 1:
                    // console.log("No");
                    this.ardca = "N";
                    // code block
                    break;
                case 2:
                    // console.log("NA");
                    this.ardca = "NA";
                    // code block
                    break;
                default:
                // code block
            }
        },
        radioselect1: function (oEvent) {
            var ab1 = oEvent.mParameters.selectedIndex;
            switch (ab1) {
                case 0:
                    this.arcad = "Y";
                    break;
                case 1:
                    this.arcad = "N";
                    break;
                case 2:
                    this.arcad = "NA";
                    break;
                default:
            }
        },
        radioselect2: function (oEvent) {
            var ab2 = oEvent.mParameters.selectedIndex;
            switch (ab2) {
                case 0:
                    this.itcn = "Y";
                    break;
                case 1:
                    this.itcn = "N";
                    break;
                case 2:
                    this.itcn = "NA";
                    break;
                default:
            }
        },
        radioselect3: function (oEvent) {
            var ab3 = oEvent.mParameters.selectedIndex;
            switch (ab3) {
                case 0:
                    this.ipgtr = "Y";
                    break;
                case 1:
                    this.ipgtr = "N";
                    break;
                case 2:
                    this.ipgtr = "NA";
                    break;
                default:
            }
        },
        radioselect4: function (oEvent) {
            var ab4 = oEvent.mParameters.selectedIndex;
            switch (ab4) {
                case 0:
                    this.dratc = "Y";
                    break;
                case 1:
                    this.dratc = "N";
                    break;
                case 2:
                    this.dratc = "NA";
                    break;
                default:
            }
        },
        radioselect5: function (oEvent) {
            var ab5 = oEvent.mParameters.selectedIndex;
            switch (ab5) {
                case 0:
                    this.rev1 = "Y";
                    break;
                case 1:
                    this.rev1 = "N";
                    break;
                case 2:
                    this.rev1 = "NA";
                    break;
                default:
            }
        },
        radioselect6: function (oEvent) {
            var ab6 = oEvent.mParameters.selectedIndex;
            switch (ab6) {
                case 0:
                    this.rev2 = "Y";
                    break;
                case 1:
                    this.rev2 = "N";
                    break;
                case 2:
                    this.rev2 = "NA";
                    break;
                default:
            }
        },
        radioselect7: function (oEvent) {
            var ab7 = oEvent.mParameters.selectedIndex;
            switch (ab7) {
                case 0:
                    this.rev3 = "Y";
                    break;
                case 1:
                    this.rev3 = "N";
                    break;
                case 2:
                    this.rev3 = "NA";
                    break;
                default:
            }
        },
        radioselect8: function (oEvent) {
            var ab8 = oEvent.mParameters.selectedIndex;
            switch (ab8) {
                case 0:
                    this.rev4 = "Y";
                    break;
                case 1:
                    this.rev4 = "N";
                    break;
                case 2:
                    this.rev4 = "NA";
                    break;
                default:
            }
        },
        radioselect9: function (oEvent) {
            var ab9 = oEvent.mParameters.selectedIndex;
            switch (ab9) {
                case 0:
                    this.rev5 = "Y";
                    break;
                case 1:
                    this.rev5 = "N";
                    break;
                case 2:
                    this.rev5 = "NA";
                    break;
                default:
            }
        },
        onSave: function () {
            var oReportModel = this.getView().getModel("ReportModel");
            var oReportData = oReportModel.getData();
            var checkb1 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "org")).getSelected();
            if (checkb1 === true) {
                oReportData.ChngTitleOrg = "X";
            }
            var checkb2 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "personnel")).getSelected();
            if (checkb2 === true) {
                oReportData.ChngTitlePerson = "X";
            }
            var checkb3 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "system")).getSelected();
            if (checkb3 === true) {
                oReportData.ChngTitleSys = "X";
            }
            var checkb4 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "process")).getSelected();
            if (checkb4 === true) {
                oReportData.ChngTitlePro = "X";
            }
            var checkb5 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "rig")).getSelected();
            if (checkb5 === true) {
                oReportData.ChngTitleRig = "X";
            }
            var checkb6 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "equip")).getSelected();
            if (checkb6 === true) {
                oReportData.ChngTitleEqui = "X";
            }
            var checkb7 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "material")).getSelected();
            if (checkb7 === true) {
                oReportData.ChngTitleMat = "X";
            }
            var checkb8 = this.byId(sap.ui.core.Fragment.createId("generalfrag", "lawandreg")).getSelected();
            if (checkb8 === true) {
                oReportData.ChngTitleLaws = "X";
            }
            oReportData.AppDetChange = this.ardca;
            oReportData.AppReasonChange = this.arcad;
            oReportData.AppNecessary = this.itcn;
            oReportData.AppRiskApproval = this.ipgtr;
            oReportData.AppRiskComplete = this.dratc;
            oReportData.ReviewProcess = this.rev1;
            oReportData.ReviewEffective = this.rev2;
            oReportData.ReviewComplete = this.rev3;
            oReportData.ReviewMgmt = this.rev4;
            oReportData.ReviewQMS = this.rev5;
            var oDataModel = new sap.ui.model.json.JSONModel(oReportData);
            var sServiceUrl = "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/";
            var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
            var oParams = {
                success: function (oData, oResponse) {
                    var sReportNumber = oData.Code;
                    var sSuccessMessage = "Change " + sReportNumber + " saved successfully";
                    sap.m.MessageBox.success(sSuccessMessage, {
                        onClose: function () {
                            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                            oRouter.navTo("View1");
                            //   that.onReset();
                        }.bind(this)
                    });
                }.bind(this),
                error: function (oError) {
                    sap.m.MessageBox.error("Error saving report");
                }
            };
            oModel.create("/ZMOC_DETSet", oDataModel.getData(), oParams);
        },




    });
});