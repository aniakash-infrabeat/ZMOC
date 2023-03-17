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

      // var fragmentId = this.getView().createId("generalfrag");
      // var oCodeInput = Fragment.byId(fragmentId, "_IDGenInput1");
      // if (oCodeInput !== null) {
      //     oCodeInput.setValue("");
      //     oCodeInput.setEditable(false);
      //  }

      // var oModel = this.getOwnerComponent().getModel("selectedData");
      //  if (oModel === null) {
      // var fragmentId = oView.createId("generalfrag");
      // var oCodeInput = Fragment.byId(fragmentId, "_IDGenInput1");
      // oCodeInput.setValue("");
      // oCodeInput.setEditable(true);
      // }
    },

    onNavBack: function () {
      var oHistory = History.getInstance();
      var sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("View1", {}, true);
        this.getOwnerComponent().setModel(null, "selectedData");

        // var oView = this.getView();
        // var fragmentId = oView.createId("generalfrag");
        // var oCodeInput = Fragment.byId(fragmentId, "_IDGenInput1");
        // if (oCodeInput !== null) {
        //     oCodeInput.setValue("");
        //     oCodeInput.setEditable(true);
        //  }
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


    // _onRouteMatched: function () {
    //   var oModel = this.getOwnerComponent().getModel("selectedData");
    //   if (oModel !==""){


    //   var oData = oModel.getData();
    //   var oView = this.getView();
    //   var fragmentId = this.getView().createId("generalfrag");
    //   var oCodeInput = Fragment.byId(fragmentId, "_IDGenInput1");
    //   //  if (oCodeInput !== "") {
    //               // sap.ui.getCore().byId("_IDGenInput1").setValue(Code);
    //               // sap.ui.getCore().byId("_IDGenInput1").setEditable(false);
    //               oCodeInput.setValue(oData.Code);
    //               oCodeInput.setEditable(false);}
    //           // }
    //           else {
    //               // sap.ui.getCore().byId("_IDGenInput1").setEditable(true);
    //               oCodeInput.setEditable(true);
    //           }
    //   // var oFragment = sap.ui.getCore().byId("generalfrag");
    //   // var oCodeInput = oFragment.byId("_IDGenInput1");
    //   // oCodeInput.byId("generalfrag", "_IDGenInput1")?.setValue(oData.Code);
    //   // oCodeInput.setValue(oData.Code);
    // },
    // _onRouteMatched: function ()  {
    //     var oModel = this.getOwnerComponent().getModel("selectedData");
    //     var oData = oModel.getData();
    //     var oView = this.getView();
    //     var pFragmentLoaded = new Promise(function(resolve, reject) {
    //       var oFragment = oView.byId("generalfrag");
    //       if (oFragment) {
    //         resolve(oFragment);
    //       } else {
    //         Fragment.load({
    //           id: oView.getId(),
    //           name: "moc.fragments.General",
    //           controller: this
    //         }).then(function(oFragment) {
    //           oView.addDependent(oFragment);
    //           resolve(oFragment);
    //         });
    //       }
    //     }.bind(this));
    //     pFragmentLoaded.then(function(oFragment) {
    //       var oCodeInput = sap.ui.core.Fragment.byId("generalfrag", "_IDGenInput1");
    //       oCodeInput.setValue(oData.Code);
    //     });
    //   },
    // _onRouteMatched: function () {
    //   var oModel = this.getOwnerComponent().getModel("selectedData");
    //   var oData = oModel.getData();
    //   var oView = this.getView();
    //   var oFragment = sap.ui.core.Fragment.byId("idIconTabBarNoIcons", "generalfrag");
    //   Fragment.load({
    //     id: oView.getId(),
    //     name: "moc.view.General",
    //     controller: this
    //   }).then(function(oFragment) {
    //     oView.addContent(oFragment);
    //     var oCodeInput = oFragment.byId("_IDGenInput1");
    //     oCodeInput.setValue(oData.Code);
    //   });
    // },

  });
});