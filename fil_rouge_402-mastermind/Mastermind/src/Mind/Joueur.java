package Mind;


public class Joueur {
	int tour;
	int point;
	long time;
		
	public Joueur(int tour, int point, long time) {
		this.tour = tour;
		this.point = point;
		this.time = time;
	}
	
	public int tour() {
		return this.tour;
	}
	
	public int point() {
		return this.point;
	}
	
	public long time() {
		return this.time;
	}

}
