На решение ушло 16 часов

Запуск: npm run dev


Документация REST API:

URL: http://localhost:3000

Типы данных:
```
Attraction {
    id: string,
    name: string,
    description: string,
    datetime: string,
    rating: number,
    photoUrl: string,
    place: string,
    placeLatitude: string,
    placeLongitude: string,
    status: boolean
}
```
```
AttractionForPost {
    name: string | undefined,
    description: string | undefined,
    datetime: string | undefined,
    rating: number | undefined,
    photoUrl: string | undefined
    place: string | undefined,
    placeLatitude: string | undefined,
    placeLongitude: string | undefined,
    status: boolean | undefined
}
```
1. Получение списка всех достопримечательностей:
    Метод: GET
    endpoint: /attractions
    Ответ: Успех (200): Массив объектов Attraction
    Ошибка: Пустой массив []

Пример ответа:
```
[
    {
        "name": "название",
        "description": "описание",
        "datetime": "Thu, 03 Apr 2025 19:00:00 GMT",
        "rating": 1,
        "photoUrl": "1",
        "place": "местоположение",
        "placeLatitude": 1,
        "placeLongitude": 1,
        "status": true,
        "id": "0d59"
    },
    {
        "name": "Эйфелева башня",
        "description": "башня",
        "datetime": "Mon, 24 Mar 2025 14:00:00 GMT",
        "rating": 2,
        "photoUrl": "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-U11-60OQtq62WcjJWj1shgY6iFNvVN6fkTxV1jU48sLnoWejxB19cmIMSYSgfLK3ZakqjBeas2mG0AEg4yc6OImY3_HEXEayyMuL2DP1JoGi4lAaC614jPld3vguQAVW_Dtg=s1360-w1360-h1020",
        "place": "Париж",
        "placeLatitude": 1,
        "placeLongitude": 1,
        "status": false,
        "id": "812f"
    }
]
```
2. Создание новой достопримечательности
    Метод: POST
    URL: /attractions
    Тело запроса: Объект AttractionForPost в формате JSON
    Ответ: 
    Успех (201): Без тела
    Ошибка: Сообщение в консоли

3. Обновление существующей достопримечательности
    Метод: PUT
    URL: /attractions/:id
    Тело запроса: Объект AttractionForPost в формате JSON
    Ответ: Успех (200): Без тела
    Ошибка: Сообщение в консоли

4. Удалить достопримечательность
    Метод: DELETE
    URL: /attractions/:id
    Ответ: Успех (200): Без тела
   Ошибка: Сообщение в консоли