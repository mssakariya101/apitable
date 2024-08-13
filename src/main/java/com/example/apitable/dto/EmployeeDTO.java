package com.example.apitable.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class EmployeeDTO {
    @JsonProperty("fullName")
    private String fullName;

    @JsonProperty("workEmail")
    private String workEmail;

    @JsonProperty("jobTitleOrDepartment")
    private String jobTitleOrDepartment;

    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @JsonProperty("companyName")
    private String companyName;

    @JsonProperty("companySize")
    private String companySize;

    @JsonProperty("prefill")
    private String prefill;

    @JsonProperty("stage")
    private String stage;

    @JsonProperty("visitRecords")
    private List<String> visitRecords;
}
