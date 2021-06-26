import React, { useEffect } from 'react'
import Styles from './login-styles.scss'
import { useHistory } from 'react-router-dom'
import { Authentication } from '@/domain/usecases'
import { CurrentAccountState } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { LoginState, Input, SubmitButton, FormStatus } from '@/presentation/pages/login/components'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const resetLoginState = useResetRecoilState(LoginState)
  const { setCurrentAccount } = useRecoilValue(CurrentAccountState)
  const history = useHistory()
  const [state, setState] = useRecoilState(LoginState)

  useEffect(() => resetLoginState(), [])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState(old => ({ ...old, isLoading: true }))

      const account = await authentication.auth({ email: state.email, password: state.password })
      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({ ...old, isLoading: false, mainError: error.message }))
    }
  }
  return (
    <div className={Styles.loginWrap}>
      <div className={Styles.contentWrap}>
        <div className={Styles.imgWrap}>
          <img className={Styles.img} />
        </div>
        <div className={Styles.formWrap}>
          <h1>Seja bem vindo de volta =)</h1>
          <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
            <h2>Faça seu Login</h2>
            <Input type="email" name="email" placeholder="Digite seu e-mail" />
            <Input type="password" name="password" placeholder="Digite sua senha" />
            <SubmitButton text="Entrar" />
            <FormStatus />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
