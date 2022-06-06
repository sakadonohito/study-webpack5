import React from 'react'

import quokka from '@image/animal_quokka.png'
import officeWall from '@image/office_wall.jpg'
import h2HeaderImg from '@image/h2_img.svg'

const Article = () => (
  <>
    <article>
      <img src={h2HeaderImg} alt="svgです" />
      <h2>メインコンテンツ</h2>
      <p>Article component デス</p>
      <section>
        <img src={quokka} alt="画像はイメージです"/>
      </section>
    </article>
 </>
)

export default Article
