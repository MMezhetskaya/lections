# Lection 01 - основы HTML

## Набор инструментов

- редактор (IDE, простой текстовый)
- испектор
- [валидатор](https://validator.w3.org)
- [графический редактор](https://www.gimp.org/downloads/)
- [форматирование](http://jsbeautifier.org/)
- [git](https://github.com/)
    
## Поговорим о HTML

- HTML (HyperText Markup Language)

- HyperText

- Цели и задачи

### Структура HTML

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
- head -> meta, link, script, style или title
- body
- Комментарий
- h1, p
- [Ура пример!!!](https://translate.google.com/)

## Элементы

- Правила написания <space><space>
```html
<element>Some text</element>
```

- Вложения элементов <space><space>
```html
<element_0>
    Some text
    
    <element_1>
        Some text
    </element_1>
</element_0>
```

- Порядок открывающих и закрывающих тегов(самозакрывающие) <space><space>
```html
<element_0>
    Some text
    
    <element_1>
    
    <element_2>
        Some text
    </element_2>
</element_0>
```

- [Весь список элементов](https://www.w3.org/community/webed/wiki/HTML/Elements) 

- [Ура пример!!!](https://translate.google.com/)


## Атрибуты

- Атрибут со значением <space><space>
```html
<element attribute="value">Some text</element>
```

- Атрибут логический <space><space>
```html
<element attribute>Some text</element>
```

- [Универсальные атрибуты](https://www.w3.org/wiki/HTML/Attributes/_Global)

- Значения атрибутов

- [Ура пример!!!](https://translate.google.com/)
   
## Тип елементов

- строчные

- блочные

- [Все типы](https://www.w3.org/community/webed/wiki/HTML/Elements)

- [Ура пример!!!](https://translate.google.com/)
 
##  Текст

- Особенности(пробелы, переносы)

- [Весь список](https://www.w3.org/wiki/HTML/Elements) - Text-level semantics

- [Спецсимволы](https://dev.w3.org/html5/html-author/charref)

## [Ссылки](https://www.w3.org/community/webed/wiki/HTML/Elements/a)

- a <space><space>
```html
<a href="<where to go>">Some text</a>
```

- Абсолютные и относительные ссылки

- Обычная ссылка, посещённая ссылка, активная ссылка

- Другие ссылки mailto:, callto:, tel:

- Якоря, пустые ссылки

## Списки
- маркированный (неупорядоченный) список [ul](https://www.w3.org/community/webed/wiki/HTML/Elements/ul) <space><space>
```html
<ul>
  <li>Первый пункт</li>
  <li>Второй пункт</li>
  <li>Третий пункт</li>
</ul>
```
- нумерованный (упорядоченный) список [ol](https://www.w3.org/community/webed/wiki/HTML/Elements/ol) <space><space>
```html
<ol>
  <li>Первый пункт</li>
  <li>Второй пункт</li>
  <li>Третий пункт</li>
</ol>
```
- список описаний [dl](https://www.w3.org/community/webed/wiki/HTML/Elements/dl) <space><space>
```html
<dl>
  <dt>Первый термин</dt>
  <dd>Описание первого термина</dd>
  <dt>Второй термин</dt>
  <dd>Описание второго термина</dd>
</dl>
```

## Изображения [img](https://www.w3.org/community/webed/wiki/HTML/Elements/img)

- Форматы PNG, JPEG, GIF и SVG.

- img <space><space>
```html
<img src="<where img located>" alt="<some text described image>">
```

## Таблицы [table](https://www.w3.org/community/webed/wiki/HTML/Elements/table)

- table, tr, td, th <space><space>
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
- caption <space><space>
```html
<caption>Заголовок</caption>
```

- Объединение ячеек colspan, rowspan
    
## Формы [form](https://www.w3.org/community/webed/wiki/HTML/Elements/form)
- form action, method, submit <space><space>
```html
<form method="post" action="/">
    <p><b>Вопрос ?</b></p>
    <p>
        <input type="radio" name="answer" value="a1">Ответ 1<br>
        <input type="radio" name="answer" value="a2">Ответ 2<br>
        <input type="radio" name="answer" value="a3">Ответ 3
    </p>
    <p><button type="submit">Сохранить</button>
</form>
```

- textarea <space><space>
```html
<textarea></textarea>
```

- select <space><space>
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
    - placeholder <space><space>
    
```html
<input type="text" name="myName" placeholder="Please fill me" value="">
```

## Iframes <space><space>
```html
<iframe src="https://php-academy.kiev.ua/" width="468" height="60"></iframe>
```

## ДЗ

Создайте вашу персональную страницуна базе шаблона <space><space>
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Моя первая веб-страница</title>
</head>

<body>
    <!-- Ниже будут елементы вашей страницы -->
    <!-- 1. -->
    <!-- 2. -->
    <!-- 3. -->
    <!-- 4. -->
    <!-- 5. -->
</body>
</html>
```

1. Сделайте логотип в стиле google где вместо google будет ваша фамилия ([ссылка на логотип](https://www.google.com.ua/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png)).
 - Используйте [Gimp](https://www.gimp.org/downloads/), или любой другой вам знакомый графический редактор
 - Вставьте изображение в документ
 
2. Опишите себя и свои навыки используя любой из елементов типа списка

3. Используя елемент таблица, опишите свой недельный распорядок дня(кратко, в виде календарного листа)

4. Используя елемент форма, создайте небольшой опросник(понравилась ли страница)
    
    - ряд радио батонов можно выбрать из 'да, норм, потянет, так себе'
    
    - оставить свой комментарий
    
    - кнопка отправить
 
5. Используя блочный елемент оставьте свои копирайты


## Справочники
- [Gimp](https://www.gimp.org/downloads/)
- [Git](https://github.com/)
- [Валидатор](https://validator.w3.org)
- [форматирование](http://jsbeautifier.org/)
- [Полезная информация про элементы, язык англ](https://www.w3.org/wiki/HTML/Elements)
- [Полезная информация про элементы, частично переведён](https://developer.mozilla.org/ru/docs/Web/HTML/Element)
- [Полезная информация про элементы, переведена](https://webref.ru/html)
- [Полезная информация про блочные элементы, переведена](http://htmlbook.ru/html/type/block)
- [Полезная информация про строчные элементы, переведена](http://htmlbook.ru/html/type/inline)