package Mind;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class MastermindGame {

	public static void main(String[] args) {
        MastermindGame game = new MastermindGame();
        game.start();
    }

	private int tour;
	private long duration;
	private String codeComputer;
	
    List<ListGame> listgames = new ArrayList<>();
    List<GameJson> gamejsons = new ArrayList<>();

	Menu m = new Menu();

    Scanner scanner = new Scanner(System.in);
	Code codeIa = new Code();
	Register r = new Register(0,0,0);

    public void start() {
        Scanner scanner = new Scanner(System.in);
        boolean playAgain;

        do {
        	m.menu();
            int choice = scanner.nextInt();
            switch (choice) {
                case 1:
                	codeComputer = codeIa.codeSSD();
                    playGame(scanner);
                    break;
                case 2:
                	codeComputer = codeIa.codeAD();
                	playGame(scanner);
                	break;
                case 3:
                	m.regle();
                    break;
                case 4:
                	m.score(r);
                    break;
                case 5:
                	m.ciao();
                    return;
                default:
                	m.choice();
            }

            m.again();
            playAgain = scanner.nextBoolean();
        } while (playAgain);

        scanner.close();
    }

    public void playGame(Scanner scanner) {
    	long startTime = System.currentTimeMillis();

        boolean play = true;
        tour = 0;

        while (play) {
            tour++;
            m.tour(tour);
            String joueur = scanner.next();
            
            //ListGame listGame = new ListGame(joueur);
            //listgames.add(listGame);

            String correction = codeIa.getCorrection(codeComputer, joueur);
            
            m.juste(joueur,  correction);

            if (correction.equals("oooo")) {
                long endTime = System.currentTimeMillis();
                duration = endTime - startTime;
            	int point = 10 - tour;
            	
            	Joueur a = new Joueur(tour, point, duration);
            	Score s = new Score();
            	/*boolean mvp = */s.compare(r,  a);
            	
                //GameJson gamejson = new GameJson(codeComputer, duration, mvp, (ListGame) listgames);
                //gamejsons.add(gamejson);

            	m.bravo(tour,  duration);
                play = false;
            } else if (tour >= 10) {
            	m.maxi(codeComputer);
            	//
                play = false;
            }
        }
    }
    
}
