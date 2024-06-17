// services/reportGenerator.js

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (articulos) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["ID","Fecha de Inscripción","Descripción","Inactivo"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  articulos.forEach(articulo => {
    const articuloData = [
      articulo.id,
      articulo.fecha_ins,
      articulo.descripcion,
      articulo.inactivo,
      // called date-fns to format the date on the ticket
      format(new Date(articulo.fecha_ins), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(articuloData);
  });

  autoTable(doc,{
    head: [tableColumn], // don't forget square brackets, columns is an array of string
    body: tableRows, // array of arrays of string
    startY: 20,
  })
  // startY is basically margin-top
  //doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
        for(let i = 0; i < pageCount; i++) { 
        doc.setPage(i); 
        let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
        doc.setFontSize(12);
        doc.text('Page: ' + pageCurrent + '/' + pageCount, 10, doc.internal.pageSize.height - 10);
    }
    doc.setPage(0)
    doc.text("Lista de Artículos", 15, 10);

  // we define the name of our PDF file.
  doc.autoPrint({variant: 'non-conform'});
  window.open(doc.output('bloburl'));
};

export default generatePDF;