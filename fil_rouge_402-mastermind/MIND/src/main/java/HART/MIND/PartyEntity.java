package HART.MIND;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="PartyEntity")
public class PartyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    
    @Column(name="tour")
    private int tour;
    
    @Column(name="point")
    private int point;
    
    @Column(name="time")
    private long time;
    
    public Long getId() {
    	return this.id;
    }
    
    public void setId(Long id) {
    	this.id = id;
    }
    
    public int getTour() {
    	return this.tour;
    }
    
    public void setTour(int tour) {
    	this.tour = tour;
    }
    
    public int getPoint() {
    	return this.point;
    }
    
    public void setPoint(int point) {
    	this.point = point;
    }
    
    public long getTime() {
    	return this.time;
    }
    
    public void setTime(long time) {
    	this.time = time;
    }
    
}
