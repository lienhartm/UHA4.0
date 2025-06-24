package Mind;

import java.util.ArrayList;
import java.util.List;

public class ListGame {
    private String joueurCode;
    private static List<ListGame> listgames = new ArrayList<>();

    public String getJoueurCode() {
        return joueurCode;
    }

    public void setJoueurCode(String joueurCode) {
        this.joueurCode = joueurCode;
    }

    public ListGame(String joueurCode) {
        this.setJoueurCode(joueurCode);
        listgames.add(this);
    }
    
    public void ajouter(String joueurCode) {
    	listgames.add(this);
    }

}
