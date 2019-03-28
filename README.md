# Read Me

Play is an API that serves and organizes favorite songs and playlists.  It is hosted on heroku at https://turing-play-music.herokuapp.com/

# SCHEMA

<img width="605" alt="Screen Shot 2019-03-19 at 1 11 11 PM" src="https://user-images.githubusercontent.com/42418816/55170309-ee090680-513b-11e9-8a0e-84603d53ad16.png">


# It responds to the following interactions.

# Favorites 
'GET /api/v1/favorites'

This displays all the favorited songs

<img width="557" alt="Screen Shot 2019-03-28 at 7 29 31 AM" src="https://user-images.githubusercontent.com/42418816/55169923-3e339900-513b-11e9-9977-58e049c2d0e2.png">

'GET /api/v1/favorites/:id'

This displays a single favorite by :id

<img width="894" alt="Screen Shot 2019-03-28 at 9 27 39 AM" src="https://user-images.githubusercontent.com/42418816/55170215-c74ad000-513b-11e9-9e01-90a3471c22a5.png">

'PUT /api/v1/favorites/:id'

This updates a favorite, and returns the id associated with the favorite.

<img width="942" alt="Screen Shot 2019-03-28 at 9 31 06 AM" src="https://user-images.githubusercontent.com/42418816/55170479-40e2be00-513c-11e9-9040-be1a13cde27e.png">

'POST /api/v1/favorites'
This adds a favorite to the database and returns its newly create id.

<img width="968" alt="Screen Shot 2019-03-28 at 9 36 18 AM" src="https://user-images.githubusercontent.com/42418816/55170898-ff9ede00-513c-11e9-98e1-a73698059395.png">

'DELETE /api/v1/favorites/:id'

This deletes a favorite and returns a 204 no content.

<img width="949" alt="Screen Shot 2019-03-28 at 9 38 56 AM" src="https://user-images.githubusercontent.com/42418816/55171069-5a383a00-513d-11e9-9683-2994a48cf0f8.png">


# Playlists 

'GET /api/v1/playlists/'

This displays all the playlists and their respective favorites

<img width="627" alt="Screen Shot 2019-03-28 at 7 29 47 AM" src="https://user-images.githubusercontent.com/42418816/55169932-44c21080-513b-11e9-8ea1-34a9cd442d77.png">

'GET /api/v1/playlists/:id'

This displays a single playlists and its respective favorites

<img width="927" alt="Screen Shot 2019-03-28 at 9 26 23 AM" src="https://user-images.githubusercontent.com/42418816/55170099-979bc800-513b-11e9-889a-6807d9130599.png">

'POST /api/v1/playlists/:id/favorites/:id'

This adds a favorited song to a playlist

<img width="928" alt="Screen Shot 2019-03-28 at 9 30 12 AM" src="https://user-images.githubusercontent.com/42418816/55170414-1ee93b80-513c-11e9-9163-d620b29c239d.png">


'Delete /api/v1/playlists/:id/favorites/:id'

This deletes a favorited song from a playlist

<img width="921" alt="Screen Shot 2019-03-28 at 9 29 39 AM" src="https://user-images.githubusercontent.com/42418816/55170383-0a0ca800-513c-11e9-94a5-a716e3dee0aa.png">

# Technologies 
Javascript 
Kenx
Express 
Travis CI
Webpack


# Created By Daniel Briechle & Justin Mauldin


