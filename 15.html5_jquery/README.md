# Lection 15

## HTML5

**HTML5** - последняя версия спецификации языка разметки **HTML**

### Аудио && видео

```html
<audio src='background_music.mp3'/>
<video src='news.mov' width=320 height=240/>
```

**Из минусов**

- нет и к соглашению о стандарте на аудио и видеокодеков

- выход есть 

```html
<audio id='music'>
    <source src='music.mp3' type='audio/mpeg'>
    <source src='music.ogg' type='audio/ogg; codec='vorbis''>
</audio>
```

```html
<video id='news' width=640 height=480 controls preload>
    <source src='news.webm' type='video/webm; codecs='vp8, vorbis''>
    <source src='news.mp4' type='video/mp4; codecs='avc1.42E01E, mp4a.40.2''>
    
    <object width=640 height=480 type='application/x-shockwave-flash' data='flash_movie_player.swf'>
        <div>Элемент video не поддерживается и расширение Flash не установлено.</div>
   </object>
</video>
```

```js
var a = new Audio();

if (a.canPlayType('audio/wav')) {
    a.src = 'soundeffect.wav';
    a.play();
}
```

### [SVG](https://developer.mozilla.org/ru/docs/Web/SVG)

> Масштабируемая векторная графика (**SVG**) – это грамматика языка **XML** для описания графических изображений. Рисунки в формате **SVG** могут даже содержать **JavaScript** - сценарии и таблицы **CSS**-стилей, что позволяет наделить их информацией о поведении и представлении.

Отображение времени посредством манипулирования **SVG**­изображением.

```js
function updateTime() {
    let now = new Date(),
        min = now.getMinutes(),
        hour = (now.getHours() % 12) + min/60,
        minangle = min*6,
        hourangle = hour*30,
        minhand = document.getElementById('minutehand'),
        hourhand = document.getElementById('hourhand');
    
    minhand.setAttribute('transform', `rotate(${minangle}, 50,50)`);
    hourhand.setAttribute('transform', `rotate(${hourangle} ,50,50)`);
    
    setTimeout(updateTime, 60000);
}
```

```css
#clock {
    stroke: black;
    stroke-linecap: round;
    fill: #eef;
}

#face {
    stroke-width: 3px;
}

#ticks { 
    stroke-width: 2;
 }

#hourhand {
    stroke-width: 5px;
}

#minutehand {
    stroke-width: 3px;
}

#numbers {
    font-family: sans-serif;
    font-size: 7pt;
    font-weight: bold;     
    text-anchor: middle; 
    stroke: none; 
    fill: black;
}
```

```html
<div>
    <svg id='clock' viewBox='0 0 100 100' width='500' height='500'>
        <defs>
            <filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'> 
                <feGaussianBlur in='SourceAlpha' stdDeviation='1' result='blur' />
                <feOffset in='blur' dx='1' dy='1' result='shadow' />
                <feMerge>
                    <feMergeNode in='SourceGraphic'/>
                    <feMergeNode in='shadow'/>
                </feMerge>
            </filter>
         </defs>
        
        <circle id='face' cx='50' cy='50' r='45'/>
        <g id='ticks'>
            <line x1='50' y1='5.000' x2='50.00' y2='10.00'/>
            <line x1='72.50' y1='11.03' x2='70.00' y2='15.36'/>       
            <line x1='88.97' y1='27.50' x2='84.64' y2='30.00'/>       
            <line x1='95.00' y1='50.00' x2='90.00' y2='50.00'/>
            <line x1='88.97' y1='72.50' x2='84.64' y2='70.00'/>       
            <line x1='72.50' y1='88.97' x2='70.00' y2='84.64'/>       
            <line x1='50.00' y1='95.00' x2='50.00' y2='90.00'/>       
            <line x1='27.50' y1='88.97' x2='30.00' y2='84.64'/>       
            <line x1='11.03' y1='72.50' x2='15.36' y2='70.00'/>       
            <line x1='5.000' y1='50.00' x2='10.00' y2='50.00'/>       
            <line x1='11.03' y1='27.50' x2='15.36' y2='30.00'/>       
            <line x1='27.50' y1='11.03' x2='30.00' y2='15.36'/>
        </g>
        
        <g id='numbers'>
            <text x='50' y='18'>12</text><text x='85' y='53'>3</text>
            <text x='50' y='88'>6</text><text x='15' y='53'>9</text>
        </g>
        
        <g id='hands' filter='url(#shadow)'>
            <line id='hourhand' x1='50' y1='50' x2='50' y2='24'/>       
            <line id='minutehand' x1='50' y1='50' x2='50' y2='20'/>
        </g>
    </svg>
</div>
```

### [Canvas](https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/%D0%A0%D0%B8%D1%81%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D1%84%D0%B8%D0%B3%D1%83%D1%80)

> **Canvas** - элемент **HTML5**, предназначенный для создания растрового двухмерного изображения при помощи скриптов, обычно на языке **JavaScript**

```html
Это красный квадрат: <canvas id='square' width=10 height=10></canvas>.
Это голубой круг: <canvas id='circle' width=10 height=10></canvas>.

<script> 
    let canvas = document.getElementById('square'),
        c = canvas.getContext('2d');
    
    c.fillStyle = '#f00';
    
    c.fillRect(0,0,10,10);
    
    canvas = document.getElementById('circle');
    c = canvas.getContext('2d');
    
    c.beginPath();
    c.arc(5, 5, 5, 0, 2*Math.PI, true);
    c.fillStyle = '#00f';
    c.fill();
</script>
```

- **canvas** не имеет собственного визуального представления, но он создает поверхность для рисования внутри документа

### Canvas vs SVG

- **Canvas**

    - лучшая производительность

    - сами реализовать все концепции управляемого состояния (выбор объекта и т.д.) или использовать библиотеку

- **SVG**

    - выбор и перемещение уже встроены

    - объекты **SVG** являются объектами **DOM**

**Итого**

- **Canvas** лучше для:

    - тысяч объектов и тщательной манипуляции

    - для его получения требуется гораздо больше кода (или библиотеки)

- **SVG** лучше для:

    - приложений с небольшим количеством элементов

### [Геопозиционирование](http://www.w3.org/TR/geolocation­API/)

> Прикладной интерфейс объекта Geolocation позволяет программам на языке JavaScript запрашивать у браузера географическое местонахождение пользователя. Такие приложения могут отображать карты, маршруты и другую информацию, связанную с текущим местонахождением пользователя.

**navigator.geolocation**
 
- **navigator.geolocation.getCurrentPosition()**

- **navigator.geolocation.watchPosition()** 

- **navigator.geolocation.clearWatch()**

*В устройствах, включающих аппаратную поддержку **GPS**, имеется возможность определять местонахождение с высокой степенью точности с помощью устройства **GPS**.

```js
navigator.geolocation.getCurrentPosition((pos) => {
    let latitude = pos.coords.latitude,
        longitude = pos.coords.longitude;
    
    console.log(`Ваши координаты: ${latitude} ${longitude}`);
});
```

```js
function getmap() { 
    if (!navigator.geolocation) throw 'Определение местонахождения не поддерживается';
    
    let image = document.createElement('img');
    
    navigator.geolocation.getCurrentPosition(setMapURL);
    document.body.appendChild(image);
    
    return image;
    
    function setMapURL(pos) {
        let latitude = pos.coords.latitude,
            longitude = pos.coords.longitude, 
            accuracy = pos.coords.accuracy,
            url = `http://maps.google.com/maps/api/staticmap?center=${latitude},${longitude}&size=640x640&sensor=true`,
            zoomlevel = 20; 
        
        if (accuracy > 80) zoomlevel -= Math.round(Math.log(accuracy/50)/Math.LN2);
        
        url += '&zoom=' + zoomlevel; 
        
        image.src = url;
    }
}
```

## [jQuery](https://jquery.com/)
 
- выразительный синтаксис (CSS-селекторов)

```js
$('.some_class span').each(...);
```

- манипулирование множествами выбранных элементов

```js
$('.some_class').addClass(...);
```

- работа с событиями

```js
$('.some_class').on('click', foo);
$('.some_class').off('click', foo);

...

$('.some_class').on('click.someNameSpace', foo);
$('.some_class').on('click.someAnotherNameSpace', fooBar);
$('.some_class').on('change.someNameSpace', bar);
$('.some_class').off('.someNameSpace');
```

- составление цепочек из вызовов методов

```js
$('.some_class')
    .addClass(...)
    .each(...)
    .on('click', foo);
```

- вспомогательные функции поддержки архитектуры **Ajax**

```js
$.ajax({
        method: "POST",
        url: "url/",
        data: { name: "John", location: "Boston" }
    })
    .done(foo)
    .fail(bar);
```

### Основа

- **jQuery**

- **$**

```js
jQuery(selector[, context]);

$(selector[, context]);
```

- документ загружен

```js
jQuery(function() { 
    
});
```

- вызвать в безопасном режиме

```js
jQuery.noConflict();

jQuery(function($) { 
    
});
```

### Селекторы

- **$()** возвращает объект **jQuery**

```js
$(selector);
```

- **context**

```js
let bodyscripts = $('script', document.body);

...

let querySpan = $('span', 'anyQuery');
```

- **each**

```js
$('div').each(function(i) { 
    ...
}); 
```

- **map**

```js
$('div').map(function() { 
    ...
});
```

### Добавление и изменение атрибутов

```js
$('form').attr('action');

$('#icon').attr('src', 'icon.gif');

$('#banner').attr(
    {
        src:'banner.gif',
        alt:'Advertisement',
        width:720, 
        height:64
    }
);

$('a').attr('target', function() {
    
});

$('a').attr({target: function() {
    
}});

$('a').removeAttr('target');
```

### Способы изменения CSS-стилей.

```js
$('h1').css('font-weight');

$('h1').css('fontWeight');

$('h1').css('font');

$('h1').css('font-variant', 'smallcaps');

$('div.note').css('border', 'solid black 2px');

$('h1').css({ 
    backgroundColor: 'black',
    textColor: 'white',
    fontVariant: 'small-caps',
    padding: '10px 2px 4px 20px', 
    border: 'dotted black 4px' 
}); 

$('h1').css(
    'font-size',
     function(i, curval) { 
        return Math.round(1.25*parseInt(curval));
    }
);
```

### Манипуляция классами

```js
$('h1').addClass('highlight');

$('section').addClass(function(n) {
    return 'section' + n;
}); 

...

$('p').removeClass('highlight');

$('section').removeClass(function(n) { 
    return 'section' + n;
});

...

$('tr:odd').toggleClass('oddrow'); 

$('h1').toggleClass(function(n) { 
    return 'big bold h1-' + n;
});

...

$('p').hasClass('first') ;
```


### Работа с DOM 

```js
let img = $('<img/>',
    { 
        src:url,
        css: {
            borderWidth:5
        }
    }, 
    click: handleClick  
});

...

let title = $('head title').text();

let headline = $('h1').html();

//appendTo()
$('#log').append('<br/>' + message);

//prependTo()
$('h1').prepend('§');

//insertBefore()
$('h1').before('<hr/>');

//insertBefore()
$('h1').after('<hr/>'); 

//replaceAll()
$('hr').replaceWith('<br/>');

$('a').clone();

$('h1').wrap(document.createElement('i'));

$('h1').wrapInner('<i/>');

$('#header').unwrap();

$('#header').empty();

$('#header').remove();

$('#header').detach();
```

### События

- **blur()**

- **focusin()**

- **mousedown()** 

- **mouseup()** 

- **change()** 

- **focusout()** 

- **mouseenter()** 

- **resize()** 

- **click()** 

- **keydown()** 

- **mouseleave()** 

- **scroll()** 

- **dblclick()** 

- **keypress()** 

- **mousemove()** 

- **select()** 

- **error()** 

- **keyup()** 

- **mouseout()** 

- **submit()** 

- **focus()** 

- **load()** 

- **mouseover()** 

- **unload()**

```js
$('p').click(function(e) {});

$('p').on('click', f);

$('p').one('click', f);

$('a').on('mouseenter mouseleave', f);

$('a').on('mouseover.myMod', f);

$('a').on({mouseenter:f, mouseleave:g});

$('p').off('click', f);

$('a').off('mouseover.myMod mouseout.myMod');

$('a').off('.myMod'); 

$('a').off('click.ns1.ns2');
```

**Полезно**

- обработчик вернет **false**

    - отменены действия, предусмотренные по умолчанию для этого типа события

    - дальнейшее распространение события

Равносильно вызову методов **preventDefault()** и **stopPropagation()** объекта **Event**.

Кроме того, когда обработчик события возвращает значение (отличное от **undefined**)

- сохраняет это значение в свойстве **result** объекта **Event**

- можно обратиться в обработчиках событий, вызываемых вслед за этим обработчиком

**Event**

- **preventDefault()**

- **isDefaultPrevented()**

- **stopPropagation()**

- **isPropagationStopped()**

- **stopImmediatePropagation()**

- **isImmediatePropagationStopped()**

- **pageX, pageY**

- **target, currentTarget, relatedTarget**

- **timeStamp**

- **which**

- **data**

- **handler**

- **result**

- **originalEvent**

**[Ajax](http://api.jquery.com/category/ajax/)**

```js
$.ajax();

$.get();

$.post();
```

**[jQuery UI](http://jqueryui.com/)**
 
### Заключение

### ДЗ

## Справочники
- [Геопозиционирование](http://www.w3.org/TR/geolocation­API/)
- [SVG](https://developer.mozilla.org/ru/docs/Web/SVG)
- [Canvas](https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/%D0%A0%D0%B8%D1%81%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D1%84%D0%B8%D0%B3%D1%83%D1%80)
- [jQuery](https://jquery.com/)
- [Ajax](http://api.jquery.com/category/ajax/)
- [jQuery UI](http://jqueryui.com/)