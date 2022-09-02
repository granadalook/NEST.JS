# NEST.JS

APP OFICIAL https://nestjs.com/

DOCUMENTACION -- https://docs.nestjs.com/exception-filters
https://github.com/typestack/class-validator

Nest.js CRUD API

# INSTALACION DE NEST GLOBAL

1: TENER NODE INSTALADO
2: COMANDO --- npm i -g @nestjs/cli
3: VERSION --- nest --version
4: AYUDA --- nest --help
5: IFORMACION --- nest info

# CREAR NUEVO PROYECTO

1: COMANDO --- nest new nombreProyecto
2: MANEJADOR DE PAQUETES --- npm --- preferiblemente

# CORRER EL PROYECTO

1: COMANDO --- npm run start
2: VER --- http://localhost:3000/
3: COMANDO DESARROLLO --- npm run start:dev

# DECORADORES

HTTP-- @Get()
HTTP-- @Post()
HTTP-- @HttpCode

PARAMETROS--- @Param()
PARAMETROS--- @Body()

QUERY PARAMS --- @Query()

# COMANDOS

1:CREAR CONTROLLER --- nest g co NOMBRECONTROLADOR
2:CREAR SERVICIO --- nest g s NOMBRESERVICIO
3: CREAR PIPE --- nest g pipe NOMBREPIPE
3: VALIDACIONES --- npm i class-validator class-transformer --- npm i @nestjs/mapped-types
