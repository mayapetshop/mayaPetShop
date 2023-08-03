import useCart from "../hooks/useCart"

const CardItem = ({articulo}) => {

    const {agregarCarrito, carrito} = useCart()

    const onCart = carrito.some(item => item.id === articulo.id)
  return (
    <div className='bg-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300'>
      <div className="p-4 flex-col flex h-full justify-between">
      <div>
        {onCart && (
        <div className="flex justify-evenly items-center text-white py-[2px] px-4 mb-1 bg-blue-400 rounded-full ">
            <p className="text-sm lg:text-base font-bold">
                Artículo en el Carrito 
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
        </div>
        )
        }
      </div>
            <div className="flex justify-end mb-[-35px] z-10 mt-3">
              <p className="text-xs lg:text-sm bg-blue-500 text-white font-bold py-1 px-2 rounded-full">{`${articulo.contenido}`}</p>
            </div>
            <img src={`./productos/${articulo.imagen}`} alt={articulo.nombre}  className="p-3 max-h-[450px] max-w-[350px]"/>
            <p className="border-t-2 pt-3 font-bold text-center lg:text-xl">{articulo.nombre}</p>
                <button 
                onClick={() => {
                  agregarCarrito(articulo)
                  
                  }} 
                  className='w-full hover:bg-indigo-500 bg-indigo-600 text-white py-2 uppercase font-bold rounded-md mt-3'>
                        Agregar
                </button>
      </div>
    </div>
  )
}

export default CardItem
