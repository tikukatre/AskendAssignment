package com.testassignment.filterapp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.testassignment.filterapp.enums.FilterType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Getter @Setter @NoArgsConstructor
public class Criteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filter_id")
    @JsonIgnore
    private Filter filter;

    @Enumerated(EnumType.STRING)
    private FilterType type;
    private String condition;
    private String value;

    //Method to set the filter for the criteria
    @JsonIgnore
    public void setFilter(Filter filter) {
        this.filter = filter;
    }
}
