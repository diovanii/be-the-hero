import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImage from '../../assets/logo.svg'

export default function Profile() {
  const [ incidents, setIncidents ] = useState([])

  const history = useHistory()

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ ongId ])

  async function handleDeleteIncident(incidentToDelete) {
    try {
      await api.delete(`incidents/${incidentToDelete}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== incidentToDelete))
    }
    catch (error) {
      alert('Erro ao deletar o caso, tente novamente')
    }
  }

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return (
    <main className="profile">
      <header className="profile__header">
        <img className="header__logo" src={ logoImage } title="Be The Hero" alt="Be The hero"/>
        <span className="header__text">Bem vinda, <strong>{ ongName }</strong></span>
        <Link className="header__button button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={ handleLogout } className="header__logout" title="Deslogar">
          <FiPower className="logout__icon" size={ 30 }/>
        </button>
      </header>

      <section className="profile__incidents">
        <h1 className="incidents__title">Casos cadastrados</h1>
        <ul className="incidents__list">
          { incidents.map(incident => (
            <li key={ incident.id } className="incident">
              <strong className="incident__title">{ incident.title }</strong>
              <p className="incident__description">{ incident.description }</p>
              <span
                className="incident__value">{
                  Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(incident.value)
                }
              </span>
              <button onClick={ () => handleDeleteIncident(incident.id) }
                className="incident__button"
                title="Deletar caso">
                <FiTrash2 className="button__icon" size={ 20 }/>
              </button>
            </li>
          )) }
        </ul>
      </section>
    </main>
  )
}
