import React from 'react'

import quokka from '@image/animal_quokka.png'
import officeWall from '@image/office_wall.jpg'
const Article = () => (
  <>
    <article>
      <h2>メインコンテンツ</h2>
      <p>Article component デス</p>
      <section>
        <img src={quokka} alt="画像はイメージです"/>
      </section>
    </article>
 </>
)

export default Article
