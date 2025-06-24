package HART.MIND5.Game;

import java.util.*;

// class Code
public class Code {
	int code1;
	int code2;
	int code3;
	int code4;
	String codeIa = "";
	String correction = "";
	
	// generateur de code sans doublons
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
		
		return codeIa;
		
	}
	
	// generateur de code avec doublons
	public String codeAD() {
		
		codeIa = "";
		Random random = new Random();
        for (int i = 0; i < 4; i++) {
            codeIa += random.nextInt(9) + 1;
        }
        
        return codeIa;

	}
	
	// queue de correction
	public String getCorrection(String codeComputer, String code) {
        correction = "";
        for (int i = 0; i < 4; i++) {
            if (codeComputer.charAt(i) == code.charAt(i)) {
                correction += "o";
            } else if (codeComputer.contains(String.valueOf(code.charAt(i)))) {
                correction += "+";
            } else {
                correction += "-";
            }
        }
        
        return correction.toString();
    
	}
	
}