import React from 'react'
function Category() {
    return(
        <div className="category--choose">
            <h3 className='categoryChoose'>Выбери категорию</h3>
            <button type='button'>Животные</button>
            <button type='button'>Еда</button>
            <button type='button'>Вещи</button>
            <button type='button'>Люди</button>
            <button type='button'>Путешествия</button>
            <button type='button'>Погода</button>
            <button type='button'>Привествие</button>
        </div>
    )
}
export default Category;