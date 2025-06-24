package Mind;

public class Register {
	int tour;
	int point;
	long time;
	
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
	
}