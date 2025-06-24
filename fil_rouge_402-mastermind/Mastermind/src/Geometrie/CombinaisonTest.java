package Geometrie;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class CombinaisonTest {
	
	@Test
	void testAjouterForme() {
    	Triangle tri = new Triangle(1, 1, 1, 10, 5, 6);
    	Carre ca = new Carre(10, 10, 3, 10, 10);
    	Point p = new Point(10, 10, 2);
        Combinaison dessin = new Combinaison();
        dessin.ajouterForme(tri);
        dessin.ajouterForme(p);
        dessin.ajouterForme(ca);
        int nbForme = 3;
        int size = dessin.size();
        assertEquals(nbForme, size);
	}

	@Test
	void testPerimetre() {
    	Triangle tri = new Triangle(1, 1, 1, 10, 5, 6);
    	Carre ca = new Carre(10, 10, 3, 10, 10);
    	Point p = new Point(10, 10, 2);
        Combinaison dessin = new Combinaison();
        dessin.ajouterForme(tri);
        dessin.ajouterForme(p);
        dessin.ajouterForme(ca);
        double perimetre = ( tri.perimetre() + /*p.perimetre() +*/ ca.perimetre() );
        assertEquals(perimetre, dessin.perimetre());
	}
	
	@Test
	void testSuperficie() {
    	Triangle tri = new Triangle(1, 1, 1, 10, 5, 6);
    	Carre ca = new Carre(10, 10, 3, 10, 10);
    	Point p = new Point(10, 10, 2);
        Combinaison dessin = new Combinaison();
        dessin.ajouterForme(tri);
        dessin.ajouterForme(p);
        dessin.ajouterForme(ca);
        double perimetre = ( tri.superficie() + /*p.perimetre() +*/  ca.superficie() );
        assertEquals(perimetre, dessin.superficie());
	}

}
