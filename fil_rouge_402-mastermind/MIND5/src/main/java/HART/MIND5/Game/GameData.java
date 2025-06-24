package HART.MIND5.Game;

    public class GameData {
        private String joueurCode;
        private String correction;

        public GameData(String code, String correction/*, int time, boolean spiel*/) {
            this.joueurCode = code;
            this.correction = correction;
        }
        
        public String getJoueurCode() {
        	return this.joueurCode;
        }
        
        public String getcorrection() {
        	return this.correction;
        }

   }

