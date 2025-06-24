package HART.MIND3.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import HART.MIND3.controller.CodeDTO;
import HART.MIND3.entity.*;
import HART.MIND3.repository.*;

/**
 * Service pour la gestion des formulaires.
 * Ce service gère l'accès à la base de données H2 pour les opérations sur les formulaires.
 */
@Service
public class FormService {


    // Injection des repositories pour l'accès aux données
    @Autowired
    private FormRepository formRepository;
    
    @Autowired
    private PointRepository pointRepository;
    
    @Autowired
    private RondRepository rondRepository;
    
    @Autowired
    private CarreRepository carreRepository;
    
    @Autowired
    private TriangleRepository triangleRepository;
    
    @Autowired
    private PointService pointService;
    
    @Autowired
    private RondService rondService;
    
    @Autowired
    private CarreService carreService;
    
    @Autowired
    private TriangleService triangleService;
    

    /**
     * Récupère un formulaire par son identifiant.
     * Cette méthode permet d'accéder à la base de données H2 pour récupérer un formulaire par son identifiant.
     *
     * @param id L'identifiant du formulaire à récupérer.
     * @return Le formulaire trouvé.
     * @throws RuntimeException Si aucun formulaire n'est trouvé avec l'identifiant spécifié.
     */
    public Form getById(Long id) {
        return formRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Form not found with ID: " + id));
    }
    
    /**
     * Récupère une liste de CodeDTO représentant toutes les formes géométriques enregistrées.
     * Cette méthode parcourt toutes les formes géométriques enregistrées en base de données
     * et les convertit en objets CodeDTO avant de les ajouter à une liste et de la retourner.
     *
     * @return Une liste de CodeDTO représentant toutes les formes géométriques enregistrées.
     */
    public List<CodeDTO> getAll() {
        List<CodeDTO> codeDTOList = new ArrayList<>();
        formRepository.findAll().forEach(form -> {
            CodeDTO codeDTO = convertToDTO(form);
            switch(codeDTO.getGeometrie()) {
	            case 0:
	            	Point point = pointRepository.findById(form.getIdTable()).orElse(null);
	                if (point != null) {
	                	codeDTO.setId(form.getId());
	                	codeDTO.setX(point.getX());
	                	codeDTO.setY(point.getY());
	                	codeDTO.setCouleur(point.getCouleur());
	                    codeDTOList.add(codeDTO);
	                }
	                break;
	            case 1:
	                Rond rond = rondRepository.findById(form.getIdTable()).orElse(null);
	                if (rond != null) {
	                	codeDTO.setId(form.getId());
	                	codeDTO.setX(rond.getX());
	                	codeDTO.setY(rond.getY());
	                	codeDTO.setCouleur(rond.getCouleur());
	                	codeDTO.setRayon(rond.getRayon());
	                	codeDTOList.add(codeDTO);
	                }
	                break;
	            case 4:
	                Carre carre = carreRepository.findById(form.getIdTable()).orElse(null);
	                if (carre != null) {
	                	codeDTO.setId(form.getId());
	                	codeDTO.setX(carre.getX());
	                	codeDTO.setY(carre.getY());
	                	codeDTO.setCouleur(carre.getCouleur());
	                    codeDTO.setLongueur(carre.getLongueur());
	                    codeDTO.setLargeur(carre.getLargeur());
	                  	codeDTOList.add(codeDTO);
	                }
	                break;
	            case 7:
	                Triangle triangle = triangleRepository.findById(form.getIdTable()).orElse(null);
	                if (triangle != null) {
	                	codeDTO.setId(form.getId());
	                	codeDTO.setX(triangle.getX());
	                	codeDTO.setY(triangle.getY());
	                	codeDTO.setCouleur(triangle.getCouleur());
	                	codeDTO.setCoteAB(triangle.getCoteAB());
	                	codeDTO.setCoteBC(triangle.getcoteBC());
	                	codeDTO.setCoteCA(triangle.getCoteCA());
	                	codeDTOList.add(codeDTO);
	                }
	                break;
	            }
        });
        return codeDTOList;
    }

    /**
     * Ajoute une nouvelle forme géométrique à la base de données en fonction des informations fournies dans le CodeDTO spécifié.
     * Cette méthode prend un objet CodeDTO représentant une forme géométrique et l'ajoute à la base de données
     * en fonction de sa géométrie. Elle crée d'abord l'entité Form correspondante, puis crée et sauvegarde l'entité
     * spécifique à la géométrie (Point, Rond, Carre ou Triangle) associée à cette forme géométrique.
     *
     * @param code L'objet CodeDTO représentant la forme géométrique à ajouter à la base de données.
     */
    public void add(String code) {

        // Convertit le CodeDTO en une entité Form
		Form form = new Form();
		Rond rond = new Rond();
		Carre carre = new Carre();
		Triangle triangle = new Triangle();
		
    	for(int i = 0; i < 4; i++) {

	        // Selon le type de géométrie spécifié dans le CodeDTO, crée et ajoute l'entité correspondante à la base de données
	        switch(code.charAt(i)) {
	            case '1':
	            	form = new Form(10, 10, 0, 1);
	                rond = new Rond(form.getX(), form.getY(), form.getCouleur(), form.getGeometrie(), 10);
	                rondService.add(rond);
	                form.setIdTable(rond.getId());
	                formRepository.save(form);
	                break;
	            case '2':
	            	form = new Form(10, 10, 1, 1);
	                rond = new Rond(form.getX(), form.getY(), form.getCouleur(), form.getGeometrie(), 10);
	                rondService.add(rond);
	                form.setIdTable(rond.getId());
	                formRepository.save(form);
	                break;
	            case '3':
	            	form = new Form(10, 10, 2, 1);
	                rond = new Rond(form.getX(), form.getY(), form.getCouleur(), form.getGeometrie(), 10);
	                rondService.add(rond);
	                form.setIdTable(rond.getId());
	                formRepository.save(form);
	                break;
	            case '4':
	            	form = new Form(10, 10, 0, 4);
	                carre = new Carre(form.getX(), form.getY(), form.getCouleur(), form.getGeometrie(), 10, 10);
	                carreService.add(carre);
	                form.setIdTable(carre.getId());
	                formRepository.save(form);
	                break;
	            case '5':
	            	form = new Form(10, 10, 1, 4);
	                carre = new Carre(form.getX(), form.getY(), form.getCouleur(), form.getGeometrie(), 10, 10);
	                carreService.add(carre);
	                form.setIdTable(carre.getId());
	                formRepository.save(form);
	                break;
	            case '6':
	            	form = new Form(10, 10, 2, 4);
	                carre = new Carre(form.getX(), form.getY(), form.getCouleur(), form.getGeometrie(), 10, 10);
	                carreService.add(carre);
	                form.setIdTable(carre.getId());
	                formRepository.save(form);
	                break;
	            case '7':
	            	form = new Form(10, 10, 0, 7);
	                triangle = new Triangle(form.getX(), form.getY(), form.getCouleur(), form.getGeometrie(), 10, 10, 10);
	                triangleService.add(triangle);
	                form.setIdTable(triangle.getId());
	                formRepository.save(form);
	                break;
	            case '8':
	            	form = new Form(10, 10, 1, 7);
	                triangle = new Triangle(form.getX(), form.getY(), form.getCouleur(), form.getGeometrie(), 10, 10, 10);
	                triangleService.add(triangle);
	                form.setIdTable(triangle.getId());
	                formRepository.save(form);
	                break;
	            case '9':
	            	form = new Form(10, 10, 2, 7);
	                triangle = new Triangle(form.getX(), form.getY(), form.getCouleur(), form.getGeometrie(), 10, 10, 10);
	                triangleService.add(triangle);
	                form.setIdTable(triangle.getId());
	                formRepository.save(form);
	                break;
	        }
    	}
    }
    
    /**
     * Met à jour les informations d'une forme géométrique existante dans la base de données en fonction de l'ID spécifié
     * et des données fournies dans le CodeDTO. Si la géométrie de la forme reste la même, les informations de la forme
     * géométrique et de l'entité associée sont mises à jour. Sinon, l'ancienne entité associée est supprimée et une nouvelle
     * entité correspondant à la nouvelle géométrie est ajoutée à la base de données.
     *
     * @param id L'ID de la forme géométrique à mettre à jour.
     * @param codeDTO Les nouvelles informations de la forme géométrique.
     */
    public void update(Long id, CodeDTO codeDTO) {
        // Recherche de l'entité existante dans la base de données en fonction de l'ID spécifié
        Form existingEntity = formRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Entity not found with ID: " + id));
        // Vérification si la géométrie de la forme reste la même
        if(existingEntity.getGeometrie() == codeDTO.getGeometrie()) {
            // Mise à jour des informations de l'entité existante et de l'entité associée en fonction de la géométrie
        	switch(existingEntity.getGeometrie()) {
	        	case 0:
	                // Mise à jour de l'entité Form
	                existingEntity.setX(codeDTO.getX());
	                existingEntity.setY(codeDTO.getY());
	                existingEntity.setCouleur(codeDTO.getCouleur());
	                // Recherche et mise à jour de l'entité Point associée
	        		Point point = pointRepository.findById(existingEntity.getIdTable()).orElse(null);
	        		point.setX(codeDTO.getX());
	        		point.setY(codeDTO.getY());
	        		point.setCouleur(codeDTO.getCouleur());
	        		pointRepository.save(point);
	        		break;
	                // Cas similaires pour les autres géométries
	        	case 1:
	                existingEntity.setX(codeDTO.getX());
	                existingEntity.setY(codeDTO.getY());
	                existingEntity.setCouleur(codeDTO.getCouleur());
	        		Rond rond = rondRepository.findById(existingEntity.getIdTable()).orElse(null);
	        		rond.setX(codeDTO.getX());
	        		rond.setY(codeDTO.getY());
	        		rond.setCouleur(codeDTO.getCouleur());
	        		rond.setRayon(codeDTO.getRayon());
	        		rondRepository.save(rond);
	        		break;
	        	case 4:
	                existingEntity.setX(codeDTO.getX());
	                existingEntity.setY(codeDTO.getY());
	                existingEntity.setCouleur(codeDTO.getCouleur());
	        		Carre carre = carreRepository.findById(existingEntity.getIdTable()).orElse(null);
	        		carre.setX(codeDTO.getX());
	        		carre.setY(codeDTO.getY());
	        		carre.setCouleur(codeDTO.getCouleur());
	        		carre.setLongueur(codeDTO.getLongueur());
	        		carre.setLargeur(codeDTO.getLargeur());
	        		carreRepository.save(carre);
	        		break;
	        	case 7:
	                existingEntity.setX(codeDTO.getX());
	                existingEntity.setY(codeDTO.getY());
	                existingEntity.setCouleur(codeDTO.getCouleur());
	        		Triangle triangle = triangleRepository.findById(existingEntity.getIdTable()).orElse(null);
	        		triangle.setX(codeDTO.getX());
	        		triangle.setY(codeDTO.getY());
	        		triangle.setCouleur(codeDTO.getCouleur());
	        		triangle.setCoteAB(codeDTO.getCoteAB());
	        		triangle.setCoteBC(codeDTO.getCoteBC());
	        		triangle.setCoteCA(codeDTO.getCoteCA());
	        		triangleRepository.save(triangle);
	        		break;
        	}
        } else {
            // Si la géométrie de la forme change, suppression de l'ancienne entité associée
            switch(existingEntity.getGeometrie()) {
            // Suppression de l'ancienne entité associée en fonction de la géométrie
    	    	case 0:
    	    		Point point = pointRepository.findById(existingEntity.getIdTable()).orElse(null);
    	            if (point != null) {
    	                pointRepository.delete(point);
    	            } else {
    	                throw new RuntimeException("Point not found with ID: " + existingEntity.getIdTable());
    	            }
    	    		break;
    	    	case 1:
    	    		Rond rond = rondRepository.findById(existingEntity.getIdTable()).orElse(null);
    	            if (rond != null) {
    	                rondRepository.delete(rond);
    	            } else {
    	                throw new RuntimeException("Rond not found with ID: " + existingEntity.getIdTable());
    	            }
    	    		break;
    	    	case 4:
    	    		Carre carre = carreRepository.findById(existingEntity.getIdTable()).orElse(null);
    	            if (carre != null) {
    	                carreRepository.delete(carre);
    	            } else {
    	                throw new RuntimeException("Carre not found with ID: " + existingEntity.getIdTable());
    	            }
    	    		break;
    	    	case 7:
    	    		Triangle triangle = triangleRepository.findById(existingEntity.getIdTable()).orElse(null);
    	            if (triangle != null) {
    	                triangleRepository.delete(triangle);
    	            } else {
    	                throw new RuntimeException("Triangle not found with ID: " + existingEntity.getIdTable());
    	            }
    	    		break;
            }
            // Création et ajout d'une nouvelle entité correspondant à la nouvelle géométrie
            switch(codeDTO.getGeometrie()) {
            // Ajout d'une nouvelle entité en fonction de la nouvelle géométrie
    	        case 0:
	                // Mise à jour de l'entité Form
	                existingEntity.setX(codeDTO.getX());
	                existingEntity.setY(codeDTO.getY());
	                existingEntity.setCouleur(codeDTO.getCouleur());
	                existingEntity.setGeometrie(codeDTO.getGeometrie());
	                // creation
    	            Point point = new Point(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getGeometrie());
    	            pointService.add(point);
    	            existingEntity.setIdTable(point.getId());
    	        	break;
    	        case 1:
	                existingEntity.setX(codeDTO.getX());
	                existingEntity.setY(codeDTO.getY());
	                existingEntity.setCouleur(codeDTO.getCouleur());
	                existingEntity.setGeometrie(codeDTO.getGeometrie());
    	            Rond rond = new Rond(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getGeometrie(), codeDTO.getRayon());
    	            rondService.add(rond);
    	            existingEntity.setIdTable(rond.getId());
    	        	break;
    	        case 4:
	                existingEntity.setX(codeDTO.getX());
	                existingEntity.setY(codeDTO.getY());
	                existingEntity.setCouleur(codeDTO.getCouleur());
	                existingEntity.setGeometrie(codeDTO.getGeometrie());
    	            Carre carre = new Carre(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getGeometrie(), codeDTO.getLongueur(), codeDTO.getLargeur());
    	            carreService.add(carre);
    	            existingEntity.setIdTable(carre.getId());
    	        	break;
    	        case 7:
	                existingEntity.setX(codeDTO.getX());
	                existingEntity.setY(codeDTO.getY());
	                existingEntity.setCouleur(codeDTO.getCouleur());
	                existingEntity.setGeometrie(codeDTO.getGeometrie());
    	            Triangle triangle = new Triangle(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getGeometrie(), codeDTO.getCoteAB(), codeDTO.getCoteBC(), codeDTO.getCoteCA());
    	            triangleService.add(triangle);
    	            existingEntity.setIdTable(triangle.getId());
    	        	break;
    	    }
            
        }
    }

    /**
     * Supprime une forme géométrique de la base de données en fonction de l'ID spécifié.
     *
     * @param index L'ID de la forme géométrique à supprimer de la base de données.
     */
    public void delete(Long index) {
        // Recherche de l'entité Form correspondante en fonction de l'ID spécifié
        Form form = formRepository.findById(index)
                .orElseThrow(() -> new RuntimeException("Form not found with ID: " + index));
        // Suppression de l'entité associée en fonction de la géométrie de la forme
        switch(form.getGeometrie()) {
        // Cas de suppression de l'entité associée en fonction de la géométrie
        	case 0:
        		Point point = pointRepository.findById(form.getIdTable()).orElse(null);
                if (point != null) {
                    pointRepository.delete(point);
                } else {
                    throw new RuntimeException("Point not found with ID: " + form.getIdTable());
                }
        		break;
        	case 1:
        		Rond rond = rondRepository.findById(form.getIdTable()).orElse(null);
                if (rond != null) {
                    rondRepository.delete(rond);
                } else {
                    throw new RuntimeException("Rond not found with ID: " + form.getIdTable());
                }
        		break;
        	case 4:
        		Carre carre = carreRepository.findById(form.getIdTable()).orElse(null);
                if (carre != null) {
                    carreRepository.delete(carre);
                } else {
                    throw new RuntimeException("Carre not found with ID: " + form.getIdTable());
                }
        		break;
        	case 7:
        		Triangle triangle = triangleRepository.findById(form.getIdTable()).orElse(null);
                if (triangle != null) {
                    triangleRepository.delete(triangle);
                } else {
                    throw new RuntimeException("Triangle not found with ID: " + form.getIdTable());
                }
        		break;
        }
        // Suppression de l'entité Form de la base de données
        formRepository.deleteById((index));
    }
    
    /**
     * Supprime toutes les données de la base de données, y compris les formes géométriques, les points, les ronds,
     * les carrés et les triangles.
     */
    public void deleteAll() {
        // Suppression de toutes les formes géométriques de la base de données
        formRepository.deleteAll();
        // Suppression de tous les points de la base de données
        pointRepository.deleteAll();
        // Suppression de tous les ronds de la base de données
        rondRepository.deleteAll();
        // Suppression de tous les carrés de la base de données
        carreRepository.deleteAll();
        // Suppression de tous les triangles de la base de données
        triangleRepository.deleteAll();
    }

    /**
     * Convertit une entité Form en un objet CodeDTO.
     * 
     * @param form L'entité Form à convertir.
     * @return Un objet CodeDTO représentant les données de l'entité Form.
     */
    private CodeDTO convertToDTO(Form form) {
        CodeDTO codeDTO = new CodeDTO();
        codeDTO.setX(form.getX());
        codeDTO.setY(form.getY());
        codeDTO.setCouleur(form.getCouleur());
        codeDTO.setGeometrie(form.getGeometrie());
        return codeDTO;
    }

    /**
     * Convertit un objet CodeDTO en une entité Form.
     * 
     * @param codeDTO L'objet CodeDTO à convertir.
     * @return Une entité Form représentée par les données de l'objet CodeDTO.
     */
    private Form convertToEntity(CodeDTO codeDTO) {
        Form codeEntity = new Form();
        codeEntity.setX(codeDTO.getX());
        codeEntity.setY(codeDTO.getY());
        codeEntity.setCouleur(codeDTO.getCouleur());
        codeEntity.setGeometrie(codeDTO.getGeometrie());
        return codeEntity;
    }

}