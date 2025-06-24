package HART.MIND2.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import HART.MIND2.Classe.*;

@RestController
@RequestMapping("/formes")
public class CodeController {
	//public int geometrie;	

    //@Autowired
    //private HART.MIND2.Classe.Code code;
    

    private Map<Integer, List<Form>> mapFormes = new HashMap<>();

    // GET /formes
    @GetMapping
    public Map<Integer, List<Form>> getAll() {
        return mapFormes;
    }
    
    @GetMapping("/{index}")
    public List<Form> getMapByIndex(@PathVariable int index) {
        return mapFormes.getOrDefault(index, new ArrayList<>());
    }
    
    @GetMapping("/{indexMap}/{indexForm}")
    public Form getFormesByIdInMapById(@PathVariable int indexMap, @PathVariable int indexForm) {
        // Vérifiez si la map contient l'index spécifié
        if (mapFormes.containsKey(indexMap)) {
            List<Form> forms = mapFormes.get(indexMap);
            // Vérifiez si la liste contient l'index de la forme spécifiée
            if (indexForm >= 0 && indexForm < forms.size()) {
                return forms.get(indexForm);
            }
        }
        return null; // Retourne null si l'index spécifié n'est pas valide ou si la forme n'est pas présente dans la map
    }
    
    @PostMapping("{index}/")
    public void addForme(@PathVariable int index, @RequestBody CodeDTO codeDTO) {
        // Récupérer la liste de formes pour l'index spécifié dans la map
        List<Form> listeFormes = mapFormes.getOrDefault(index, new ArrayList<>());

        // Ajouter la nouvelle forme à la liste
        switch(codeDTO.getGeometrie()) {
            case 1:
                listeFormes.add(new Rond(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getRayon()));
                break;
            case 2:
                listeFormes.add(new Carre(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getLongueur(), codeDTO.getLargeur()));
                break;
            case 3:
                listeFormes.add(new Triangle(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getCoteAB(), codeDTO.getCoteBC(), codeDTO.getCoteCA()));
                break;
        }

        // Mettre à jour la map avec la nouvelle liste de formes
        mapFormes.put(index, listeFormes);
    }

    

    // DELETE
    @DeleteMapping
    public void deleteAll() {
        mapFormes.clear(); // Efface toutes les entrées de la carte
    }

    
    @DeleteMapping("/{indexMap}")
    public void deleteMapById(@PathVariable int indexMap) {
        mapFormes.remove(indexMap); // Supprime la carte correspondant à l'index spécifié
    }

    
    @DeleteMapping("/{indexMap}/{indexForm}")
    public void deleteFormByIdInMapById(@PathVariable int indexMap, @PathVariable int indexForm) {
        if (mapFormes.containsKey(indexMap)) {
            List<Form> forms = mapFormes.get(indexMap);
            // Vérifiez si la liste contient l'index de la forme spécifiée
            if (indexForm >= 0 && indexForm < forms.size()) {
                forms.remove(indexForm); // Supprime la forme correspondant à l'index spécifié dans la carte
            }
        }
    }

    
    //
    @PutMapping("/{indexMap}/{indexForm}")
    public void updateFormeByIdInMapById(@PathVariable int indexMap, @PathVariable int indexForm, @RequestBody CodeDTO codeDTO) {
        if (mapFormes.containsKey(indexMap)) {
            List<Form> forms = mapFormes.get(indexForm);
            if (forms != null && indexForm < forms.size()) {
                switch (codeDTO.getGeometrie()) {
                    case 1:
                        Rond rond = new Rond(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getRayon());
                        forms.set(indexForm, rond);
                        break;
                    case 2:
                        Carre carre = new Carre(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getLongueur(), codeDTO.getLargeur());
                        forms.set(indexForm, carre);
                        break;
                    case 3:
                        Triangle triangle = new Triangle(codeDTO.getX(), codeDTO.getY(), codeDTO.getCouleur(), codeDTO.getCoteAB(), codeDTO.getCoteBC(), codeDTO.getCoteCA());
                        forms.set(indexForm, triangle);
                        break;
                    default:
                        // Gérer les autres cas si nécessaire
                        break;
                }
            }
        }
    }

    
    
}
