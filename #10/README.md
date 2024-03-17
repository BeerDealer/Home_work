db.books.insertMany([{
title: "Книга 1",
description: "Животный мир",
authors: "Петя"
},
{
title: "Книга 2",
description: "Астрономи",
authors: "Андрей"
},
{
title: "Книга 3",
description: "Секреты кулинарии",
authors: "Аня"
}])

db.books.find(
{title: "Книга 1"}
)

db.books.updateOne(
{
\_id: 123,
},
{
title: "Новая книга",
description: "История",
authors: "Вася"
}

)
