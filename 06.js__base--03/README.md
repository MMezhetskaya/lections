# Lection 05

### Функции ч.2

- Функциональные выражения
    - Function Declaration
    - Объявление Function Expression
    ```javascript
    var f = function(параметры) {
      // тело функции
    };
    ```
    - Анонимные функции
    ```javascript
        function ask(question, yes, no) {
          if (confirm(question)) yes()
          else no();
        }
        
        ask(
          "Вы согласны?",
          function() { alert("Вы согласились."); },
          function() { alert("Вы отменили выполнение."); }
        );
    ```
    - new Function
    ```javascript
        var sum = new Function('a,b', ' return a+b; ');
        
        var result = sum(1, 2);
        alert( result ); // 3
    ```


