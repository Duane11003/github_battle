import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {ThemeProvider} from './contexts/theme.js'
import Nav from './Components/Nav.js'
import Loading from './Components/Loading.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const Popular = React.lazy(() => import('./Components/Popular.js'))
const Battle = React.lazy(() => import('./Components/Battle.js'))
const Results = React.lazy(() => import('./Components/Results.js'))

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({theme}) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }

    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />

                <React.Suspense fallback={<Loading />}>
                  <Route exact path='/' component={Popular} />            
                  <Route exact path='/battle' component={Battle} />
                  <Route path='/battle/results' component={Results} />
                </React.Suspense>            
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)