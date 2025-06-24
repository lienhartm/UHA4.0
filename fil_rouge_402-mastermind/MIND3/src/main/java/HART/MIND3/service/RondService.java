package HART.MIND3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import HART.MIND3.entity.Rond;
import HART.MIND3.repository.RondRepository;

@Service
public class RondService {

    @Autowired
    private RondRepository rondRepository;

    public void add(Rond rond) {
        rondRepository.save(rond);
    }

}
