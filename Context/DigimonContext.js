import React, {createContext, useState,useEffect} from 'react';
import firebase from '../Settings/ConfigFirebase';

export const DigimonContext = createContext();


const DigimonProvider = (props)=>{
    const [digimon, setDigimon] = useState({
        identificador:"",
        nombre:"",
        companero:"",
        temporada:""
    })

    const [lista, setLista]= useState([]);

    useEffect(()=>{
        firebase.database().ref('Digimon').on('value', snapshot=>{
            let digimonLista=[];
            snapshot.forEach(row=>{
                digimonLista.push({
                    identificador:row.key,
                    nombre:row.val().nombre,
                    companero:row.val().companero,
                    temporada:row.val().temporada
                })
            })
            setLista(digimonLista)
        })
    },[])




    const eliminar =(id)=>{
        firebase.database().ref('Digimon/'+id).set(null).then(()=>{
            alert("Eliminado")
        })

        const temporal = lista.filter((item)=>{
            return item.identificador!== id;
        })
        setLista(temporal)
    }
    return(
        <DigimonContext.Provider
            value={{
                digimon,
                lista,
                setDigimon,
                setLista,
                eliminar
            }}
        >
            {props.children}

        </DigimonContext.Provider>
    )
}

export default DigimonProvider;