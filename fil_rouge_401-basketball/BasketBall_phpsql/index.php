<!-- index.php -->
<?php include('header.php'); ?>

      <section class='index'>
        <div class='page_index'>
          <i class='fas fa-basketball-ball'></i>
          <h3>BasketBall</h3>
          <i>Descriptions des équipes et joueurs</i>
            <form name='form' method='post' action='newsletter.php' >
            <fieldset>
                <br>
                <legend>Pour les nouvelles :</legend>
                <label for='nom'>Nom :</label>
                <input type='text' id='nom' name='nom' value='nom...' required>
                <br>
                <label for='courriel'>Courriel :</label>
                <input type='email' id='courriel' name='courriel' value='courriel@email...' required>
                <br>
                <input type='submit' class='submit' value='Inscris!'>
                <br>
            </fieldset>
          </form>
        </div>
      </section>
<?php include('footer.php'); ?>
