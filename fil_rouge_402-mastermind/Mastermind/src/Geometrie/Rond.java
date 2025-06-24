package Geometrie;

public class Rond extends Form {
	private int r;
	
	public Rond(int x, int y, int couleur, int r) {
		super(x, y, couleur);
		this.r = r;
	}
	
	// setter
	
	public void setR(int r) {
		this.r = r;
	}
	
	// getter
	
	public int getR() {
		return this.r;
	}
	
	// dimension
	
	public void addR(int r) {
		this.r += r;
	}
	
	// calcul geometrique
	
	public double perimetre() {
		return getR() * 2 * 3.14;
	}
	
	public double superficie() {
		return (getR() * getR()) * 3.14;
	}
	
	@Override
	public String affiche() {
		return "Coordonnées x : " + getX() + " y : " + getY() + "\nRayon : " + getR() + "\n";
	}
	
}