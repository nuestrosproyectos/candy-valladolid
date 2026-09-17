/* Reparación Candy Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '641 153 922', TEL_HREF: 'tel:+34641153922',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=', PRECIO: '60,50 €',
    MARCA: 'Candy', MARCA_RE: /\b(CANDY|HOOVER|OTSEIN)\b/g, SAT_TXT: '<a href="https://www.candy-home.com/es_ES/pages/solicitar-asistencia-tecnica" rel="nofollow noopener" target="_blank">candy-home.com</a> · 943 914 150', ETIQUETA: 'número de modelo', F_ES_E: false,
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"e01-lavadora","cod":"E01","ap":"lavadora","keys":["E01","E1"],"titulo":"Puerta no bloquea","sig":"La lavadora no detecta la puerta cerrada y bloqueada; sin eso no arranca (1 parpadeo si no tiene pantalla).","pasos":["Cerrar la puerta con un golpe seco y reintentar","Retirar ropa atrapada en la goma o en el cierre","Desenchufar 10 minutos y volver a probar"],"sem":"verde","llamar":"Con la puerta bien cerrada y sigue igual → cierre de puerta (blocapuertas) o su cableado."},{"id":"e02-lavadora","cod":"E02","ap":"lavadora","keys":["E02","E2"],"titulo":"No entra agua","sig":"No entra agua en el tiempo previsto (2 parpadeos).","pasos":["Abrir del todo el grifo de la lavadora","Manguera de entrada sin dobleces ni pinzamientos","Limpiar el filtrillo de la entrada de agua (desenroscar la manguera con el grifo cerrado)","Comprobar que hay presión normal en el resto de la casa"],"sem":"verde","llamar":"Con grifo abierto y presión normal → electroválvula de entrada o presostato."},{"id":"e03-lavadora","cod":"E03","ap":"lavadora","keys":["E03","E3"],"titulo":"No desagua","sig":"No vacía el agua en 3 minutos: la avería más frecuente en Candy y Hoover (3 parpadeos).","pasos":["Desenchufar, poner una toalla y limpiar el filtro de la bomba (tapa inferior delantera)","Buscar monedas, horquillas o botones en la bomba","Manguera de desagüe y sifón sin atasco; salida entre 60 y 100 cm de altura"],"sem":"verde","llamar":"Filtro limpio, manguera libre y sigue → bomba de desagüe."},{"id":"e04-lavadora","cod":"E04","ap":"lavadora","keys":["E04","E4"],"titulo":"Nivel de agua anómalo","sig":"Sobrellenado o exceso de espuma (presostato); en modelos con sistema antifugas, agua en la base.","pasos":["Usar menos detergente y hacer un aclarado en vacío","Mirar si hay agua bajo la máquina"],"sem":"ambar","llamar":"Si hay agua en la base o se repite con poco detergente → presostato, electroválvula o fuga."},{"id":"e05-lavadora","cod":"E05","ap":"lavadora","keys":["E05","E5"],"titulo":"Sonda de temperatura","sig":"La sonda NTC que mide la temperatura del agua da una lectura fuera de rango.","pasos":["Desenchufar 10 minutos y probar un programa en frío"],"sem":"ambar","llamar":"Siempre: sonda NTC o su cableado."},{"id":"e06-lavadora","cod":"E06","ap":"lavadora","keys":["E06","E6"],"titulo":"Desequilibrio o memoria del módulo","sig":"La carga quedó descompensada al centrifugar, o la memoria EEPROM del módulo da error.","pasos":["Redistribuir la ropa dentro del tambor","No lavar una sola prenda pesada (edredón, alfombra) sola"],"sem":"verde","llamar":"Si repite con carga normal y bien repartida → módulo electrónico."},{"id":"e07-lavadora","cod":"E07","ap":"lavadora","keys":["E07","E7"],"titulo":"Motor bloqueado o cierre","sig":"Según el modelo: el motor no gira (tacómetro) o el cierre de puerta falla.","pasos":["Con la lavadora desenchufada, comprobar que el tambor gira a mano sin roces"],"sem":"ambar","llamar":"Siempre: motor, tacómetro o cierre; lo confirmamos en la visita."},{"id":"e08-lavadora","cod":"E08","ap":"lavadora","keys":["E08","E8"],"titulo":"Tacómetro del motor","sig":"El motor acelera unos segundos y se para, o no gira: sensor de velocidad, escobillas o módulo.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre: en la gama con escobillas (Smart, GrandÓ, Dynamic) suele ser una reparación barata."},{"id":"e09-lavadora","cod":"E09","ap":"lavadora","keys":["E09","E9"],"titulo":"Triac del motor en la placa","sig":"El módulo no consigue mover el motor: el triac de potencia de la placa ha fallado.","pasos":[],"sem":"ambar","llamar":"Siempre: módulo electrónico; te decimos en casa si compensa."},{"id":"e10-lavadora","cod":"E10","ap":"lavadora","keys":["E10"],"titulo":"Selector o sensor de tambor","sig":"En las antiguas, el selector motorizado de programas; en las nuevas, el sensor de posición del tambor.","pasos":["Poner el selector en apagado, esperar 1 minuto y elegir el programa de nuevo"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"e15-lavadora","cod":"E15","ap":"lavadora","keys":["E15"],"titulo":"Módulo sin programar","sig":"La placa ha perdido su programación o la memoria está corrupta.","pasos":[],"sem":"ambar","llamar":"Siempre: hay que reprogramar o cambiar el módulo."},{"id":"e16-lavadora","cod":"E16","ap":"lavadora","keys":["E16"],"titulo":"Resistencia con fuga a tierra","sig":"La resistencia de calentar deriva corriente; a veces salta el diferencial de la casa al calentar.","pasos":["Si salta el diferencial, dejar de usarla hasta la visita"],"sem":"ambar","llamar":"Siempre: resistencia de calentamiento."},{"id":"e17-lavadora","cod":"E17","ap":"lavadora","keys":["E17"],"titulo":"Tacómetro: el motor no gira","sig":"El módulo no recibe señal de giro del motor.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre: tacómetro, escobillas o módulo."},{"id":"e18-lavadora","cod":"E18","ap":"lavadora","keys":["E18"],"titulo":"Placa electrónica / alimentación","sig":"Fallo interno de la placa o de su alimentación.","pasos":["Desenchufar 20 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre."},{"id":"e20-lavadora","cod":"E20","ap":"lavadora","keys":["E20"],"titulo":"Bomba de desagüe obstruida","sig":"Hoover lo documenta como obstrucción o bloqueo de la bomba de desagüe: se trata igual que E03.","pasos":["Limpiar el filtro de la bomba (tapa inferior delantera, con toalla)","Retirar objetos atrapados en la bomba","Manguera y sifón sin atasco"],"sem":"verde","llamar":"Limpio y sigue → bomba de desagüe."},{"id":"e01-lavasecadora","cod":"E01","ap":"lavasecadora","keys":["E01","E1"],"titulo":"Puerta no bloquea","sig":"La lavadora no detecta la puerta cerrada y bloqueada; sin eso no arranca (1 parpadeo si no tiene pantalla).","pasos":["Cerrar la puerta con un golpe seco y reintentar","Retirar ropa atrapada en la goma o en el cierre","Desenchufar 10 minutos y volver a probar"],"sem":"verde","llamar":"Con la puerta bien cerrada y sigue igual → cierre de puerta (blocapuertas) o su cableado."},{"id":"e02-lavasecadora","cod":"E02","ap":"lavasecadora","keys":["E02","E2"],"titulo":"No entra agua","sig":"No entra agua en el tiempo previsto (2 parpadeos).","pasos":["Abrir del todo el grifo de la lavadora","Manguera de entrada sin dobleces ni pinzamientos","Limpiar el filtrillo de la entrada de agua (desenroscar la manguera con el grifo cerrado)","Comprobar que hay presión normal en el resto de la casa"],"sem":"verde","llamar":"Con grifo abierto y presión normal → electroválvula de entrada o presostato."},{"id":"e03-lavasecadora","cod":"E03","ap":"lavasecadora","keys":["E03","E3"],"titulo":"No desagua","sig":"No vacía el agua en 3 minutos: la avería más frecuente en Candy y Hoover (3 parpadeos).","pasos":["Desenchufar, poner una toalla y limpiar el filtro de la bomba (tapa inferior delantera)","Buscar monedas, horquillas o botones en la bomba","Manguera de desagüe y sifón sin atasco; salida entre 60 y 100 cm de altura"],"sem":"verde","llamar":"Filtro limpio, manguera libre y sigue → bomba de desagüe."},{"id":"e04-lavasecadora","cod":"E04","ap":"lavasecadora","keys":["E04","E4"],"titulo":"Nivel de agua anómalo","sig":"Sobrellenado o exceso de espuma (presostato); en modelos con sistema antifugas, agua en la base.","pasos":["Usar menos detergente y hacer un aclarado en vacío","Mirar si hay agua bajo la máquina"],"sem":"ambar","llamar":"Si hay agua en la base o se repite con poco detergente → presostato, electroválvula o fuga."},{"id":"e05-lavasecadora","cod":"E05","ap":"lavasecadora","keys":["E05","E5"],"titulo":"Sonda de temperatura","sig":"La sonda NTC que mide la temperatura del agua da una lectura fuera de rango.","pasos":["Desenchufar 10 minutos y probar un programa en frío"],"sem":"ambar","llamar":"Siempre: sonda NTC o su cableado."},{"id":"e06-lavasecadora","cod":"E06","ap":"lavasecadora","keys":["E06","E6"],"titulo":"Desequilibrio o memoria del módulo","sig":"La carga quedó descompensada al centrifugar, o la memoria EEPROM del módulo da error.","pasos":["Redistribuir la ropa dentro del tambor","No lavar una sola prenda pesada (edredón, alfombra) sola"],"sem":"verde","llamar":"Si repite con carga normal y bien repartida → módulo electrónico."},{"id":"e07-lavasecadora","cod":"E07","ap":"lavasecadora","keys":["E07","E7"],"titulo":"Motor bloqueado o cierre","sig":"Según el modelo: el motor no gira (tacómetro) o el cierre de puerta falla.","pasos":["Con la lavadora desenchufada, comprobar que el tambor gira a mano sin roces"],"sem":"ambar","llamar":"Siempre: motor, tacómetro o cierre; lo confirmamos en la visita."},{"id":"e08-lavasecadora","cod":"E08","ap":"lavasecadora","keys":["E08","E8"],"titulo":"Tacómetro del motor","sig":"El motor acelera unos segundos y se para, o no gira: sensor de velocidad, escobillas o módulo.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre: en la gama con escobillas (Smart, GrandÓ, Dynamic) suele ser una reparación barata."},{"id":"e09-lavasecadora","cod":"E09","ap":"lavasecadora","keys":["E09","E9"],"titulo":"Triac del motor en la placa","sig":"El módulo no consigue mover el motor: el triac de potencia de la placa ha fallado.","pasos":[],"sem":"ambar","llamar":"Siempre: módulo electrónico; te decimos en casa si compensa."},{"id":"e10-lavasecadora","cod":"E10","ap":"lavasecadora","keys":["E10"],"titulo":"Selector o sensor de tambor","sig":"En las antiguas, el selector motorizado de programas; en las nuevas, el sensor de posición del tambor.","pasos":["Poner el selector en apagado, esperar 1 minuto y elegir el programa de nuevo"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"e15-lavasecadora","cod":"E15","ap":"lavasecadora","keys":["E15"],"titulo":"Módulo sin programar","sig":"La placa ha perdido su programación o la memoria está corrupta.","pasos":[],"sem":"ambar","llamar":"Siempre: hay que reprogramar o cambiar el módulo."},{"id":"e16-lavasecadora","cod":"E16","ap":"lavasecadora","keys":["E16"],"titulo":"Resistencia con fuga a tierra","sig":"La resistencia de calentar deriva corriente; a veces salta el diferencial de la casa al calentar.","pasos":["Si salta el diferencial, dejar de usarla hasta la visita"],"sem":"ambar","llamar":"Siempre: resistencia de calentamiento."},{"id":"e17-lavasecadora","cod":"E17","ap":"lavasecadora","keys":["E17"],"titulo":"Tacómetro: el motor no gira","sig":"El módulo no recibe señal de giro del motor.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre: tacómetro, escobillas o módulo."},{"id":"e18-lavasecadora","cod":"E18","ap":"lavasecadora","keys":["E18"],"titulo":"Placa electrónica / alimentación","sig":"Fallo interno de la placa o de su alimentación.","pasos":["Desenchufar 20 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre."},{"id":"e20-lavasecadora","cod":"E20","ap":"lavasecadora","keys":["E20"],"titulo":"Bomba de desagüe obstruida","sig":"Hoover lo documenta como obstrucción o bloqueo de la bomba de desagüe: se trata igual que E03.","pasos":["Limpiar el filtro de la bomba (tapa inferior delantera, con toalla)","Retirar objetos atrapados en la bomba","Manguera y sifón sin atasco"],"sem":"verde","llamar":"Limpio y sigue → bomba de desagüe."},{"id":"e11-lavasecadora","cod":"E11","ap":"lavasecadora","keys":["E11"],"titulo":"Resistencia de secado","sig":"Solo lavasecadoras: la resistencia del circuito de secado está abierta.","pasos":["Limpiar el filtro de pelusa del secado, si el modelo lo tiene"],"sem":"ambar","llamar":"Siempre: resistencia de secado."},{"id":"e12-lavasecadora","cod":"E12","ap":"lavasecadora","keys":["E12"],"titulo":"Comunicación o sonda de secado","sig":"Solo lavasecadoras: fallo de comunicación entre módulos o de la sonda del secado.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre."},{"id":"e13-lavasecadora","cod":"E13/E14","ap":"lavasecadora","keys":["E13","E14"],"titulo":"Placa o NTC de secado","sig":"Solo lavasecadoras: la placa del secado o su sonda de temperatura dan error.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre."},{"id":"e03-secadora","cod":"E03/E3","ap":"secadora","keys":["E03","E3"],"titulo":"Depósito lleno o no evacua","sig":"Ambas generaciones: el depósito de agua está lleno o la bomba de condensados no la evacúa.","pasos":["Vaciar el depósito de agua y volver a colocarlo bien","Limpiar el filtro de la puerta y el condensador","Con la secadora desenchufada, quitar la pelusa de la zona de la bomba"],"sem":"verde","llamar":"Depósito vacío y sigue → bomba de condensados o flotador."},{"id":"e02-secadora","cod":"E02","ap":"secadora","keys":["E02","E2"],"titulo":"Fusible térmico (nuevas)","sig":"Generación actual: se ha fundido el fusible térmico por un sobrecalentamiento anterior.","pasos":["Limpiar filtros y condensador para que no se repita"],"sem":"ambar","llamar":"Siempre: fusible y la causa del calor."},{"id":"e4-secadora","cod":"E4","ap":"secadora","keys":["E4","E04"],"titulo":"Selector de programas (antiguas)","sig":"Generación antigua (GrandÓ, Dynamic): el selector de programas da una lectura incoherente.","pasos":["Apagar, esperar un minuto y seleccionar el programa de nuevo"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"e05-secadora","cod":"E05/E5","ap":"secadora","keys":["E05","E5"],"titulo":"Sonda frontal o circuito de bomba de calor","sig":"Antiguas: sonda NTC frontal. Nuevas de bomba de calor: posible falta de gas o fallo del compresor.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre; en bomba de calor te decimos antes si compensa."},{"id":"e6-secadora","cod":"E6","ap":"secadora","keys":["E6","E06"],"titulo":"Módulo electrónico (antiguas)","sig":"Generación antigua: fallo interno del módulo.","pasos":["Desenchufar 20 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre."},{"id":"e07-secadora","cod":"E07/E7","ap":"secadora","keys":["E07","E7"],"titulo":"Poco flujo de aire / filtro","sig":"Antiguas: poco flujo de aire. Nuevas: filtro obstruido por pelusa. Casi siempre se resuelve limpiando.","pasos":["Limpiar el filtro de la puerta","Limpiar el condensador inferior (se saca sin herramientas)","Dejar espacio de ventilación alrededor"],"sem":"verde","llamar":"Todo limpio y repite → ventilador o sensor."},{"id":"e08-secadora","cod":"E08/E8","ap":"secadora","keys":["E08","E8"],"titulo":"Fusible térmico o circuito de calor","sig":"El circuito de calor o ventilación ha disparado la protección térmica.","pasos":["Limpiar todo el circuito de aire (filtro, condensador, rejillas)"],"sem":"ambar","llamar":"Siempre: fusible más la causa (resistencia, ventilador, obstrucción)."},{"id":"e9-secadora","cod":"E9","ap":"secadora","keys":["E9","E09"],"titulo":"Termostato de seguridad (antiguas)","sig":"Generación antigua: ha actuado el termostato de seguridad.","pasos":["Dejar enfriar 30 minutos y limpiar filtros"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"e10-secadora","cod":"E10","ap":"secadora","keys":["E10"],"titulo":"Tambor sin carga (antiguas)","sig":"Supera 80 °C con el tambor vacío o casi vacío.","pasos":["Meter una carga normal; no secar una sola prenda"],"sem":"verde","llamar":"Si repite con carga normal."},{"id":"e11-secadora","cod":"E11","ap":"secadora","keys":["E11"],"titulo":"Condensador demasiado caliente (nuevas)","sig":"Generación actual: temperatura alta en el condensador.","pasos":["Limpiar el condensador","Ventilar la estancia; la secadora necesita aire fresco alrededor"],"sem":"verde","llamar":"Limpio y ventilado, y repite → sensor o ventilador."},{"id":"e13-secadora","cod":"E13/E22","ap":"secadora","keys":["E13","E22"],"titulo":"Compresor de la bomba de calor","sig":"Generación actual de bomba de calor: relé o compresor.","pasos":[],"sem":"ambar","llamar":"Siempre: es la pieza más cara de la secadora, te decimos antes si compensa."},{"id":"e14-secadora","cod":"E14/E15","ap":"secadora","keys":["E14","E15"],"titulo":"Compresor (nuevas) o NTC trasera / relé (antiguas)","sig":"Nuevas: compresor o su relé. Antiguas: sonda NTC trasera (E14) o relé de la resistencia (E15).","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre."},{"id":"e19-secadora","cod":"E19","ap":"secadora","keys":["E19"],"titulo":"Solo conectividad Wi-Fi","sig":"Generación actual: fallo de conexión con la app hOn; la secadora seca con normalidad.","pasos":["Volver a emparejar la secadora con la app hOn"],"sem":"verde","llamar":"No hace falta: no es una avería."},{"id":"e1-lavavajillas","cod":"E1","ap":"lavavajillas","keys":["E1","E01"],"titulo":"No entra agua","sig":"Ambas generaciones: tiempo de llenado excedido (grifo, presión o filtro de entrada).","pasos":["Abrir del todo el grifo","Limpiar el filtrillo de la manguera de entrada (con el grifo cerrado)","Manguera sin dobleces; reiniciar"],"sem":"verde","llamar":"Con agua y presión → electroválvula de entrada."},{"id":"e2-lavavajillas","cod":"E2","ap":"lavavajillas","keys":["E2","E02"],"titulo":"No desagua (actuales) / llena lento (antiguos)","sig":"Brava, Rapidó y H-Dish: no alcanza «cuba vacía» en 4 min. CDP/CDI antiguos: llenado de más de 3,5 min.","pasos":["Actuales: limpiar los filtros del fondo de la cuba, manguera de desagüe y sifón sin atasco","Antiguos: grifo abierto y filtrillo de entrada limpio"],"sem":"verde","llamar":"Limpio y sigue → bomba de desagüe (actuales) o electroválvula (antiguos)."},{"id":"e3-lavavajillas","cod":"E3","ap":"lavavajillas","keys":["E3","E03"],"titulo":"No calienta","sig":"No alcanza la temperatura de lavado: resistencia o sonda.","pasos":["Reiniciar una sola vez"],"sem":"ambar","llamar":"Siempre: resistencia o sonda NTC."},{"id":"e4-lavavajillas","cod":"E4","ap":"lavavajillas","keys":["E4","E04"],"titulo":"Antidesbordamiento: agua en la base","sig":"El flotador de la bandeja inferior detecta una fuga interna.","pasos":["Cerrar el grifo y desenchufar","Vaciar la base inclinándolo con cuidado (dos personas)"],"sem":"ambar","llamar":"Siempre: hay que localizar la fuga (junta, manguito, bomba)."},{"id":"e5-lavavajillas","cod":"E5","ap":"lavavajillas","keys":["E5","E05"],"titulo":"Sonda NTC (antiguos)","sig":"Plataforma CDP/CDI: la sonda de temperatura da error.","pasos":["Reiniciar una vez"],"sem":"ambar","llamar":"Siempre."},{"id":"e6-lavavajillas","cod":"E6","ap":"lavavajillas","keys":["E6","E06"],"titulo":"Módulo electrónico (antiguos)","sig":"Plataforma CDP/CDI: módulo o memoria EEPROM.","pasos":["Desenchufar 20 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre."},{"id":"e7-lavavajillas","cod":"E7","ap":"lavavajillas","keys":["E7","E07"],"titulo":"Motor de lavado bloqueado (antiguos)","sig":"Plataforma CDP/CDI: rotor o tacómetro del motor de lavado.","pasos":["Retirar restos de comida o cristal del sumidero"],"sem":"ambar","llamar":"Siempre."},{"id":"e8-lavavajillas","cod":"E8/Ei","ap":"lavavajillas","keys":["E8","E08","EI"],"titulo":"Distribuidor de brazos, resistencia o filtro","sig":"Actuales: válvula distribuidora de los brazos, o resistencia que no calienta por filtro obstruido (Ei). Antiguos: calentamiento.","pasos":["Limpiar a fondo los filtros y el sumidero","Reiniciar"],"sem":"verde","llamar":"Limpio y repite → válvula distribuidora o resistencia."},{"id":"e9-lavavajillas","cod":"E9","ap":"lavavajillas","keys":["E9","E09"],"titulo":"Tecla pulsada más de 30 s","sig":"Plataforma actual: una tecla lleva más de 30 segundos pulsada; no es avería.","pasos":["Soltar la tecla; secar el panel si está mojado"],"sem":"verde","llamar":"Si el panel está seco y sigue → botonera; en los CDP/CDI antiguos, E9 puede ser del módulo."},{"id":"er01-horno","cod":"ER01","ap":"horno","keys":["ER01","ER1"],"titulo":"Comunicación entre módulos","sig":"El módulo de mandos y el de potencia no se comunican (conector o cable dañado).","pasos":["Poner selector y temperatura a 0","Desenchufar o bajar el automático 5 minutos"],"sem":"ambar","llamar":"Siempre."},{"id":"er02-horno","cod":"ER02/ER03","ap":"horno","keys":["ER02","ER03","ER2","ER3"],"titulo":"Selector de programas","sig":"El selector de funciones o de temperatura da una lectura defectuosa.","pasos":["Poner selector y temperatura a 0","Desenchufar 5 minutos"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"er04-horno","cod":"ER04/ER05","ap":"horno","keys":["ER04","ER05","ER4","ER5"],"titulo":"Sonda NTC del horno","sig":"La sonda de temperatura está en circuito abierto (ER04) o en cortocircuito (ER05). Los más frecuentes.","pasos":["Apagar el horno y desenchufarlo"],"sem":"ambar","llamar":"Siempre: no seguir usándolo."},{"id":"er06-horno","cod":"ER06","ap":"horno","keys":["ER06","ER6"],"titulo":"Placa principal por encima de 85 °C","sig":"La electrónica se calienta demasiado: el ventilador tangencial no refrigera.","pasos":["Dejar enfriar el horno con la puerta abierta","Comprobar que nada tapa las rejillas de ventilación del mueble"],"sem":"ambar","llamar":"Si repite tras enfriar → ventilador tangencial."},{"id":"er07-horno","cod":"ER07/ER08/ER09","ap":"horno","keys":["ER07","ER08","ER09","ER7","ER8","ER9"],"titulo":"Sonda de alimentos","sig":"La sonda de carne está abierta (ER07), en corto (ER08) o por encima de 85 °C (ER09).","pasos":["Retirar la sonda de alimentos, limpiar el conector y volver a conectarla","Reintentar sin la sonda"],"sem":"verde","llamar":"Sonda limpia y bien conectada, y repite → sonda o conector."},{"id":"er10-horno","cod":"ER10/ER11/ER12","ap":"horno","keys":["ER10","ER11","ER12"],"titulo":"Sonda del horno o caja demasiado caliente","sig":"Sonda de temperatura abierta (ER10), en corto (ER11) o cavidad por encima de 300 °C (ER12).","pasos":["Desenchufar el horno"],"sem":"ambar","llamar":"Siempre."},{"id":"er13-horno","cod":"ER13","ap":"horno","keys":["ER13"],"titulo":"No alcanza la temperatura","sig":"No llega a la temperatura en 105 minutos: resistencia o relé.","pasos":[],"sem":"ambar","llamar":"Siempre: resistencia."},{"id":"er14-horno","cod":"ER14/ER15","ap":"horno","keys":["ER14","ER15"],"titulo":"Temporizador o sensor de puerta","sig":"Temporizador mecánico abierto (ER14) o sensor de puerta abierto (ER15).","pasos":["Cerrar bien la puerta y comprobar que nada la traba"],"sem":"verde","llamar":"Puerta bien cerrada y repite → sensor o temporizador."},{"id":"er16-horno","cod":"ER16/ER17/ER18","ap":"horno","keys":["ER16","ER17","ER18"],"titulo":"NTC o temperatura del display","sig":"La sonda o la temperatura del panel de mandos están fuera de rango.","pasos":["Dejar enfriar el panel","Desenchufar 5 minutos"],"sem":"ambar","llamar":"Si repite tras enfriar."},{"id":"er19-horno","cod":"ER19/ER20","ap":"horno","keys":["ER19","ER20"],"titulo":"EEPROM o receta","sig":"Memoria de la placa (ER19) o error en una receta programada (ER20).","pasos":["Desenchufar 5 minutos y reiniciar"],"sem":"ambar","llamar":"Siempre si repite tras reiniciar."},{"id":"e2-placa","cod":"E2","ap":"placa","keys":["E2","E02"],"titulo":"Sobrecalentamiento de las bobinas","sig":"La zona de cocción se ha calentado demasiado (olla vacía, mucho tiempo a máxima potencia).","pasos":["Retirar el recipiente y dejar enfriar 10 minutos","No cocinar con la olla vacía ni con el fondo deformado"],"sem":"verde","llamar":"Si repite en frío → ventilador o sensor de la inducción."},{"id":"er03-placa","cod":"ER03","ap":"placa","keys":["ER03","ER3"],"titulo":"Tecla pulsada","sig":"Líquido, un paño o un objeto están apoyados sobre el panel táctil.","pasos":["Secar y despejar el panel de mandos","Esperar 10 segundos a que se reactive"],"sem":"verde","llamar":"Panel seco y sigue → botonera."},{"id":"er33-placa","cod":"ER33","ap":"placa","keys":["ER33"],"titulo":"Líquido en el panel","sig":"Los sensores táctiles detectan agua o líquido por encima.","pasos":["Secar bien el panel y esperar"],"sem":"verde","llamar":"Seco y sigue → botonera o placa de mandos."},{"id":"e5-placa","cod":"E5","ap":"placa","keys":["E5","E05"],"titulo":"Placa filtro","sig":"Fallo en la placa de filtro de alimentación.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e6-placa","cod":"E6","ap":"placa","keys":["E6","E06"],"titulo":"Alimentación o sensor","sig":"Tensión de alimentación fuera de rango o sensor de temperatura defectuoso.","pasos":["Bajar el automático de la placa 1 minuto y volver a subirlo"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"e9-placa","cod":"E9","ap":"placa","keys":["E9","E09"],"titulo":"Sonda de temperatura","sig":"La sonda de una zona de cocción está en circuito abierto o en corto.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"er12-placa","cod":"ER12","ap":"placa","keys":["ER12"],"titulo":"Relé de potencia","sig":"Un relé del módulo de potencia no responde.","pasos":[],"sem":"ambar","llamar":"Siempre: módulo de potencia; te decimos antes si compensa."},{"id":"l-placa","cod":"L / Lo","ap":"placa","keys":["L","LO","BLOQUEO","CANDADO"],"titulo":"Bloqueo infantil","sig":"No es avería: el bloqueo de mandos está activado.","pasos":["Mantener pulsada la tecla del candado unos 3 segundos"],"sem":"verde","llamar":"Si no se desbloquea con la placa fría y el panel seco.","aviso":1},{"id":"h-placa","cod":"H","ap":"placa","keys":["H","CALOR"],"titulo":"Calor residual","sig":"No es avería: la zona sigue caliente después de apagarla.","pasos":["Esperar a que la H desaparezca antes de tocar o limpiar"],"sem":"verde","llamar":"Si la H no se apaga nunca, ni en frío → sensor.","aviso":1},{"id":"led-4-frigorifico","cod":"LEDs 4 °C parpadeando","ap":"frigorifico","keys":["4","LED4","PARPADEA","PARPADEAN"],"titulo":"Error genérico","sig":"En los combis CCE3T618 y familia, los LEDs de 4 °C parpadeando a la vez indican «se ha producido un error».","pasos":["Desenchufar 5 minutos y volver a conectar","Comprobar que las dos puertas cierran bien"],"sem":"ambar","llamar":"Si vuelve a parpadear tras el reinicio.","aviso":1},{"id":"led-6-frigorifico","cod":"LED −6 °C parpadeando","ap":"frigorifico","keys":["6","LED6","VENTILADOR","16","20","22","24"],"titulo":"Fallo del ventilador","sig":"CCE4T618/620 y Hoover HOCE3T618: LED de −6 °C parpadeando. H-Fridge 700: LEDs −16/−20/−22/−24 °C a la vez. Casi siempre hielo en el ventilador.","pasos":["Desenchufar un día entero con las puertas abiertas para que se deshiele el ventilador","Volver a conectar y esperar 6 horas"],"sem":"ambar","llamar":"Si repite tras el deshielo → motor del ventilador o desescarche.","aviso":1},{"id":"led-secuencia-frigorifico","cod":"LEDs en secuencia","ap":"frigorifico","keys":["SECUENCIA","PANTALLA","DISPLAY"],"titulo":"Comunicación placa ↔ display","sig":"H-Fridge 700 (HOCE7620CX): los LEDs de −16 a −24 °C se encienden en secuencia: la placa principal y el display no se comunican.","pasos":["Desenchufar 5 minutos y volver a conectar"],"sem":"ambar","llamar":"Si sigue tras el reinicio.","aviso":1}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"lavasecadora":{"id":"lavasecadora","nombre":"Lavasecadora","art":"una lavasecadora","slug":"lavasecadora"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"},"congelador":{"id":"congelador","nombre":"Congelador","art":"un congelador","slug":"congelador"},"campana":{"id":"campana","nombre":"Campana extractora","art":"una campana","slug":"campana"},"calentador":{"id":"calentador","nombre":"Termo eléctrico","art":"un termo eléctrico","slug":"calentador"}};
  var REL = document.documentElement.getAttribute('data-rel') || '';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var wa = function (t) { return CONFIG.WA_BASE + encodeURIComponent(t); };
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zona (memoria de sesión) */
  var Z = {
    get: function () { try { return sessionStorage.getItem('zona') || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? sessionStorage.setItem('zona', v) : sessionStorage.removeItem('zona'); } catch (e) { } }
  };
  if (document.body.getAttribute('data-zona')) Z.set(document.body.getAttribute('data-zona'));
  var zonaTxt = function () { return Z.get() || '[tu barrio o municipio]'; };


  /* ---------- barra inferior: solo cuando los CTA del hero no se ven */
  var barra = $('.barra');
  if (barra) {
    var heroCta = $('[data-hero-cta]');
    var setBarra = function (on) { barra.classList.toggle('on', on); document.body.classList.toggle('barra-on', on); };
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setBarra(!es[0].isIntersecting && es[0].boundingClientRect.top < 0 || (!es[0].isIntersecting && window.scrollY > 300)); }, { threshold: 0.2 }).observe(heroCta);
    } else setBarra(true);
  }

  /* ---------- modal de llamada en escritorio */
  var esEscritorio = window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;
  var modal = $('#modal-tel');
  if (modal && esEscritorio) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault(); modal.classList.add('on'); $('.cerrar', modal).focus();
    });
    $('.cerrar', modal).addEventListener('click', function () { modal.classList.remove('on'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('on'); });
    var cp = $('[data-copiar]', modal);
    if (cp) cp.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText('641153922').then(function () { cp.textContent = 'Copiado: 641 153 922'; });
    });
  }

  /* ---------- vídeo del hero: solo 4G, en viewport, sin reduced-motion ni ahorro de datos */
  var v = $('video[data-src]');
  if (v) {
    var c = navigator.connection || {};
    var okRed = !c.saveData && (!c.effectiveType || c.effectiveType === '4g');
    if (window.innerWidth < 900 && v.getAttribute('data-src-m')) v.setAttribute('data-src', v.getAttribute('data-src-m'));
    if (okRed && !reduced && 'IntersectionObserver' in window) {
      var cargado = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!cargado) { cargado = true; v.src = v.getAttribute('data-src'); v.load(); v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true }); }
          v.play().catch(function () { });
        } else if (cargado) v.pause();
      }, { threshold: 0.1 }).observe(v);
    }
  }

  /* ---------- reveals */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ---------- síntomas (subpáginas) */
  $$('.sint-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.nextElementSibling, on = b.getAttribute('aria-expanded') === 'true';
      $$('.sint-b', b.closest('.sint')).forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.classList.remove('on'); });
      if (!on) { b.setAttribute('aria-expanded', 'true'); p.classList.add('on'); }
    });
  });
  /* WhatsApp con zona en enlaces marcados */
  $$('a[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); });
    a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt()));
  });

  /* ================================================================ BUSCADOR */
  var APW = { lavasecadora: ['LAVASECADORA', 'LAVASECADORAS'], lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], congelador: ['CONGELADOR', 'CONGELADORES', 'ARCON'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'AMERICANO', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], campana: ['CAMPANA', 'EXTRACTORA'], caldera: ['CALDERA', 'CONDENS', 'CALEFACCION'], calentador: ['CALENTADOR', 'TERMO', 'THERM'], 'aire-acondicionado': ['AIRE', 'ACONDICIONADO', 'SPLIT', 'CLIMA', 'CLIMATIZACION', 'CLIMATE'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    var sinRelleno = up.replace(/\b(ERROR|CODIGO|CODE|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    if (sinRelleno.trim()) up = sinRelleno; /* si la consulta es solo «dE» (código de puerta en LG), no se vacía */
    if (CONFIG.MARCA_RE) up = up.replace(CONFIG.MARCA_RE, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    if (/^\d+$/.test(k)) k = 'E' + k;
    var alt = CONFIG.F_ES_E && /^F\d/.test(k) ? k.replace(/^F/, 'E') : null;
    return { key: k, alt: alt, ap: ap, fIn: !!alt };
  }
  function buscar1(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function buscar(key, ap, prefijo, alt) {
    var r = buscar1(key, ap, prefijo);
    if (!r.length && alt) r = buscar1(alt, ap, prefijo);
    return r;
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' ' + CONFIG.MARCA + ' que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' <span class="marca">' + esc(CONFIG.MARCA) + '</span></span></div>';
    h += '<p class="ficha-t">' + esc(c.titulo) + '</p><p class="ficha-s">' + esc(c.sig) + '</p>';
    h += '<span class="sem sem-' + c.sem + '">' + semTxt(c) + '</span>';
    if (c.pasos.length) {
      h += '<ul class="chk" aria-label="Autocomprobación">' + c.pasos.map(function (p, i) { return '<li><label><input type="checkbox" data-paso="' + i + '"><span>' + esc(p) + '</span></label></li>'; }).join('') + '</ul>';
      h += '<div class="sigue" role="group" aria-label="Resultado"><p>¿Sigue marcando ' + esc(codigo) + '?</p><div class="g"><button type="button" class="si">Sí, sigue igual</button><button type="button" class="no">Se ha arreglado</button></div></div>';
    }
    h += '<div class="llamar-c' + (c.pasos.length ? '' : ' on') + '"><b>Cuándo llamar</b>' + esc(c.llamar) + '</div>';
    h += '<div class="ok-c">Nos alegramos. Si vuelve a marcarlo, aquí estamos. <a class="link" href="' + REL + a.slug + '/">Cómo cuidar tu ' + esc(a.nombre.toLowerCase()) + ' →</a></div>';
    h += '<div class="ficha-cta"><a class="btn btn-wa" data-cta-wa href="' + wa(textoWA(c, [])) + '" target="_blank" rel="noopener">' + ico('wa') + 'WhatsApp con el código</a>';
    h += '<a class="btn btn-amber" data-cta-tel href="' + CONFIG.TEL_HREF + '">' + ico('tel') + 'Llamar · ' + CONFIG.TEL + '</a></div>';
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' ' + esc(CONFIG.MARCA) + ' →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: ' + CONFIG.SAT_TXT + '</p>';
    return h + '</article>';
  }
  function bindFicha(el) {
    var id = el.getAttribute('data-id'), c = CODIGOS.filter(function (x) { return x.id === id; })[0];
    if (!c || el.__b) return; el.__b = true;
    var chk = $$('input[type=checkbox]', el), sigue = $('.sigue', el), llamar = $('.llamar-c', el), ok = $('.ok-c', el);
    var bWa = $('[data-cta-wa]', el), bTel = $('[data-cta-tel]', el);
    var codigo = c.cod.split('/')[0].trim();
    var pasos = function () { return chk.filter(function (i) { return i.checked; }).map(function (i) { return i.nextElementSibling.textContent; }); };
    var refresca = function () { bWa.href = wa(textoWA(c, pasos())); };
    chk.forEach(function (i) {
      i.addEventListener('change', function () {
        refresca();
        if (chk.every(function (x) { return x.checked; })) { sigue.classList.add('on'); } else { sigue.classList.remove('on'); }
      });
    });
    if (sigue) {
      $('.si', sigue).addEventListener('click', function () {
        llamar.classList.add('on'); ok.classList.remove('on'); el.classList.add('hot'); refresca();
        $('.si', sigue).setAttribute('aria-pressed', 'true'); $('.no', sigue).removeAttribute('aria-pressed');
      });
      $('.no', sigue).addEventListener('click', function () {
        ok.classList.add('on'); llamar.classList.remove('on'); el.classList.remove('hot');
        $('.no', sigue).setAttribute('aria-pressed', 'true'); $('.si', sigue).removeAttribute('aria-pressed');
      });
    }
    var cp = $('[data-copy]', el);
    if (cp) cp.addEventListener('click', function () {
      var url = new URL(REL + 'codigos-error/#' + c.id, location.href).href;
      var done = function () { cp.textContent = 'Enlace copiado'; setTimeout(function () { cp.textContent = 'Copiar enlace a este código'; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    });
    refresca();
  }
  $$('.ficha[data-id]').forEach(bindFicha);

  function initBus(root) {
    var input = $('input', root), sug = $('.bus-sug', root), res = $('.bus-res', root), x = $('.bus-x', root);
    var apFijo = root.getAttribute('data-ap') || null, ap = apFijo, sel = -1, items = [];
    var chips = $$('.chip-btn[data-ap]', root);
    /* atajos «más buscados»: al elegir un aparato solo se ofrecen SUS códigos (nunca los de otro aparato) */
    var top = $('.bus-top', root), topHTML = top ? top.innerHTML : '';
    function bindAtajos() {
      $$('[data-cod]', root).forEach(function (b) { if (b._ok) return; b._ok = 1; b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; if (!c) return; if (ap && c.ap !== ap) { setAp(c.ap); } input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function pintaAtajos(k) {
      if (!top || apFijo) return;
      /* defensa: cualquier atajo de código que haya quedado fuera de .bus-top se elimina al elegir aparato */
      $$('[data-cod]', root).forEach(function (b) { if (!b.closest('.bus-top') && !b.closest('.bus-res')) { var li = b.closest('li'); (li || b).remove(); } });
      if (!k) { top.innerHTML = topHTML; bindAtajos(); return; }
      var a = APARATOS[k], mios = CODIGOS.filter(function (c) { return c.ap === k && !c.aviso; }).slice(0, 8), av = CODIGOS.filter(function (c) { return c.ap === k && c.aviso; });
      if (!mios.length && !av.length) { top.innerHTML = '<span class="bus-top-nota">' + esc(a.nombre) + ': sin códigos verificados de ' + esc(CONFIG.MARCA) + '. Dinos el síntoma y te decimos qué puede ser.</span>'; return; }
      top.innerHTML = 'Códigos de ' + esc(a.nombre.toLowerCase()) + ': <ul class="chips">' + mios.concat(av).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-cod="' + c.id + '">' + esc(c.cod.split('/')[0]) + '</button></li>'; }).join('') + '</ul>';
      bindAtajos();
    }
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      pintaAtajos(k);
      /* al cambiar de aparato se empieza de cero: el código anterior no se arrastra */
      input.value = ''; x.classList.remove('on'); limpia(); if (res) res.innerHTML = '';
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa' && placaSinCodigos()) placa(); }); });
    bindAtajos();
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      if (ap && c.ap !== ap && !apFijo) { ap = c.ap; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === c.ap ? 'true' : 'false'); }); pintaAtajos(c.ap); }
      limpia(); res.innerHTML = renderFicha(c); bindFicha($('.ficha', res));
      if (!reduced && root.getAttribute('data-scroll') !== 'no') setTimeout(function () { res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    function ambiguo(list, key) {
      res.innerHTML = '<div class="bus-amb"><p>' + esc(key) + ' existe en varios aparatos. ¿En cuál?</p><div class="g">' +
        list.map(function (c) { return '<button type="button" data-id="' + c.id + '">' + ico(c.ap) + esc(APARATOS[c.ap].nombre) + '</button>'; }).join('') + '</div></div>';
      $$('button', res).forEach(function (b) { b.addEventListener('click', function () { muestra(CODIGOS.filter(function (c) { return c.id === b.getAttribute('data-id'); })[0]); }); });
    }
    function nada(raw, key, apq, pre) {
      var a = apq ? APARATOS[apq] : null, art = a ? a.art : 'mi aparato';
      var quiza = (pre && pre.length) ? '<p>¿Querías decir…?</p><ul class="chips" style="margin-bottom:14px">' + pre.slice(0, 5).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-id="' + c.id + '">' + ico(c.ap) + c.cod.split('/')[0] + ' · ' + esc(APARATOS[c.ap].nombre) + '</button></li>'; }).join('') + '</ul>' : '';
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' ' + CONFIG.MARCA + ' que marca ' : 'mi aparato ' + CONFIG.MARCA + ' marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong>' + (a ? ' en ' + esc(a.nombre.toLowerCase()) : '') + ' verificado con documentación de <span class="marca">' + esc(CONFIG.MARCA) + '</span> y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta ' + esc(CONFIG.ETIQUETA) + ' (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el ' + esc(CONFIG.ETIQUETA) + ' →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    /* la placa solo va «por síntomas» si la marca no publica códigos verificados para ella (Siemens sí los tiene) */
    function placaSinCodigos() { return !!APARATOS.placa && !CODIGOS.some(function (c) { return c.ap === 'placa'; }); }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas <span class="marca">' + esc(CONFIG.MARCA) + '</span> avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa ' + CONFIG.MARCA + ' que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa' && placaSinCodigos()) { placa(); return; }
      if (!p.key && apq) { var av = CODIGOS.filter(function (c) { return c.ap === apq && c.aviso; }); if (av.length === 1) return muestra(av[0]); }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false, p.alt);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true, p.alt);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || (apq === 'placa' && placaSinCodigos())) { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true, p.alt).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false, p.alt); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0 || (p.alt && y.indexOf(p.alt) === 0); })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.indexOf(p.key) >= 0 ? disp.replace(p.key, '<mark>' + p.key + '</mark>') : (p.alt ? disp.replace(p.alt, '<mark>' + p.alt + '</mark>') : disp);
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn && !buscar1(p.key, apq, true).length) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En ' + esc(CONFIG.MARCA) + ', F y E son el mismo código (F18 = E18)</li>';
      sug.classList.add('on'); input.setAttribute('aria-expanded', 'true');
      $$('li[data-id]', sug).forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = li.querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === li.getAttribute('data-id'); })[0]); }); });
    }
    input.addEventListener('input', sugiere);
    input.addEventListener('keydown', function (e) {
      var lis = $$('li[data-id]', sug);
      if (e.key === 'ArrowDown' && lis.length) { e.preventDefault(); sel = (sel + 1) % lis.length; }
      else if (e.key === 'ArrowUp' && lis.length) { e.preventDefault(); sel = (sel - 1 + lis.length) % lis.length; }
      else if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && lis[sel]) { input.value = lis[sel].querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === lis[sel].getAttribute('data-id'); })[0]); } else go(input.value); return; }
      else if (e.key === 'Escape') { limpia(); return; }
      else return;
      lis.forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      input.setAttribute('aria-activedescendant', sel >= 0 ? lis[sel].id : '');
    });
    input.addEventListener('blur', function () { setTimeout(limpia, 150); });
    x.addEventListener('click', function () { input.value = ''; res.innerHTML = ''; limpia(); x.classList.remove('on'); input.focus(); });
    root.__go = function (q) { input.value = q; go(q); };
  }
  $$('.bus').forEach(initBus);

  /* ---------- hub: abrir ancla y hacer scroll */
  function abreAncla() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var d = document.getElementById(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 60); }
  }
  abreAncla(); window.addEventListener('hashchange', abreAncla);


  /* ---------- desplegable de aparatos (cabecera) */
  var dd = $('.dd');
  if (dd) {
    var ddb = $('.dd-b', dd);
    ddb.addEventListener('click', function () { var on = dd.classList.toggle('on'); ddb.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'), km = z.getAttribute('data-km'); Z.set(n);
      var dist = km === 'capital' ? 'Valladolid capital' : 'a ' + km + ' km del centro de Valladolid, dentro de nuestro radio de 20 km';
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + ' · ' + dist + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="' + CONFIG.TEL_HREF + '">Llamar · ' + CONFIG.TEL + '</a>') + '</div>';
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
    /* el anillo de 20 km también responde: explica el área de actuación */
    var an = $('.anillo-20', mapa);
    if (an) {
      var radio = function () {
        zs.forEach(function (o) { o.classList.remove('on'); }); an.classList.add('on');
        info.innerHTML = '<p class="kicker">Área de actuación</p><h3>' + an.getAttribute('data-radio') + ' km a la redonda de Valladolid</h3><p>Trabajamos únicamente dentro de este círculo: Valladolid capital y los municipios a menos de 20 km del centro, todos con el mismo precio de visita: ' + CONFIG.PRECIO + ' IVA incl., descontados si reparas. Fuera del radio no damos servicio.</p>' +
          '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ') + '">' + ico('wa') + 'WhatsApp</a><a class="btn btn-ghost btn-sm" href="' + CONFIG.TEL_HREF + '">Llamar · ' + CONFIG.TEL + '</a></div>';
      };
      an.addEventListener('click', radio); an.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); radio(); } });
      zs.forEach(function (z) { z.addEventListener('click', function () { an.classList.remove('on'); }); });
    }
  }
})();
