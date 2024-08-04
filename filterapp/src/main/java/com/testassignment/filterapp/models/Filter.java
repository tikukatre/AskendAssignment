package com.testassignment.filterapp.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Filter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "filter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Criteria> criteriaList = new ArrayList<>();

    public void addCriteria(Criteria criteria) {
        criteriaList.add(criteria);
        criteria.setFilter(this);
    }

    public void removeCriteria(Criteria criteria) {
        criteriaList.remove(criteria);
    }
}
