# ReadMe of Power Puff Games 
---

## Aclaraciones generales 
**¡¡¡¡¡PARA CORRER LA PAGINA CORRECTAMENTE!!!!!**
Para poder usar la página correctamente deberá poner a "correr" tanto el **backend** como el **frontend**. Para esto usted deberá: 
1. Abrir la terminal de preferencia (recomendamos VSCode por su facilidad)
2. Estando en la ruta del **backend** hacer ``npm start``
3. En otra terminal, estando en la ruta del **fronted** hacer ``npm start`` 

### Para instalar todas las dependencias usadas en este proyecto ... 
Recuerde que si quiere instalar todas las dependencias usadas en el proyecto, deberá usar el comando ```npm i``` (**con Node ya instalado**) tanto en el **backend** como en el **frontend**. 

En caso de no funcionar, deberá instalar en el **backend**
- **Node**. Aquí puede seguir la instalación paso a paso 
	https://nodejs.org/es/download/package-manager/
- **Express**. Aquí puede seguir la instalación paso a paso 
	https://expressjs.com/es/starter/installing.html 
- **Cors**. Aquí puede seguir la instalación paso a paso 
		https://www.npmjs.com/package/cors

Y, en el **frontend**
- **React**. Aquí puede seguir la instalación paso a paso
https://es.reactjs.org/docs/create-a-new-react-app.html
- **P5**. Siga exactamente estas instrucciones, aunque más abajo se dejará los links de la guía de instalación. Recuerde que P5 para React es diferente al que se usa _sin_ React.
``npm install react-p5-wrapper``
``npm i --save react-p5``
``npm i p5``
https://p5js.org/es/download/
https://www.npmjs.com/package/react-p5
- **Router Dom**. Aquí puede seguir la instalación paso a paso
https://www.npmjs.com/package/react-router-dom
- **React Player**. Aquí puede seguir la instalación paso a paso 
https://www.npmjs.com/package/react-player

### Qué encontrará en el Lobby 
---
- Ahorcado -> El ahorcado 
- Piedra, papel, tijera, lagarto, spock -> El clásico piedra papel o tijera, con dos amigos más. 
- TaTeTi -> El juego de tateti. 
- Paint -> No es un juego, es un área recreativa para dibujar. 
- FunZone!!1! -> ;) es un secreto, entre bajo su propio riesgo. 


## Ahorcado 
---
- Al escribir más de una letra se podrá arriesgar, automáticamente, una palabra. 


## Piedra, papel, tijera, lagarto, spock.
---

En el **backend** se utilizan los siguientes números para referirse a cada movimiento, de esta manera se facilita la *lógica de negocios*.
- 1 -> Roca (rock) 
- 2 -> Papel (paper) 
- 3 -> Tijera (scissor)
- 4 -> Lagarto (lizard)
- 5 -> Spock (spock)

## Tateti 
---
### Aclaraciones del juego 
- Se empieza el símbolo 'X', para facilitar la asignación de los turnos. 
- Las posiciones del tablero van del 0 al 1.

