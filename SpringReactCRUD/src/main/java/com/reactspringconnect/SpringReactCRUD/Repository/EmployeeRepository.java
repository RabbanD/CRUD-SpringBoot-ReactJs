package com.reactspringconnect.SpringReactCRUD.Repository;

import com.reactspringconnect.SpringReactCRUD.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
