# Lection 02 - Стили, CSS

## Что такое CSS
 CSS (Cascading Style Sheets) означает каскадные таблицы стилей и представляет собой язык разметки стилей (как HTML или XML). Таким образом, CSS ничего не представляет сам по себе, если не связан с HTML-документом.

### Как работает
```css
p { color: red;}
```
- CSS как атрибут
```html
<p style="color: red;">Это важный текст.</p>
```
- CSS в HEAD
```html
<!DOCTYPE html>
<html>
<head>
    <title>Привет, мир</title>
    <style>
        p { color: red;}
    </style>
</head>
<body>
    <p>Этот абзац будет красным.</p>
</body>
</html>
```
- CSS в отдельном файле

CSS файл
```css
p { color: red; }
```

HTML файл
```html
<!DOCTYPE html>
<html>
<head>
    <title>Подключаем css</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <p>Этот абзац будет красным.</p>
</body>
</html>
```

## Почему бы не размещать стиль прямо в HTML?

## Синтаксис
- правила, комментарии
```css
/* Правила CSS */
селектор { свойство: значение; }
```
- селектор определяет, на какой элемент или элементы нацелиться;
- свойство определяет характеристики для изменения;
- значение определяет, как изменить эту характеристику.

## Селекторы CSS
- Базовые селекторы тегов

```html
<p>Some text</p>
```
```css
p { color: red;}
```

- Классы
```html
<p>Some <i  class="myClass">text</i></p>
<p class="myClass">Some text</p>
```
```css
.myClass { color: red;}
```

- Идентификаторы
```html
<p id="myId">Some text</p>
```
```css
#myId { color: red;}
```

- Объединение селекторов
```html
<p>Some <i  class="myClass">text</i></p>
<p class="myClass">Some text</p>
```
```css
i.myClass { color: red;}
```

- Иерархия селекторов
```html
<p>Some <i  class="myClass">text</i></p>
<p class="myClass">Some text</p>
```
```css
p i { color: red;}
```

- Универсальный селектор *
```css
* { color: green; }
p > * { color: red; }
```

- Дочерние селекторы
```html
<p>Text p <span>text span</span> <i><span>text i > span</span></i> </p>
```
```css
p > span { color: red; }
```

- Соседние селекторы +, ~
```html
<p>Text p <span>text span</span> <i>text i</i> <i>text i</i></p>
```
```css
span + i { color: red; }
span ~ i { color: red; }
```

- Селекторы атрибутов
```html
<input type="text" value="">
```
```css
input[type="text"] { color: red; }
```

- [Псевдоклассы](https://developer.mozilla.org/ru/docs/Web/CSS/%D0%9F%D1%81%D0%B5%D0%B2%D0%B4%D0%BE-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D1%8B)

```css
a {
  color: blue;
}
  
a:hover {
  color: red;
}
```

[Псевдоэлементы](https://developer.mozilla.org/ru/docs/Web/CSS/Pseudo-elements)
```css
a::before {
    content: '<<';
}
```

### Наследование
- Распространение значения

```css
p, i, em {
    color: grey;
}
body { color: grey; }
```

- Наследуемые свойства(основа текст)
    - цвет текста;
    - шрифт (семейство, размер, стиль, насыщенность);
    - межстрочное расстояние.

### Приоритет
- Порядок правил CSS

```css
p { color: green; }
p { color: red; }
```

- Вычисление 100
    - идентификаторы (100);
    - классы (10);
    - селекторы тега (1).

```css
#introduction { color: red; }
.message { color: green; }
p { color: blue; }
```

- Конфликты
    - применяйте только классы: используйте .introduction вместо #introduction, даже если этот элемент появляется на вашей веб-странице только один раз;
    - избегайте применять несколько классов к одному элементу HTML: пишите не 'element class="big red important"', а 'element class="title"', который является семантически более описательным;
    - не используйте встроенные стили, такие как 'element style="background: blue;"'.

### Единицы размера
Наиболее часто используемые единицы:
- px для пикселей

```css
p { width: 300px; }
```

- % для процентов;

```css
p { width: 50%; }
```

- em для определения размера относительно родительского значения font-size.
    
    ```css
    body { font-size: 16px; }
    h1 { font-size: 2em; }        /* = 32px */
    h2 { font-size: 1.5em; }      /* = 24px */
    aside { font-size: 0.75em; }  /* = 12px */
    ```

    - rem 
    
    ```css
    html { font-size: 18px; }
    body { font-size: 1rem; }     /* = 18px */
    h1 { font-size: 2rem; }       /* = 36px */
    h2 { font-size: 1.5rem; }     /* = 27px */
    ```
    
- Какую единицу использовать?

### Стиль клиентского приложения
- каждый раз, когда веб-страница визуализируется;
- до того, как применяется любой из CSS.

### Применение сброса
- [Сброс стилей](http://marksheet.io/css/reset.css)
- Использование
```html
<head>
  <link rel="stylesheet" href="reset.css">
  <link rel="stylesheet" href="styles.css">
</head>
```


## Справочники
- [Git ссылка на лекцию](https://github.com/Zlodej43sm/lections/tree/master/02.styles)
- [Сброс стилей](http://marksheet.io/css/reset.css)
- [Псевдоклассы](https://developer.mozilla.org/ru/docs/Web/CSS/%D0%9F%D1%81%D0%B5%D0%B2%D0%B4%D0%BE-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D1%8B)
- [Псевдоэлементы](https://developer.mozilla.org/ru/docs/Web/CSS/Pseudo-elements)