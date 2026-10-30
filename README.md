# kgu-fcr-task

Учебный репозиторий с заданиями. Здесь описано, как сделать форк, настроить окружение и получать обновления заданий от преподавателя.

## Требования

- [Git](https://git-scm.com/)
- Аккаунт GitHub

## Настройка SSH-ключа (рекомендуется)

Если при работе с GitHub возникают проблемы с токеном, используйте SSH-ключ — он настраивается один раз и не требует ввода пароля/токена при каждом пуше.

### 1. Сгенерировать ключ

```bash
ssh-keygen -t ed25519 -C "ваша_почта@example.com"
```

На все вопросы можно нажать **Enter** (ключ сохранится в `~/.ssh/id_ed25519`, пароль можно оставить пустым).

### 2. Добавить ключ в ssh-agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 3. Скопировать публичный ключ

```bash
cat ~/.ssh/id_ed25519.pub
```

Скопируйте весь вывод (строка начинается с `ssh-ed25519`).

### 4. Добавить ключ в GitHub

Откройте **GitHub → Settings → SSH and GPG keys → New SSH key**, вставьте скопированный ключ в поле **Key** и сохраните.

### 5. Проверить подключение

```bash
ssh -T git@github.com
```

При первом подключении подтвердите отпечаток (`yes`). Успешный результат — сообщение вида `Hi {ВАШ_ЛОГИН}! You've successfully authenticated...`

### 6. Переключить ремоуты на SSH

```bash
git remote set-url origin git@github.com:{ВАШ_ЛОГИН}/kgu-fcr-task.git
git remote set-url upstream git@github.com:MisaSup/kgu-fcr-task.git
```

Проверка:

```bash
git remote -v
```

> После настройки SSH клонируйте форк по SSH-адресу:
>
> ```bash
> git clone git@github.com:{ВАШ_ЛОГИН}/kgu-fcr-task.git
> ```
>
> Если SSH по каким-то причинам недоступен, можно продолжить работать по HTTPS, но тогда для пуша понадобится [токен доступа](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

## Как начать работу

### 1. Сделать форк репозитория

Откройте <https://github.com/MisaSup/kgu-fcr-task> и нажмите **Fork**.

У вас появится собственная копия репозитория — это `origin` (ваш форк).

### 2. Клонировать свой форк

```bash
git clone https://github.com/{ВАШ_ЛОГИН}/kgu-fcr-task.git

ИЛИ по ssh
git clone git@github.com:{ВАШ_ЛОГИН}/kgu-fcr-task.git

cd kgu-fcr-task
```

### 3. Добавить репозиторий преподавателя как `upstream`

Это нужно, чтобы получать обновления заданий. `origin` — ваш форк, `upstream` — репозиторий преподавателя.

```bash
git remote add upstream https://github.com/MisaSup/kgu-fcr-task.git
```

Проверка, что ремоуты настроены правильно:

```bash
git remote -v
```

Ожидаемый результат:

```
origin    https://github.com/{ВАШ_ЛОГИН}/kgu-fcr-task.git (fetch)
origin    https://github.com/{ВАШ_ЛОГИН}/kgu-fcr-task.git (push)
upstream  https://github.com/MisaSup/kgu-fcr-task.git (fetch)
upstream  https://github.com/MisaSup/kgu-fcr-task.git (push)
```

## Как получать обновления от преподавателя

Когда преподаватель добавляет или меняет задания, в `upstream` появляются новые коммиты. Порядок действий:

### 1. Забрать изменения из `upstream`

```bash
git fetch upstream
```

### 2. Перейти на ветку с нужным заданием

Например, для первого задания:

```bash
git switch task/01
```

> Если ветки ещё нет локально, создайте её из `upstream`:
>
> ```bash
> git switch -c task/01 upstream/task/01
> ```

### 3. Влить обновления в свою ветку

```bash
git merge upstream/task/01
```

Готово — задание обновлено. Повторяйте эти три шага перед началом работы над каждым заданием или когда преподаватель сообщит об изменениях.

## Как выполнять задание

Порядок работы над заданием описан в файле [TASK.md](TASK.md). Кратко:

1. Перейдите на ветку с заданием и обновите её (см. выше).
2. Создайте свою ветку от неё:

   ```bash
   git switch -c student/{НАЗВАНИЕ ТАСКА}-{ВАША ФАМИЛИЯ ИО}

   Например: 
   git switch -c student/JS-01-gorelovma
   ```

3. Ведите работу осмысленными коммитами:

   ```bash
   student/01: your commit message
   ```

> Для каждого нового задания используйте свою ветку: `student/{ЗАДАНИЕ}-{ФАМИЛИЯ ИО}`

## Полезные команды

Проверить состояние и историю:

```bash
git status
git log --oneline --graph --all
```

Запушить свою работу в свой форк:

```bash
git push -u origin student/01-{ВАША ФАМИЛИЯ ИО}
```

## Pull Request

Когда задание готово, запушьте свою ветку в форк и откройте Pull Request.

В описании Pull Request обязательно укажите свои данные в формате:

```
[УНИВЕРСИТЕТ] [ФАМИЛИЯ ИМЯ] [ГРУППА]
```

Например:

```
[ВАШ УНИВЕРСИТЕТ] [Иванов Иван] [ВАША ГРУППА]
```

## Если возник конфликт

Если при `git merge` появился конфликт:

1. Найдите файлы с конфликтами командой:

   ```bash
   git status
   ```

2. Откройте их, уберите маркеры `<<<<<<<`, `=======`, `>>>>>>>` и оставьте нужный вариант кода.
3. Завершите слияние:

   ```bash
   git add .
   git commit
   ```
