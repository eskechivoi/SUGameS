Este reto consiste en conseguir que una compra te salga con saldo negativo. Para este reto, utilizaremos `Postman`, aunque se puede hacer con `cURL` o cualquier otro programa que permita realizar peticiones HTTP.

Si miramos la pestaña `Red` de las opciones de desarrollador, podemos ver como lo que se envía al `endpoint` es un JSON que contiene un campo llamado `price`:

![[Pasted image 20240222004702.png]]

Por tanto, para hacernos millonarios, hemos de conseguir que este `price` sea negativo. Para ello, podemos intentar modificar el precio usando `Postman`:

![[Pasted image 20240222005939.png]]

Sin embargo, el servidor nos devuelve un código `401`, lo que quiere decir que no estamos autorizados para realizar dicha compra. Aquí, si nos fijamos en el encabezado de la petición que hicimos desde el navegador:

![[Pasted image 20240222010040.png]]

Vemos que existe una Cookie llamada `transAuth`. Debido a que el error `401` indica que no estamos autorizados, igual la cookie de `transAuth` indica si estamos autorizados a realizar la compra. 

Ahora, he realizado una compra de 110€, y he visto que la Cookie ha cambiado. Sin embargo, si hago una compra del mismo precio, el valor de la Cookie se mantiene, por tanto, podemos suponer que el valor de la Cookie varía en función del precio.

![[Pasted image 20240222010314.png]]

Si probamos a decodificar la Cookie de `Base64` (_típicamente las Cookies están codificadas de esta forma_), podemos ver que el valor de la Cookie se corresponde con el precio total de la compra:

![[Pasted image 20240222010445.png]]

Por tanto, si queremos hacernos millonarios, simplemente codificamos `-1000000` en `Base64` y lo añadimos como Cookie a la petición:

![[Pasted image 20240222010550.png]]

En `Postman`, añadimos la Cookie a la cabecera de la petición HTTP:

![[Pasted image 20240222010622.png]]

Una vez hecho esto, ¡ya somos millonarios!

![[Pasted image 20240222010728.png]]