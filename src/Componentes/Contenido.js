import { getWithResponseManage } from "../services/PencaUCUservices.js";
import { PencaUCUContext, accionGetTorneoData } from '../context/context.js';
import React, { useEffect, useState, useContext } from 'react';

const Contenido = () => {


    const { data, dispatch } = useContext(PencaUCUContext);
    const torneo = data.torneoData;

    useEffect(() => {
        console.log("hola");
        getWithResponseManage('/torneo/getAll')
            .then((response) => {
                dispatch(accionGetTorneoData(response));
                console.log(response);
            })
    }, []);

    return (
        <div>
            <h1>Content</h1>
            <ul>
            </ul>
            {torneo?.map((torneo) => {
                return (
                    <div key={torneo.id}>
                        <h2>{torneo.nombre}</h2>
                    </div>
                )
            })}
        </div>
    );
}

export default Contenido;