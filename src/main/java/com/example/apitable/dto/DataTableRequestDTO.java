package com.example.apitable.dto;

import lombok.Data;

@Data
public class DataTableRequestDTO {
    private Integer page = 1;
    private Integer length = 10;
    private String keyword;
    private String sortColumn;
    private String sortDirection;
}
