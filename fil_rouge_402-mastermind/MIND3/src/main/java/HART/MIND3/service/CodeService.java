package HART.MIND3.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import HART.MIND3.controller.CodeDTO;
import HART.MIND3.entity.*;
import HART.MIND3.repository.*;

@Service
public class CodeService {
	
	//String code = "";
	
    @Autowired
    private FormRepository formRepository;
    
    @Autowired
    private RondService rondService;
    
    @Autowired
    private CarreService carreService;
    
    @Autowired
    private TriangleService triangleService;
    
    @Autowired
    private FormService formService;
	
	public String getAllCodes() {
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode packagesNode = mapper.createArrayNode();

        List<CodeDTO> forms = formService.getAll();

        for (int i = 0; i < forms.size(); i += 4) {
            ObjectNode packageNode = mapper.createObjectNode();
            ArrayNode formsNode = mapper.createArrayNode();

            for (int j = i; j < i + 4 && j < forms.size(); j++) {
                CodeDTO form = forms.get(j);
                ObjectNode formNode = mapper.createObjectNode();
                formNode.put("id", form.getId());
                formNode.put("x", form.getX());
                formNode.put("y", form.getY());
                formNode.put("couleur", form.getCouleur());
                formNode.put("geometrie", form.getGeometrie());
                formNode.put("rayon", form.getRayon());
                formNode.put("longueur", form.getLongueur());
                formNode.put("largeur", form.getLargeur());
                formNode.put("coteAB", form.getCoteAB());
                formNode.put("coteBC", form.getCoteBC());
                formNode.put("coteCA", form.getCoteCA());
                formsNode.add(formNode);
                // perimetre
                // surface
                // couleur
            }

            packageNode.set("forms", formsNode);
            packagesNode.add(packageNode);
        }

        String jsonResult = null;
        try {
            jsonResult = mapper.writeValueAsString(packagesNode);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return jsonResult;
	}
	
	public String getCodesById(int index) {
        List<CodeDTO> forms = formService.getAll();
		ObjectMapper mapper = new ObjectMapper();
        ArrayNode packagesNode = mapper.createArrayNode();

        ArrayNode formsNode = mapper.createArrayNode();
        ObjectNode packageNode = mapper.createObjectNode();
        // Calcul de l'indice de départ dans la liste forms pour le paquet spécifié
        int startIndex = (index - 1) * 4;

        // Vérification de l'indice de départ valide
        if (startIndex < forms.size()) {
            int endIndex = Math.min(startIndex + 4, forms.size()); // Calcul de l'indice de fin
            //ArrayNode formsNode = mapper.createArrayNode(); // Création d'un ArrayNode pour stocker les codes
            for (int i = startIndex; i < endIndex; i++) {
                CodeDTO form = forms.get(i);
                ObjectNode formNode = mapper.createObjectNode();
                formNode.put("id", form.getId());
                formNode.put("x", form.getX());
                formNode.put("y", form.getY());
                formNode.put("couleur", form.getCouleur());
                formNode.put("geometrie", form.getGeometrie());
                formNode.put("rayon", form.getRayon());
                formNode.put("longueur", form.getLongueur());
                formNode.put("largeur", form.getLargeur());
                formNode.put("coteAB", form.getCoteAB());
                formNode.put("coteBC", form.getCoteBC());
                formNode.put("coteCA", form.getCoteCA());
                formsNode.add(formNode);
                //
            }
            packageNode.set("forms", formsNode);
            packagesNode.add(packageNode);
        }

        String jsonResult = null;
        try {
            jsonResult = mapper.writeValueAsString(packagesNode);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return jsonResult;
	}
	
	public void getGenerateur() {
    	int code1, code2, code3, code4;
    	Random random = new Random();
   		code1 = random.nextInt(9) + 1;
   		getCombinaison(code1);
   		    		
   		do {
   			code2 = random.nextInt(9) + 1;
   		} while(code1 == code2);
    	getCombinaison(code2);
    	
    	do {
    		code3 = random.nextInt(9) + 1;
    	} while(code1 == code3 | code2 == code3);
    	getCombinaison(code3);
    		
    	do {
    		code4 = random.nextInt(9) + 1;
    	} while(code1 == code4 | code2 == code4 | code3 == code4);
    	getCombinaison(code4);
	}
	
    public String getCombinaison(int rand) {
    	
        Form codeEntity = new Form();
        String code = null;
        
        switch( rand ) {
            case 1:
                Rond rond1 = new Rond(10, 10, 0, 1, 10);
		        codeEntity.setX(rond1.getX());
		        codeEntity.setY(rond1.getY());
		        codeEntity.setCouleur(rond1.getCouleur());
		        codeEntity.setGeometrie(rond1.getGeometrie());
                rondService.add(rond1);
                codeEntity.setIdTable(rond1.getId());
                formRepository.save(codeEntity);
            	break;
            case 2:
                Rond rond2 = new Rond(10, 10, 1, 1, 10);
		        codeEntity.setX(rond2.getX());
		        codeEntity.setY(rond2.getY());
		        codeEntity.setCouleur(rond2.getCouleur());
		        codeEntity.setGeometrie(rond2.getGeometrie());
                rondService.add(rond2);
                codeEntity.setIdTable(rond2.getId());
                formRepository.save(codeEntity);
            	break;
            case 3:
                Rond rond3 = new Rond(10, 10, 2, 1, 10);
		        codeEntity.setX(rond3.getX());
		        codeEntity.setY(rond3.getY());
		        codeEntity.setCouleur(rond3.getCouleur());
		        codeEntity.setGeometrie(rond3.getGeometrie());
                rondService.add(rond3);
                codeEntity.setIdTable(rond3.getId());
                formRepository.save(codeEntity);
            	break;
            case 4:
                Carre carre1 = new Carre(10, 10, 0, 4, 20, 20);
		        codeEntity.setX(carre1.getX());
		        codeEntity.setY(carre1.getY());
		        codeEntity.setCouleur(carre1.getCouleur());
		        codeEntity.setGeometrie(carre1.getGeometrie());
                carreService.add(carre1);
                codeEntity.setIdTable(carre1.getId());
                formRepository.save(codeEntity);
            	break;
            case 5:
                Carre carre2 = new Carre(10, 10, 1, 4, 20, 20);
		        codeEntity.setX(carre2.getX());
		        codeEntity.setY(carre2.getY());
		        codeEntity.setCouleur(carre2.getCouleur());
		        codeEntity.setGeometrie(carre2.getGeometrie());
                carreService.add(carre2);
                codeEntity.setIdTable(carre2.getId());
                formRepository.save(codeEntity);
            	break;
            case 6:
                Carre carre3 = new Carre(10, 10, 2, 4, 20, 20);
		        codeEntity.setX(carre3.getX());
		        codeEntity.setY(carre3.getY());
		        codeEntity.setCouleur(carre3.getCouleur());
		        codeEntity.setGeometrie(carre3.getGeometrie());
                carreService.add(carre3);
                codeEntity.setIdTable(carre3.getId());
                formRepository.save(codeEntity);
             	break;
            case 7:
                Triangle triangle1 = new Triangle(10, 10, 0, 7, 10, 10, 10);
		        codeEntity.setX(triangle1.getX());
		        codeEntity.setY(triangle1.getY());
		        codeEntity.setCouleur(triangle1.getCouleur());
		        codeEntity.setGeometrie(triangle1.getGeometrie());
                triangleService.add(triangle1);
                codeEntity.setIdTable(triangle1.getId());
                formRepository.save(codeEntity);
             	break;
            case 8:
                Triangle triangle2 = new Triangle(10, 10, 1, 7, 10, 10, 10);
		        codeEntity.setX(triangle2.getX());
		        codeEntity.setY(triangle2.getY());
		        codeEntity.setCouleur(triangle2.getCouleur());
		        codeEntity.setGeometrie(triangle2.getGeometrie());
                triangleService.add(triangle2);
                codeEntity.setIdTable(triangle2.getId());
                formRepository.save(codeEntity);
            	break;
            case 9:
                Triangle triangle3 = new Triangle(10, 10, 2, 7, 10, 10, 10);
		        codeEntity.setX(triangle3.getX());
		        codeEntity.setY(triangle3.getY());
		        codeEntity.setCouleur(triangle3.getCouleur());
		        codeEntity.setGeometrie(triangle3.getGeometrie());
                triangleService.add(triangle3);
                codeEntity.setIdTable(triangle3.getId());
                formRepository.save(codeEntity);
            	break;
        }
		return code;
    }
    
}
