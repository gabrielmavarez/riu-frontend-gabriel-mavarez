# Superhero App

Prueba técnica par MinData - Gabriel Mavarez

## Instalación local

1. Clonar el repositorio: `git clone git https://github.com/gabrielmavarez/riu-frontend-gabriel-mavarez.git`
2. Instalar dependencias: `npm install`
3. Ejecutar: `ng serve`

## Uso con Docker

1. Construir la imagen: `docker build -t superhero-app:latest .`
2. Ejecutar el contenedor: `docker run -d -p 8080:80 superhero-app:latest`
3. Abrir en el navegador: `http://localhost:8080`

## Uso del Componente

1. Para buscar superhéroe, ingresar el nombre en el input superior, debajo de "Buscar superhéroe por nombre:".
2. Para editar superhéroe, hacer click en el ícono de lapiz. Esto abrirá una ventana con los campos "Nombre", "Superpoder" y "Editorial".
    2.1. Se pueden modificar los campos de cada superhéroe. Para guardar cambios, hacer click en el botón "Guardar".
    2.2. Para no editar ningún campo, hacer click en el botón "Cancelar".
3. Para eliminar superhéroe, hacer click en el ícono de papelera. Esto abrirá una confirmación del navegador.
    3.1. Para confirmar eliminación, hacer click en "Ok".
    3.2. Para cancelar eliminación, hacer click en "Cancelar".
4. Para visualizar superhéroes, hacer uso de los botones de navegación.
    4.1. Al hacer click en el botón enumerado, se muestran los superhéroes de esa página.
    4.2. El botón para ir a la primera página se habilita a partir de la página "2", sirve para ir de vuelta a la página "1".
    4.3. El botón para ir a la última página lleva a la última página con datos de superhéroes.
5. Para agregar superhéroe, utilizar el botón "Añadir Héroe", ubicado en la esquina superior derecha. Esto abrirá una ventana con los campos "Nombre", "Superpoder" y "Editorial".
    5.1. Se pueden añadir los campos del superhéroe. Para guardar cambios, hacer click en el botón "Guardar".
    5.2. Para agregar superhéroe a la base de datos, hacer click en el botón "Cancelar".
6. Para simular pantalla de carga, utilizar el botón "Simular Carga", ubicado en la esquina superior derecha.