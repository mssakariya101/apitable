package com.example.apitable.controller;

import com.example.apitable.dto.*;
import com.example.apitable.service.ApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;



@Controller
//@RestController
@RequestMapping("/api/employee")
public class  EmployeeController {

    private final ApiService apiService;

    public EmployeeController(ApiService apiService) {
        this.apiService = apiService;
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
    public ResponseEntity<ResponseDTO> insertRecords(@RequestBody RecordsRequestDTO request) {
        return ResponseEntity.ok(apiService.insertRecords(request));
    }

    @GetMapping("/list")
    public ResponseEntity<DataTableResponseDTO> fetchRecords(@ModelAttribute DataTableRequestDTO dataTableRequest) {

        DataTableResponseDTO records = apiService.fetchAllRecords(dataTableRequest);
        records.setRecordsTotal(records.getData().getTotal());
        records.setRecordsFiltered(records.getData().getTotal());

        return ResponseEntity.ok(records);
    }
    @GetMapping("/fetch/{recordId}")
    public ResponseEntity<DataResponse> fetchRecord(@PathVariable String recordId)  {
        return ResponseEntity.ok(apiService.fetchRecord(recordId));
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateRecord(@RequestBody RecordsRequestDTO request) {
        return ResponseEntity.ok(apiService.updateRecord(request));
    }
    @DeleteMapping("/delete/{recordId}")
    public ResponseEntity<ResponseDTO> deleteRecord(@PathVariable String recordId) {
        return ResponseEntity.ok(apiService.deleteRecord(recordId));
    }
}