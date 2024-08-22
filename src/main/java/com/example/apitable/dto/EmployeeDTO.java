package com.example.apitable.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeDTO {

    @JsonProperty("fullName")
    String fullName;

    @JsonProperty("workEmail")
    String workEmail;

    @JsonProperty("jobTitleOrDepartment")
    String jobTitleOrDepartment;

    @JsonProperty("phoneNumber")
    String phoneNumber;

    @JsonProperty("companySize")
    String companySize;

    @JsonProperty("companyName")
    String companyName;

    @JsonProperty("projects")
    List<String> projects;
}
