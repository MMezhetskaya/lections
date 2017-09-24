# Lection 03 - CSS, HTML, watchers

### Консоль

### Шрифты и текст
- fonts:
    - полная запись
    - короткая запись
- Свойства текста:
    - text-align
    - text-indent
    - text-decoration
    - letter-spacing
    - line-height

### Позиционирование элементов
- margin/padding (+/- px)
- height/width
- left/right/top/bottom(+/- px) z-index
- float
- [flexbox](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes/)
    - Flex-контейнер
    
    ```css
    #container {
      display: flex;
    }
    ```
    
    - Оси
    
        ![Alt text](./examples/images/flex__axis.png "Flex axis")
    
        - flex-direction устанавливает главную ось.
        - justify-content определяет расположение элементов вдоль главной оси в текущем ряду.
        - align-items расположение элементов вдоль перекрёстной оси в текущем ряду.
        - align-self устанавливает, как отдельный flex-элемент выровнен по перекрёстной оси, переопределяя значения, установленные с помощью align-items.

### Cвойства
- background
```css
.myClass {
    background: url("./examples/images/logo_big.png") yellow no-repeat center center;
}
```
- трансформации
- переходы
- анимации
- градиенты
```css
body {
    background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
}
```
- закругление углов

```css
.myClass {
    /* top-left | top-right | bottom-right | bottom-left */
    border-radius: 3px 3px 3px 3px;
}
```

![Alt text](./examples/images/css_border-radius_1.png "Border radius")

### Семантика


## Справочники
- [Git ссылка на лекцию](https://github.com/Zlodej43sm/lections/tree/master/03.layout_styles_watcher)
- [Проверка свойст](http://caniuse.com/)
- [Flexbox](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes/)