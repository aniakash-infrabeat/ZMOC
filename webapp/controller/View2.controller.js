


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

        },

        _onRouteMatched: function (oEvent) {

            this.ReportModel = this.getView().getModel("ReportModel");
            this.ReportId = oEvent.getParameter("arguments").codeno;
            if (this.ReportId) {
                this.bindData(this.ReportId);
            } else {
                this.ReportModel.setData(this.getEmptyReportModel());


            }
            this.byId("idIconTabBarNoIcons").setSelectedKey("Gen"); //set general tab as a default
            // var oAddedBy = this.byId(sap.ui.core.Fragment.createId("external", "inAttachmentAddedBy"));
            // var oDesc = this.byId(sap.ui.core.Fragment.createId("external", "comments"));
            // oAddedBy.setValue("");
            // oDesc.setValue("");
            // var oAttachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
            // var aResults = { results: [] };
            // var oResultsModel = new sap.ui.model.json.JSONModel(aResults);
            // oAttachmentUpl.removeAllItems();
            // oAttachmentUpl.destroyItems();
            // oAttachmentUpl.destroyIncompleteItems();
            // oAttachmentUpl.setModel(oResultsModel).bindAggregation("items", {
            //     path: "/results",
            //     templateShareable: true,
            //     template: new sap.m.upload.UploadSetItem({
            //         fileName: "{Filename}",
            //         mediaType: "{MimeType}",
            //         visibleEdit: false,
            //         visibleRemove: false,
            //         url: "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/ZMOC_EXT_FILESet(Code ='" + this.ReportId + "',Filename ='" + {Filename} + "')/$value"
            //     })
            // });
            // var oViewModel = new sap.ui.model.json.JSONModel({
            //     saveBtnVisibility: true,
            //     printBtnVisibility: true
            // });
            // this.getView().setModel(oViewModel, "viewModel");

            var oViwewModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oViwewModel, "viewModel");
        },
        onBeforeRendering: function () {
            var e = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl")).getDefaultFileUploader();
            e.setIcon("sap-icon://attachment").setIconOnly(false)
        },

        loadAttachments: function () {
            var e = this;
            var a = "/ZMOC_EXT_FILESet";
            var l = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
            var s = new sap.ui.model.Filter({
                path: "Code",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: this.ReportId
            });
            var o = [];
            o.push(s);
            this.getView().getModel().read(a, {
                filters: o,
                success: function (a) {
                    var s = new sap.ui.model.json.JSONModel(a);
                    l.setModel(s).bindAggregation("items", {
                        path: "/results",
                        templateShareable: true,
                        template: new sap.m.upload.UploadSetItem({
                            fileName: "{Filename}",
                            mediaType: "{MimeType}",
                            visibleEdit: false,
                            visibleRemove: false,
                            // url: "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/ZMOC_EXT_FILESet(Code ='" + e.ReportId + "',FILE_NAME ='" + "{FILE_NAME}" + "')/$value"
                            url: "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/ZMOC_EXT_FILESet(Code='" + e.ReportId + "',Filename='" + "{Filename}" + "')/$value"
                            // url: "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/ZMOC_EXT_FILESet(Code= '" + e.ReportId + "' and Filename='" + "{Filename}" + "')/$value"
                        })
                    });
                    if (l.getItems().length > 0) {
                        e.byId(sap.ui.core.Fragment.createId("external", "inAttachmentAddedBy")).setValue(a.results[0].Docadd);
                        e.byId(sap.ui.core.Fragment.createId("external", "comments")).setValue(a.results[0].Docdesc)
                    } else {
                        e.byId(sap.ui.core.Fragment.createId("external", "inAttachmentAddedBy")).setValue("");
                        e.byId(sap.ui.core.Fragment.createId("external", "comments")).setValue("")
                    }
                },
                error: function (t) {
                    e.parseErrorMsg()
                }
            })
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


            }
            this.loadAttachments();

        },


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
                    this.ardca = "Y";
                    break;
                case 1:
                    this.ardca = "N";
                    break;
                case 2:
                    this.ardca = "NA";
                    break;
                default:
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

        onPrint: function () {
            var print = new sap.m.PDFViewer;
            this.getView().addDependent(print);
            var t = this.getView().getModel().sServiceUrl;
            var a = t + "/ZMOC_EXT_FILESet(Code='" + this.ReportId + "',TYPE='NM')/$value";
            print.setSource(a);
            print.setTitle("Code");
            print.setShowDownloadButton(true);
            print.open()
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

            //Upload
            var code = this.ReportId;
            var attachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
            var files = attachmentUpl.getIncompleteItems();
            var attachments = [];

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var attachment = {
                    FileName: file.getFileName(),
                    FileContent: file.getFileObject(),
                    Code: code
                };
                attachments.push(attachment);
            }

            var FN = file.getFileName();
            var sAddedBy = this.byId(sap.ui.core.Fragment.createId("external", "inAttachmentAddedBy")).getValue();
            var sDescription = this.byId(sap.ui.core.Fragment.createId("external", "comments")).getValue();
            var sSlug = "file-" + new Date().getTime();
            var oHeaders = {
                "slug": sSlug,
                text: this.ReportId + "/" + FN + "/" + sAddedBy + "/" + sDescription
                // "Content-type": ct
            };


            var oModel = this.getView().getModel();
            oModel.create("/ZMOC_EXT_FILESet", attachments, {
                headers: oHeaders,
                success: function (data) {
                    sap.m.MessageBox.success("File Uploaded Succesfully");
                },
                error: function (error) {
                    sap.m.MessageBox.error("Error uploading file");
                }
            });


            var that = this;
            var oDataModel = new sap.ui.model.json.JSONModel(oReportData);
            var sServiceUrl = "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/";
            var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
            var oParams = {
                success: function (oData, oResponse) {
                    var sReportNumber = oData.Code;
                    var sSuccessMessage = "Change " + sReportNumber + " saved successfully";
                    // that.onStartUpload();
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

        onStartUpload: function () {
            var that = this;
            var oAttachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
            var sAddedBy = this.byId(sap.ui.core.Fragment.createId("external", "inAttachmentAddedBy")).getValue();
            var sDescription = this.byId(sap.ui.core.Fragment.createId("external", "comments")).getValue();
            var aIncompleteItems = oAttachmentUpl.getIncompleteItems();
            this.iIncompleteItems = aIncompleteItems.length; //used to turn off busy indicator upon completion of all pending uploads
            if (this.iIncompleteItems !== 0) {
                // that.byId("iconTabBarInlineIcons").setSelectedKey("extFiles");
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




    });
});