genres:{//protected route "authenticated user"
name
}

customer:{
name,
phone,
isGold
}

movies{
title,
numberInStock,
dailyRentalRate,
genre:embeddedSchema
}

rentals{
customer:new schema not original schema,
movie:new schema not original schema,
dateOut,
dateReturn,
rentalFee
}

for login //api/auth
for register //api/users
