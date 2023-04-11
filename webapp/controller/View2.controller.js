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



    },


    getEmptyReportModel: function () {
      var oEntity = {
        "Code": "",
        "RequestedBy": "",
        "Status": ""
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
      // this.byId("idIconTabBarNoIcons").setSelectedKey("Gen"); //set general tab as a default
      // var oAddedBy = this.byId(sap.ui.core.Fragment.createId("external", "addedin"));
      // var oDesc = this.byId(sap.ui.core.Fragment.createId("external", "comments"));
      // oAddedBy.setValue("");
      // oDesc.setValue("");
      // //Clear attachments 
      // var oAttachmentUpl = this.byId(sap.ui.core.Fragment.createId("external", "attachmentUpl"));
      // var oData = { results: [] };
      // var oAttachmentsModel = new JSONModel(oData);
      // oAttachmentUpl.removeAllItems();
      // oAttachmentUpl.destroyItems();
      // oAttachmentUpl.destroyIncompleteItems();
      // oAttachmentUpl.setModel(oAttachmentsModel).bindAggregation("items", {
      //   path: "/results", templateShareable: true, template: new sap.m.upload.UploadSetItem({
      //     fileName: "{FILE_NAME}", mediaType: "{MIME_TYPE}", visibleEdit: false, visibleRemove: false,
      //     url: "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/ZMOC_EXT_FILESet(CODE_NO='" + this.ReportId + "',FILE_NAME='" + "{FILE_NAME}" + "')/$value"
      //   })
      // });

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

      // this.loadAttachments(); //Bind attachment list
      // }
      ///(sEntity, null, null, false, function (oData, oResponse) {
      //    that.ReportModel.setData(oData);
      //  }, function (err) { });

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

    onSave: function () {
      var oReportModel = this.getView().getModel("ReportModel");
      var oReportData = oReportModel.getData();
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
              // that.onReset();
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