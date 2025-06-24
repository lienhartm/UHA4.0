package HART.MIND5.Game;

public class Register {

    private int tour;
    private int point;
    private long time;
    private int totalPoint;
    private long totalTime;
  	    
	public Register(int tour, int point, long time) {
		this.tour = tour;
		this.point = point;
		this.time = time;
	}
	
	public void BestRegister(Register register) {
		this.tour = register.getTour();
		this.point = register.getPoint();
		this.time = register.getTime();
		this.totalPoint = register.getTotalPoint();
		this.totalTime = register.getTotalTime();
		
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
	
	public void addTotalTime(long time) {
		this.totalTime += time;
	}
	
	public long getTotalTime() {
		return this.totalTime;
	}
	
}