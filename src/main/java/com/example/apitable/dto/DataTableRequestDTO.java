package com.example.apitable.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DataTableRequestDTO {

    Integer page = 1;
    Integer length = 10;
    String keyword;
    String sortColumn;
    String sortDirection;

}
