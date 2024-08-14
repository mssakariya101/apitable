package com.example.apitable.service;

import com.example.apitable.dto.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

import java.util.Objects;

@Service
public class ApiService {

    @Value("${api.token}")
    private String API_TOKEN;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public ApiService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public ResponseDTO insertRecords(RecordsDTO request,String url) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(API_TOKEN);

        HttpEntity<RecordsDTO> entity = new HttpEntity<>(request, headers);

        ResponseEntity<String> response = restTemplate.exchange(url,HttpMethod.POST,entity, String.class);
        System.out.println(response);

        if (response.getStatusCode().is2xxSuccessful()) {
            return new ResponseDTO(true,"Records created successfully.");
        } else {
            return new ResponseDTO(false,"POST request failed with status code: " + response.getStatusCode());
        }
    }

    public DataTableResponseDTO getRecords(String url) {
        System.out.println("URL: " + url);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(API_TOKEN);

        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<DataTableResponseDTO> response = restTemplate.exchange(url, HttpMethod.GET, entity, DataTableResponseDTO.class);
        System.out.println("Response...."+response);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new RuntimeException("Failed to fetch data: " + response.getStatusCode());
        }
    }


    public ResponseDTO updateRecord(RecordsDTO record,String url) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(API_TOKEN);
        HttpEntity<RecordsDTO> entity = new HttpEntity<>(record, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return new ResponseDTO(response.getStatusCode().value(),true,"Record Updated successfully.");
        } else {
            return new ResponseDTO(response.getStatusCode().value(),false,"Failed to Update record");
        }
    }
    public ResponseDTO deleteRecord(String url) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(API_TOKEN);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return new ResponseDTO(response.getStatusCode().value(),true,"Record deleted successfully.");
        } else {
            return new ResponseDTO(response.getStatusCode().value(),false,"Failed to delete record");
        }
    }
}
