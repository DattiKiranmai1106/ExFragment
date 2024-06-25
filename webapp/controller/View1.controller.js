sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.kt.exfra.exfragment.controller.View1", {
            onInit: function () {
                var jsonData = [{
                    "SNo": "1",
                    "TypeOfDegree": "B.Tech",
                    "Branch": "E.C.E",
                    "PassOutYear":2023,
                    "Percentage_CGPA":7.05
                }, {
                    "SNo": "2",
                    "TypeOfDegree": "InterMediate",
                    "Branch":"MPC",
                    "PassOutYear":2019,
                    "Percentage_CGPA":9.73
                }, {
                    "SNo": "3",
                    "TypeOfDegree": "SSC",
                    "Branch": "10th",
                    "PassOutYear":2017,
                    "Percentage_CGPA":8.7
                }];

                var oModel=new sap.ui.model.json.JSONModel(jsonData);
                var oColItem = this.getView().byId("colId");
                //this.getView().byId("idProductsTable").setModel(oModel)
                this.getView().setModel(oModel,"studentmodel");
               // this.getView().byId("idStudentTable").bindAggregation("items","/",oColItem);
            },
            onPress:function(){
               // var oView = this.getView();
                var oView = this.getView();
                if (!this.oDialog) {
                    this.oDialog = sap.ui.core.Fragment.load({
                        name: "com.sap.kt.exfra.exfragment.fragment.exTable",
                        controller: this
                    }).then(function (oDialog) {
                        this.oDialog = oDialog;
                        oView.addDependent(this.oDialog);
                        this.oDialog.open();
                    }.bind(this));
                } else {
                    this.oDialog.open();
                }

            },

            onPressSave:function(){
                var sNoId= sap.ui.getCore().byId("idSNo").getValue();
                var sTypeId = sap.ui.getCore().byId("idDegree").getValue();
                var sBranchId = sap.ui.getCore().byId("idBranch").getValue();
                var sYearId = sap.ui.getCore().byId("idYear").getValue();
                var sPerId= sap.ui.getCore().byId("idPer").getValue();
                var oModel = this.getView().getModel("studentmodel").getData();
                var oPayload = {
                    "SNo":sNoId,
                    "TypeOfDegree":sTypeId,
                    "Branch":sBranchId,
                    "PassOutYear":sYearId,
                    "Percentage_CGPA":sPerId
                }
                oModel.push(oPayload);
                this.oDialog.close();
                this.byId("idStudentTable").getModel("studentmodel").refresh();
                MessageBox.success("Expense Saved Successfully")
            },
            onPressDelete:function(oEvent){
                var sSelectedPath = oEvent.getParameter("listItem").getBindingContextPath().split("/")[1];
                this.getView().getModel("studentmodel").getData().splice(sSelectedPath,"1");
                this.byId("idStudentTable").getModel("studentmodel").refresh();

            }
        });
    });
