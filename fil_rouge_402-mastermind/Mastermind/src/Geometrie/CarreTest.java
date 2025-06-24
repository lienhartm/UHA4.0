package Geometrie;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class CarreTest {

	@Test
	void testCarre() {
		//Carre carre = new Carre(10, 10, 2, 10, 10);
	}

	@Test
	void testSetLongueur() {
		Carre carre = new Carre(10, 10, 2, 10, 10);
		int cote = 10;
		carre.setLongueur(10);
		assertEquals(carre.getLongueur(), cote);
	}

	@Test
	void testSetLargeur() {
		Carre carre = new Carre(10, 10, 2, 10, 10);
		int cote = 10;
		carre.setLargeur(10);
		assertEquals(carre.getLargeur(), cote);
	}

	@Test
	void testGetLongueur() {
		Carre carre = new Carre(10,10, 2, 10,10);
		int cote = 10;
		assertEquals(carre.getLongueur(), cote);
	}

	@Test
	void testGetLargeur() {
		Carre carre = new Carre(10,10, 2, 10,10);
		int cote = 10;
		assertEquals(carre.getLargeur(), cote);
	}

	@Test
	void testPerimetre() {
		Carre carre = new Carre(10,10, 2, 10,10);
		int perimetre = 40;
		double autoPerimetre = carre.perimetre();
		assertEquals(autoPerimetre, perimetre);
	}

	@Test
	void testSuperficie() {
		Carre carre = new Carre(10,10, 2, 10,10);
		int superficie = 100;
		double autoSuperficie = carre.superficie();
		assertEquals(autoSuperficie, superficie);
	}

}
