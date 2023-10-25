## Informacje ogólne

API zawsze odpowiada w formacie JSON  
Kod błedu 0 (zero) oznacza zaliczone zadanie  
Ujemne kody błędów to errory (ich wyjaśnienie jest w polu 'msg')  
Od pobrania pytania, na udzielenie odpowiedzi masz 120 sekund  

## Autoryzacja

W celu zdobycia tokena uwierzytelniającego wyślij metodą POST poniższe dane do zasobu /token/TASKNAME

```json
{
  "apikey": "xxxx"
}
```

Przykład:
```
curl -d '{"apikey":"xxxx"}' https://zadania.aidevs.pl/token/helloapi
```

Uwaga: token jest jednorazowy. Musisz go pobrać przed każdym podejściem do zadania

## Pobranie zadania (dane wejściowe)

Wyślij zapytanie typu GET do zasobu /task/TOKEN

Przykład:
```
curl https://zadania.aidevs.pl/task/e1fea75aa2e567f35c1717d1cc2c0df3e707f51d
```

Token to ciąg znaków uzyskanych w kroku "autoryzacja".

## Zgłaszanie odpowiedzi

Wyślij metodą POST dane o poniższym formacie do zasobu /answer/TOKEN

```json
{
  "answer": "tutaj wpisujesz odpowiedz"
}
```

Przykład:
```
curl -d '{ "answer": "tutaj wpisujesz odpowiedz" }' https://zadania.aidevs.pl/answer/e1fea75aa2e567f35c1717d1cc2c0df3e707f51d
```

Uwaga: na zgłoszenie odpowiedzi masz tylko 120 sekund od czasu pobrania zadania

## Zadanie testowe

Używając swojego klucza API, rozwiąż zadanie o nazwie HelloAPI

Zadanie polega na pobraniu zmiennej cookie z powyższego taska i odesłaniu jej do serwera jako odpowiedzi w polu answer (w JSON)