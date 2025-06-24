package Mind;

import java.util.List;
import java.util.ArrayList;

class GameJson {
    String computerCode;
    long time;
    boolean mvp;
    private List<ListGame> listgames = new ArrayList<>();

    public GameJson(String computerCode, long time, boolean mvp, ListGame listgame) {
        this.computerCode = computerCode;
        this.time = time;
        this.mvp = mvp;
        this.listgames.add(listgame);
    }
}
