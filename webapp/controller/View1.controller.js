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

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("View1").attachPatternMatched(this._onRouteMatched, this);
                this.CreateReportFlag = true;

            },

            _onRouteMatched: function (oEvent) {
                this.smartTable = this.getView().byId("ReportSmartTable");
                //this.smartTable.getModel().updateBindings();
                this.smartTable.getModel().refresh(true);
                this.smartTable.setNoData("Check approval matrix / Check with administrator.");

                this.oTable = this.getView().byId("tblreport");
                this.oTable.removeSelections();
                // this.getUserDetails();
            },

            // getUserDetails: function () {
            //     var oCreatreportBtn = this.getView().byId("createReportbtn");
            //     if (this.CreateReportFlag) {
            //         var that = this;
            //         this.getView().getModel().read("/ZMOC_DETSet('')", {
            //             success: function (data) {
            //                 if (data.CREATEREPORTFLAG === "X") {
            //                     oCreatreportBtn.setVisible(true);
            //                     that.CreateReportFlag = true;
            //                 } else {
            //                     oCreatreportBtn.setVisible(false);
            //                     that.CreateReportFlag = false;
            //                 }
            //             },
            //             error: function (e) {
            //             }
            //         });
            //     }
            // },

            onCreateNewReport: function () {
                // var code_input = null;
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("View2");

            },
            // onRowSelect: function (oEvent) {

            //     var oSelectedItem = oEvent.getParameter("listItem");
            //     var oSelectedRowData = oSelectedItem.getBindingContext().getObject();
            //     var oRouter = this.getOwnerComponent().getRouter();
            //     if (oSelectedRowData.Code) {

            //         oRouter.navTo("View2", { codeno: oSelectedRowData.Code });
            //     }
            // },
            onRowSelect: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("listItem");
                var oSelectedRowData = oSelectedItem.getBindingContext().getObject();
                var oRouter = this.getOwnerComponent().getRouter();
                if (oSelectedRowData.Code) {
                    oRouter.navTo("View2", { codeno: oSelectedRowData.Code });

                    // // Get the attachment ID or file name from the selected row data
                    // var attachmentId = oSelectedRowData.Code;
                    // var Filename = oSelectedRowData.FileName;

                    // // Create the attachment URL
                    // // var attachmentUrl = "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/ZMOC_EXT_FILESet(Code='" + attachmentId + "')/$value";
                    // var attachmentUrl = "/sap/opu/odata/sap/ZGW_MOC_DATA_SRV/ZMOC_EXT_FILESet(Code='" + attachmentId + "',Filename='" + Filename + "')/$value";

                    // // Fetch the attachment data from the backend using an AJAX call or a FileUploader control
                    // jQuery.ajax({
                    //     url: attachmentUrl,
                    //     type: "GET",
                    //     success: function (data) {
                    //         // Handle the success case by displaying the attachment data in a popup or downloading the file
                    //     },
                    //     error: function (error) {
                    //         // Handle the error case
                    //     }
                    // });
                }
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
            ,
            onBeforeRebindTable: function (oEvent) {
                var oBindingParams = oEvent.getParameter("bindingParams");
                var oSmartTable = oEvent.getSource();
                var sFilterValue;
                var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());

                // Custom control for Smart Filter Bar //
                var oCustomControl = oSmartFilterBar.getControlByKey("Code");
                if (oCustomControl) {
                    sFilterValue = oCustomControl.getValue();
                    if (sFilterValue) {
                        oBindingParams.filters.push(new sap.ui.model.Filter("Code", "EQ", sFilterValue))
                    }
                }
                oCustomControl = oSmartFilterBar.getControlByKey("Status");
                if (oCustomControl) {
                    sFilterValue = oCustomControl.getValue();
                    if (sFilterValue) {
                        oBindingParams.filters.push(new sap.ui.model.Filter("Status", "EQ", sFilterValue));
                    }
                }
                oCustomControl = oSmartFilterBar.getControlByKey("Plant");
                if (oCustomControl) {
                    sFilterValue = oCustomControl.getValue();
                    if (sFilterValue) {
                        oBindingParams.filters.push(new sap.ui.model.Filter("Plant", "EQ", sFilterValue));
                    }
                }
                // 
                oCustomControl = oSmartFilterBar.getControlByKey("CreatedDate");
                if (oCustomControl) {
                    sFilterValue = oCustomControl.getValue();
                    if (sFilterValue) {
                        var sSelectedDate = new Date(new Date(sFilterValue).toDateString());
                        sSelectedDate.setDate(sSelectedDate.getDate() + 1); 
                        oBindingParams.filters.push(new sap.ui.model.Filter("CreatedDate", "EQ", sSelectedDate));
                    }
                }


            },
        });
    });