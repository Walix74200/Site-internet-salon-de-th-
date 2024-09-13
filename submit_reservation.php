<?php
// Vérifie si la requête est de type POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $guests = intval($_POST['guests']);
    $time = htmlspecialchars($_POST['time']);
    $preferences = htmlspecialchars($_POST['preferences']);

    // Valider l'adresse e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Adresse email non valide.";
        exit;
    }

    // Valider le nombre de personnes (doit être compris entre 1 et 10)
    if ($guests < 1 || $guests > 10) {
        echo "Le nombre de personnes doit être compris entre 1 et 10.";
        exit;
    }

    // Préparer les données de la réservation à enregistrer
    $reservation_data = "Nom: $name, Email: $email, Nombre de personnes: $guests, Heure: $time, Préférences: $preferences\n";

    // Sauvegarder la réservation dans un fichier texte (reservations.txt)
    $file = fopen("reservations.txt", "a");
    if ($file) {
        fwrite($file, $reservation_data);
        fclose($file);
    } else {
        echo "Erreur lors de la sauvegarde de la réservation.";
        exit;
    }

    // Redirection vers une page de confirmation après soumission
    header("Location: confirmation.html");
    exit();
}
?>
