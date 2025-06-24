package Geometrie;

public class Carre extends Form {
    private int longueur;
    private int largeur;

    public Carre(int x, int y, int couleur, int longueur, int largeur) {
        super(x, y, couleur);
    	this.longueur = longueur;
        this.largeur = largeur;
    }

    // setter
    
    public void setLongueur(int longueur) {
        this.longueur = longueur;
    }
    
    public void setLargeur(int largeur) {
    	this.largeur = largeur;
    }

    // getter
    
    public int getLongueur() {
    	return this.longueur;
    }
    
    public int getLargeur() {
    	return this.largeur;
    }
    
    // dimension
    
    public void addLongueur(int cote) {
    	this.longueur += cote;
    }
    
    public void addLargeur(int cote) {
    	this.largeur += cote;
    }
    
    // calcul geometrique
    
    public double perimetre() {
    	return (2*getLongueur()) + (2*getLargeur());
    }
    
    public double superficie() {
    	return getLongueur() * getLargeur();
    }
    
    public String type() {
    	return longueur == largeur ? "Carré" : "Rectangle";
    }
    
    // affichage
    public String toString() {
    	return "Forme de type : " + type() + "\n" +
    		"Coordonnées : X " + this.getX() + " Y " + this.getY() + "\n" +
    		"Dimension : L " + getLongueur() + " l " + getLargeur() + "\n";
    }
    
    
}
