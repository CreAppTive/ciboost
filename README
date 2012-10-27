Ciboost

Ciboost es sistema conformado por una aplicacion para dispositivos moviles desarrollada en appcelerator y un sistema aministrador de comercios, la aplicacion para smartphones ofrece::
Geolocalizacion del usuario/cliente
Ubicacion de comercios de comida con servicio a domicilio cercanos al cliente
Solicitud de ordenes de comida
Lector de QRCode como validador de pagos
Transacciones seguras por back-end
El sistema administrador de comercios ofrece:
Alta de nuevos comercios
Edicion del menu de comercios
Analiticas financieras y de bussines intelligence 

Introduccion al funcionamiento
Se ha utilizado Appcelerator como framework de desarrollo para la aplicacion movil, como compilador y debugger se ha utilizado el SDK de iOS. Para el alojamiento de los datos descriptivos del comercio y del cliente se utilizara un back-end hecho a la medida el cual registrara tambien la actividad del comportamiento del usuario. Para las transacciones se utiliza la API simulada de La Caixa, la cual brinda una emulacion de los servicios financieros con los que cuenta una entidad financiera.

Dentro de la aplicacion a partir de la configuracion de un cliente La Caixa, se podra acceder a las cuentas pertenecientes a dicho cliente para su uso en las transacciones de pago

El proceso de funcionamiento es el siguiente:
El usuario accede a la aplicacion y automaticamente se detecta su geolicalizacion
Basado en el punto anterior se muestra un listado de comercios cercanos al cliente donde puede hacer el pedido a domicilio de la comida.
Segun la eleccion del usuario del comercio, se mostraran los platillos que conforman el menu de dicho comercio, con su descripcion, precio y fotografia.
El cliente agrega a la orden los platillos que guste y se muestra en un bottom bar el subtotal de la orden mencionada.
Cuando termine de asignar platillos a la orden se liberara el pedido hacia el comercio
El comercio recibe la solicitud y envia el pedido acompañado del ticket de cobro
El cliente recibe el pedido y escanea el codigo QR impreso en el ticket de cobro 
Se valida el identificador de la orden a traves del backend para liberar el pago.


Orden de modulos
Bases de datos
BackEnd del sistema manejador de comercios
Geolocalizacion
List Scrolling
Generacion de ordenes
Lector de QRCode
Validacion de transaccion
Calificacion de servicio (En desarrollo)
Historial de compras (En desarrollo)
Comercios favoritos (En desarrollo)
Cupones de descuento (En desarrollo)
Logros por actividad de uso en la aplicacion (En desarrollo)

USOS DE API LA CAIXA
Los servicios utilizados de la api son:
Registro de clientes
Registro de comercios
Creacion de cuentas para clientes
Creacion de cuentas para comercios
Adicion de tarjetas para cuentas de clientes
Consulta de tarjetas incluidas en la cuenta de clientes
Pagos (GET - POST)

Bases de datos y Back End 

Para el manejo de Bases de datos se utiliza MySQL apoyado por un backend en PHP que soportara el sistema administrador de comercios.

Orden de modulos
Alta de comercios
Edicion de comercios
Alta de menu para cada comercio
Edicion del menu para cada comercio
Indicadores financieros de ingreso al comercio 
Indicadores demograficos de la venta
Datos de soporte para la toma de decisiones.

