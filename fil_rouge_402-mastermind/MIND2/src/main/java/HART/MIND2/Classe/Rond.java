package HART.MIND2.Classe;

public class Rond extends Form {
	private int rayon;
	
	public Rond(int x, int y, int couleur, int rayon) {
		super(x, y, couleur);
		this.rayon = rayon;
	}
	
	// setter
	
	public void setRayon(int rayon) {
		this.rayon = rayon;
	}
	
	// getter
	
	public int getRayon() {
		return this.rayon;
	}
	
	// dimension
	/*
	public void addRayon(int rayon) {
		this.rayon += rayon;
	}
	
	// calcul geometrique
	
	public double perimetre() {
		return getRayon() * 2 * 3.14;
	}
	
	public double superficie() {
		return (getRayon() * getRayon()) * 3.14;
	}
	
	public String type() {
		return "Cercle";
	}
	
	@Override
	public String affiche() {
		return "Coordonnées x : " + getX() + " y : " + getY() + "\nRayon : " + getRayon() + "\n";
	}
	*/
}
