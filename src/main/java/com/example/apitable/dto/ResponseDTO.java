package com.example.apitable.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO<T> {
    @JsonProperty("code")
    private Integer code;

    @JsonProperty("success")
    private Boolean success;

    @JsonProperty("message")
    private String message;

    public ResponseDTO(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
