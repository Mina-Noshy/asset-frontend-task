import { Injectable } from '@angular/core';
//import * as ExcelJS from 'exceljs/dist/exceljs.min.js'
import * as ExcelJS from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }


  async exportToExcel(data: any[], fileName: string) {

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a worksheet
    const worksheet = workbook.addWorksheet(fileName);

    // Get the property names of the first data object to use as column headers
    const columns = Object.keys(data[0]).map(key => ({
      header: key,
      key: key,
      width: 15 // Set a default width for columns
    }));

    // Add the columns
    worksheet.columns = columns;

    // Add the rows
    worksheet.addRows(data);

    // Customize the header style
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell(cell => {
      cell.font = { bold: true }; // Set font weight to bold
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ADD8E6' } // Set background color (orange in this example)
      };
    });

    // Enable auto-filter on all columns
    worksheet.autoFilter = {
      from: {
        row: 1,
        column: 1
      },
      to: {
        row: worksheet.rowCount,
        column: columns.length
      }
    };


    // Generate Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = `${fileName}.xlsx`;

    // Trigger download
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    a.remove();
  }


}
