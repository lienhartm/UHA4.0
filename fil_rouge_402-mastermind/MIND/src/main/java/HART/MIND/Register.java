package HART.MIND;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

public class Register {
    private int tour;
    private int point;
    private long time;
	private int totalPoint;
	private int totalTime;
    
    public Register() {}
    
	public Register(int tour, int point, long time) {
		this.tour = tour;
		this.point = point;
		this.time = time;
	}
	
	// setter
	
	public void setTour(int tour) {
		this.tour = tour;
	}
	
	public void setPoint(int point) {
		this.point = point;
	}
	
	public void setTime(long time) {
		this.time = time;
	}
	
	// getter
	
	public int getTour() {
		return this.tour;
	}
	
	public int getPoint() {
		return this.point;
	}
	
	public long getTime() {
		return this.time;
	}
	
	// total
	
	public void addTotalPoint(int point) {
		this.totalPoint += point;
	}
	
	public int getTotalPoint() {
		return this.totalPoint;
	}
	
	public void addTotalTime(int time) {
		this.totalTime += time;
	}
	
	public int getTotalTime() {
		return this.totalTime;
	}
}
