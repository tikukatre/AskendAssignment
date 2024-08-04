package com.testassignment.filterapp.controllers;

import com.testassignment.filterapp.models.Filter;
import com.testassignment.filterapp.service.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/filters")
public class FilterController {
    @Autowired
    private FilterService filterService;

    @GetMapping
    public ResponseEntity<List<Filter>> getAllFilters() {
        List<Filter> filters = filterService.getAllFilters();
        return ResponseEntity.ok(filters);
    }

    @PostMapping
    public ResponseEntity<Filter> createFilter(@RequestBody Filter filter) {
        Filter createdFilter = filterService.createFilter(filter);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFilter);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilter(@PathVariable Integer id) {
        filterService.deleteFilter(id);
        return ResponseEntity.noContent().build();
    }
}
