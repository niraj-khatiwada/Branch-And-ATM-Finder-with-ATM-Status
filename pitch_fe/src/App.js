import React from 'react'
import Navbar from './components/Navbar/navbar.component'
import { Route, Switch } from 'react-router-dom'
import SingleLocation from './components/Map/singleLocationView/singleLocation.component'

const AllLocation = React.lazy(() =>
  import('./components/Map/AllLocationView/AllLocation.component')
)

function App() {
  return (
    <div className="App" style={{ position: 'relative' }}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={SingleLocation} />
        <React.Suspense fallback={<p>..Loading</p>}>
          <Route exact path="/all" component={AllLocation} />
        </React.Suspense>
      </Switch>
    </div>
  )
}

export default App
