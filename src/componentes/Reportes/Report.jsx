'use client';
import React, { useState } from 'react';
import ReportViewer, { RequestOptions, Callbacks } from 'devexpress-reporting-react/dx-report-viewer';
import 'devextreme/dist/css/dx.light.css';
import '@devexpress/analytics-core/dist/css/dx-analytics.common.css';
import '@devexpress/analytics-core/dist/css/dx-analytics.light.css';
import 'devexpress-reporting/dist/css/dx-webdocumentviewer.css';
import { useParams } from 'react-router-dom';


function Report() {

  const { idFactura } = useParams();
 
  const onParametersInitialized = ({ args }) => {
   
    var IdFactura = idFactura;
    var intParam = args.ActualParametersInfo.filter(
        (x) => x.parameterDescriptor.name == "IdFactura")[0];
    intParam.value = IdFactura;

    args.Submit();
}
  return (
    <>
    <ReportViewer reportUrl="TestExportReport">
      <RequestOptions host="http://localhost:5000/" invokeAction="DXXRDV" />
      <Callbacks ParametersInitialized={onParametersInitialized} />
    </ReportViewer> 
    </>       
  )
}

export default Report