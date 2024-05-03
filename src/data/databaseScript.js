// Crear una base de datos llamada 'store'
use store

// Colección de productos
db.createCollection("products")

// Insertar algunos productos de ejemplo
db.products.insertMany([
  {
    name: "Camiseta",
    description: "Camiseta de algodón",
    price: 15.99,
    category: "Ropa"
  },
  {
    name: "Pantalones",
    description: "Pantalones vaqueros",
    price: 29.99,
    category: "Ropa"
  },
  {
    name: "Zapatillas",
    description: "Zapatillas deportivas",
    price: 49.99,
    category: "Calzado"
  }
])

// Colección de usuarios
db.createCollection("users")

// Insertar algunos usuarios de ejemplo con productos comprados
db.users.insertMany([
  {
    name: "Juan",
    email: "juan@example.com",
    bought_products: [
      {
        product_id: ObjectId("607edf2b8dc2df56a46ea3d0"), // ID de la camiseta
        quantity: 2
      },
      {
        product_id: ObjectId("607edf2b8dc2df56a46ea3d1"), // ID de los pantalones
        quantity: 1
      }
    ]
  },
  {
    name: "María",
    email: "maria@example.com",
    bought_products: [
      {
        product_id: ObjectId("607edf2b8dc2df56a46ea3d2"), // ID de las zapatillas
        quantity: 1
      }
    ]
  }
])
