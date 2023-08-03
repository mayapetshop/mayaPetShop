import { useState, useEffect, createContext} from "react";

const CartContext = createContext()

const CartProvider = ({children}) => {

    const carritoLS = typeof window!== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : [] // ?? por si es la primera vez que el usuario entra para que el carrito esté vacío y no NULL
    //console.log(carritoLS)
  
    const [carrito, setCarrito] = useState(carritoLS)
    const [whatsapp, setWhatsapp]= useState('')
    const [search, setSearch] = useState('')
  
    useEffect(()=> {
      localStorage.setItem('carrito', JSON.stringify(carrito))
      const pedidoWhatsapp = () => {
        const chain = carrito.map (articulo => `%0A •${articulo.cantidad} ${articulo.nombre} `)
        const convertURL = chain.toString().replace(/\s/g, "%20")
        setWhatsapp(convertURL)
      }
      pedidoWhatsapp()
    },[carrito])
  
    //funcion - funciones globales, states, etc...
    const agregarCarrito = producto => {
      // Comprobar si la producto ya esta en el carrito...
      if(carrito.some( productoState =>  productoState.id === producto.id )) {
          // Iterar para actualizar la cantidad
          const carritoActualizado = carrito.map( productoState => {
              if( productoState.id === producto.id ) {
                  console.log('')
              } 
              return productoState;
          })
          // Se asigna al array
          setCarrito([...carritoActualizado]);
          localStorage.setItem('carrito', JSON.stringify( carrito ));
      } else {
          // En caso de que el articulo no exista, es nuevo y se agrega
          setCarrito([...carrito, {...producto, cantidad:1}]);
          localStorage.setItem('carrito', JSON.stringify( carrito ));
      }
    }

    const eliminarProducto = id => {
    const carritoActualizado = carrito.filter( producto => producto.id != id)
    setCarrito(carritoActualizado)
    window.localStorage.setItem('carrito', JSON.stringify( carrito ));
    }

    const actualizarCantidad = producto => {
    const carritoActualizado = carrito.map( productoState => {
        if(productoState.id === producto.id ) {
        productoState.cantidad = parseInt( producto.cantidad )
        } 
        return productoState
    })
    setCarrito(carritoActualizado)
    window.localStorage.setItem('carrito', JSON.stringify( carrito ));
    }

    const limpiarCarrito = () => {
        setCarrito([])
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }

    return(
        <CartContext.Provider
            value={{
                carrito,
                agregarCarrito,
                eliminarProducto,
                actualizarCantidad,
                limpiarCarrito,
                whatsapp,
                setSearch,
                search
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export {CartProvider}
export default CartContext