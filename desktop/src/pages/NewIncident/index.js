import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImage from '../../assets/logo.svg'

export default function NewIncident() {
  const [ incidentTitle, setIncidentTitle ] = useState('')
  const [ incidentDescription, setIncidentDescription ] = useState('')
  const [ incidentValue, setIncidentValue ] = useState('')

  const ongId = localStorage.getItem('ongId')

  async function handleNewIncident(event) {
    event.preventDefault()

    const data = {
      title: incidentTitle,
      description: incidentDescription,
      value: incidentValue
    }

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      })

      alert('Caso cadastrado com sucesso')

      document.getElementById('incident-title').value = ''
      document.getElementById('incident-description').value = ''
      document.getElementById('incident-value').value = ''
    }
    catch (error) {
      alert('Erro ao cadastrar caso, tente novamente')
    }
  }

  return (
    <main className="new-incident">
      <div className="new-incident__card">

        <section className="card__left">
          <img src={ logoImage } title="Be The Hero" alt="Be The Hero"/>
          <h1 className="card__title">Cadastrar novo caso</h1>
          <p className="card__paragraph">
            Descreva o caso detalhadamente para encontrar um herói para resolver isso.
          </p>
          <Link className="link" to="/profile">
            <FiArrowLeft className="link__icon" size={ 14 } color="#E02041"/>
            Voltar a página de casos
          </Link>
        </section>

        <section className="card__right">
          <form onSubmit={ handleNewIncident } className="card__form">

            <input value={ incidentTitle }
              onChange={ event => setIncidentTitle(event.target.value) }
              id="incident-title"
              className="form__input"
              type="text"
              placeholder="Título do caso"
              spellCheck="false"
            />

            <textarea value={ incidentDescription }
              id="incident-description"
              onChange={ event => setIncidentDescription(event.target.value) }
              className="form__input form__input--textarea"
              placeholder="Descrição"
              spellCheck="false">
            </textarea>

            <input value={ incidentValue }
              id="incident-value"
              onChange={ event => setIncidentValue(event.target.value) }
              className="form__input"
              type="text"
              placeholder="Valor em reais"
              spellCheck="false"
            />
            <button className="form__button button" type="submit">Cadastrar</button>
          </form>
        </section>
      </div>
    </main>
  )
}
