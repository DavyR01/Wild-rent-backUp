# Reste à faire

✅ Done ❌ Not done 🛠️ In progress

## Axes d'améliorations et Correctifs : ✅

1. 🛠️ Intégrer toutes les données sensibles dans des variables d'environnements :
   - docker-compose.yml (POSTGRES_PASSWORD) du service db. Intégrer un fichier.env et les charger dans le service.
   - backend\src\config\datasource.ts

```
db:
  image: postgres
  restart: always
  ports:
    - "5434:5432"
  environment:
    POSTGRES_USER: ${POSTGRES_USER}
    POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    POSTGRES_DB: postgres
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -d postgres -U ${POSTGRES_USER}"]
    interval: 10s
    timeout: 5s
    retries: 20
  volumes:
    - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    - pgdata_new1:/var/lib/postgresql/data
```

2. ❌ Pour la database, créer un utilisateur et ne pas utiliser root pour la gestion du SGBDR (Modifier le service db du docker-compose.yml en rajoutant des scripts d'initialisation).
3. ✅ Mettre à jour toutes les versions de dépendances des packages.json
4. ✅ Remplacer les variables dynamiques et les intégrer dans des fichiers d'environnements pour plus de flexibilité pour le passage d'un mode à un autre.

5) 🛠️ Réintégrer l'exposition des ports des services directement à partir du fichier `docker-compose.prod` ?? Ou laisser gérer le reverse proxy nginx ?? S'interroger pour db car actuellement dans la configuration, la base de données db n'est pas exposé au port 5432.
6) ❌ Lors de la déconnexion de l'utilisateur, le rediriger vers la route /login.
7) ❌ Après l'ajout d'un article, faire un refetch des articles car le nouvel article ne s'affiche pas directement lorsque l'on se rend dans "Tous les articles" `(route /products)`. Contraint de se rendre sur la page d'accueil `(route "/")` ou de devoir recharger la page pour voir le nouvel article.
8) ✅ Corriger l'affichage de l'image d'un nouvel article dans `/backoffice/productslist`.
9) ❌ Corriger l'édition d'un article à partir de la route `/backoffice/productslist`.
10) Regarder les secrets de DOCKERHUB et configurer sur mon espace DockerHub.
```
   username: ${{ secrets.DOCKERHUB_USERNAME }}
   password: ${{ secrets.DOCKERHUB_TOKEN }}
```
11) 