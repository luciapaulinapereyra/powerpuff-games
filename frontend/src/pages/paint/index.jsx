import React from 'react'
import GoBack from '../../components/GoBack'
import Draw from './Draw'


function Paint(props){
    return(
        <div>
            <Draw/>
            <GoBack/>
            <p>Si quiere <b>cambiar de color</b> aprete sobre el boton con el cuadrado negro y elija el color que usted quiera.
            Despues de que su color quede seleccionado aprete nuevamente el boton para que su pincel quede con el color seleccionado</p>
        </div>
    )

}
export default Paint;