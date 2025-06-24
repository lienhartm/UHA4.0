<!-- newsletter.php -->
<?php

require_once "../dao.php";

class Newsletter {

    public function abonement() {

        $pdo = new DAO();

        $nom = $_POST['nom'];
        $courriel = $_POST['courriel'];

        $requete = "INSER TO courriel(nom, courriel) VALUES(:nom, :courriel)";

        $data = [':nom' => $nom, ':courriel' => $courriel];

        $newsAbonnement = $pdo->executeReuest($requete, $data);

        echo "Merci de vous etre enregistre pour recevoir la newsletter";

        $message = "<p>Thank you $nom for your subscrib to the newsletter
        <br>This email confirm this on basketball site!</p>";

        $nom = $_POST['nom'];
        $to = $_POST['courriel'];
        $subject = "Newsletter BasketBall";
        
        $newsletter = "
        <html>
            <head>
                <title>Newsletter BasketBall</title>
                <style>
                    .index {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 800px;
                        flex-direction: column;
                    }
                    .titre_index{
                        background-color: chocolate;
                        font-weight: 600;
                        width: 600px;
                        padding: 10px;
                        border-radius: 15px 50px 50px 15px;
                        font-size: 76px;
                        text-align: left;
                    }
                    .titre_index:after {
                        padding: 20px;
                        content: '\1F3C0';
                        vertical-align: middle;
                        position: relative;
                        font-size: 76px;
                    }
                    .page_index {
                        text-align: center;
                        width: 600px;
                        border-radius: 15px 50px;
                        padding: 50px;
                        background-color: #333;
                        color: #fff;
                        }
                    i {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <section class='index'>
                    <div class='page_index'>
                        <h3 class='titre_index' id='titre' >BasketBall</h3>
                        <i>Descriptions des 	&eacute;quipes et joueurs</i>
                    </div>
                </section>
                <?= $message ?>
            </body>
        </html>
        ";
        
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        
        // More headers
        $headers .= 'From: <webmaster@example.com>' . "\r\n";
        $headers .= 'Cc: myboss@example.com' . "\r\n";
        
        mail($to,$subject,$newsletter,$headers);

        echo "A email to confirm your subscribt as been transceived";

        // redirection page de garde

    }

}

?>

