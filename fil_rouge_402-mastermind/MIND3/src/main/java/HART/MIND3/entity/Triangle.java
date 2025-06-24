package HART.MIND3.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "triangle")
public class Triangle {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;
    
    @Column(name = "positionX")
    private int x;
    
    @Column(name = "positionY")
    private int y;
    
    @Column(name = "couleur")
    private int couleur;
    
    @Column(name = "geometrie")
    private int geometrie;
    
    @Column(name = "coteAB")
    private int coteAB;
    
    @Column(name = "coteBC")
    private int coteBC;
    
    @Column(name = "coteCA")
    private int coteCA;
    
    public Triangle() { }
    
    public Triangle(int x, int y, int couleur, int geometrie, int coteAB, int coteBC, int coteCA) {
    	this.x = x;
    	this.y = y;
        this.couleur = couleur;
        this.geometrie = geometrie;
        this.coteAB = coteAB;
        this.coteBC = coteBC;
        this.coteCA = coteCA;
    }

    // Getters et setters
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
    
    public int getCoteAB() {
        return coteAB;
    }

    public void setCoteAB(int coteAB) {
        this.coteAB = coteAB;
    }

    public int getcoteBC() {
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
