import { getWithResponseManage } from "../services/PencaUCUservices.js";
import { PencaUCUContext, accionGetTorneoData } from '../Context/context.js';
import React, { useEffect, useState, useContext } from 'react';

const Contenido = () => {


    const { data, dispatch } = useContext(PencaUCUContext);

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
            {data?.map((torneo) => {
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