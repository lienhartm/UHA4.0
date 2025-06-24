package HART.MIND;

    public class GameData {
        private String joueurCode;
        private String correction;

        public GameData(String joueurCode, String correction) {
            this.joueurCode = joueurCode;
            this.correction = correction;
        }
        
        public String getJoueurCode() {
        	return this.joueurCode;
        }
        
        public String getcorrection() {
        	return this.correction;
        }

    }

