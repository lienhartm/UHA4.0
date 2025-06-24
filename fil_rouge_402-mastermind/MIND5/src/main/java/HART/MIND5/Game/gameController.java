package HART.MIND5.Game;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
//@RestController
public class gameController {
	
	Code codeIa = new Code();
	Register r = new Register(0,0,0);
	List<GameData> listGameData = new ArrayList<>();
	int point;
	int tour = 0;
	int duration = 0;
	long startTime = 0;
	String correction = "";
	String codeComputer = "";
	
	//	git clone  http://git.uha4point0.fr/UHA40/fil-rouge-2023/4.0.2-de/fil_rouge_402-mastermind-michaellienhart.git
	
	// page de garde
	@GetMapping("/")
	public String getIndex(HttpSession session) {

	    String sessionId = Session.generateSessionId();
        session.setAttribute("sessionId", sessionId);

        session.setAttribute("tour", 0);
        session.setAttribute("duration", 0);
        session.setAttribute("startTime", 0);
        session.setAttribute("correction", 0);
        session.setAttribute("codeComputer", 0);
        session.setAttribute("listGameData", new ArrayList<>());
		tour = 0;
		duration = 0;
		startTime = 0;
		correction = "";
		codeComputer = "";
		listGameData = new ArrayList<>();
	    return  "index";
	}
	
	// page de jeu sans doublons
    @GetMapping("/gamessd")
    public String showGamesSD(HttpSession session) {
        codeComputer = codeIa.codeSSD();
        session.setAttribute("codeComputer", codeComputer);
        startTime = System.currentTimeMillis();
        session.setAttribute("startTime", startTime);
        return "gameMindSD";
    }
    
    // page de jeu avec doublons
    @GetMapping("/gamesad")
    public String showGamesAD(HttpSession session) {
        codeComputer = codeIa.codeAD();
        session.setAttribute("codeComputer", codeComputer);
        startTime = System.currentTimeMillis();   
        session.setAttribute("startTime", startTime);
        return "gameMindAD";
    }
    
    // page de la regle de jeu
	@GetMapping("/regle")
	public String getRegle() {	
	    return "regles";
	}
	
	// page des scores
	@GetMapping("/score")
	public String getScore(Model model, HttpSession session) {
		model.addAttribute("time", r.getTime());
	    model.addAttribute("point", r.getPoint());
	    model.addAttribute("tour", r.getTour());
	    model.addAttribute("btime", session.getAttribute("totalTime"));
	    model.addAttribute("bpoint", session.getAttribute("totalPoint"));
	    return "score";
	}
	
    // queue de traitement de la correction
    @PostMapping("/gamessd")
    public String postGamesSD(@RequestParam("code") String code, Model model, HttpSession session) {
        String correction = codeIa.getCorrection(codeComputer, code);
        session.setAttribute("correction", correction);
        GameData game = new GameData(code, correction);
        session.setAttribute("game", game);
        List<GameData> listGameData = (List<GameData>) session.getAttribute("listGameData");
        listGameData.add((GameData) session.getAttribute("game"));
        session.setAttribute("listGameData", listGameData);

        int point = 0;
        session.setAttribute("point", 0);
        int duration = 0;
        session.setAttribute("duration", 0);
        if (correction.equals("oooo")) {
            long endTime = System.currentTimeMillis();
            session.setAttribute("endTime", endTime);
            duration = (int) ((long) session.getAttribute("endTime") - (long) session.getAttribute("startTime")) / 1000;
            session.setAttribute("duration", duration);
            point = 10 - tour;
            session.setAttribute("point", point);
            Joueur a = new Joueur(tour, point, duration);
            Score s = new Score();
            s.compare(r,  a);
            session.setAttribute("totalPoint", r.getTotalPoint());
            session.setAttribute("totalTime", r.getTotalTime());
            temporisation();
            return "game";
        }
        return "redirect:/getGameSD";
    }
    
    // queue de traitement de la correction
    @PostMapping("/gamesad")
    public String postGamesAD(@RequestParam("code") String code, Model model, HttpSession session) {
    	session.setAttribute("tour", tour++);
        String correction = codeIa.getCorrection(codeComputer, code);
        session.setAttribute("correction", correction);
        GameData game = new GameData(code, correction);
        session.setAttribute("game", game);
        listGameData.add((GameData) session.getAttribute("game"));
        session.setAttribute("listGameData", listGameData);
        session.setAttribute("point", 0);
        session.setAttribute("duration", 0);
        if (session.getAttribute(correction).equals("oooo")) {
            long endTime = System.currentTimeMillis();
            session.setAttribute("endTime", endTime);
            duration = (int) ((long) session.getAttribute("endTime") - (long) session.getAttribute("startTime")) / 1000;
            session.setAttribute("duration", duration);
            point = 10 - (int) session.getAttribute("tour");
            session.setAttribute("point", point);
            Joueur a = new Joueur((int) session.getAttribute("tour"), (int) session.getAttribute("point"), (int) session.getAttribute("duration"));
            Score s = new Score();
            s.compare(r,  a);
            session.setAttribute("totalPoint", r.getTotalPoint());
            session.setAttribute("totalTime", r.getTotalTime());
            temporisation();
            return "game";
        }
        return "redirect:/getGameAD";
    }
    
    @GetMapping("/getGameAD")
    public String getGamesAD(Model model, HttpSession session) {
    	tour++;
    	session.setAttribute("tour", tour);
    	if ((int) session.getAttribute("tour") >= 9 || session.getAttribute("correction").equals("oooo")) {
    		temporisation();
        	//session.invalidate();
        	return "loose";
        }
        model.addAttribute("listing", session.getAttribute("listGameData"));
	    return "gameMindAD";
    }
    
    @GetMapping("/getGameSD")
    public String getGamesSD(Model model, HttpSession session) {
    	tour++;
    	session.setAttribute("tour", tour);
    	if ((int) session.getAttribute("tour") >= 9 || session.getAttribute("correction").equals("oooo")) {
    		temporisation();
        	//session.invalidate();
        	return "loose";
        }
    	model.addAttribute("listing", session.getAttribute("listGameData"));
    	return "gameMindSD";
    }
    
    public void temporisation() {
    	try { 
		  Thread.sleep(4000);
		}
		catch (InterruptedException exception) {
		  exception.printStackTrace();
		}
    }
    
}
