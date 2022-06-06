import React from 'react'

import json from '../../data/menu.json'

const rows = json.map( (row,key) => (
  <li key={key}>{row.title} / {row.category}</li>
))

const SideList = () => (
  <>
    <ul>
    {rows}
    </ul>
 </>
)

export default SideList
