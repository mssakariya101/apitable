package com.example.apitable.fileservice;

import com.example.apitable.dto.EmployeeDTO;
import com.example.apitable.dto.ProjectDTO;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

@Service
public class PdfService {

    public ByteArrayInputStream generatePdf(List<?> dataList,String[] columns,String title) throws DocumentException {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter.getInstance(document, out);
        document.open();

        // Add title
        document.add(new Paragraph(title));

        PdfPTable table = new PdfPTable(columns.length);
        table.setWidthPercentage(100);

        // Add table headers
        Stream.of(columns).forEach(headerTitle -> {
            PdfPCell header = new PdfPCell();
            header.setPhrase(new Paragraph(headerTitle));
            header.setVerticalAlignment(Element.ALIGN_CENTER);
            table.addCell(header);
        });

        // Add rows
        setTableValue(dataList,table);

        document.add(table);
        document.close();
        return new ByteArrayInputStream(out.toByteArray());
    }

    private void setTableValue(List<?> dataList, PdfPTable table) {
        int row = 1;

        for (Object data : dataList) {
            if (data instanceof EmployeeDTO) {
                EmployeeDTO employee = (EmployeeDTO) data;
                table.addCell(String.valueOf(row++)); // Adding row number
                table.addCell(employee.getFullName());
                table.addCell(employee.getWorkEmail());
                table.addCell(employee.getPhoneNumber());
                table.addCell(employee.getJobTitleOrDepartment());
                table.addCell(employee.getCompanyName());
            } else if (data instanceof ProjectDTO) {
                ProjectDTO project = (ProjectDTO) data;
                table.addCell(String.valueOf(row++)); // Adding row number
                table.addCell(project.getTitle());
                table.addCell(project.getDescription());
                table.addCell(project.getManager());
            }
        }
    }

}


