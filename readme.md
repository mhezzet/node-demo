demo node api for renting movies inventory

routes :

GET :/api/genres
GET :/api/genres/:id
POST:/api/genres "protected route:authenticated registered users only"
PUT :/api/genres/:id "protected route:authenticated registered users only"
DELET :/api/genres/:id "protected route:authenticated and admin users only"

\_\_

POST: /api/auth "for login"
POST: /api/users "for register a new user"
GET : /api/users/me "for READ current user information"

\_\_

GET,POST for /api/rentals "for renting process"
CRUD oprations for /api/movies and /api/customers
