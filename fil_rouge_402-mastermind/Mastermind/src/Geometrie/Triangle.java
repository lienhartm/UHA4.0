package Geometrie;

public class Triangle extends Form {
    private int coteAB;
    private int coteBC;
    private int coteCA;

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
    
    public double getCoteAB() {
    	return this.coteAB;
    }
    
    public double getCoteBC() {
    	return this.coteBC;
    }
    
    public double getCoteCA() {
    	return this.coteCA;
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
    		type = "Triangle équilatéral";
    	} else if ( angleA() == 90 | angleB() == 90 | angleC() == 90 ) {
    		type = "Triangle rectangle";
    	} else if ( this.coteAB == this.coteBC | this.coteBC == this.coteCA | this.coteCA == coteAB ) {
    		type = "Triangle isocèle";
    	} else if (this.coteAB + this.coteBC < this.coteCA | this.coteBC + this.coteCA < this.coteAB | this.coteBC + this.coteCA < this.coteAB) {
    		type = "Triangle impossible";
    	} else { type = "Triangle quelconque"; }
    	return type;
    }
    
}
