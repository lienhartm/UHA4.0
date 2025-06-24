package HART.MIND3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import HART.MIND3.entity.Form;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {

}
