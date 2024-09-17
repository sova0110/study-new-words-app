import React from 'react'

import Words from './Words';

function WordsList() {
    return (
        <React.Fragment>
            <Words
                title="Fox"
                translate="Лиса"
                language = "английский"
                category = "животные"
                imgLink="https://i.pinimg.com/736x/07/8b/34/078b342510bc3137df0357df14efc299.jpg"
            />
            <Words
                title="Zorro/Zorra"
                translate="Лиса"
                language = "Испанский"
                category = "животные"
                imgLink="https://i.pinimg.com/736x/07/8b/34/078b342510bc3137df0357df14efc299.jpg"
            />
            <Words
                title="Rev"
                translate="Лиса"
                language = "Норвежский"
                category = "животные"
                imgLink="https://i.pinimg.com/736x/07/8b/34/078b342510bc3137df0357df14efc299.jpg"
            />
            <Words
                title="Orange"
                translate="Апельсин"
                language = "английский"
                category = "еда"
                imgLink="https://sneg.top/uploads/posts/2023-04/thumbs/1680719085_sneg-top-p-apelsin-foto-kartinki-pinterest-62.jpg"
            />
            <Words
                title="Naranja"
                translate="Апельсин"
                language = "Испанский"
                category = "еда"
                imgLink="https://sneg.top/uploads/posts/2023-04/thumbs/1680719085_sneg-top-p-apelsin-foto-kartinki-pinterest-62.jpg"
            />
            <Words
                title="oransje"
                translate="Апельсин"
                language = "Норвежский"
                category = "еда"
                imgLink="https://sneg.top/uploads/posts/2023-04/thumbs/1680719085_sneg-top-p-apelsin-foto-kartinki-pinterest-62.jpg"
            />
            <Words
                title="Umbrella"
                translate="Зонтик"
                language = "английский"
                category = "вещи"
                imgLink="https://avatars.mds.yandex.net/get-mpic/4120716/img_id1051843068736517400.jpeg/orig"
            />
            <Words
                title="Paraagua"
                translate="Зонтик"
                language = "Испанский"
                category = "вещи"
                imgLink="https://avatars.mds.yandex.net/get-mpic/4120716/img_id1051843068736517400.jpeg/orig"
            />
            <Words
                title="paraply"
                translate="Зонтик"
                language = "Норвежский"
                category = "вещи"
                imgLink="https://avatars.mds.yandex.net/get-mpic/4120716/img_id1051843068736517400.jpeg/orig"
            />
        </React.Fragment>
    );
}

export default WordsList;