package com.example.apitable.controller;

import com.example.apitable.dto.*;
import com.example.apitable.exception.CustomException;
import com.example.apitable.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/employee")
public class  EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    @GetMapping("/show")
    public String employee() {
        return "tables/employee-details";
    }

    @GetMapping("/add-form")
    public String show(Model model) {
        model.addAttribute("recordId",null);
        return "add-employee";
    }
    @GetMapping("/edit-form/{recordId}")
    public String showEditForm(@PathVariable String recordId, Model model) {
        model.addAttribute("recordId",recordId);
        return "add-employee";
    }
    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> addEmployee(@RequestBody RecordsDTO request) {
        return ResponseEntity.ok(employeeService.addEmployee(request));
    }

    @GetMapping("/list")
    public ResponseEntity<DataTableResponseDTO> fetchRecords(@ModelAttribute DataTableRequestDTO dataTableRequest) throws CustomException {

        DataTableResponseDTO records = employeeService.getEmployees(dataTableRequest);
        records.setRecordsTotal(records.getData().getTotal());
        records.setRecordsFiltered(records.getData().getTotal());

        return ResponseEntity.ok(records);
    }
    @GetMapping("/all")
    public ResponseEntity<DataResponse> fetchAllRecord() throws CustomException {
        return ResponseEntity.ok(employeeService.getAllEmployeeFullName());
    }

    @GetMapping("/{recordId}")
    public ResponseEntity<DataResponse> fetchProject(@PathVariable String recordId) throws CustomException {
        return ResponseEntity.ok(employeeService.getEmployee(recordId));
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateRecord(@RequestBody RecordsDTO request) {
        return ResponseEntity.ok(employeeService.updateEmployee(request));
    }
    @DeleteMapping("/delete/{recordId}")
    public ResponseEntity<ResponseDTO> deleteRecord(@PathVariable String recordId) {
        return ResponseEntity.ok(employeeService.deleteEmployee(recordId));
    }
}