package com.testassignment.filterapp.repository;

import com.testassignment.filterapp.models.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilterRepository extends JpaRepository<Filter,Integer> {
}
