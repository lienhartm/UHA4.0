package HART.MIND3.controller;

public class CodeDTO {
	private long id;
    private int x;
    private int y;
    private int couleur;
    private int geometrie;
    private int rayon;
    private int longueur;
    private int largeur;
    private int coteAB;
    private int coteBC;
    private int coteCA;
    
    public void setId(long id) {
    	this.id = id;
    }
    
    public long getId() {
    	return id;
    }
	
	public void setX(int x) {
		this.x = x;
	}
	public int getX() {
		return x;
	}
	public int getY() {
		return y;
	}
	public void setY(int y) {
		this.y = y;
	}
	public int getCouleur() {
		return couleur;
	}
	public void setCouleur(int couleur) {
		this.couleur = couleur;
	}
	public int getGeometrie() {
		return geometrie;
	}
	public void setGeometrie(int geometrie) {
		this.geometrie = geometrie;
	}
	public int getRayon() {
		return rayon;
	}
	public void setRayon(int rayon) {
		this.rayon = rayon;
	}
	public int getLongueur() {
		return longueur;
	}
	public void setLongueur(int longueur) {
		this.longueur = longueur;
	}
	public int getLargeur() {
		return largeur;
	}
	public void setLargeur(int largeur) {
		this.largeur = largeur;
	}
	public int getCoteAB() {
		return coteAB;
	}
	public void setCoteAB(int coteAB) {
		this.coteAB = coteAB;
	}
	public int getCoteBC() {
		return coteBC;
	}
	public void setCoteBC(int coteBC) {
		this.coteBC = coteBC;
	}
	public int getCoteCA() {
		return coteCA;
	}
	public void setCoteCA(int coteCA) {
		this.coteCA = coteCA;
	}

}
