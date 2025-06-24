package HART.MIND2.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import HART.MIND2.Classe.Form;

public class CodeDTO {
	private int x;
	private int y;
	private int couleur;
	private int longueur;
	private int largeur;
	private int rayon;
	private int coteAB;
	private int coteBC;
	private int coteCA;
	private int geometrie;
//    private double perimetre;
//    private double superficie;
    private List<Form> formes = new ArrayList<>();
    private Map<Integer, List<Form>> mapFormes = new HashMap<>();


    /*
    public CodeDTO(double perimetre, double superficie, List<Form> formes) {
        this.perimetre = perimetre;
        this.superficie = superficie;
        this.formes = formes;
    }    
    
    public double getPerimetre() {
        return perimetre;
    }

    public void setPerimetre(double perimetre) {
        this.perimetre = perimetre;
    }

    public double getSuperficie() {
        return superficie;
    }

    public void setSuperficie(double superficie) {
        this.superficie = superficie;
    }
    
    public List<Form> getFormes() {
        return formes;
    }

    public void setFormes(List<Form> formes) {
        this.formes = formes;
    }
    
    public String getAll() {
        StringBuilder sb = new StringBuilder();
        sb.append("Perimetre total: ").append(perimetre).append("\n");
        sb.append("Superficie totale: ").append(superficie).append("\n");
        sb.append("Formes:\n");
        for (Form forme : formes) {
            sb.append(forme.toString()).append("\n");
        }
        return sb.toString();
    }
    */


	public int getGeometrie() {
		return geometrie;
	}


	public void setGeometrie(int geometrie) {
		this.geometrie = geometrie;
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


	public int getRayon() {
		return rayon;
	}


	public void setRayon(int rayon) {
		this.rayon = rayon;
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


	public int getX() {
		return x;
	}


	public void setX(int x) {
		this.x = x;
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
	
	
    
}
