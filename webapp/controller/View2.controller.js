sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History",
  "sap/ui/model/json/JSONModel",
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
      } else {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("View1", {}, true);
        this.getOwnerComponent().setModel(null, "selectedData");

      }
    },
    _onRouteMatched: function (oEvent) {

      var oevparam = oEvent.getParameter("arguments");
      var Code = oevparam.codeno;
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
    onSave: function () {
      var codei = this.byId(Fragment.createId("generalfrag","_IDGenInput1")).getValue();
      var objc = this.byId(Fragment.createId("generalfrag","_IDGenInput2")).getValue();
      var reqd = this.byId(Fragment.createId("generalfrag","DP1")).getValue();
      var reqb = this.byId(Fragment.createId("generalfrag","_IDGenInput3")).getValue();
      var toc = this.byId(Fragment.createId("generalfrag","typeofc")).getValue();
      var creb = this.byId(Fragment.createId("generalfrag","_IDGenInput4")).getValue();
      var dept = this.byId(Fragment.createId("generalfrag","_IDGenInput5")).getValue();
      var cod = this.byId(Fragment.createId("generalfrag","DP2")).getValue();
      var stat = this.byId(Fragment.createId("generalfrag","_IDGenInput9")).getValue();
      //Checkboxes
      var checkb1 = this.byId(Fragment.createId("generalfrag","org")).getSelected();
      var checkb2 = this.byId(Fragment.createId("generalfrag","personnel")).getSelected();
      var checkb3 = this.byId(Fragment.createId("generalfrag","system")).getSelected();
      var checkb4 = this.byId(Fragment.createId("generalfrag","process")).getSelected();
      var checkb5 = this.byId(Fragment.createId("generalfrag","rig")).getSelected();
      var checkb6 = this.byId(Fragment.createId("generalfrag","equip")).getSelected();
      var checkb7 = this.byId(Fragment.createId("generalfrag","material")).getSelected();
      var checkb8 = this.byId(Fragment.createId("generalfrag","lawandreg")).getSelected();
      //Text Areas
      var doc = this.byId(Fragment.createId("generalfrag","mno")).getValue();
      var rfc = this.byId(Fragment.createId("generalfrag","pqr")).getValue();
      var ptfc = this.byId(Fragment.createId("generalfrag","vwx")).getValue();
    
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
      // oData1. = checkb1;
      // oData1. = checkb2;
      // oData1. = checkb3;
      // oData1. = checkb4;
      // oData1. = checkb5;
      // oData1. = checkb6;
      // oData1. = checkb7;
      // oData1. = checkb8;
      oData1.DetailsOfChange = doc;
      oData1.ReasonOfChange = rfc;
      oData1.ProposeChange = ptfc;


    },

  });
});