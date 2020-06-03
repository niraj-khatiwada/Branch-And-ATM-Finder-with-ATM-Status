import React from 'react'
import Navbar from './components/Navbar/navbar.component'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import SingleLocation from './components/Map/singleLocationView/singleLocation.component'

const AllLocation = React.lazy(() =>
  import('./components/Map/AllLocationView/AllLocation.component')
)

function App() {
  const location = useLocation()
  return (
    <div className="App" style={{ position: 'relative' }}>
      <Navbar />
      <AnimatePresence>
        <Switch>
          <Route exact path="/" component={SingleLocation} />
          <React.Suspense fallback={<p>..Loading</p>}>
            <Route exact path="/all" component={AllLocation} />
          </React.Suspense>
        </Switch>
      </AnimatePresence>
    </div>
  )
}

export default App
