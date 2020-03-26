import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImage from '../../assets/logo.svg'
import heroesImage from '../../assets/heroes.png'

export default function Logon() {
  const [ ongId, setOngId ] = useState('')
  const history = useHistory()

  async function handleLogon(event) {
    event.preventDefault()
    
    try {
      const response = await api.post('/sessions', { id: ongId })

      localStorage.setItem('ongId', ongId)
      localStorage.setItem('ongName', response.data.name)

      history.push('/profile')
    }
    catch (error) {
      alert('Falha no login, tente novamente')
    }
  }

  return (
    <main className="logon">

      <form className="logon__form" onSubmit={ handleLogon }>
        <img className="form__image" src={ logoImage } title="Be The Hero" alt="Be The Hero"/>
        <h1 className="form__title">Faça logon</h1>
        <input value={ ongId } onChange={ event => setOngId(event.target.value) }
          className="form__input"
          type="text"
          placeholder="ID da sua ONG..."
          spellCheck="false"
        />
        <button className="form__button button" type="submit">Entrar</button>
        <Link className="link" to="/register">
          <FiLogIn className="link__icon"size={ 14 } color="#E02041"/>Não sou cadastrado
        </Link>
      </form>

      <img src={ heroesImage } alt="Heroes"/>
    </main>
  )
}
