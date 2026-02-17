# Konfiguracja EmailJS — krok po kroku

EmailJS pozwala wysyłać maile bezpośrednio z formularza kontaktowego na landing page, bez backendu. Formularz jest gotowy — wystarczy wstawić 3 klucze.

## 1. Tworzenie konta

1. Wejdź na [https://www.emailjs.com/](https://www.emailjs.com/)
2. Kliknij **Sign Up**
3. Zarejestruj się (email + hasło lub konto Google)
4. Potwierdź email

Plan darmowy daje **200 emaili miesięcznie** — wystarczy na portfolio.

## 2. Dodawanie Email Service

1. Po zalogowaniu przejdź do **Email Services** (menu po lewej)
2. Kliknij **Add New Service**
3. Wybierz **Gmail** (lub innego dostawcę, którego używasz)
4. Kliknij **Connect Account** i zaloguj się na konto Gmail
5. Nadaj nazwę serwisu (np. "Portfolio Contact")
6. Kliknij **Create Service**
7. Zanotuj **Service ID** (np. `service_abc123`)

## 3. Tworzenie Email Template

1. Przejdź do **Email Templates** (menu po lewej)
2. Kliknij **Create New Template**
3. Ustaw:
   - **Subject**: `Nowa wiadomość z portfolio: {{user_name}}`
   - **Content** (ciało maila):
     ```
     Nowa wiadomość z formularza kontaktowego:

     Imię: {{user_name}}
     Email: {{user_email}}
     Wiadomość:
     {{message}}
     ```
   - **To Email**: twój adres email (np. `wojtekolszak12@gmail.com`)
   - **From Name**: `{{user_name}}`
   - **Reply To**: `{{user_email}}`
4. Kliknij **Save**
5. Zanotuj **Template ID** (np. `template_xyz789`)

Zmienne `{{user_name}}`, `{{user_email}}` i `{{message}}` odpowiadają polom formularza w HTML.

## 4. Pobieranie Public Key

1. Przejdź do **Account** (ikona konta w menu)
2. Zakładka **General**
3. Skopiuj **Public Key** (np. `pk_abc123xyz`)

## 5. Wstawienie kluczy do kodu

Otwórz plik `landing/js/emailjs-form.js` i zamień placeholdery:

### Linia 11 — Public Key:
```js
// PRZED:
publicKey: "YOUR_PUBLIC_KEY"

// PO:
publicKey: "pk_abc123xyz"  // <- wstaw swój Public Key
```

### Linia 47 — Service ID i Template ID:
```js
// PRZED:
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)

// PO:
emailjs.sendForm('service_abc123', 'template_xyz789', form)
//                 ^ Service ID      ^ Template ID
```

## 6. Testowanie

1. Uruchom serwer: `npx http-server . -p 3000`
2. Otwórz `http://localhost:3000/landing/`
3. Wypełnij formularz kontaktowy i wyślij
4. Sprawdź swoją skrzynkę — powinieneś dostać maila
5. Jeśli nie działa, sprawdź konsolę przeglądarki (F12 > Console) — błędy EmailJS będą widoczne

## Podsumowanie kluczy

| Klucz | Gdzie go znaleźć | Gdzie wstawić |
|-------|-------------------|---------------|
| Public Key | Account > General | `emailjs.init({ publicKey: "..." })` (linia 11) |
| Service ID | Email Services | `emailjs.sendForm('...', ...)` (linia 47, 1. argument) |
| Template ID | Email Templates | `emailjs.sendForm(..., '...')` (linia 47, 2. argument) |
