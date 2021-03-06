# Pension App Frontend

Η εφαρμογή αυτή αναπτύχθηκε στα πλαίσια της εργασίας του μαθήματος DevOps
του Χαροκοπείου Πανεπιστημίου Αθηνών, για εκπαιδευτικούς σκοπούς.

Το σύστημα επιτρέπει στον πολίτη να υποβάλλει ένα αίτημα σύνταξης,
ώστε έπειτα να μπορεί να εγκριθεί ή να απορριφθεί από τους διαχειριστές του συστήματος.

Το συγκεκρίμενο  repository αφόρα το frontend δηλαδή το UI με το οποίο
αλληλεπιδρά ο χρήστης με την πλατφόρμα.

## Εγκατάσταση

Το project περιλαμβάνει k8s manifests για την εγκατάσταση του backend σε cluster στον φάκελο `/k8s`.
Επίσης, μπορεί κάποιος να χρησιμοποιήσει το docker-compose αρχείο που είναι διαθέσιμο [εδώ](https://github.com/echrysanthakopou/pensionapp-deployment/blob/main/docker-compose.yaml).
Θα εγκαταστήσει όλη την εφαρμογή.

### Μεταβλητές Περιβάλλοντος

- `REACT_APP_BACKEND_URL`: Το base url του backend.

