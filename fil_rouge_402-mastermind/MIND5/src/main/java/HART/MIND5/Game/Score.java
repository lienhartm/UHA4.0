package HART.MIND5.Game;

public class Score {
	
	public Score() {}
	
	public void compare(Register r, Joueur j) {
		
		if (r.getPoint() == 0 & r.getTime() == 0) {
			r.setTour(j.tour());
			r.setPoint(j.point());
			r.setTime(j.time());
			r.addTotalPoint(r.getPoint());
			r.addTotalTime(r.getTime());
		}
		else if (r.getPoint() < j.point()) {
			r.setTour(j.tour());
			r.setPoint(j.point());
			r.setTime(j.time());
			r.addTotalPoint(r.getPoint());
			r.addTotalTime(r.getTime());
		}
		else if (r.getPoint() == j.point() && r.getTime() > j.time()) {
			r.setTour(j.tour());
			r.setPoint(j.point());
			r.setTime(j.time());
			r.addTotalPoint(r.getPoint());
			r.addTotalTime(r.getTime());
		} else {
			r.addTotalPoint(r.getPoint());
			r.addTotalTime(r.getTime());

		}
	
	}

}
