package HART.MIND2.Classe;

public class Triangle extends Form {
    private int coteAB;
    private int coteBC;
    private int coteCA;

    /*
    public static final String EQUILATERAL = "Triangle équilatéral";
    public static final String RECTANGLE = "Triangle rectangle";
    public static final String ISOCELES = "Triangle isocèle";
    public static final String IMPOSSIBLE = "Triangle impossible";
    public static final String GENERIC = "Triangle quelconque";
    */
    
    public Triangle(int x, int y, int couleur, int coteAB, int coteBC, int coteCA) {
    	super(x, y, couleur);
        this.coteAB = coteAB;
        this.coteBC = coteBC;
        this.coteCA = coteCA;
    }
    
    // setter
    
    public void setCoteAB(int cote) {
    	this.coteAB = cote;
    }
    
    public void setCoteBC(int cote) {
    	this.coteBC = cote;
    }
    
    public void setCoteCA(int cote) {
    	this.coteCA = cote;
    }
    
    // getter
    
    public int getCoteAB() {
    	return this.coteAB;
    }

    public int getCoteBC() {
    	return this.coteBC;
    }
    
    public int getCoteCA() {
    	return this.coteCA;
    }
    
    /*
    public String getType() {
    	return type();
    }
    
    // dimension
    
    public void addCoteAB(int cote) {
    	this.coteAB += cote;
    }
    
    public void addCoteBC(int cote) {
    	this.coteBC += cote;
    }
    
    public void addCoteCA(int cote) {
    	this.coteCA += cote;
    }
    
    // calcul geometrique

    public double angleA() {
        return Math.round( Math.toDegrees( Math.acos( (float) (coteBC * coteBC + coteCA * coteCA - coteAB * coteAB) / (2 * coteBC * coteCA))));
    }

    public double angleB() {
        return Math.round( Math.toDegrees(Math.acos( (float) (coteCA * coteCA + coteAB * coteAB - coteBC * coteBC) / (2 * coteCA * coteAB))));
    }

    public double angleC() {
        return Math.round( Math.toDegrees(Math.acos( (float)(coteAB * coteAB + coteBC * coteBC - coteCA * coteCA) / (2 * coteAB * coteBC))));
    }
        
    public double perimetre() {
    	return this.coteAB + this.coteBC + this.coteCA;
    }
    
    public double d() {
    	return (double) perimetre() / 2;
    }
    
    public double superficie() {
		return Math.round( (long) Math.sqrt( ( d() * (d() - getCoteAB()) * (d() - getCoteBC()) * (d() - getCoteCA()) )));
    }
    
    // affiche
    
    public String angle() {
    	return "Angle A: " + this.angleA() + "\nAngle B: " + this.angleB() + "\nAngle C: " + this.angleC();
    }
    
    public String type() {
    	String type = null;
    	if(this.coteAB == this.coteBC & this.coteBC == this.coteCA) {
    		return EQUILATERAL;
    	} else if ( angleA() == 90 | angleB() == 90 | angleC() == 90 ) {
    		return RECTANGLE;
    	} else if ( this.coteAB == this.coteBC | this.coteBC == this.coteCA | this.coteCA == coteAB ) {
    		return ISOCELES;
    	} else if (this.coteAB + this.coteBC < this.coteCA | this.coteBC + this.coteCA < this.coteAB | this.coteBC + this.coteCA < this.coteAB) {
    		return IMPOSSIBLE;
    	} else { return GENERIC; }
    }
    
    public String toString() {
    	return "Forme de type : " + this.type() + "\n" +
    		"Coordonnées : X " + this.getX() + " Y " + this.getY() + "\n" +
    		"Dimension : A " + this.getCoteAB() + " B " + this.getCoteBC() + " C " + this.getCoteCA() + "\n" +
    		"Angle : A " + this.angleA() + " B " + this.angleB() + " C " + this.angleC() + "\n";
    }
    */
}
