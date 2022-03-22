import React from 'react';
import { Link } from 'react-router-dom';
import Router from './partial/router/Router'

export function App() {
  return (
    <>
      <nav>
        <ul>
          <li key={"/"}>
            <Link to={"/"}>Home</Link>
          </li>
          <li key={"/about"}>
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
      </nav>
      <Router />
    </>
  )
}
