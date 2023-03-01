sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter", "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment", "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],

    function (Controller, _JSONModel, _FilterOperator, _Filter, _Fragment, _History, _UIComponent) {
        "use strict";

        return Controller.extend("moc.controller.View1", {
            onInit: function () {

            },

            onCreateNewReport: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("View2");
            },
            onRowSelect: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("View2");
            }
            // ,
            // onBeforeRebindTable: function (oEvent) {
            //     var oBindingParams = oEvent.getParameter("bindingParams");
            //     var oSmartTable = oEvent.getSource();
            //     var sFilterValue;
            //     var oFilter = new sap.ui.model.Filter("TYPE", sap.ui.model.FilterOperator.EQ, "NM");
            //     oBindingParams.filters.push(oFilter);

            //     var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            //     var oCustomControl = oSmartFilterBar.getControlByKey("Code");
            //     if (oCustomControl) {
            //         sFilterValue = oCustomControl.getValue();
            //         if (sFilterValue) {
            //             oBindingParams.filters.push(new sap.ui.model.Filter("Code", "EQ", sFilterValue))
            //         }
            //     }
            //     oCustomControl = oSmartFilterBar.getControlByKey("Status");
            //     if (oCustomControl) {
            //         //sFilterValue = oCustomControl.getTokens();
            //         sFilterValue = oCustomControl.getValue();
            //         if (sFilterValue) {
            //             oBindingParams.filters.push(new sap.ui.model.Filter("Status", "EQ", sFilterValue));
            //         }
            //     }
            //     oCustomControl = oSmartFilterBar.getControlByKey("Plant");
            //     if (oCustomControl) {
            //         //sFilterValue = oCustomControl.getTokens();
            //         sFilterValue = oCustomControl.getValue();
            //         if (sFilterValue) {
            //             oBindingParams.filters.push(new sap.ui.model.Filter("Plant", "EQ", sFilterValue));
            //         }
            //     }
            //     oCustomControl = oSmartFilterBar.getControlByKey("CreatedDate");
            //     if (oCustomControl) {
            //         //sFilterValue = oCustomControl.getTokens();
            //         sFilterValue = oCustomControl.getValue();
            //         if (sFilterValue) {
            //             var sSelectedDate = new Date(new Date(sFilterValue).toDateString());
            //             oBindingParams.filters.push(new sap.ui.model.Filter("CreatedDate", "EQ", sSelectedDate));
            //         }
            //     }

            // },
        });
    });
