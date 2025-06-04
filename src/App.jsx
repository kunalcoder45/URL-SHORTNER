import React from 'react'
import UrlShortener from './components/UrlShortener'

const App = () => {
  return (
    <div className="app">
      <UrlShortener />
      <footer className="footer">
        <p>© {new Date().getFullYear()} URL Shortener | Made with ❤️ Kunal Sharma</p>
      </footer>
    </div>
  )
}

export default App