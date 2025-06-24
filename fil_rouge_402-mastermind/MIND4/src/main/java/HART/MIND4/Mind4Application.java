package HART.MIND4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.function.ServerResponse.Context;
import org.graalvm.polyglot.*;

public class Mind4Application {

    public static void main(String[] args) {

        SpringApplication.run(Mind4Application.class, args);
        initGraalVM();
        // Placez le reste de votre logique ici
    }

    public static void initGraalVM() {
        try (Context context = Context.create()) {
            context.eval("js", 
                "var code = '';\n"
                + "var affichageDiv = document.getElementById('affichage');\n"
                + "function ajouterChiffre(chiffre) { \n"
                + "    if  (code.length < 4) { \n"
                + "        code += chiffre; \n"
                + "        affichageDiv.innerHTML += getSymbole(chiffre);\n"
                + "    }\n"
                + "}\n"
                + "function reset() { \n"
                + "    code = ''; \n"
                + "    affichageDiv.innerHTML = ''; \n"
                + "} \n"
                + "function getSymbole(chiffre) { \n"
                + "    switch (chiffre) { \n"
                + "        case 1: return '<span style=\"font-size: 30px;color:red;\">●</span>';\n"
                + "        case 2: return '<span style=\"font-size: 30px;color:green;\">●</span>';\n"
                + "        case 3: return '<span style=\"font-size: 30px;color:blue;\">●</span>';\n"
                + "        case 4: return '<span style=\"font-size: 30px;color:red;\">■</span>';\n"
                + "        case 5: return '<span style=\"font-size: 30px;color:green;\">■</span>';\n"
                + "        case 6: return '<span style=\"font-size: 30px;color:blue;\">■</span>';\n"
                + "        case 7: return '<span style=\"font-size: 30px;color:red;\">▲</span>';\n"
                + "        case 8: return '<span style=\"font-size: 30px;color:green;\">▲</span>';\n"
                + "        case 9: return '<span style=\"font-size: 30px;color:blue;\">▲</span>';\n"
                + "        default: return '';\n"
                + "    }\n"
                + "}\n"
                + "function valider() { \n"
                + "    if (code.length === 4) { \n"
                + "        // Logique de validation ici \n"
                + "        console.log('Code validé : ' + code);\n"
                + "    } \n"
                + "} ");
        }
    }
}
