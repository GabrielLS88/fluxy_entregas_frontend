import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import './Loading.css'

export default function Loading({ visibilidade }) {
    return (
        <div
            style={{ display: visibilidade ? "block" : "none" }}
            className="bodyLoading"
            role="bodyLoading"
        >
            <div className="espaco_para_icones">
                <p className="textoLoading">Carregando...</p>
                <Spinner animation="grow"/>
            </div>

        </div>
    );
}
