package com.example.apitable.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level= AccessLevel.PRIVATE)
public class RecordsRequestDTO<T> {
    @JsonProperty("records")
    T records;
}
