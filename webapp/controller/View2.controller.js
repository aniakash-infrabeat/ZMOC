sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, JSONModel) {
        "use strict";

        return Controller.extend("moc.controller.View2", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("View2").attachPatternMatched(this._onRouteMatched, this);
            },

            // _onRouteMatched: function (oEvent) {
            //     var Code = oEvent.getParameter("arguments").codeno;

                // if (Code !== "") {
                //     sap.ui.getCore().byId("_IDGenInput1").setValue(Code);
                //     sap.ui.getCore().byId("_IDGenInput1").setEditable(false);
                // }
                // else {
                //     sap.ui.getCore().byId("_IDGenInput1").setEditable(true);
                // }

            // },

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

            getEmptyReportModel: function () {
                var oEntity = {
                    "Code": ""
                };
                return oEntity;
            },
            setDefaultModel: function () {
                var oModel = new sap.ui.model.json.JSONModel(this.getEmptyReportModel());
                oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                this.getView().setModel(oModel, "ReportModel");
            },

            function (oEvent) { _onRouteMatched

            this.ReportModel = this.getView().getModel("ReportModel");
            this.ReportId = oEvent.getParameter("arguments").codeno;
            if (this.ReportId) {
                this.bindData(this.ReportId);
            } else {
                this.ReportModel.setData(this.getEmptyReportModel());

            }
            var oViwewModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oViwewModel, "viewModel");

            },



        });
    });
