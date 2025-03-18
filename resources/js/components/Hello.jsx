import React from 'react';
import ReactDOM from 'react-dom/client';

export default function Hello() {
  return (
    <div>Hello</div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Hello/>);
