package Mind;

public class Menu {

	public Menu() {}
	
	public void menu() {
		System.out.println("Bienvenue au jeu du Mastermind !");
		System.out.println("1. Jouer sans doublons");
		System.out.println("2. Joueur avec doublons");
		System.out.println("3. Règles du jeu");
		System.out.println("4. Scores");
		System.out.println("5. Quitter");
		System.out.print("Choisissez une option : ");
	}
	
	public void ciao() {
		System.out.println("Au revoir !");
	}
	
	public void choice() {
		System.out.println("Choix invalide. Veuillez choisir une option valide.");
	}
	
	public void again() {
		System.out.print("Voulez-vous rejouer ? (true/false) : ");
	}
	
	public void tour(int tour) {
		System.out.println("Tour " + tour + ": Entrez une combinaison de 4 chiffres compris entre 1 et 9 :");
	}
	
	public void juste(String joueur, String correction) {
        System.out.println(joueur + " = " + correction);
	}
	
	public void bravo(int tour, long duration) {
		System.out.println("Bravo, vous avez trouvé la combinaison en " + tour + " tours !");
		System.out.println("Temps écoulé : " + (duration / 1000) + " secondes");
		System.out.println("Vous avez gangé : " + (10 - tour));
	}
	
	public void maxi(String codeComputer) {
		System.out.println("Vous avez atteint le nombre maximum de tours.\nLa combinaison était : " + codeComputer);
	}
	
	public void regle() {
		System.out.println("\nLe but est de découvrir la combinaison de \ncouleurs cachée par l'ordinateur. Pour cela, \nvous devez faire plusieurs essais pour choisir \nau fur et à mesure les bonnes couleurs et trouver\nleur place. L'ordinateur vous donnera des \nindices pour savoir si vous mettez les bonnes \ncouleurs et si elles sont à la bonne place.");
	}

	public void score(Register r) {
		System.out.println("Scores !");
		System.out.println("Nombre de tour : " + r.getTour());
    	System.out.println("Nombre de point : " + r.getPoint());
    	System.out.println("Temps écoulé : " + (r.getTime() / 1000));
	}
	
}
