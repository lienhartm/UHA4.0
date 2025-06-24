package HART.MIND3.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "point")
public class Point {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "x")
    private int x;

    @Column(name = "y")
    private int y;

    @Column(name = "couleur")
    private int couleur;

    @Column(name = "geometrie")
    private int geometrie;
    // Getters and setters

    public Point() { }
    
    public Point(int x, int y, int couleur, int geometrie) {
        this.x = x;
        this.y = y;
        this.couleur = couleur;
        this.geometrie = geometrie;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
}
