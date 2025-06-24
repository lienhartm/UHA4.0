package HART.MIND2.Classe;

abstract public class Form {
	
	private int x;
	private int y;
	private int couleur;
	
	/*
    public static final int POINT = 0;
    public static final int CERCLE = 1;
    public static final int CARRE = 2;
    public static final int TRIANGLE = 3;
	*/
	
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
	/*
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
	
	abstract public double perimetre();
	
	abstract public double superficie();
	*/
}