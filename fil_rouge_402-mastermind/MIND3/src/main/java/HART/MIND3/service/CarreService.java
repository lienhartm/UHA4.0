package HART.MIND3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import HART.MIND3.entity.Carre;
import HART.MIND3.repository.CarreRepository;

@Service
public class CarreService {

    @Autowired
    private CarreRepository carreRepository;

    public void add(Carre carre) {
        carreRepository.save(carre);
    }

}
