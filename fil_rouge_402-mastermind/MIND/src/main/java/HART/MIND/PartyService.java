package HART.MIND;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartyService {

	@Autowired
	private PartyRepository partyRepository;
	
	public void addPartyEntity(PartyEntity partyEntity) {
		partyRepository.save(partyEntity);
	}
	
}