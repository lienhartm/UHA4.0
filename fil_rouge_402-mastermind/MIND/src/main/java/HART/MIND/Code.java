package HART.MIND;

import java.util.*;

public class Code {
	int code1;
	int code2;
	int code3;
	int code4;
	String codeIa = "";
	String correction = "";
	
	public String codeSSD() {
		
		codeIa = "";
		Random random = new Random();
		
		this.code1 = random.nextInt(9) + 1;
		codeIa += code1;
		
		do {
			this.code2 = random.nextInt(9) + 1;
		} while(this.code1 == this.code2);
		codeIa += code2;
		
		do {
			this.code3 = random.nextInt(9) + 1;
		} while(this.code1 == this.code3 | this.code2 == this.code3);
		codeIa += code3;
		
		do {
			this.code4 = random.nextInt(9) + 1;
		} while(this.code1 == this.code4 | this.code2 == this.code4 | this.code3 == this.code4);
		codeIa += code4;

		//arrayCode(codeIa);
		
		return codeIa;
		
	}
	
	public String codeAD() {
		
		codeIa = "";
		Random random = new Random();
        for (int i = 0; i < 4; i++) {
            codeIa += random.nextInt(9) + 1;
        }
        
        //arrayCode(codeIa);

        return codeIa;
	}
	
	/*
	 * 	o sera un point rouge
	 * 	+ sera un point blanc
	 * 	- sera un point noir
	 */
	
	public String getCorrection(String codeComputer, String joueur) {
        correction = "";
        for (int i = 0; i < 4; i++) {
            if (codeComputer.charAt(i) == joueur.charAt(i)) {
                correction += "o";
            } else if (codeComputer.contains(String.valueOf(joueur.charAt(i)))) {
                correction += "+";
            } else {
                correction += "-";
            }
        }
        
        //arrayCorrection(correction.toString());
        
        return correction.toString();
    }
	
	/* 1 red, 2 green, 3 blue
	 *	1 sera un carre red
	 *  2 sera un carre green
	 *  3 sera un carre blue
	 *  4 sera un rond red
	 *  5 sera un rond green
	 *  6 sera un rond blue
	 *  7 sera un triangle red
	 *  8 sera un triangle green
	 *  9 sera un triangle blue
	 *  0 
	*/
	/*
	public ArrayList<Object> arrayCode(String codeIa) {
	    ArrayList<Object> computerCode = new ArrayList<>();
		for(int i = 0; i < codeIa.length(); i++) {
	        char computer = codeIa.charAt(i);
			switch(computer){
				case '1':
					Carre carre1 = new Carre(10, 10, 1, 10, 10);
					computerCode.add(carre1);
					break;
				case '2':
					Carre carre2 = new Carre(10, 10, 2, 10, 10);
					computerCode.add(carre2);
					break;
				case '3':
					Carre carre3 = new Carre(10, 10, 3, 10, 10);
					computerCode.add(carre3);
					break;
				case '4':
					Rond rond1 = new Rond(10, 10, 1, 10);
					computerCode.add(rond1);
					break;
				case '5':
					Rond rond2 = new Rond(10, 10, 2, 10);
					computerCode.add(rond2);
					break;
				case '6':
					Rond rond3 = new Rond(10, 10, 3, 10);
					computerCode.add(rond3);
					break;
				case '7':
					Triangle triangle1 = new Triangle(10, 10, 1, 10, 10, 10);
					computerCode.add(triangle1);
					break;
				case '8':
					Triangle triangle2 = new Triangle(10, 10, 2, 10, 10, 10);
					computerCode.add(triangle2);
					break;
				case '9':
					Triangle triangle3 = new Triangle(10, 10, 3, 10, 10, 10);
					computerCode.add(triangle3);
					break;
			}
		}
	
		return computerCode;
	}	
	
	public ArrayList<Object> arrayCorrection(String codeCor) {
	    ArrayList<Object> correctionCode = new ArrayList<>();
		for(int i = 0; i < codeCor.length(); i++) {
	        char correction = codeCor.charAt(i);
			switch(correction){
				case 'o':
					Point point1 = new Point(10, 10, 1);
					correctionCode.add(point1);
					break;
				case '+':
					Point point2 = new Point(10, 10, 2);
					correctionCode.add(point2);
					break;
				case '-':
					Point point3 = new Point(10, 10, 3);
					correctionCode.add(point3);
					break;
			}
		}
		
		return correctionCode;
	}
	*/
}