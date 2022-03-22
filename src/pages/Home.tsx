import React from 'react';

function Home(props: any) {
  return (
    <>
      <h1>Home</h1>

      {props.test !== "null" ? props.test.map((d: any, i: number) => <div key={i}>{d.title}</div>) : ''}
    </>
  )
}

export default Home;