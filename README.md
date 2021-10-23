# Proyecto Prisma / GraphQL

El proyecto es una implementación de las tecnologías:

- **Prisma 1**
- **GraphQL**
- **Docker**

<div  align="center"><img  src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_light_prisma_icon_130444.png" width="70"/><img  src="https://imgur.com/DX1VKtn.png"  width="70" />
<img src="https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/vertical-logo-monochromatic.png?itok=erja9lKc" width="70"/></div>

Se pretende hacer un administrador de un cine, que sea capaz de manejar compras dentro del cine, acciones de nivel administrativo, como tener un registro de los empleados dentro del establecimiento así como ser capaz de proveer datos referentes a las finanzas del mismo, teniendo en cuenta ventas y pagos a empleados .

## Levantamiento de Sistema

Requerimientos antes de levantamiento: 
- **NodeJS v.10.24.1** (necesaria para correr Prisma 1).
- **Docker** instalado en la computadora destino.

Obteniendo proyecto:
```sh
git clone https://github.com/tllr2021/melchorh-pyf-prisma
cd prisma melchorh-pyf-prisma
```

Levantando servicios:
```sh
docker-compose up -d
```

Instalando dependencias de Node:
```sh
npm i -g yarn prisma1
yarn install
```

Mandando modelos de Prisma al contenedor: 
```sh
prisma1 deploy
```

Iniciando servidor: 
```sh
yarn install
```

El último paso es dirigirnos en un navegador a localhost:4000.

## Queries

- [Queries de Usuario](#queries-de-usuarios)
-- [viewProfile](#viewcrofile)
-- [viewCardStatus](#viewcardStatus)
- [Queries de Empleados](#queries-de-empleados)
-- [viewProfileEmp](#viewprofileemp)
- [Queries de Administrador](#queries-de-administrador)
-- [cinemaFinancesBrief](#cinemafinancesbrief)
- [Más Queries de Administrador](#más-queries-de-administrador)
-- [cinemas](#cinemas)
-- [shows](#shows)
-- [movies](#movies)

## Queries de Usuarios

Para poder acceder se ocupa un **token** como parámetro, el **token** debe pertenecer al usuario.

### viewProfile

Permite a los usuarios hacer un chequeo de su información dentro de la plataforma. 

>viewProfile(token: String!): User!

El resultado de la petición será un objeto de tipo usuario.

### viewCardStatus

Permite a los usuarios hacer un chequeo de la información de su tarjeta. Funciona por ejemplo para ver el número de puntos con los que se cuenta.

>viewCardStatus(token: String!): Card!

El resultado de la petición será un objeto de tipo tarjeta.

## Queries de Empleados

### viewProfileEmp

Permite a los empleados hacer un chequeo de su información dentro de la plataforma. Para poder acceder se ocupa un **token** como parámetro, el **token** debe pertenecer al empleado.

>viewProfileEmp(token: String!): Employee!

El resultado de la petición será un objeto de tipo empleado.

  
## Queries de Administrador

### cinemaFinancesBrief

Permite al administrador consultar la información de un solo cine dentro de la base de datos. Se debe proveer como parámetro el **id de Cine** del cine que se desea consultar. Para poder acceder se ocupa un **token** como parámetro, el **token** debe pertenecer al administrador. 

>cinemaFinancesBrief( token: String!, cinemaId: ID!): String!

El resultado de la petición será un texto breve resumiendo los datos de ventas, pagos a empleados y número de empleados.


### Más Queries de Administrador

Permiten al administrador consultar la información de los objetos dentro de la base de datos. Pueden ser impuestos parámetros a cumplir para un filtro de información. Para poder acceder se ocupa un **token** como parámetro, el **token** debe pertenecer al administrador. 

### cinemas

>cinemas(token: String!): [Cinema]

El resultado de la petición será un arreglo de tipo cinema.

>cinema(token: String!): Cinema

El resultado de la petición será un objeto de tipo cinema.

### shows

>shows(token: String!): [Show]

El resultado de la petición será un arreglo de tipo show.

>show(token: String!): Show

El resultado de la petición será un objeto de tipo show.

### movies

>movies(token: String!): [Movie]

El resultado de la petición será un arreglo de tipo película.

>movie(token: String!): Movie

El resultado de la petición será un objeto de tipo película.

### products

>products(token: String!): [Product]

El resultado de la petición será un arreglo de tipo producto.

>product(token: String!): Product

El resultado de la petición será un objeto de tipo producto.


## Mutations

- [Mutations de Usuario](#mutations-de-usuarios)
-- [signup](#signup)
-- [login](#login)
-- [updatePassword](#updatepassword)
-- [updateMyCard](#updatemycard)
-- [generatePurchase](#generatepurchase)
- [Mutations de Empleados](#mutations-de-empleados)
-- [loginEmp](#loginemp)
-- [askSalary](#asksalary)
- [Mutations de Administrador](#mutations-de-administrador)
-- [signupEmp](#signupemp)
-- [changeEmpStatus](#changeempstatus)
-- [changeEmpInfo](#changeempinfo)
-- [assignEmpToCinema](#assignemptocinema)
-- [createCinema](#createcinema)
-- [cancelCard](#cancelcard)
-- [generateProduct](#generateproduct)
-- [editProduct](#editproduct)
-- [removeProduct](#removeproduct)
-- [generateMovie](#generatemovie)
-- [editMovie](#editmovie)
-- [generateShow](#generateshow)
-- [removeShow](#removeshow)


## Mutations de Usuarios

### signup

Permite al usuario crear un perfil dentro de la plataforma.

>signup(email: String!, password: String!, name: String!): AuthPayload!

El resultado de la mutación es su token de autenticación y su usuario.

### login

Permite al usuario iniciar sesión en la plataforma para hacer uso de sus Queries, comprar boletos de cine o productos de la tienda del cine.

>login(email: String!, password: String!): AuthPayload!

El resultado de la mutación es su token de autenticación y su usuario.

>Para poder hacer uso de las siguientes Queries se ocupa un **token** como parámetro, y la nueva contraseña. El **token** debe pertenecer al usuario.

### updatePassword

Permite al usuario cambiar su contraseña. 

>updatePassword(data: AuthChange!): User!

El resultado de la mutación es su usuario.

### updateMyCard

Permite al usuario cambiar de tarjeta con un nuevo código de tarjeta.

>updateMyCard(data: CardUpdateInput!): User!

El resultado de la mutación es su usuario.
  
### generatePurchase

Permite al usuario comprar boletos para una función o productos en la tienda del cine. El usuario puede usar su **token** para añadir puntos a su tarjeta o usarlos para sus compras.

>generatePurchase(data: generatePurchaseInput!): generatePurchaseAnswer!

El resultado de la mutación es el id de su compra, su compra y un mensaje.

## Mutations de Empleados

### loginEmp

Permite al empleado iniciar sesión dentro de la plataforma para hacer uso de sus Queries.

>loginEmp(empNum: Int!, password: String!): AuthPayloadEmp!

El resultado de la mutación es su token de autenticación y su perfil de empleado.

### askSalary

Permite al empleado pedir el salario de sus días trabajados. Para poder hacer uso de la función se ocupa un **token** como parámetro. El **token** debe pertenecer al empleado.

>askSalary(token: String!): askSalaryAnswer!

El resultado de la mutación es su perfil de empleado y un mensaje.

## Mutations de Administrador

Para poder hacer uso de las Queries se ocupa un **token** como parámetro. El **token** debe pertenecer al administrador.

### signupEmp

Permite al administrador registrar a un nuevo empleado a la plataforma. parámetro. 

>signupEmp(token: String!, email: String!, password: String!, name: String!, area: String!, status: String!, empNum: Int!): AuthPayloadEmp!

### changeEmpStatus

Permite al administrador cambiar el status de un empleado dentro la plataforma. 

>changeEmpStatus(token: String!, status: String, empNum: Int!): Employee!

El resultado de la mutación es un objeto de tipo empleado.

### changeEmpInfo

Permite al administrador cambiar datos como el área del empleado así como su contraseña. 

>changeEmpInfo(token: String!, password: String, area: String, empNum: Int!): Employee!

El resultado de la mutación es un objeto de tipo empleado.

### assignEmpToCinema

Permite al administrador asignar a un empleado a un cine en concreto. 

>assignEmpToCinema(token: String!, empNum: Int!, cinemaId: ID!): Cinema!

 El resultado de la mutación es un objeto de tipo cine.

### createCinema

Permite al administrador crear un cine.

>createCinema(token: String!, data: CinemaCreateInput!): Cinema!

El resultado de la mutación es un objeto de tipo cine.

### cancelCard

Permite al administrador cancelar tarjetas.

>cancelCard(token: String!, cardID: ID!): Card!

 El resultado de la mutación es un objeto de tipo tarjeta.

### generateProduct

Permite al administrador añadir productos a la tienda del cine.

>generateProduct(token: String!, data: ProductCreateInput!): Product!

El resultado de la mutación es un objeto de tipo producto.

### editProduct

Permite al administrador editar los datos de un producto de la tienda del cine.

>editProduct(token: String!, data: ProductUpdateInput!): Product!

El resultado de la mutación es un objeto de tipo producto.


### removeProduct

Permite al administrador eliminar productos de la tienda del cine.

>removeProduct(token: String!, productId: ID!): Product!

 El resultado de la mutación es un objeto de tipo producto.

### generateMovie

Permite al administrador poner una película en cartelera.

>generateMovie(token: String!, data: MovieCreateInput!): Movie!

El resultado de la mutación es un objeto de tipo película.

### editMovie

Permite al administrador editar los datos de una película.

>editMovie(token: String!, data: MovieUpdateInput!): Movie!

El resultado de la mutación es un objeto de tipo película.

### removeProduct

Permite al administrador eliminar una película de la cartelera.

>removeMovie(token: String!, cinemaId: ID!): Movie!

 El resultado de la mutación es un objeto de tipo película.

### generateShow

Permite al administrador generar una función de cine.

>generateShow(token: String!, data: generateShowInput!): generateShowAnswer!

El resultado de la mutación es un objeto de tipo función.

### removeShow

Permite al administrador eliminar una función de cine.

removeShow(token: String!, showId: ID!): Show!

El resultado de la mutación es un objeto de tipo función.