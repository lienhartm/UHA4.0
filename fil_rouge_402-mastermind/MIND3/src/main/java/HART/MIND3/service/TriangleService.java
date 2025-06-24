package HART.MIND3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import HART.MIND3.entity.Triangle;
import HART.MIND3.repository.TriangleRepository;

@Service
public class TriangleService {

    @Autowired
    private TriangleRepository triangleRepository;

    public void add(Triangle triangle) {
        triangleRepository.save(triangle);
    }

}
