package com.testassignment.filterapp.service;

import com.testassignment.filterapp.models.Criteria;
import com.testassignment.filterapp.models.Filter;
import com.testassignment.filterapp.repository.FilterRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilterService {
    @Autowired
    private FilterRepository filterRepository;

    public List<Filter> getAllFilters() {
        return filterRepository.findAll();
    }

    @Transactional
    public Filter createFilter(Filter filter) {
        for (Criteria criteria : filter.getCriteriaList()) {
            criteria.setFilter(filter);
        }
        return filterRepository.save(filter);
    }
    public void deleteFilter(Integer id) {
        filterRepository.deleteById(id);
    }

}
