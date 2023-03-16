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
  
      onNavBack: function () {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();
  
        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("View1", {}, true);
        }
      },
  
    //   _onRouteMatched: function () {
    //     var oModel = this.getOwnerComponent().getModel("selectedData");
    //     var oData = oModel.getData();
    //     var oView = this.getView();
    //     var oFragment = oView.byId("generalfrag");
    //     var oCodeInput = oFragment.byId("generalfrag", "_IDGenInput1");
    //     oCodeInput.byId("generalfrag", "_IDGenInput1")?.setValue(oData.Code);
    //     // oCodeInput.setValue(oData.Code);
    //   },
    _onRouteMatched: function ()  {
        var oModel = this.getOwnerComponent().getModel("selectedData");
        var oData = oModel.getData();
        var oView = this.getView();
      
        // create a promise to wait for the fragment to load
        var pFragmentLoaded = new Promise(function(resolve, reject) {
          var oFragment = oView.byId("generalfrag");
          if (oFragment) {
            resolve(oFragment);
          } else {
            Fragment.load({
              id: oView.getId(),
              name: "moc.fragments.General",
              controller: this
            }).then(function(oFragment) {
              oView.addDependent(oFragment);
              resolve(oFragment);
            });
          }
        }.bind(this));
      
        // wait for the fragment to load before accessing its controls
        pFragmentLoaded.then(function(oFragment) {
          var oCodeInput = sap.ui.core.Fragment.byId("generalfrag", "_IDGenInput1");
          oCodeInput.setValue(oData.Code);
        });
      },
    });
  });