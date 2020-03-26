import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImage from '../../assets/logo.svg'

export default function Register() {
  const [ ongName, setOngName ] = useState('')
  const [ ongEmail, setOngEmail ] = useState('')
  const [ ongWhatsapp, setOngWhatsapp ] = useState('')
  const [ ongCity, setOngCity ] = useState('')
  const [ ongUf, setOngUf ] = useState('')

  const history = useHistory()

  async function handleRegister(event) {
    event.preventDefault()

    const data = {
      name: ongName,
      email: ongEmail,
      whatsapp: ongWhatsapp,
      city: ongCity,
      uf: ongUf
    }

    try {
      const response = await api.post('/ongs', data)

      alert(`Seu ID de acesso: ${response.data.id}`)

      history.push('/')
    }
    catch (error) {
      alert('Erro no cadastro, tente novamente')
    }
  }

  return (
    <main className="register">
      <div className="register__card">

        <section className="card__left">
          <img src={ logoImage } title="Be The Hero" alt="Be The Hero"/>
          <h1 className="card__title">Cadastro</h1>
          <p className="card__paragraph">
            Faça seu cadastro, entre na plataforma e ajude pessoas
            a encontrarem os casos da sua ONG.
          </p>
          <Link className="link" to="/">
            <FiArrowLeft className="link__icon" size={ 14 } color="#E02041"/>
            Voltar a página de logon
          </Link>
        </section>

        <section className="card__right">
          <form className="card__form" onSubmit={ handleRegister }>

            <input value={ ongName } onChange={ event => setOngName(event.target.value) }
              className="form__input"
              type="text"
              placeholder="Nome da ONG"
              spellCheck="false"
            />

            <input value={ ongEmail } onChange={ event => setOngEmail(event.target.value) }
              className="form__input"
              type="email"
              placeholder="E-mail de contato"
              spellCheck="false"
            />

            <input value={ ongWhatsapp } onChange={ event => setOngWhatsapp(event.target.value) }
              className="form__input"
              type="text"
              placeholder="WhatsApp de contato"
              spellCheck="false"
            />

            <input value={ ongCity } onChange={ event => setOngCity(event.target.value) }
              className="form__input form__input--city"
              type="text"
              placeholder="Cidade"
              spellCheck="false"
            />

            <input value={ ongUf } onChange={ event => setOngUf(event.target.value) }
              className="form__input form__input--uf"
              type="text"
              placeholder="UF"
              spellCheck="false"
            />

            <button className="form__button button" type="submit">Cadastrar</button>
          </form>
        </section>
      </div>
    </main>
  )
}
