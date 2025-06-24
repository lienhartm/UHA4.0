<!-- index.php -->
<?php //include('header.php'); ?>
<!DOCTYPE html>
        <html>
          <!-- head -->
          <head>
            <title>BasketBall</title>
            <!-- metadata --><!--
            <meta name='authors' content='LM - LIENHART MICHAEL'>
            <meta name='description' content='Basketball Web Site'>
            <meta name='keywords' content='BASKETBALL FIL ROUGE UHA'>
            <meta name='robots' content='Basketball equipes joueurs'>
            <meta name='viewport' content='width=device-width, initial-scale=1'>-->
            <!--  -->
            <!--<meta http-equiv='content-security-policy' content='' />-->
            <!--<meta http-equiv='content-type' content='text/html;charset=UTF-8'>-->
            <!--<meta http-equiv='default-style' content='style/style.css'>-->
            <!--<meta http-equiv='refresh' content='60'>-->
            <!-- css -->
            <link href='style/style.css' rel='stylesheet'>
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
            <!-- script -->
            <!--<script src='https://kit.fontawesome.com/b67eda16b6.js' crossorigin='anonymous'></script>-->
          </head>
          <!-- body -->
          <body>
            <!-- header -->
            <header>
              <p class='titre' id='titre'>BasketBall</p>
              <!-- navigation -->
              <nav>
                <a href='index.php' class='nav'>BasketBall</a>
                <a href='index.php?action=listEquipe' class='nav'>Equipes</a>
                <a href='index.php?action=listJoueur' class='nav'>Joueurs</a>
              </nav>
            </header>
            <!-- main -->
            <main>
            <?= $contenu ?>
            </main>
            <!-- footer -->
            <footer>
            <p class='titre footer'>BasketBall</p>
            <p><a href='#titre' class='footer'>BasketBall</a></p>
            <p><a href='index.php?action=listEquipe' class='footer'>Equipes</a></p>
            <p><a href='index.php?action=listJoueur' class='footer'>Joueurs</a></p>
            <p><a href='form/contact.html' class='footer'>Contactez-nous</a></p>
            <p class='info-line'>
                <a href='#' class='info'>LM LIENHART Michaël</a>
                - 
                <a href='#' class='info'>UHA4.0</a>
                - 
                <a href='#' class='info'>Fil Rouge 4.0.1</a>
                - 
                <a href='#' class='info'>BasketBall</a>
            </p>
            </footer>
            </body>
            </html>
<?php //include('footer.php'); ?>