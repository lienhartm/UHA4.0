package Geometrie;

import java.util.ArrayList;
import java.util.List;

public class Combinaison {
    List<Form> formes;

    public Combinaison() {
        formes = new ArrayList<>();
    }

    public void ajouterForme(Form forme) {
        formes.add(forme);
    }
    
    public int size() {
    	return formes.size();
    }
    
    public double perimetre() {
        double total = 0;
        for (Form forme : formes) {
            total += forme.perimetre();
        }
        return total;
    }
    
    public double superficie() {
        double total = 0;
        for (Form forme : formes) {
            total += forme.superficie();
        }
        return total;
    }
    
}
