import React from 'react'
import UrlShortener from './components/UrlShortener'

const App = () => {
  return (
    <div className="app">
      <UrlShortener />
      <footer className="footer">
        <p>© {new Date().getFullYear()} URL Shortener | Made with ❤️ 
          <a 
            href="https://kunalportfolio45.netlify.app/"
            target='__blank'>Kunal Sharma
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App