import { faBrazilianRealSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from "./CardServico.module.css";
import React, { useState } from 'react';

function CardServico({ servico, onCheckboxChange }) {

    const [selecionado, setSelecionado] = useState(false);

    const selecionar = (event) => {
        setSelecionado(!selecionado);
        handleCheckboxChange(event);
    };

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        onCheckboxChange(servico.id, isChecked);
    };

    return (
        <div onClick={selecionar} className={style.card} id={"servico-" + servico.id}>
            <div className={style.gaveta}>
                <div>
                    <h1>{servico.nomeServico}</h1>
                    <p>{servico.descricao}</p>
                </div>
                <div>
                    <p>R$ {servico.preco}</p>
                    <input type="checkbox" checked={selecionado} value={servico.id} />
                </div>
            </div>
        </div>
    );
}

export default CardServico;