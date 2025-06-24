package HART.MIND4.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import HART.MIND4.game.Register;

@Repository
public interface dataRepository extends JpaRepository<Register, Long> {

}
