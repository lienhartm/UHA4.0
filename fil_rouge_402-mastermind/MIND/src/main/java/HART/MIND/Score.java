package HART.MIND;

public class Score {

	public Score() {}
	
	public boolean compare(Register r, Joueur j) {
		
		if (r.getPoint() == 0 & r.getTime() == 0) {
			r.setTour(j.tour());
			r.setPoint(j.point());
			r.setTime(j.time());
			return true;
		}
		else if (r.getPoint() < j.point()) {
			r.setTour(j.tour());
			r.setPoint(j.point());
			r.setTime(j.time());
			return true;
		}
		else if (r.getPoint() == j.point() && r.getTime() > j.time()) {
			r.setTour(j.tour());
			r.setPoint(j.point());
			r.setTime(j.time());
			return true;
		}
		else { return false; }
	}

}
