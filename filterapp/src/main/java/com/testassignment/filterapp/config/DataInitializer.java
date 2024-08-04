package com.testassignment.filterapp.config;

import com.testassignment.filterapp.enums.FilterType;
import com.testassignment.filterapp.models.Criteria;
import com.testassignment.filterapp.models.Filter;
import com.testassignment.filterapp.repository.FilterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializer {
    @Autowired
    private FilterRepository filterRepository;

    @Bean
    public CommandLineRunner initializeData() {
        return args -> {
            // Create first example filter
            Filter filter1 = new Filter();
            filter1.setName("Age and Name Filter");

            Criteria criteria1 = new Criteria();
            criteria1.setType(FilterType.NUMBER);
            criteria1.setCondition("GREATER_THAN");
            criteria1.setValue("18");
            criteria1.setFilter(filter1);

            Criteria criteria2 = new Criteria();
            criteria2.setType(FilterType.STRING);
            criteria2.setCondition("CONTAINS");
            criteria2.setValue("Smith");
            criteria2.setFilter(filter1);

            filter1.setCriteriaList(Arrays.asList(criteria1, criteria2));

            // Create second example filter
            Filter filter2 = new Filter();
            filter2.setName("Date Filter");

            Criteria criteria3 = new Criteria();
            criteria3.setType(FilterType.DATE);
            criteria3.setCondition("BEFORE");
            criteria3.setValue("2000-01-01");
            criteria3.setFilter(filter2);

            filter2.setCriteriaList(Arrays.asList(criteria3));

            // Save filters to database
            filterRepository.save(filter1);
            filterRepository.save(filter2);

            System.out.println("Sample data initialized");
        };
    }

}
