sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter", "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment", "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],

    function (Controller, JSONModel, FilterOperator, Filter, Fragment, History, UIComponent) {
        "use strict";

        return Controller.extend("moc.controller.View1", {
            onInit: function () {

            },

            onCreateNewReport: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("View2");
            },
            onRowSelect: function (oEvent) {
                var oContext = oEvent.getParameter("listItem").getBindingContext().getObject();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("View2", { codeno: oContext.Code });
            },
            

            onCodeVHPRequested: function () {
                var oView = this.getView();

                if (!this._codeValueHelpDialog) {
                    this._codeValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "moc.fragments.CodeValueHelp",
                        controller: this
                    }).then(function (oCodeValueHelpDialog) {
                        oView.addDependent(oCodeValueHelpDialog);
                        return oCodeValueHelpDialog;
                    });
                }
                this._codeValueHelpDialog.then(function (oCodeValueHelpDialog) {
                    //this._configPantValueHelpDialog();
                    oCodeValueHelpDialog.open();
                }.bind(this));
            },
            onCodeSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.Contains, sValue);
                var oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },
            onPlantSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.Contains, sValue);
                var oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },
            onCodeValueHelpDialogClose: function (oEvent) {
                var aToken = [];
                var oSelectedItems = oEvent.getParameter("selectedItems");
                var oInput = this.getView().byId("filterCode");

                if (!oSelectedItems) {
                    oInput.resetProperty("value");
                    return;
                } else {
                    oInput.setValue(oSelectedItems[0].getTitle());
                }
            },

            onPlantVHRequested: function () {
                var oView = this.getView();

                if (!this._plantValueHelpDialog) {
                    this._plantValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "moc.fragments.PlantValueHelp",
                        controller: this
                    }).then(function (oPlantValueHelpDialog) {
                        oView.addDependent(oPlantValueHelpDialog);
                        return oPlantValueHelpDialog;
                    });
                }
                this._plantValueHelpDialog.then(function (oPlantValueHelpDialog) {
                    //this._configPantValueHelpDialog();
                    oPlantValueHelpDialog.open();
                }.bind(this));
            },
            onPlantValueHelpDialogClose: function (oEvent) {
                var aToken = [];
                var oSelectedItems = oEvent.getParameter("selectedItems");
                var oInput = this.getView().byId("filterPlant");

                if (!oSelectedItems) {
                   oInput.resetProperty("value");
                    return;
                } else {
                   oInput.setValue(oSelectedItems[0].getTitle());
                }
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
