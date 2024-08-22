package com.example.apitable.fileservice;

import com.example.apitable.dto.EmployeeDTO;
import com.example.apitable.dto.ProjectDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelService  {

    public ByteArrayInputStream generateExcel(List<?> dataList,String[] columns,String title) throws IOException {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet(title);

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < columns.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(columns[col]);
                cell.setCellStyle(headerCellStyle);
            }
            setTableValue(dataList,sheet);

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
    private void setTableValue(List<?> dataList, Sheet sheet) {
        int rowIdx = 1;
        for (Object data : dataList) {
            Row row = sheet.createRow(rowIdx++);
            if (data instanceof EmployeeDTO) {
                EmployeeDTO employee = (EmployeeDTO) data;
                row.createCell(0).setCellValue(rowIdx);
                row.createCell(1).setCellValue(employee.getFullName());
                row.createCell(2).setCellValue(employee.getWorkEmail());
                row.createCell(3).setCellValue(employee.getPhoneNumber());
                row.createCell(4).setCellValue(employee.getJobTitleOrDepartment());
                row.createCell(5).setCellValue(employee.getCompanyName());
            } else if (data instanceof ProjectDTO) {
                ProjectDTO project = (ProjectDTO) data;
                row.createCell(0).setCellValue(rowIdx);
                row.createCell(1).setCellValue(project.getTitle());
                row.createCell(2).setCellValue(project.getDescription());
                row.createCell(3).setCellValue(project.getManager());
            }
        }
    }

}
