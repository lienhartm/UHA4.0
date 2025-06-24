package HART.MIND3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import HART.MIND3.entity.Point;
import HART.MIND3.repository.PointRepository;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository;

    public void add(Point point) {
        pointRepository.save(point);
    }

}
