# walmart-api
## API desarrollada en NodeJS y express. 

### Requisitos:

- Docker instalado

### Instrucciones de uso:

1. Descargar repositorio. <br/>
2. Verificar la URL de la BBDD, variable de entorno DATABASE_URL en el archivo Dockerfile. <br/>
3. Ingresar a la carpeta desde el terminal y ejecutar "make api-ini". Docker instalará todos los módulos necesarios y quedará arriba ejecutandose.<br/>

 *Consierar que para el presente ejemplo, se estableció un token estático para las consultas* <br/>
 <img src="/others/1.png" /><br/>


### Mas Opciones de Make:
- api-up: Levantar imágen Docker.
- api-ini: Instalar imagen y subir.
- api-reset: Reiniciar imagen.
- api-down: Bajar imágen
- api-install: Instalar imágen.

