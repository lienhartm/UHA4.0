package Geometrie;
import java.util.Scanner;

class MastermindGame {
    private String computer;
    private boolean game;
    private Scanner scanner;

    MastermindGame() {
        this.computer = generateCode();
        this.game = true;
        this.scanner = new Scanner(System.in);
    }

    private String generateCode() {
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            code.append((int) (Math.random() * 9 + 1));
        }
        return code.toString();
    }

    private String checkGuess(String guess) {
        StringBuilder correction = new StringBuilder();
        int win = 0;
        for (int i = 0; i < 4; i++) {
            if (computer.charAt(i) == guess.charAt(i)) {
                correction.append('o');
                win++;
            } else if (computer.contains("" + guess.charAt(i))) {
                correction.append('+');
            } else {
                correction.append('-');
            }
        }
        if (win == 4) {
            game = false;
        }
        return correction.toString();
    }

    public void play() {
        System.out.println("Bienvenue dans le jeu du mastermind !");
        while (game) {
            String guess = scanner.nextLine();
            String correction = checkGuess(guess);
            System.out.println(correction);

            if (!game) {
                System.out.println("Vous avez gagné !");
                System.out.print("Voulez-vous rejouer ? (y/n): ");
                String choice = scanner.nextLine();
                if (choice.equals("y")) {
                    computer = generateCode();
                    game = true;
                } else {
                    break;
                }
            }
        }
        scanner.close();
        System.out.println("Merci d'avoir joué !");
    }
}
