package HART.MIND4.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import HART.MIND4.game.Register;

@Service
public class DataService {

    @Autowired
    private dataRepository dataRepository;

    public void add(Register register) {
        dataRepository.save(register);
    }

}

