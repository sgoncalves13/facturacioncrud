import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportExcel = (data) => {

    const filteredData = data.map(({ id, fecha_ins, descripcion, inactivo }) => ({ id, fecha_ins, descripcion, inactivo }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    
    // 4. Guarda el archivo Excel
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'ArticulosReport.xlsx');
};

export default ExportExcel;
