import './App.css'
import Page from './routes/Page'
import { Provider } from 'react-redux'
import store  from './redux/store'

function App() {
  return (
    <>
      <Provider store={store}>
        <Page />
      </Provider>
    </>
  )
}

export default App
