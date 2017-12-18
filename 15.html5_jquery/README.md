## HTML5

Под термином HTML5 обычно подразумевается последняя версия спецификации языка разметки HTML, но этот термин также используется для обозначения целого комплекса вебтехнологий, которые разрабатываются и определяются как часть языка разметки HTML или сопутствующие ему. Официально этот комплекс технологий называется «Open Web Platform».

### [Геопозиционирование](http://www.w3.org/TR/geolocation­API/)

Прикладной интерфейс объекта Geolocation позволяет программам на языке JavaScript запрашивать у броузера географическое местонахождение пользователя. Такие приложения могут отображать карты, маршруты и другую информацию, связанную с текущим местонахождением пользователя. 

Броузеры с поддержкой интерфейса Geolocation определяют свойство **navigator.geolocation**. Это свойство ссылается на объект с тремя методами:
- navigator.geolocation.getCurrentPosition() - запрашивает текущее географическое местонахождение пользователя.

- navigator.geolocation.watchPosition() - не только запрашивает текущее местонахождение, но и продолжает следить за координатами, вызывая указанную функцию обратного вызова при изменении местонахождения пользователя.

- navigator.geolocation.clearWatch() - останавливает слежение за местонахождением пользователя. В аргументе этому методу следует передавать число, возвращаемое соответствующим вызовом метода watchPosition().

В устройствах, включающих аппаратную поддержку GPS, имеется возможность определять местонахождение с высокой степенью точности с помощью устройства GPS.

```javascript
navigator.geolocation.getCurrentPosition(function(pos) {
    var latitude = pos.coords.latitude,
        longitude = pos.coords.longitude;
    
    alert('Ваши координаты: ' + latitude + ', ' + longitude);
});
```

```javascript
function getmap() { 
    if (!navigator.geolocation) throw 'Определение местонахождения не поддерживается';
    
    var image = document.createElement('img');
    
    navigator.geolocation.getCurrentPosition(setMapURL);
    
    document.body.appendChild(image);
    return image;
    
    function setMapURL(pos) {
        var latitude = pos.coords.latitude,
            longitude = pos.coords.longitude, 
            accuracy = pos.coords.accuracy,
            url = 'http://maps.google.com/maps/api/staticmap' + '?center=' + latitude + ',' + longitude +                   '&size=640x640&sensor=true',
            zoomlevel=20; 
        
        if (accuracy > 80) zoomlevel -= Math.round(Math.log(accuracy/50)/Math.LN2);
        
        url += '&zoom=' + zoomlevel; 
        image.src = url;
    }
}
```

### Аудио && видео

```html
<audio src='background_music.mp3'/>
<video src='news.mov' width=320 height=240/>
```

Производители броузеров не смогли прийти к соглашению о стандарте на аудио и видеокодеки, которые поддерживались бы всеми броузерами, вследствие чего обычно приходится использовать элементы <source>, чтобы указать несколько источников мультимедийных данных в различных форматах:


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

```javascript
var a = new Audio();

if (a.canPlayType('audio/wav')) {
    a.src = 'soundeffect.wav';
    a.play();
}
```

### [SVG](https://developer.mozilla.org/ru/docs/Web/SVG)

Масштабируемая векторная графика (SVG) – это грамматика языка XML для описания графических изображений. Рисунки в формате SVG могут даже содержать JavaScript - сценарии и таблицы CSS-стилей, что позволяет наделить их информацией о поведении и представлении. 

```html
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'>
    <defs>
        <linearGradient id='fade'>
            <stop offset='0%' stop-color='#008'/>
            <stop offset='100%' stop-color='#ccf'/>
        </linearGradient>
  </defs>
  
  <rect x='100' y='200' width='800' height='600' stroke='black' stroke-width='25' fill='url(#fade)'/>
</svg>
```

Отображение времени посредством манипулирования SVG­изображением.

```javascript
function updateTime() {
    var now = new Date();
    var min = now.getMinutes();
    var hour = (now.getHours() % 12) + min/60; 
    var minangle = min*6;
    var hourangle = hour*30;
    var minhand = document.getElementById('minutehand');
    var hourhand = document.getElementById('hourhand');
    
    minhand.setAttribute('transform', 'rotate(' + minangle + ',50,50)');
    hourhand.setAttribute('transform', 'rotate(' + hourangle + ',50,50)');
    
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
<div onload='updateTime()'>
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

Элемент <canvas> не имеет собственного визуального представления, но он создает поверхность для рисования внутри документа и предоставляет сценариям на языке JavaScript мощные средства рисования. Элемент <canvas> стандартизован спецификацией HTML5, но существует дольше его.

Существенное отличие между элементом <canvas> и технологией SVG заключается в том, что при использовании элемента <canvas> изображения формируются вызовами методов, в то время как при использовании формата SVG изображения описываются в виде дерева XML-элементов.

```html
    Это красный квадрат: <canvas id='square' width=10 height=10></canvas>.
    Это голубой круг: <canvas id='circle' width=10 height=10></canvas>.
    
    <script> 
        var canvas = document.getElementById('square');
        var c = canvas.getContext('2d');
        
        c.fillStyle = '#f00';
        context.fillRect(0,0,10,10);
            
        canvas = document.getElementById('circle');
        c = canvas.getContext('2d');
        c.beginPath();
        c.arc(5, 5, 5, 0, 2*Math.PI, true);
        c.fillStyle = '#00f';
        c.fill();
    </script>
```

```html
    <script> 
        var canvas = document.getElementById('area');
        var c = canvas.getContext('2d');
        
        c.beginPath();
        c.moveTo(100, 100);
        c.lineTo(200, 200);
        c.lineTo(100, 200);
        c.fill();
        c.stroke();
    </script>
```

## [jQuery](https://jquery.com/)
 
В языке JavaScript чрезвычайно простой базовый и весьма сложный клиентский API, который к тому же отягощен многочисленными несовместимостями между броузерами.
 
Веб-приложения удобнее писать с использованием фреймворков или вспомогательных библиотек на языке JavaScript, упрощающих решение типичных задач и скрывающих различия между броузерами.
  
Библиотека jQuery упрощает поиск элементов документа и облегчает манипулирование ими: добавление содержимого, изменение HTML-атрибутов и CSS-свойств, определение обработчиков событий и воспроизведение анимационных эффектов. Она также имеет вспомогательные функции поддержки архитектуры Ajax, позволяющие выполнять динамические HTTP-запросы, и функции общего назна- чения для работы с объектами и массивами.
  
- Выразительный синтаксис (CSS-селекторов) для ссылок на элементы в документе

- Эффективная реализация механизма запросов, выполняющего поиск множества элементов документа, соответствующих указанному CSS-селектору

- Множество удобных методов для манипулирования множествами выбранных элементов
 
- Мощные приемы функционального программирования для выполнения операций сразу над всей группой элементов
 
- Выразительная идиома представления последовательностей операций (составление цепочек из вызовов методов)

### Основа
Библиотека jQuery определяет единственную глобальную функцию с именем **jQuery()**. Эта функция используется настолько часто, что библиотека определяет также глобальное имя **$**, как сокращенный псевдоним этой функции.  

- Вызов.

```javascript
jQuery(selector[, context]);
$(selector[, context]);
```

- Документ загружен.

```javascript
jQuery(function() { 
    
});
```

- Вызвать в безопасном режиме.

```javascript
jQuery.noConflict();

jQuery(function($) { 
    
});
```

### Селекторы

- Когда функции **$()** передается CSS-селектор, она возвращает объект **jQuery**, представляющий множество («выбранных») элементов, соответствующих селектору.

```javascript
$(selector);
```

- Возвращает объекты, подобные массивам

```javascript
$(selector).length;
$(selector)[0];
```

Если при работе с объектом jQuery вы предпочитаете не использовать синтаксис массивов, вместо свойства **length** можно использовать метод **size()**, а вместо индексов в квадратных скобках – метод **get()**. Если потребуется преобразовать объект jQuery в настоящий массив, можно вызвать метод **toArray()**.

Если потребуется обойти в цикле все элементы в объекте jQuery, вместо цикла **for** можно использовать метод **each()**.

Свойство context ссылается на объект контекста, который был передан функции **$()** во втором аргументе, в противном случае оно будет ссылаться на объект **Document**.

```javascript
var bodyscripts = $('script', document.body);

bodyscripts.selector;
bodyscripts.context;
bodyscripts.jquery;
```

- each

```javascript
$('div').each(function(i) { 
    
}); 
```

- map

```javascript
$('div').map(function() { 
    
}); 
```

- index

```javascript
$('div').index($('.class'))
```

- is

```javascript
$('div').each(function() {
    if ($(this).is('.class')) return;
});
```

### Добавление и изменение атрибутов

```javascript
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

```javascript
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

```javascript
$('h1').addClass('hilite');

$('section').addClass(function(n) {
    return 'section' + n;
}); 

$('p').removeClass('hilite');

$('section').removeClass(function(n) { 
    return 'section' + n;
});

$('tr:odd').toggleClass('oddrow'); 

$('h1').toggleClass(function(n) { 
    return 'big bold h1-' + n;
});

$('p').hasClass('first') ;
```


### Работа с DOM 

```javascript
var img = $('<img/>',
    { 
        src:url,
        css: {
            borderWidth:5
        }
    }, 
    click: handleClick  
});


var title = $('head title').text();

var headline = $('h1').html();

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

- blur(),

- focusin(), 

- mousedown(), 

- mouseup(), 

- change(), 

- focusout(), 

- mouseenter(), 

- resize(), 

- click(), 

- keydown(), 

- mouseleave(), 

- scroll(), 

- dblclick(), 

- keypress(), 

- mousemove(), 

- select(), 

- error(), 

- keyup(), 

- mouseout(), 

- submit(), 

- focus(), 

- load(), 

- mouseover(), 

- unload()

```javascript
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

Если обработчик вернет **false**, будут отменены и действия, предусмотренные по умолчанию для этого типа события, и дальнейшее распространение события. То есть возврат значения **false** равносилен вызову методов **preventDefault()** и **stopPropagation()** объекта Event. Кроме того, когда обработчик события возвращает значение (отличное от **undefined**), библиотека jQuery сохраняет это значение в свойстве **result** объекта **Event**, к которому можно обратиться в обработчиках событий, вызываемых вслед за этим обработчиком.

**Event**

- preventDefault()

- isDefaultPrevented()

- stopPropagation()

- isPropagationStopped()

- stopImmediatePropagation()

- isImmediatePropagationStopped()

- pageX, pageY

- target, currentTarget, relatedTarget

- timeStamp

- which

- data

- handler

- result

- originalEvent

**[Ajax](http://api.jquery.com/category/ajax/)**

```javascript
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