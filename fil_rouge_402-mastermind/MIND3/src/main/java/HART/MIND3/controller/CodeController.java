package HART.MIND3.controller;

import java.util.List;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import HART.MIND3.entity.Form;
import HART.MIND3.service.CodeService;
import HART.MIND3.service.FormService;

@Controller
@RequestMapping("/app")
public class CodeController {

    // Injection des services pour l'accès aux données
    
    @Autowired
    private FormService formService;
    
    @Autowired
    private CodeService codeService;

    // Suppression de cette variable inutilisée
    //String code = "";
    
    // Ajout de l'annotation @ResponseBody pour renvoyer directement une chaîne de caractères
    @GetMapping("/factory")
    public String getFactory() {
        return "Factory";
    }
    
    // Modification des méthodes pour renvoyer directement des objets ou des listes d'objets, pas des chaînes de caractères
    @GetMapping("/code")
    @ResponseBody
    public String getAllCodes() {
        return codeService.getAllCodes();
    }
    
    @GetMapping("/code/{index}")
    @ResponseBody
    public String getCodesById(@PathVariable int index) {
        return codeService.getCodesById(index);
    }

    @GetMapping("/code/generateur")
    @ResponseBody
    public RedirectView getGenerateur() {
        codeService.getGenerateur();
        return new RedirectView("/app/factory");
    }

    @GetMapping("/formes/{index}")
    @ResponseBody
    public Form getFormes(@PathVariable Long index) {
        return formService.getById(index);
    }

    @GetMapping("/formes")
    @ResponseBody
    public List<CodeDTO> getAllFormes() {
        return formService.getAll();
    }

    @PostMapping("/formes")
    @ResponseBody
    public RedirectView addForme(@RequestParam("nb1") String nb1 , @RequestParam("nb2") String nb2 , @RequestParam("nb3") String nb3 , @RequestParam("nb4") String nb4 ) {
    	String code = nb1 + nb2 + nb3 + nb4;
    	formService.add(code);
        return new RedirectView("/app/factory");
    }

    @DeleteMapping("/formes/{index}")
    public void deleteForme(@PathVariable Long index) {
        formService.delete(index);
    }
    
    @DeleteMapping("/formes")
    public void deleteAll() {
        formService.deleteAll();
    }

    @PutMapping("/formes/{index}")
    public void updateForme(@PathVariable Long index, @RequestBody CodeDTO codeDTO) {
        formService.update(index, codeDTO);
    }
}
