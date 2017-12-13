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
    
    alert("Ваши координаты: " + latitude + ", " + longitude);
});
```

```javascript
function getmap() { 
    if (!navigator.geolocation) throw "Определение местонахождения не поддерживается";
    
    var image = document.createElement("img");
    
    navigator.geolocation.getCurrentPosition(setMapURL);
    
    document.body.appendChild(image);
    return image;
    
    function setMapURL(pos) {
        var latitude = pos.coords.latitude;
        var longitude = pos.coords.longitude; 
        var accuracy = pos.coords.accuracy; 
        var url = "http://maps.google.com/maps/api/staticmap" + "?center=" + latitude + "," + longitude +                   "&size=640x640&sensor=true";
        var zoomlevel=20; 
        
        if (accuracy > 80) zoomlevel -= Math.round(Math.log(accuracy/50)/Math.LN2);
        
        url += "&zoom=" + zoomlevel; 
        image.src = url;
    }
}
```

### видео



### аудио



### SVG



### Canvas


 - CSS графика
 - jQuery
 - селекторы
 - фильтры
 - работа с DOM 
 - события
 - Манипуляция свойствами, классами
 - Добавление и изменение атрибутов.
 - Способы изменения CSS-стилей.
 - Методы обработки событий в JQuery.
 - Создание анимации.
 - JQuery UI – основные виджеты
 - jquery-ajax
 
### Заключение

### ДЗ

## Справочники
- [Геопозиционирование](http://www.w3.org/TR/geolocation­API/)