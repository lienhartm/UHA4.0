package HART.MIND5.Game;

import java.security.SecureRandom;
import java.math.BigInteger;

public class Session {

    private static SecureRandom random = new SecureRandom();

    public static String generateSessionId() {
        return new BigInteger(130, random).toString(32);
    }
}
