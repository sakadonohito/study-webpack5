import React from 'react'

import arupaka from '../../images/animal_arupaka.png'

const Article = () => (
  <>
    <article>
      <h2>メインコンテンツ</h2>
      <p>Article component デス</p>
      <section>
        <img src={arupaka} alt="画像はイメージです"/>
      </section>
    </article>
 </>
)

export default Article