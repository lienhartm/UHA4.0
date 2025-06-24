package HART.MIND4.game;

    public class GameData {
        private String joueurCode;
        private String correction;
/*
        private int time;
        private boolean spiel;
*/
        public GameData(String joueurCode, String correction/*, int time, boolean spiel*/) {
            this.joueurCode = joueurCode;
            this.correction = correction;
/*
            this.time = time;
            this.spiel = spiel;
*/
        }
        
        public String getJoueurCode() {
        	return this.joueurCode;
        }
        
        public String getcorrection() {
        	return this.correction;
        }
/*        
        public int getTime() {
        	return this.time;
        }
        
        public boolean getSpiel() {
        	return this.spiel;
        }
*/
    }

