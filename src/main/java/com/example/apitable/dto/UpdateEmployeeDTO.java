package com.example.apitable.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
public class UpdateEmployeeDTO {

    @JsonProperty("recordId")
    String recordId;

    @JsonProperty("fields")
    EmployeeDTO fields;
}
