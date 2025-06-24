package Geometrie;

public class Main {
    public static void main(String[] args) {
    	
    	Triangle tri = new Triangle(1, 1, 1, 10, 5, 6);
    	System.out.println(tri.angle());
    	System.out.println(tri.type());
    	System.out.println(tri.getCoteAB());
    	System.out.println(tri.getCoteBC());
    	System.out.println(tri.getCoteCA());
    	System.out.println(tri.perimetre());
    	System.out.println(tri.d());
    	System.out.println(tri.superficie());
    	
    	Carre ca = new Carre(10, 10, 3, 10, 10);
    	System.out.println(ca.perimetre());
    	System.out.println(ca.superficie());

    	Point p = new Point(10, 10, 2);
    	p.moveLeft(10);
    	System.out.println(p.affiche());
    	System.out.println("\n");

        Combinaison dessin = new Combinaison();
        dessin.ajouterForme(tri);
        dessin.ajouterForme(p);
        dessin.ajouterForme(ca);
        System.out.println(dessin.size());
        System.out.println("Périmètre : " + dessin.perimetre());
        System.out.println("Superficie : " + dessin.superficie());
    	
    }
  }
