package Geometrie;

abstract public class Form extends Combinaison {
	private int x;
	private int y;
	private int couleur;
	
	public Form(int x, int y, int couleur) {
		this.x = x;
		this.y = y;
		this.couleur = couleur;
	}
	
	// setter
	
	public void setX(int x) {
		this.x = x;
	}
	
	public void setY(int y) {
		this.y = y;
	}
	
	public void setCouleur(int couleur) {
		this.couleur = couleur;
	}
	
	// getter
	
	public int getX() {
		return this.x;
	}
	
	public int getY() {
		return this.y;
	}
	
	public int getCouleur() {
		return this.couleur;
	}
	
	// deplacement
	
	public void moveTop(int x) {
		this.x = getX() + x;
	}
	
	public void moveRight(int y) {
		this.y = getY() + y;
	}
	
	public void moveBottom(int x) {
		this.x = getX() - x;
	}
	
	public void moveLeft(int y) {
		this.y = getY() - y;
	}
	
    // calcul geometrique

	
	
	// affiche
	
	public int couleur() {
		return this.couleur;
	}
	
	public String affiche() {
		return "Coordonnées x : " + getX() + " y : " + getY() + "\nCouleur : " + getCouleur() + "\n";
	}
	
	// 
	
}