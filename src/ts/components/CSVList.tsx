import React from 'react'

import csv from '../../data/member.csv'

console.log(csv)


const rows = csv.map( (row,key) => (
    <tr key={key}>
    <td>{row[0]}</td>
    <td>{row[1]}</td>
    <td>{row[2]}</td>
  </tr>
))

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>UserName</th>
          <th>Email</th>
          <th>Id</th>
        </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  )
}

export default Table
