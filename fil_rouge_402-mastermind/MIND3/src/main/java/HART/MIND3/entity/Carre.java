package HART.MIND3.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "carre")
public class Carre {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "positionX")
    private int x;
    
    @Column(name = "positionY")
    private int y;
    
    @Column(name = "couleur")
    private int couleur;
    
    @Column(name = "geometrie")
    private int geometrie;
    
    @Column(name = "longueur")
    private int longueur;
    
    @Column(name = "largeur")
    private int largeur;
    
    
    
    public Carre() {}
    
    public Carre(int x, int y, int couleur, int geometrie, int longueur, int largeur) {
        this.x = x;
        this.y = y;
        this.couleur = couleur;
        this.geometrie = geometrie;
        this.longueur = longueur;
        this.largeur = largeur;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
}
