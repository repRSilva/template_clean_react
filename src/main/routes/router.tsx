import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { CurrentAccountState, PrivateRoute } from '@/presentation/components'
import { RecoilRoot } from 'recoil'
import Home from '@/presentation/pages/home/home'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }
  return (
    <RecoilRoot initializeState={({ set }) => set(CurrentAccountState, state)}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/login" exact component={makeLogin} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot >
  )
}

export default Router
