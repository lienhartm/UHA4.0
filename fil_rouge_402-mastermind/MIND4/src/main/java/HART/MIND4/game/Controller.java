package HART.MIND4.game;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.List;

	
	@RestController
	public class Controller {
	
		//▲■●⦁
	Code codeIa = new Code();
	Register r = new Register(0,0,0);
	List<GameData> listGameData = new ArrayList<>();
	int tour = 0;
	int duration = 0;
	long startTime = 0;
	String correction = "";
	String codeComputer = "";
	String affichage = "<!doctype html><html><body>"
					+ "<div style='position:absolute; bottom: 320px; left:40%;'>"
					+ "<form id='code' onsubmit='event.preventDefault(); valider();'>"
					+ "<div id='affichage' style='width: 200px;height: 30px;text-align: center;margin-bottom: 10px;'></div>"
					+ "<button type='button' onclick='ajouterChiffre(1)' style='width: 60px;height: 60px;margin: 5px;font-size: 20px;color:red;'>●</button>"
					+ "<button type='button' onclick='ajouterChiffre(2)' style='width: 60px;height: 60px;margin: 5px;font-size: 20px;color:green;'>●</button>"
					+ "<button type='button' onclick='ajouterChiffre(3)' style='width: 60px;height: 60px;margin: 5px;font-size: 20px;color:blue;'>●</button><br>"
					+ "<button type='button' onclick='ajouterChiffre(4)' style='width: 60px;height: 60px;margin: 5px;font-size: 20px;color:red;'>■</button>"
					+ "<button type='button' onclick='ajouterChiffre(5)' style='width: 60px;height: 60px;margin: 5px;font-size: 20px;color:green;'>■</button>"
					+ "<button type='button' onclick='ajouterChiffre(6)' style='width: 60px;height: 60px;margin: 5px;font-size: 20px;color:blue;'>■</button><br>"
					+ "<button type='button' onclick='ajouterChiffre(7)' style='width: 60px;height: 60px;margin: 5px;font-size: 20px;color:red;'>▲</button>"
					+ "<button type='button' onclick='ajouterChiffre(8)' style='width: 60px;height: 60px;margin: 5px;font-size: 20px;color:green;'>▲</button>"
					+ "<button type='button' onclick='ajouterChiffre(9)' style='width: 60px;height: 60px;margin: 5px;font-size: 20px;color:blue;'>▲</button><br>"
					+ "<button id='reset' onclick='reset()' style='width: 100px;height: 60px;margin: 5px;font-size: 20px;background-color:red;color:white;'>Reset</button>"
					+ "<button type='submit' style='width: 100px;height: 60px;margin: 5px;font-size: 20px;background-color: green;color: white;'>Valider</button>"
					+ "</form>"
					+ "</div></body></html>";
	

	
	@GetMapping("/")
	public String get() {
	    return  "<!doctype html><html><body><div style='display: flex; width: 100%;'>"
	            + "<div style='flex: 1; padding: 10px;'>"
				+ "<pre style='position: absolute;top: 10%;left: 0%; width: 49%;'>"
				+ "<h1 style='text-align:center;'>''''''''''''''''''''''''''''''''''''''''''''''''''''''</h1>"
				+ "<h1 style='text-align:center;'>''''''''''''''''''''''''''''''''''''''''''''''''''''''</h1>"
				+ "<h1 style='text-align:center;'>''''                                              ''''</h1>"
				+ "<h1 style='text-align:center;'>''''    '''    '''   ''''    ''    ''  ''''''     ''''</h1>"
				+ "<h1 style='text-align:center;'>''''    '' '  ' ''    ''     '''   ''  ''   ''    ''''</h1>"
				+ "<h1 style='text-align:center;'>''''    '' '  ' ''    ''     '' '  ''  ''    ''   ''''</h1>"
				+ "<h1 style='text-align:center;'>''''    ''  ''  ''    ''     ''  ' ''  ''    ''   ''''</h1>"
				+ "<h1 style='text-align:center;'>''''    ''      ''    ''     ''   '''  ''   ''    ''''</h1>"
				+ "<h1 style='text-align:center;'>''''    ''      ''   ''''    ''    ''  ''''''     ''''</h1>"
				+ "<h1 style='text-align:center;'>''''                                   MASTERMIND ''''</h1>"
				+ "<h1 style='text-align:center;'>''''''''''''''''''''''''''''''''''''''''''''''''''''''</h1>"
				+ "<h1 style='text-align:center;'>''''''''''''''''''''''''''''''''''''''''''''''''''''''</h1>"
				+ "</pre>"
				+ "<div style='display: flex; flex-direction: row; position: absolute; bottom: 520px; left: 10%; right: 0;'>"
				+ "<a href='/gamessd' target='frame' style='height: 50px; width: 200px;text-decoration: none;color:black; border: 1px solid black; display: inline-block; text-align: center; line-height: 50px;'>Jouer sans doublons</a>"
				+ "<a href='/gamead' target='frame' style='height: 50px; width: 200px;text-decoration: none;color:black; border: 1px solid black; display: inline-block; text-align: center; line-height: 50px;'>Jouer avec doublons</a>"
				+ "<a href='/regle' target='frame' style='height: 50px; width: 200px;text-decoration: none;color:black; border: 1px solid black; display: inline-block; text-align: center; line-height: 50px;'>Règle du jeu</a>"
				+ "<a href='/score' target='frame' style='height: 50px; width: 200px;text-decoration: none;color:black; border: 1px solid black; display: inline-block; text-align: center; line-height: 50px;'>Meilleur scores</a>"
				+ "</div>"
	            + "</div>"
	            + "<div style='flex: 1; padding: 10px;'>"
	            + "<iframe style='width:100%; height:97vh;border:none;' name='frame' src='/game'></iframe>"
	            + "</div>"
	            + "</div></body></html>";
	}
	
	@GetMapping("/gamessd")
	public String showGameSSD() {
		codeComputer = codeIa.codeSSD();
		startTime = System.currentTimeMillis();
	    return affichage;
	}
	
	@PostMapping("/gamessd")
	public String showGameSSD(/*@RequestParam("nb1") String nb1 , @RequestParam("nb2") String nb2 , @RequestParam("nb3") String nb3 , @RequestParam("nb4") String nb4 */ @RequestParam("code") String code) {
			/*String code = nb1 + nb2 + nb3 + nb4;*/
			String affiche = "";
			tour++;
	        String correction = codeIa.getCorrection(codeComputer, code);
	        GameData game = new GameData(code, correction);
			listGameData.add(game);
			affiche += "<div  style='text-align:center;'><h5>Liste des codes et corrections : </h5><ol style='  display: inline-block;text-align: left;'>";
	        for (GameData data : listGameData) {
	            affiche += "<li>" + data.getJoueurCode() + ": " + data.getcorrection() + "</li>";
	        }
	        affiche += "</ol></div>";
	        if (correction.equals("oooo")) {
	            long endTime = System.currentTimeMillis();
	            duration = (int) (endTime - startTime) / 1000;
	        	Joueur a = new Joueur(tour, (10-tour), duration);
	        	Score s = new Score();
	        	s.compare(r,  a);
	        	affiche += "<br><div style='text-align:center;margin-left:300px;'><h1>You WIN !</h1><br><p>Nombre de tour : " + tour + "</p><p>Temps de jeu : " + duration + "</p><br><h2><a href='/game'>Try Again !</a></h2></div>";
	        } else if (tour > 10) {
	        	affiche += "<br><div style='text-align:center;'><h1>You LOOSE !</h1><br><h2><a href='/game'>Try Again !</a></h2></div>";
	        }
	        return affichage + affiche;
	}
	
	@GetMapping("/gamead")
	public String showGameAD() {
		codeComputer = codeIa.codeAD();
		startTime = System.currentTimeMillis();
	    return affichage;
	}
	
	@PostMapping("/gamead")
	public String showGameAD(@RequestParam("nb1") String nb1 , @RequestParam("nb2") String nb2 , @RequestParam("nb3") String nb3 , @RequestParam("nb4") String nb4 ) {
			String code = nb1 + nb2 + nb3 + nb4;
			String affiche = "";
			tour++;
	        String correction = codeIa.getCorrection(codeComputer, code);
	        GameData game = new GameData(code, correction);
			listGameData.add(game);
			affiche += "<div style='text-align:center;'><h5>Liste des codes et corrections : </h5><ol style='  display: inline-block;text-align: left;'>";
	        for (GameData data : listGameData) {
	            affiche += "<li>" + data.getJoueurCode() + " : " + data.getcorrection() +  "</li>";
	        }
	        affiche += "</ol></br>";
	        if (correction.equals("oooo")) {
	            long endTime = System.currentTimeMillis();
	            duration = (int) (endTime - startTime) / 1000;
	        	Joueur a = new Joueur(tour, (10-tour), duration);
	        	Score s = new Score();
	        	s.compare(r,  a);
	        	affiche += "<br><div style='text-align:center;'><h1>You WIN !</h1><br><p>Nombre de tour : " + tour + "</p><p>Temps de jeu : " + duration + "</p><br><h2><a href='/game'>Try Again !</a></h2></div>";
	        } else if (tour >= 10) {
	        	affiche += "<br><div style='text-align:center;'><h1>You LOOSE !</h1><br><h2><a href='/game'>Try Again !</a></h2></div>";
	        }
	        return affichage + affiche;
	}
	
	@GetMapping("/regle")
	public String showGameSpiel() {	
	    return "<div style='margin-top: 100px;'>"
	    		+ "<h1 style='text-align:center;'>MIND</h1>"
	    		+ "<div style='position:absolute;top:20%; left:30%;'>"
	    		+ "<h2><u>Règles du jeu</u></h2>"
	    		+ "<h3>MIND est un jeu dérivée du MASTERMIND</h3>"
	    		+ "<br />"
	    		+ "<div style='width:500px;'>"
	    		+ "<h3>Le but est de découvrir la combinaison de couleurs/chiffre/forme coloré cachée par l'ordinateur. Pour cela, vous devez faire plusieurs essais pour choisir au fur et à mesure les bonnes couleurs/chiffres/formes colorées et trouver leur place. L'ordinateur vous donnera des indices pour savoir si vous mettez les bonnes couleurs/chiffres/formes colorées et si elles sont à la bonne place.</h3><br><ul><li> (-) / <span style='color:white;'>⦁</span> - Pas dans la combinaison</li><li> (+) / <span style='color:red;'>⦁</span> - Dans la combinaison mais pas à la bonne place</li><li> (o) / <span style='color:black;'>⦁</span> - Dans la combinaison et à la bonne place</li></ul>"
	    		+ "</div>"
	    		+ "</div>"
	    		+ "</div>";
	}
	
	@GetMapping("/score")
	public String showGameScore() {	
		return "<div style='margin-top:100px;'>"
				+ "<h1 style='text-align:center;'>SCORE</h1>"
	    		+ "<br />"
	    		+ "<div style='position:absolute;top:20%; left:30%;'>"
	    		+ "<p>Temps de jeu : " + r.getTime() + "</p>"
	    		+ "<br />"
	    		+ "<p>Nombre de point : " + r.getPoint() + "</p>"
	    		+ "<br />"
	    		+ "<p>Nombre de tour : " + r.getTour() + "</p>"
	    		+ "</div>"
	    		+ "</div>";
	}
	
	@GetMapping("/game")
	public String showGame() {
		tour = 0;
		duration = 0;
		startTime = 0;
		correction = "";
		codeComputer = "";
		listGameData = new ArrayList<>();
		return "<div>Zzzz</div>";
	}
	
}
	
	
		
