package HART.MIND;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {

	@Autowired
	private GameRepository gameRepository;
	
	public void addGameEntity(GameEntity gameEntity) {
		gameRepository.save(gameEntity);
	}
	
}
