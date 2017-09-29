# Lection 01 - основы HTML

## HTML в деталях
- HyperText
- HTML (HyperText Markup Language) — определяет последовательность и тип элементов на веб-странице
- Набор инструментов
    - редактор (IDE, простой текстовый)
    - [валидатор](https://validator.w3.org)
    - [графический редактор](https://www.gimp.org/downloads/)
- Цели и задачи:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Моя первая веб-страница</title>
</head>

<body>
    <h1>Заголовок страницы</h1>
    <p>Основной текст.</p>
</body>
</html>
```

## Элементы
- Правила написания
- Порядок открывающих и закрывающих тегов(самозакрывающие)
- Комментарии в HTML '<!-- Комментарий -->'
- Вложения элементов
- [Весь список](https://www.w3.org/community/webed/wiki/HTML/Elements) 

## Структура HTML
- HTML
    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Моя первая веб-страница</title>
    </head>
    
    <body>
        <!-- Комментарий -->
        <h1>Заголовок страницы</h1>
        <p>Основной текст.</p>
        <p>Основной текст второй абзац.</p>
    </body>
    </html>
    ```
    - DOCTYPE
    - html
    - head
        -  base, link, meta, script, style или title
    - body
    - h1
    - Комментарий
    - p

## Атрибуты
- Атрибут со значением 
    ```html
    <element атрибут="значение">…</element>
    <img src="image/path/name.png" alt="Name" width="196" height="183">
    ```
- Атрибут логический
    ```html
    <element атрибут>…</element>
    <input type="text" name="name" val="0" readonly>
    ```
    - readonly
    - readonly=""
    - readonly="readonly"
- Порядок атрибутов
- [Универсальные атрибуты](https://www.w3.org/wiki/HTML/Attributes/_Global) class, id, style.
- [Значения атрибутов](https://www.w3.org/wiki/HTML/Elements/input)
    - Ключевое слово
    - Строка
    - Адрес
    - Числа
    - Проценты
    - Код языка(lang)
   
## Тип елементов
- строчные
- блочные
[Типы](https://www.w3.org/wiki/HTML/Elements)
 
##  Текст
- Особенности(пробелы, переносы)
- pre
- p
- br
- h1 - h6
- Верхний и нижний индексы(sup, sub)
- [Спецсимволы](https://dev.w3.org/html5/html-author/charref)
- Переносы в тексте
- [Форматирование](https://www.w3.org/wiki/HTML/Elements) - Text-level semantics

## Ссылки
- Вид:
```html
<a href="<адрес>">текст ссылки</a>
```
- Абсолютные и относительные ссылки
- Обычная ссылка, посещённая ссылка, активная ссылка
- Атрибуты target, download
- Другие ссылки mailto:, callto:, tel:
- Якоряб пустые ссылки

## Списки
- маркированный (неупорядоченный) список
```html
<ul>
  <li>Первый пункт</li>
  <li>Второй пункт</li>
  <li>Третий пункт</li>
</ul>
```
- нумерованный (упорядоченный) список
```html
<ol>
  <li>Первый пункт</li>
  <li>Второй пункт</li>
  <li>Третий пункт</li>
</ol>
```
- список описаний.
```html
<dl>
  <dt>Первый термин</dt>
  <dd>Описание первого термина</dd>
  <dt>Второй термин</dt>
  <dd>Описание второго термина</dd>
</dl>
```
## Изображения
- Форматы PNG, JPEG, GIF и SVG.
- img
```html
<img src="<адрес>" alt="<альтернативный текст>">
```
- Атрибуты width и height

## Таблицы
- table, tr, td, th
```html
<table>
    <tr>
        <th>Ячейка 1</th>
        <th>Ячейка 2</th>
    </tr>
    <tr>
        <td>Ячейка 3</td>
        <td>Ячейка 4</td>
    </tr>
</table>
```
- caption
```html
<caption>Заголовок</caption>
```
- Объединение ячеек
    - colspan
    - rowspan
    
## Формы
- form
    - action
    - method
    - submit
```html
<form method="post" action="/">
  <p><b>Вопрос ?</b></p>
  <p>
      <input type="radio" name="answer" value="a1">Ответ 1<br>
      <input type="radio" name="answer" value="a2">Ответ 2<br>
      <input type="radio" name="answer" value="a3">Ответ 3
  </p>
  <p><input type="submit"></p>
 </form>
 </body>
```
- textarea
- select
    - option
```html
<p>
  <label for="unittype">Select unit type:</label>
  <select id="unittype" name="unittype">
    <option value="1"> Miner </option>
    <option value="2"> Puffer </option>
    <option value="3" selected> Snipey </option>
    <option value="4"> Max </option>
    <option value="5"> Firebot </option>
  </select>
</p>
```
- input 
    - types text, password, submit, reset, checkbox, radio;
    - value
    - placeholder
```html
<input type="text" name="myName" placeholder="Please fill me" value="">
```
## Iframes
```html
<iframe src="https://php-academy.kiev.ua/" width="468" height="60"></iframe>
```

## Справочники
- [Git ссылка на лекцию](https://github.com/Zlodej43sm/lections/tree/master/01.layout)
- [Полезная информация про элементы, язык англ](https://www.w3.org/wiki/HTML/Elements)
- [Полезная информация про элементы, частично переведён](https://developer.mozilla.org/ru/docs/Web/HTML/Element)
- [Полезная информация про элементы, переведена](https://webref.ru/html)
- [Полезная информация про блочные элементы, переведена](http://htmlbook.ru/html/type/block)
- [Полезная информация про строчные элементы, переведена](http://htmlbook.ru/html/type/inline)