function replaceVal(str, v, val) {
    let newStr = str,
        optRegExp = new RegExp('{' + v + '}', 'g');

    newStr = newStr.replace(optRegExp, val);

    return newStr;
}

function renderSubItem (obj) {
    let htmlSum = '';

    for (let i = 0; i < obj.length; i++) {
        let htmlReplaced = '<li><a href="{url}">{name}</a></li>';
        // debugger;
        for (let key in obj[i]) {
            if(!obj[i].hasOwnProperty(key)) continue;

            if(typeof obj[i][key] === 'object')  {
                htmlReplaced = `<li>${htmlReplaced.replace('<li>', '').replace('</li>', '')} <ul>${ renderSubItem(obj[i][key]) }</ul></li>`;
            } else {
                htmlReplaced = `${replaceVal(htmlReplaced, key, obj[i][key])}`;
            }
        }

        htmlSum += htmlReplaced;
    }

    return htmlSum;
}

var dataMenu = [
    {
        name: 'Главная',
        url: 'www'
    },
    {
        name: 'O нас',
        url: 'www',
        items: [
            {
                name: 'Кто мы',
                url: 'www',
                items: [
                    {name: 'Кто мы', url: 'www'},
                    {name: 'Где мы', url: 'www'},
                    {name: 'Откуда', url: 'www'}
                ]
            },
            {name: 'Где мы', url: 'www'},
            {name: 'Откуда', url: 'www'}
        ]
    },
    {
        name: 'Контакты',
        url: 'www'
    }
];

let data = renderSubItem(dataMenu);
