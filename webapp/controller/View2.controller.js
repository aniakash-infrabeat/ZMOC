sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/ui/core/Fragment"
], function (Controller, History, JSONModel, Fragment) {
  "use strict";

  return Controller.extend("moc.controller.View2", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("View2").attachPatternMatched(this._onRouteMatched, this);

    },
    // onExit: function()
    // {
    //   this.getView().destroy();
    // },

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
    _onRouteMatched: function (oEvent) {

      var oevparam = oEvent.getParameter("arguments");
      var Code = oevparam.codeno;
      var Status = oevparam.status;
      var Department = oevparam.department;
      var RequestedBy = oevparam.requestedby;
      var ObjectofChange = oevparam.objchng;
      var CreatedBy = oevparam.crtdby;
      var DetailsofChange = oevparam.detochng;
      var ReasonofChange = oevparam.refchang;
      var ProposedtforChange = oevparam.prtfrc;

      var oModel = this.getOwnerComponent().getModel("selectedData");
      if (Code !== null && Code !== undefined) {
        // var oData = oModel.getData();
        var oView = this.getView();
        var fragmentId = oView.createId("generalfrag");
        var oCodeInput = Fragment.byId(fragmentId, "_IDGenInput1");
        if (oCodeInput !== null) {
          oCodeInput.setValue(Code);
          oCodeInput.setEditable(false);

        }
        var oStatusInput = Fragment.byId(fragmentId, "_IDGenInput9");
        oStatusInput.setValue(Status);
        var oDeptInput = Fragment.byId(fragmentId, "_IDGenInput5");
        oDeptInput.setValue(Department);
        var oRequestedBy = Fragment.byId(fragmentId, "_IDGenInput3");
        oRequestedBy.setValue(RequestedBy);
        var oObjectofChange = Fragment.byId(fragmentId, "_IDGenInput2");
        oObjectofChange.setValue(ObjectofChange);
        var oCreatedBy = Fragment.byId(fragmentId, "_IDGenInput4");
        oCreatedBy.setValue(CreatedBy);
        var oDetailsofChange = Fragment.byId(fragmentId, "mno");
        oDetailsofChange.setValue(DetailsofChange);
        var oReasonofChange = Fragment.byId(fragmentId, "pqr");
        oReasonofChange.setValue(ReasonofChange);
        var oProposedtforChange = Fragment.byId(fragmentId, "vwx");
        oProposedtforChange.setValue(ProposedtforChange);
      }
      else {
        var oView = this.getView();
        var fragmentId = oView.createId("generalfrag");
        var oCodeInput = Fragment.byId(fragmentId, "_IDGenInput1");
        if (oCodeInput !== null) {
          oCodeInput.setValue("");
          oCodeInput.setEditable(true);

        }
      }
    },

    onReset: function () {
      // window.location.reload();
      // General fragment fields
      var codei = this.byId(Fragment.createId("generalfrag", "_IDGenInput1")).setValue("");
      var objc = this.byId(Fragment.createId("generalfrag", "_IDGenInput2")).setValue("");
      var reqd = this.byId(Fragment.createId("generalfrag", "DP1")).setValue("");
      var reqb = this.byId(Fragment.createId("generalfrag", "_IDGenInput3")).setValue("");
      var toc = this.byId(Fragment.createId("generalfrag", "typeofc")).setValue("");
      var creb = this.byId(Fragment.createId("generalfrag", "_IDGenInput4")).setValue("");
      var dept = this.byId(Fragment.createId("generalfrag", "_IDGenInput5")).setValue("");
      var cod = this.byId(Fragment.createId("generalfrag", "DP2")).setValue("");
      var stat = this.byId(Fragment.createId("generalfrag", "_IDGenInput9")).setValue("");

      //Checkboxes
      var checkb1 = this.byId(Fragment.createId("generalfrag", "org")).setSelected(false);
      var checkb2 = this.byId(Fragment.createId("generalfrag", "personnel")).setSelected(false);
      var checkb3 = this.byId(Fragment.createId("generalfrag", "system")).setSelected(false);
      var checkb4 = this.byId(Fragment.createId("generalfrag", "process")).setSelected(false);
      var checkb5 = this.byId(Fragment.createId("generalfrag", "rig")).setSelected(false);
      var checkb6 = this.byId(Fragment.createId("generalfrag", "equip")).setSelected(false);
      var checkb7 = this.byId(Fragment.createId("generalfrag", "material")).setSelected(false);
      var checkb8 = this.byId(Fragment.createId("generalfrag", "lawandreg")).setSelected(false);

      //Text Areas
      var doc = this.byId(Fragment.createId("generalfrag", "mno")).setValue("");
      var rfc = this.byId(Fragment.createId("generalfrag", "pqr")).setValue("");
      var ptfc = this.byId(Fragment.createId("generalfrag", "vwx")).setValue("");

      // Approval fragment fields
      //Approval to continue change
      var docd = this.byId("_IDGenRadioButtonGroup1").setSelectedButton("");
      var rocd = this.byId("_IDGenRadioButtonGroup2").setSelectedButton("");
      var cnec = this.byId("_IDGenRadioButtonGroup3").setSelectedButton("");
      var agtr = this.byId("_IDGenRadioButtonGroup4").setSelectedButton("");
      var drat = this.byId("_IDGenRadioButtonGroup5").setSelectedButton("");
      var atcdate = this.byId("_IDGenDatePicker1").setValue("");

      //Approval of change.Risk Assessment Review
      var aocname = this.byId("weq").setValue("");
      var aocpos = this.byId("dog").setValue("");
      var aocdate = this.byId("DP6").setValue("");

      //Reponsible Person
      var repname = this.byId("_IDGenInput19").setValue("");
      var reppos = this.byId("_IDGenInput21").setValue("");
      var repdate = this.byId("_IDGenDatePicker2").setValue("");

      //Risk Assessment
      var risname = this.byId("abc3").setValue("");
      var risdate = this.byId("abc5").setValue("");

      //Result of Risk Assessment
      var rispep = this.byId("people").setValue("");
      var risenv = this.byId("env").setValue("");
      var risprp = this.byId("prop").setValue("");
      var rispla = this.byId("plant").setValue("");

      var mpdwu = this.byId("boom").setValue("");
      var sokma = this.byId("onam").setValue("");
      var iptac = this.byId("badam").setValue("");
      var trdat = this.byId("date15").setValue("");
      var ecoc = this.byId("wnkj").setValue("");

      //Implementation
      var dat1 = this.byId("date1").setValue("");
      var dat2 = this.byId("date2").setValue("");
      var dat3 = this.byId("date3").setValue("");
      var dat4 = this.byId("date4").setValue("");
      var dat5 = this.byId("date5").setValue("");
      var dat6 = this.byId("date6").setValue("");
      var dat7 = this.byId("date7").setValue("");
      var dat8 = this.byId("date8").setValue("");
      var dat9 = this.byId("date9").setValue("");
      var impn = this.byId("inp1").setValue("");
      var impp = this.byId("inp2").setValue("");
      var dat10 = this.byId("date10").setValue("");

      //Review
      var wcpf = this.byId("req1").setSelectedButton("");
      var wcpe = this.byId("req2").setSelectedButton("");
      var niar = this.byId("req3").setSelectedButton("");
      var wmcp = this.byId("req4").setSelectedButton("");
      var ictq = this.byId("req5").setSelectedButton("");
    },
    onSave: function () {

      // General fragment fields
      // var codei = this.byId(Fragment.createId("generalfrag", "_IDGenInput1")).getValue();
      var objc = this.byId(Fragment.createId("generalfrag", "_IDGenInput2")).getValue();
      var reqd = this.byId(Fragment.createId("generalfrag", "DP1")).getValue();
      var reqb = this.byId(Fragment.createId("generalfrag", "_IDGenInput3")).getValue();
      var toc = this.byId(Fragment.createId("generalfrag", "typeofc")).getValue();
      var creb = this.byId(Fragment.createId("generalfrag", "_IDGenInput4")).getValue();
      var dept = this.byId(Fragment.createId("generalfrag", "_IDGenInput5")).getValue();
      var cod = this.byId(Fragment.createId("generalfrag", "DP2")).getValue();
      var stat = this.byId(Fragment.createId("generalfrag", "_IDGenInput9")).getValue();
      //Checkboxes
      if (this.byId(Fragment.createId("generalfrag", "org")).getSelected() === true) {
        var checkb1 = "YES";
      }
      else {
        checkb1 = "NO";
      }
      if (this.byId(Fragment.createId("generalfrag", "personnel")).getSelected() === true) {
        var checkb2 = "YES";
      }
      else {
        checkb2 = "NO";
      }

      if (this.byId(Fragment.createId("generalfrag", "system")).getSelected() === true) {
        var checkb3 = "YES";
      }
      else {
        checkb3 = "NO";
      }
      if (this.byId(Fragment.createId("generalfrag", "process")).getSelected() === true) {
        var checkb4 = "YES";
      }
      else {
        checkb4 = "NO";
      }
      if (this.byId(Fragment.createId("generalfrag", "rig")).getSelected() === true) {
        var checkb5 = "YES";
      }
      else {
        checkb5 = "NO";
      }
      if (this.byId(Fragment.createId("generalfrag", "equip")).getSelected() === true) {
        var checkb6 = "YES";
      }
      else {
        checkb6 = "NO";
      }
      if (this.byId(Fragment.createId("generalfrag", "material")).getSelected() === true) {
        var checkb7 = "YES";
      }
      else {
        checkb7 = "NO";
      }
      if (this.byId(Fragment.createId("generalfrag", "lawandreg")).getSelected() === true) {
        var checkb8 = "YES";
      }
      else {
        checkb8 = "NO";
      }

      //Text Areas
      var doc = this.byId(Fragment.createId("generalfrag", "mno")).getValue();
      var rfc = this.byId(Fragment.createId("generalfrag", "pqr")).getValue();
      var ptfc = this.byId(Fragment.createId("generalfrag", "vwx")).getValue();

      // Approval fragment fields

      //Approval to continue change
      var docd = this.byId("_IDGenRadioButtonGroup1").getSelectedButton().getText();
      var rocd = this.byId("_IDGenRadioButtonGroup2").getSelectedButton().getText();
      var cnec = this.byId("_IDGenRadioButtonGroup3").getSelectedButton().getText();
      var agtr = this.byId("_IDGenRadioButtonGroup4").getSelectedButton().getText();
      var drat = this.byId("_IDGenRadioButtonGroup5").getSelectedButton().getText();
      var atcdate = this.byId("_IDGenDatePicker1").getValue();

      //Approval of change.Risk Assessment Review
      var aocname = this.byId("weq").getValue();
      var aocpos = this.byId("dog").getValue();
      var aocdate = this.byId("DP6").getValue();

      //Reponsible Person
      var repname = this.byId("_IDGenInput19").getValue();
      var reppos = this.byId("_IDGenInput21").getValue();
      var repdate = this.byId("_IDGenDatePicker2").getValue();

      //Risk Assessment
      var risname = this.byId("abc3").getValue();
      var risdate = this.byId("abc5").getValue();

      //Result of Risk Assessment
      var rispep = this.byId("people").getValue();
      var risenv = this.byId("env").getValue();
      var risprp = this.byId("prop").getValue();
      var rispla = this.byId("plant").getValue();

      var mpdwu = this.byId("boom").getValue();
      var sokma = this.byId("onam").getValue();
      var iptac = this.byId("badam").getValue();
      var trdat = this.byId("date15").getValue();
      var ecoc = this.byId("wnkj").getValue();

      //Implementation
      var dat1 = this.byId("date1").getValue();
      var dat2 = this.byId("date2").getValue();
      var dat3 = this.byId("date3").getValue();
      var dat4 = this.byId("date4").getValue();
      var dat5 = this.byId("date5").getValue();
      var dat6 = this.byId("date6").getValue();
      var dat7 = this.byId("date7").getValue();
      var dat8 = this.byId("date8").getValue();
      var dat9 = this.byId("date9").getValue();
      var impn = this.byId("inp1").getValue();
      var impp = this.byId("inp2").getValue();
      var dat10 = this.byId("date10").getValue();

      //Review
      var wcpf = this.byId("req1").getSelectedButton().getText();
      var wcpe = this.byId("req2").getSelectedButton().getText();
      var niar = this.byId("req3").getSelectedButton().getText();
      var wmcp = this.byId("req4").getSelectedButton().getText();
      var ictq = this.byId("req5").getSelectedButton().getText();

      // const oUploadSet = this.byId("attachmentUpl");

      var oData1 = {};

      oData1.Code = codei;
      oData1.ObjOfChange = objc;
      oData1.RequestDate = reqd;
      oData1.RequestedBy = reqb;
      oData1.TypeOfChange = toc;
      oData1.CreatedBy = creb;
      oData1.Department = dept;
      oData1.ChangeDate = cod;
      oData1.Status = stat;

      oData1.ChngTitleOrg = checkb1;
      oData1.ChngTitlePerson = checkb2;
      oData1.ChngTitleSys = checkb3;
      oData1.ChngTitlePro = checkb4;
      oData1.ChngTitleRig = checkb5;
      oData1.ChngTitleEqui = checkb6;
      oData1.ChngTitleMat = checkb7;
      oData1.ChngTitleLaws = checkb8;

      oData1.DetailsOfChange = doc;
      oData1.ReasonOfChange = rfc;
      oData1.ProposeChange = ptfc;

      oData1.AppDetChange = docd;
      oData1.AppReasonChange = rocd;
      oData1.AppNecessary = cnec;
      oData1.AppRiskApproval = agtr;
      oData1.AppRiskComplete = drat;
      oData1.AppRiskDate = atcdate;

      oData1.ApprovalName = aocname;
      oData1.ApprovalPos = aocpos;
      oData1.ApprovalDate = aocdate;

      oData1.PersonName = repname;
      oData1.PersonPosition = reppos;
      oData1.PersonDate = repdate;

      oData1.RiskChange = risname;
      oData1.RiskDate = risdate;

      oData1.People = rispep;
      oData1.Environment = risenv;
      oData1.Material = risprp;
      oData1.RiskPlant = rispla;

      oData1.ProcUpdate = mpdwu;
      oData1.Summary = sokma;
      oData1.AffectChange = iptac;
      oData1.CompletionDate = trdat;
      oData1.EstimateCost = ecoc;

      oData1.ImpMigration = dat1;
      oData1.ImpNotification = dat2;
      oData1.ImpUpdated = dat3;
      oData1.ImpConducted = dat4;
      oData1.ImpCommunicated = dat5;
      oData1.ImpCompleted = dat6;
      oData1.ImpTargetDate = dat7;
      oData1.ImpApprovalDate = dat8;
      oData1.ImpExtendDate = dat9;
      oData1.ImpName = impn;
      oData1.ImpPosition = impp;
      oData1.ImpDate = dat10;

      oData1.ReviewProcess = wcpf;
      oData1.ReviewEffective = wcpe;
      oData1.ReviewComplete = niar;
      oData1.ReviewMgmt = wmcp;
      oData1.ReviewQMS = ictq;
      
      var oUploader = this.getView().byId("attachmentUpl");
      // var oModel = this.getView().getModel();
      var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/");
      var oAttachment = {
          "Docadd": this.getView().byId("addedin").getValue(),
          "Docdesc": this.getView().byId("comments").getValue()
      };
      oModel.create("/ZMOC_FILESet", oAttachment, {
          success: function() {
            sap.m.MessageToast.show("File uploaded successfully!");
          },
          error: function(oError) {
            sap.m.MessageToast.show("Error uploading file: " + oError);
          },
          refreshAfterChange: true
      });
      // oUploader.removeAllHeaderParameters();
      // oUploader.removeAllParameters();
      // oUploader.removeAllIncompleteItems();
      // oUploader.removeAllAggregation("items");

      var saveModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/");
      var obj = oData1;
      var that = this;
      
      // sap.ui.core.BusyIndicator.show();
      saveModel.create("/ZMOC_DETSet", obj, {
        success: function (oData,response) {
          // sap.ui.core.BusyIndicator.hide();
          // sap.m.MessageToast.show("Data saved successfully");
          MessageBox.confirm("Data saved success");
          var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
          oRouter.navTo("View1");
          that.onReset();
          // window.location.reload();
        },
        error: function () {

          sap.m.MessageToast.show("Error while saving data");
        }

      });

    },

  //Upload




       
  });
});