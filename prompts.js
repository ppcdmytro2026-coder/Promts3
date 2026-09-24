/*
  PPC Prompt Library - данные промтов

  Как добавить новый промт:
  1. Скопируйте любой блок { ... } целиком (от "{" до "},").
  2. Вставьте его в конец списка и поменяйте id, number, icon и тексты.
  3. Текст промта пишется между обратными кавычками ` ... `.
     Внутри текста нельзя использовать обратную кавычку ` и сочетание ${
  4. Поля для заполнения подсвечиваются автоматически, если они
     стоят после двоеточия: "Сайт клиента: [ВСТАВИТЬ ССЫЛКУ]"
*/

window.PROMPTS = [
  {
    id: "ads",
    number: "01",
    icon: "✍️",
    ru: {
      nav: "Написание объявлений",
      title: "Объявления Google Ads для A/B теста",
      subtitle: "Search (RSA) и Performance Max на реальных фактах с сайта",
      description: "Claude изучает сайт, разбирает текущие объявления и пишет 2 объявления с разной информацией - готовые для A/B теста, с подсчётом символов.",
      when: "Запуск новой кампании или обновление объявлений, когда нужен новый угол для теста против уже работающих.",
      steps: [
        "Скопируйте промт и вставьте в новый чат Claude.",
        "Заполните подсвеченные поля: ссылка на сайт или товар, ключевые слова и текущие объявления (файлом или текстом).",
        "Claude изучит сайт и задаст 2 вопроса: тип кампании и угол объявления. Отвечайте цифрами.",
        "После объявлений выберите перепроверку: по сайту, по политике Google Ads или обе."
      ],
      needs: ["Веб-поиск", "Ключи и текущие объявления (по желанию)"],
      prompt: `РОЛЬ
Выступи как senior PPC-копирайтер с опытом создания высококонверсионных
объявлений Google Ads для DTC и e-commerce брендов.

ВВОДНЫЕ
Ссылка на бренд/продукт: [ВСТАВИТЬ ССЫЛКУ]
Ключевые слова и текущие объявления: [ПРИЛОЖИТЬ ФАЙЛ ИЛИ ВСТАВИТЬ ТЕКСТ]
Рынок и язык: [определи по ссылке, если не указано здесь]

===============================================================
ШАГ 1 - ИССЛЕДОВАНИЕ (сделай это первым, затем остановись)
===============================================================
1. Открой ссылку и детально изучи сайт. Также изучи приложенные файлы.
   Не пиши на основе общих знаний о категории.
2. Выпиши фактический материал, доступный для рекламы:
   - реальные УТП
   - выгоды
   - уникальные характеристики и особенности продукта
   - условия покупки (цена, доставка, возврат, гарантии, подписка)
   - любые другие проверяемые факты, которые можно использовать в рекламе
   Для каждого пункта укажи, откуда на сайте он взят.
3. Определи рынок и гео по ссылке. Все тексты должны соответствовать
   этому рынку (орфография, валюта, локальный контекст).

4. АНАЛИЗ ТЕКУЩИХ ОБЪЯВЛЕНИЙ
   Если в файле или тексте есть текущие объявления, проанализируй их
   до того, как предлагать новые. Для каждого объявления укажи:
   - какой угол оно уже использует
   - на какие факты и УТП опирается
   - какие углы и факты с сайта остаются неиспользованными
   Оформи короткой таблицей: Объявление | Угол | Использованные факты
   Цель - дать мне выбрать угол, действительно отличающийся от уже
   запущенного, чтобы их можно было протестировать в A/B.
   Если текущих объявлений нет, пропусти этот пункт и напиши об этом
   одной строкой.

5. ПОПРОСИ МЕНЯ ВЫБРАТЬ - ничего не предполагай сам
   Задай два вопроса нумерованными списками, чтобы я мог ответить
   только цифрами. Не проси меня что-либо печатать или вставлять.

   Вопрос A - тип кампании:
     1. Search (RSA)
     2. PMax (asset group)

   Вопрос B - угол объявления: предложи 4-6 возможных углов на основе
   найденного на сайте (цена / выгода / боль / доверие / скорость /
   результат / ингредиент / механизм / социальное доказательство /
   снятие риска). Пронумеруй их.
   Для каждого угла в 1-2 строках укажи:
     - на какой конкретной характеристике или выгоде он основан
     - почему этот угол стоит использовать
     - как он может помочь результатам
     - пересекается ли он с уже запущенным углом (из шага 4)

   Если в интерфейсе доступны интерактивные варианты выбора, используй
   их для обоих вопросов вместо обычного текста.

6. ОСТАНОВИСЬ. Не пиши объявления, пока я не отвечу на оба вопроса.

===============================================================
ШАГ 2 - НАПИСАНИЕ ОБЪЯВЛЕНИЙ (только после моего подтверждения)
===============================================================
Создай 2 полностью разных объявления для выбранного угла.

Правило различия:
Два объявления должны отличаться передаваемой информацией, а не только
формулировками. Никогда не повторяй один и тот же факт разными словами
в двух объявлениях. Если оба объявления используют один угол, раскрывай
его через разные выгоды, характеристики или аргументы. Пример: для угла
эффективности объявление 1 может прямо заявлять о результате, а
объявление 2 - объяснять эффективность через конкретный компонент или
особенность и связывать его с выгодой. Один угол, разная информация.

--- ЕСЛИ Search (RSA) ----------------------------------------
Для каждого объявления:
- 15 заголовков, максимум 30 символов
- 4 описания, максимум 90 символов
--------------------------------------------------------------

--- ЕСЛИ PMax (asset group) ----------------------------------
Для каждого объявления:
- 15 заголовков, максимум 30 символов
- 5 длинных заголовков, максимум 90 символов
- 4 описания, максимум 90 символов
- 1 короткое описание, максимум 60 символов
--------------------------------------------------------------

Все 15 заголовков должны различаться по смыслу. Без повторяющихся идей.

ПРАВИЛА КОНТЕНТА
- Используй только реальные УТП и актуальный оффер. Каждое заявление,
  цифра, скидка, гарантия, срок и обещание доставки должны
  подтверждаться на сайте.
- Если информации нет на сайте, её не может быть в объявлении.
  Всё неподтверждённое собери в отдельный список "нужно подтверждение
  клиента" вместо того, чтобы писать это в текст.
- Никаких непроверенных, преувеличенных или выдуманных заявлений.
- Повышай CTR за счёт конкретики: цифры, сроки, конкретные выгоды.
- Не повторяй формулировки в заголовках, описаниях и длинных заголовках.
- Ключевые слова: если они предоставлены, используй одно из них минимум
  в 2-3 заголовках. Ключ должен звучать естественно. Никаких неуклюжих
  формулировок только ради вставки ключа.

ТЕХНИЧЕСКАЯ ПРОВЕРКА (выполни до вывода, а не после)
- Проверь длину каждого ассета программно. Ничто не должно превышать
  лимит Google Ads для своего поля.
- Только дефис "-". Длинное и среднее тире запрещены.
- Без эмодзи.
- Без восклицательных знаков в заголовках.
- Без текста целиком прописными буквами (ALL CAPS).
- Без двойных пробелов.
- Title Case во всех заголовках и длинных заголовках: каждое слово
  с заглавной буквы, кроме служебных (to, and, a, an, the, of, for,
  in, on, with, at, by, or).

ФОРМАТ ВЫВОДА
- Всё выдавай прямо в чате.
- Не создавай документы, файлы и дополнительные материалы, если я
  не попрошу.
- Для каждого объявления - таблица с колонками: Поле | Текст | Символы
- Над каждым объявлением в одной строке укажи угол и что именно он
  тестирует по сравнению с другим объявлением.

===============================================================
ШАГ 3 - ПРЕДЛОЖИ ДВЕ ПЕРЕПРОВЕРКИ (сразу после объявлений)
===============================================================
После выдачи объявлений всегда предлагай два варианта нумерованным
списком и дай мне выбрать один, оба или ни одного:

  1. Перепроверить все тексты по информации на сайте
  2. Перепроверить все тексты на соответствие политике Google Ads

Если в интерфейсе доступны интерактивные варианты выбора, используй их.
Никогда не запускай эти проверки молча и не предполагай, что я их
хочу - дождись моего выбора.

КАК ПРОВОДИТЬ ПЕРЕПРОВЕРКУ
Относись к выбранной проверке как к настоящему аудиту, а не
формальности. Иди ассет за ассетом, а не по общему впечатлению.

  Проверка 1 - точность по сайту: вернись на сайт и подтверди каждое
  заявление, цифру, цену, скидку, гарантию, срок и характеристику
  продукта. Отметь всё, что нельзя найти на сайте.

  Проверка 2 - политика Google Ads: проверь каждую строку на
  соответствие политике Google Ads, включая заявления о здоровье и
  лекарствах, чувствительные темы персонализированной рекламы,
  нереалистичные или гарантированные результаты, намёки на "до/после",
  превосходные степени и названия брендов конкурентов.

РЕЗУЛЬТАТ ПЕРЕПРОВЕРКИ
Не ограничивайся списком проблем и предложенными заменами.
Перепиши оба объявления полностью в чате, в том же табличном формате,
с исправленным текстом на месте. Добавь короткую пометку, например
[changed], рядом с каждым изменённым ассетом. Не объясняй, что и почему
изменено. Неизменённые ассеты остаются точно такими же, без пометок.
Повтори полную техническую проверку для переписанной версии.`
    },
    en: {
      nav: "Ad copywriting",
      title: "Google Ads copy for A/B testing",
      subtitle: "Search (RSA) and Performance Max built on real site facts",
      description: "Claude studies the site, reviews the ads already running and writes 2 ads that deliver different information - ready for an A/B test, with character counts.",
      when: "Launching a new campaign or refreshing ads when you need a new angle to test against what is already running.",
      steps: [
        "Copy the prompt and paste it into a new Claude chat.",
        "Fill in the highlighted fields: site or product link, keywords and current ads (as a file or text).",
        "Claude studies the site and asks 2 questions: campaign type and ad angle. Answer with numbers.",
        "After the ads, choose a re-check: against the site, against Google Ads policy, or both."
      ],
      needs: ["Web search", "Keywords and current ads (optional)"],
      prompt: `ROLE
Act as a senior PPC copywriter with experience creating high-converting
Google Ads copy for DTC and e-commerce brands.

INPUTS
Brand/product link: [INSERT LINK]
Keywords and current ads: [ATTACH FILE OR PASTE TEXT]
Market and language: [take from the link unless stated here]

===============================================================
STEP 1 - RESEARCH (do this first, then stop)
===============================================================
1. Open the provided link and study the site in detail. Also review any
   attached files. Do not write from general category knowledge.
2. Extract and list the factual material available for advertising:
   - real USPs
   - benefits
   - unique characteristics and product features
   - purchase conditions (price, shipping, returns, guarantees, subscription)
   - any other verifiable facts usable in ads
   For each item, note where on the site it comes from.
3. Confirm the market and geo implied by the link. All copy must match
   that market (spelling, currency, local context).

4. EXISTING ADS ANALYSIS
   If a file or pasted text contains current ads, analyse them before
   proposing anything new. For each existing ad state:
   - which angle it already uses
   - which facts and USPs it already relies on
   - which angles and facts from the site it leaves unused
   Present this as a short table: Ad | Angle | Facts used
   The purpose is to let me pick an angle that is genuinely different
   from what is already running, so the two can be A/B tested.
   If no existing ads are provided, skip this and say so in one line.

5. ASK ME TO CHOOSE - do not assume anything
   Present two questions as numbered lists so I can answer with numbers
   only. Do not ask me to type or paste anything.

   Question A - campaign type:
     1. Search (RSA)
     2. PMax (asset group)

   Question B - ad angle: propose 4-6 possible angles based on what you
   found on the site (price / benefit / pain / trust / speed / result /
   ingredient / mechanism / social proof / risk reversal). Number them.
   For each angle give in 1-2 lines:
     - which specific feature or benefit it is based on
     - why this angle is worth using
     - how it can help performance
     - whether it overlaps with an angle already running (from step 4)

   If interactive selection options are available in this interface, use
   them for both questions instead of plain text.

6. STOP HERE. Do not write ads until I have answered both questions.

===============================================================
STEP 2 - WRITE THE ADS (only after I confirm)
===============================================================
Create 2 completely different ads for the chosen angle.

Differentiation rule:
The two ads must differ in the information they deliver, not only in
wording. Never restate the same fact in different words across the two
ads. If both ads use the same angle, open it up through different
product benefits, characteristics or arguments. Example: for an efficacy
angle, ad 1 can make a direct claim about the result, while ad 2
explains efficacy through a specific component or feature and links it
to the benefit. Same angle, different information.

--- IF Search (RSA) ------------------------------------------
Per ad:
- 15 headlines, max 30 characters
- 4 descriptions, max 90 characters
--------------------------------------------------------------

--- IF PMax (asset group) -----------------------------------
Per ad:
- 15 headlines, max 30 characters
- 5 long headlines, max 90 characters
- 4 descriptions, max 90 characters
- 1 short description, max 60 characters
--------------------------------------------------------------

All 15 headlines must be different in meaning. No repeated ideas.

CONTENT RULES
- Use only real USPs and the actual offer. Every claim, number, discount,
  guarantee, deadline and delivery promise must be verifiable on the site.
- If the information is not on the site, it cannot appear in the ad.
  Collect anything unconfirmed in a separate "needs client confirmation"
  list instead of writing it into copy.
- No unverified, exaggerated or invented claims.
- Increase CTR through specificity: numbers, deadlines, concrete benefits.
- Do not repeat phrasing across headlines, descriptions and long headlines.
- Keywords: if keywords are provided, use one of them in at least 2-3
  headlines. The keyword must be embedded naturally. No awkward phrasing
  purely to insert a keyword.

TECHNICAL CHECK (run before output, not after)
- Verify the character length of every asset programmatically. Nothing
  may exceed the Google Ads limit for its field.
- Hyphen "-" only. Em dash and en dash are forbidden.
- No emoji.
- No exclamation marks in headlines.
- No ALL CAPS.
- No double spaces.
- Title Case in all headlines and long headlines: capitalise the first
  letter of every word except connectors (to, and, a, an, the, of, for,
  in, on, with, at, by, or).

OUTPUT FORMAT
- Deliver everything directly in the chat.
- Do not create documents, files or any extra materials unless I ask.
- Use a table per ad with columns: Field | Text | Chars
- Above each ad state the angle in one line and what it is testing
  against the other ad.

===============================================================
STEP 3 - OFFER THE TWO RE-CHECKS (immediately after the ads)
===============================================================
After delivering the ads, always offer these two options as a numbered
list, and let me choose either, both or neither:

  1. Re-check all copy against the information on the site
  2. Re-check all copy against Google Ads policy

If interactive selection options are available in this interface, use
them. Never run these checks silently or assume I want them - wait for
my choice.

HOW TO RUN A RE-CHECK
Treat the chosen check as a real audit, not a formality. Go asset by
asset, not by impression.

  Check 1 - site accuracy: revisit the site and confirm every claim,
  number, price, discount, guarantee, timeframe and product
  characteristic. Flag anything that cannot be traced to the site.

  Check 2 - Google Ads policy: review every line against Google Ads
  policy, including health and medicines claims, personalised
  advertising sensitivities, unrealistic or guaranteed results,
  before/after implications, superlatives and competitor brand names.

OUTPUT OF A RE-CHECK
Do not just list the problems and suggest replacements.
Rewrite both ads in full in the chat, in the same table format, with the
corrected text in place. Add a short marker such as [changed] next to
every asset that was modified. Do not explain what was changed or why.
Assets that were not modified stay exactly as they were, unmarked.
Re-run the full technical check on the rewritten version.`
    }
  },

  {
    id: "brand",
    number: "02",
    icon: "🔎",
    ru: {
      nav: "Анализ бренда",
      title: "Знакомство с брендом и поиск УТП",
      subtitle: "Бренд, преимущества, отзывы и вывод для Google Ads",
      description: "Быстрое погружение в нового клиента: что продаёт бренд, какие у него сильные стороны, что говорят покупатели и какие преимущества стоит нести в рекламу.",
      when: "В начале работы с новым клиентом - до написания объявлений. Итоговый вывод удобно передать в промт 01.",
      steps: [
        "Скопируйте промт и вставьте в новый чат Claude.",
        "Вставьте ссылку на сайт клиента в подсвеченное поле.",
        "Включите веб-поиск - без него Claude не увидит отзывы на внешних площадках.",
        "Получите обзор бренда, таблицу УТП с пометками для рекламы, анализ отзывов и 3-5 главных преимуществ.",
        "Пункты из списка \"Нужно подтверждение клиента\" уточните у клиента до запуска рекламы."
      ],
      needs: ["Веб-поиск"],
      prompt: `РОЛЬ
Выступи как senior PPC strategist и marketing analyst с опытом работы
с e-commerce и DTC брендами.

ВВОДНЫЕ
Сайт клиента: [ВСТАВИТЬ ССЫЛКУ]
Рынок и язык: [определи по сайту, если не указано здесь]

ПРАВИЛА РАБОТЫ С ИСТОЧНИКАМИ
- Изучи сайт детально: главную, страницы товаров/услуг, About, FAQ,
  доставку и возврат. Не пиши из общих знаний о категории.
- Каждый факт привязывай к источнику: страница сайта или площадка отзывов.
- Если информации нет или площадка недоступна - так и напиши.
  Не додумывай факты и не выдумывай отзывы.

===============================================================
ШАГ 1 - ЗНАКОМСТВО С БРЕНДОМ (3-5 предложений)
===============================================================
Чем занимается компания, что продаёт (ключевые категории или хиты),
кому продаёт, в чём основная ценность, ценовой сегмент.
Пиши просто, понятно и без воды.

===============================================================
ШАГ 2 - УТП И СИЛЬНЫЕ СТОРОНЫ
===============================================================
Выдели всё, что можно использовать как УТП: материалы, технологии,
сервис, гарантии, сроки, опыт, подход, условия покупки (цена, доставка,
возврат, подписка), дополнительные преимущества.

Оформи таблицей: УТП | Факт с сайта | Источник | Для рекламы
В колонке "Для рекламы" укажи одно из:
- можно - проверяемый факт, готов к использованию
- риск - может нарушать политику Google Ads
- подтвердить - звучит сильно, но на сайте нет доказательств

Отделяй проверяемые факты (цифры, сроки, сертификаты) от маркетинговых
заявлений без подтверждения.

===============================================================
ШАГ 3 - АНАЛИЗ ОТЗЫВОВ
===============================================================
Источники: отзывы на сайте клиента и внешние площадки, релевантные
для этого бренда и рынка (Google, Trustpilot, Amazon, Reddit,
профильные форумы - что найдётся). Отзывы на сайте отбирает сам бренд,
поэтому выводы по ним и по внешним площадкам давай раздельно.

Покажи:
- по каждой площадке: рейтинг и примерное количество отзывов
- что хвалят чаще всего, с частотой: часто / иногда / единично
- что важно клиентам при выборе
- какие боли закрывает продукт
- повторяющийся негатив и можно ли его закрыть в рекламе или на сайте
- 3-5 дословных фраз клиентов, которые можно использовать в объявлениях
  (в оригинале, с указанием источника)

===============================================================
ШАГ 4 - ВЫВОД ДЛЯ GOOGLE ADS
===============================================================
Назови 3-5 главных преимуществ для рекламы, ранжированных по силе.
Для каждого:
- на чём основано: факт с сайта и подтверждение в отзывах, если есть
- почему это сработает в рекламе
- какой угол объявления из этого следует

Отдельным списком "Нужно подтверждение клиента" - всё, что выглядит
сильным, но не подтверждено на сайте.

ФОРМАТ
- Весь ответ в чате, без файлов и документов.
- Язык ответа: русский. Цитаты из отзывов - в оригинале.
- Кратко, без общих фраз.
- Только дефис "-", длинные тире запрещены.
- Без эмодзи.`
    },
    en: {
      nav: "Brand analysis",
      title: "Brand overview and USP discovery",
      subtitle: "Brand, strengths, reviews and a conclusion for Google Ads",
      description: "A fast deep dive into a new client: what the brand sells, what its strengths are, what customers say and which advantages are worth taking into ads.",
      when: "At the start of work with a new client - before writing ads. The final conclusion works well as input for prompt 01.",
      steps: [
        "Copy the prompt and paste it into a new Claude chat.",
        "Paste the client's website link into the highlighted field.",
        "Turn on web search - without it Claude cannot see reviews on external platforms.",
        "Get a brand overview, a USP table marked for ad use, a review analysis and the 3-5 strongest advantages.",
        "Clarify the items on the \"Needs client confirmation\" list with the client before launching ads."
      ],
      needs: ["Web search"],
      prompt: `ROLE
Act as a senior PPC strategist and marketing analyst with experience
working with e-commerce and DTC brands.

INPUTS
Client website: [INSERT LINK]
Market and language: [take from the site unless stated here]

SOURCE RULES
- Study the site in detail: home page, product/service pages, About,
  FAQ, shipping and returns. Do not write from general category knowledge.
- Tie every fact to its source: a site page or a review platform.
- If information is missing or a platform is unavailable, say so.
  Do not fill gaps and never invent reviews.

===============================================================
STEP 1 - BRAND OVERVIEW (3-5 sentences)
===============================================================
What the company does, what it sells (key categories or bestsellers),
who it sells to, its core value and its price segment.
Keep it simple, clear and free of filler.

===============================================================
STEP 2 - USPs AND STRENGTHS
===============================================================
List everything usable as a USP: materials, technology, service,
guarantees, timeframes, experience, approach, purchase conditions
(price, shipping, returns, subscription), additional benefits.

Present as a table: USP | Fact from the site | Source | For ads
In the "For ads" column use one of:
- ready - verifiable fact, ready to use
- risk - may violate Google Ads policy
- confirm - sounds strong, but the site gives no proof

Separate verifiable facts (numbers, timeframes, certificates) from
marketing claims without proof.

===============================================================
STEP 3 - REVIEW ANALYSIS
===============================================================
Sources: reviews on the client's site and external platforms relevant
to this brand and market (Google, Trustpilot, Amazon, Reddit, niche
forums - whatever exists). On-site reviews are selected by the brand
itself, so report on-site and external findings separately.

Show:
- for each platform: rating and approximate number of reviews
- what is praised most, with frequency: often / sometimes / rarely
- what matters to customers when choosing
- which pain points the product solves
- recurring negatives and whether ads or the site can address them
- 3-5 verbatim customer phrases usable in ad copy
  (in the original language, with the source)

===============================================================
STEP 4 - CONCLUSION FOR GOOGLE ADS
===============================================================
Name the 3-5 strongest advantages for advertising, ranked by strength.
For each:
- what it is based on: a fact from the site and review support, if any
- why it will work in ads
- which ad angle follows from it

Add a separate "Needs client confirmation" list - everything that looks
strong but is not confirmed on the site.

FORMAT
- Deliver the entire answer in the chat, no files or documents.
- Answer in English. Keep review quotes in the original language.
- Be concise, no generic phrases.
- Hyphen "-" only. Em dashes are forbidden.
- No emoji.`
    }
  },

  {
    id: "ux",
    number: "03",
    icon: "🧭",
    ru: {
      nav: "Анализ сайта (UX)",
      title: "Анализ сайта глазами клиента (UX + оффер)",
      subtitle: "Удобство, структура, доверие, барьеры конверсии и точки роста",
      description: "Оценка сайта глазами клиента: понятность продукта, первый экран, сила оффера, доверие, кнопки и барьеры. В конце - топ-3 изменения и оценка от 1 до 10.",
      when: "Перед запуском рекламы на новую посадочную или когда трафик есть, а конверсий мало.",
      steps: [
        "Скопируйте промт и вставьте в новый чат Claude.",
        "Заполните подсвеченные поля: ссылка на страницу, тип страницы, по желанию - запрос или текст объявления.",
        "Приложите скриншоты первого экрана desktop и mobile. Без них Claude оценит визуальные блоки только частично.",
        "Получите разбор по 9 блокам, топ-3 точки роста с готовыми вариантами текста и итоговую оценку."
      ],
      needs: ["Веб-поиск", "Скриншоты desktop и mobile"],
      prompt: `РОЛЬ
Ты - опытный UX-стратег и эксперт по конверсии. Твоя задача - провести
детальный аудит сайта глазами потенциального клиента: человека, который
впервые попал на страницу и ещё не принял решение о покупке/заявке.

ВВОДНЫЕ
Страница для анализа: [ВСТАВИТЬ ССЫЛКУ]
Тип страницы: [главная / категория / товар / лендинг под рекламу -
определи сам, если не указано]
Скриншоты первого экрана desktop и mobile: [приложить, если есть]
Запрос или текст объявления, с которого идёт трафик: [необязательно]

ПРАВИЛА РАБОТЫ
- Изучи страницу и ключевые внутренние страницы (карточка товара,
  корзина, форма заявки), если они доступны. Не пиши из общих знаний.
- Каждое наблюдение подкрепляй конкретикой: цитируй реальный заголовок,
  текст кнопки, формулировку оффера.
- Визуальные выводы (цвета, размеры, иерархия, мобильная версия) делай
  только по скриншотам. Если скриншотов нет - прямо укажи, какие оценки
  ограничены, и не описывай то, чего не видел.
- Оценивай честно, как консультант - без лести.

===============================================================
1. СКОРОСТЬ ПОНИМАНИЯ ПРОДУКТА
===============================================================
Оцени, насколько быстро новый посетитель получает ответы на четыре
ключевых вопроса - и где именно на странице (или не находит вообще):
- Что это? (суть продукта)
- Для кого? (целевая аудитория)
- Зачем? (какую задачу или боль решает)
- Почему именно здесь? (ключевое отличие от альтернатив)
Для каждого: ✓ есть и понятно / ~ есть, но размыто / ✗ отсутствует
Итоговая оценка скорости понимания:
🟢 Быстро (5-7 сек) / 🟡 Медленно (15-30 сек) / 🔴 Критично (30+ сек)

===============================================================
2. ПЕРВЫЙ ЭКРАН И ЗАХВАТ ВНИМАНИЯ
===============================================================
- Есть ли чёткий заголовок с пользой, а не название компании?
  Процитируй его.
- Визуальная иерархия: куда смотрит глаз в первую очередь?
- Есть ли призыв к действию выше линии прокрутки?
- Как первый экран выглядит на мобильном: что видно без прокрутки?
- Если указан запрос или объявление: совпадает ли обещание рекламы
  с тем, что человек видит на первом экране?

===============================================================
3. СИЛА ОФФЕРА
===============================================================
- Сформулируй оффер в 1-2 предложениях так, как его поймёт клиент.
- Есть ли явный ответ на вопрос "Почему я должен выбрать именно вас?"
- Уникальность: чем предложение отличается от конкурентов?
- Конкретность: цифры, сроки, гарантии, результат - или всё размыто?

===============================================================
4. ЭМОЦИОНАЛЬНАЯ ПРОДАЖА [только если есть проблемы]
===============================================================
Выписывай этот блок ТОЛЬКО если есть явные проблемы.
Если сайт справляется - пропусти.
- Есть ли образы, истории или формулировки, которые вызывают желание?
- Апеллирует ли сайт к ситуации/проблеме клиента или только
  к техническим параметрам?
- Визуалы показывают продукт в действии или на белом фоне?

===============================================================
5. ДОВЕРИЕ И СОЦИАЛЬНОЕ ДОКАЗАТЕЛЬСТВО
===============================================================
- Есть ли отзывы? Они живые или шаблонные?
- Кейсы, портфолио, результаты с цифрами?
- Логотипы клиентов / партнёров / СМИ?
- Команда с фото и именами или безликая компания?
- Сертификаты, лицензии, гарантии?

===============================================================
6. СТРУКТУРА И НАВИГАЦИЯ
===============================================================
- Логична ли структура страницы? Ведёт ли она к целевому действию?
- Понятны ли пункты меню новому посетителю?
- Есть ли перегруз информацией, "полотна" текста, нагромождение блоков?
- Насколько легко найти цену / условия / контакты?

===============================================================
7. КНОПКИ И ПРИЗЫВЫ К ДЕЙСТВИЮ
===============================================================
- Проверь основные CTA: главная, карточки товаров/услуг, страница
  продукта. Процитируй текст каждой кнопки.
- Соответствует ли текст кнопки намерению пользователя на этом этапе?
- Есть ли кнопка покупки/заявки там, где она нужна?
- Видна ли главная кнопка визуально (цвет, размер, расположение)?

===============================================================
8. БАРЬЕРЫ К КОНВЕРСИИ
===============================================================
- Что может остановить клиента от заявки/покупки?
- Форма: сколько полей, насколько сложно заполнить?
- Есть ли страхи, которые сайт не закрывает (доставка, возврат,
  оплата, сроки)?
- Неудобство на мобильном, скорость загрузки, технические проблемы
  (если видны)?

===============================================================
9. ТОЧКИ РОСТА - ТОП-3
===============================================================
Выдели 3 изменения с наибольшим потенциальным влиянием на конверсию.
Для каждого:
- Что сейчас (проблема)
- Что сделать (решение, с готовым вариантом текста, если это заголовок,
  оффер или CTA)
- Почему это важно (обоснование)
- Сложность внедрения: легко / средне / сложно

===============================================================
ИТОГ
===============================================================
- Общая оценка сайта по шкале от 1 до 10 с пояснением.
- Отдельно перечисли, какие блоки оценены без скриншотов
  и поэтому ограничены.

ФОРМАТ
- Весь ответ в чате, без файлов и документов.
- Язык ответа: русский. Цитаты со страницы - в оригинале.
- По каждому блоку: краткий вывод + конкретные наблюдения.
- Только дефис "-", длинные тире запрещены.`
    },
    en: {
      nav: "Website analysis (UX)",
      title: "Website audit through the customer's eyes (UX + offer)",
      subtitle: "Usability, structure, trust, conversion barriers and growth points",
      description: "A customer-view audit: how clear the product is, the first screen, offer strength, trust, buttons and barriers. Ends with the top 3 changes and a score from 1 to 10.",
      when: "Before sending ad traffic to a new landing page, or when there is traffic but few conversions.",
      steps: [
        "Copy the prompt and paste it into a new Claude chat.",
        "Fill in the highlighted fields: page link, page type and, optionally, the search query or ad text.",
        "Attach first-screen screenshots for desktop and mobile. Without them Claude can only partly assess the visual blocks.",
        "Get a review across 9 blocks, the top 3 growth points with ready-to-use copy and an overall score."
      ],
      needs: ["Web search", "Desktop and mobile screenshots"],
      prompt: `ROLE
You are an experienced UX strategist and conversion expert. Your task is
to run a detailed website audit through the eyes of a potential customer:
someone who has landed on the page for the first time and has not yet
decided to buy or submit a request.

INPUTS
Page to analyse: [INSERT LINK]
Page type: [home / category / product / ad landing page -
determine it yourself if not stated]
First-screen screenshots, desktop and mobile: [attach if available]
Search query or ad text driving the traffic: [optional]

WORKING RULES
- Study the page and key internal pages (product page, cart, request
  form) if accessible. Do not write from general knowledge.
- Back every observation with specifics: quote the actual headline,
  button text and offer wording.
- Make visual conclusions (colours, sizes, hierarchy, mobile version)
  only from screenshots. If there are no screenshots, state which
  assessments are limited and do not describe what you have not seen.
- Assess honestly, like a consultant - no flattery.

===============================================================
1. SPEED OF PRODUCT UNDERSTANDING
===============================================================
Assess how quickly a new visitor gets answers to four key questions -
and where exactly on the page (or not at all):
- What is it? (the essence of the product)
- Who is it for? (target audience)
- Why? (which task or pain it solves)
- Why here? (key difference from alternatives)
For each: ✓ present and clear / ~ present but vague / ✗ missing
Overall speed of understanding:
🟢 Fast (5-7 sec) / 🟡 Slow (15-30 sec) / 🔴 Critical (30+ sec)

===============================================================
2. FIRST SCREEN AND ATTENTION
===============================================================
- Is there a clear benefit-led headline, not just the company name?
  Quote it.
- Visual hierarchy: where does the eye go first?
- Is there a call to action above the fold?
- How does the first screen look on mobile: what is visible without
  scrolling?
- If a query or ad is provided: does the ad's promise match what the
  visitor sees on the first screen?

===============================================================
3. OFFER STRENGTH
===============================================================
- State the offer in 1-2 sentences the way a customer would understand it.
- Is there an explicit answer to "Why should I choose you?"
- Uniqueness: how does the offer differ from competitors?
- Specificity: numbers, timeframes, guarantees, results - or is it all
  vague?

===============================================================
4. EMOTIONAL SELLING [only if there are problems]
===============================================================
Include this block ONLY if there are clear problems.
If the site handles it well, skip it.
- Are there images, stories or wording that create desire?
- Does the site speak to the customer's situation or problem, or only
  to technical specs?
- Do visuals show the product in use or on a white background?

===============================================================
5. TRUST AND SOCIAL PROOF
===============================================================
- Are there reviews? Do they feel real or templated?
- Case studies, portfolio, results with numbers?
- Client / partner / media logos?
- A team with photos and names, or a faceless company?
- Certificates, licences, guarantees?

===============================================================
6. STRUCTURE AND NAVIGATION
===============================================================
- Is the page structure logical? Does it lead to the target action?
- Are menu items clear to a new visitor?
- Is there information overload, walls of text, cluttered blocks?
- How easy is it to find the price / terms / contacts?

===============================================================
7. BUTTONS AND CALLS TO ACTION
===============================================================
- Check the main CTAs: home page, product/service cards, product page.
  Quote the text of each button.
- Does the button text match the user's intent at this stage?
- Is there a buy/request button where it is needed?
- Is the main button visually prominent (colour, size, placement)?

===============================================================
8. CONVERSION BARRIERS
===============================================================
- What could stop a customer from buying or submitting a request?
- Form: how many fields, how hard is it to fill in?
- Are there fears the site does not address (shipping, returns,
  payment, timeframes)?
- Mobile inconvenience, load speed, technical issues (if visible)?

===============================================================
9. GROWTH POINTS - TOP 3
===============================================================
Identify the 3 changes with the highest potential impact on conversion.
For each:
- Current state (problem)
- What to do (solution, with ready-to-use text if it is a headline,
  offer or CTA)
- Why it matters (rationale)
- Implementation effort: easy / medium / hard

===============================================================
SUMMARY
===============================================================
- Overall site score from 1 to 10 with an explanation.
- List separately which blocks were assessed without screenshots and
  are therefore limited.

FORMAT
- Deliver the entire answer in the chat, no files or documents.
- Answer in English. Keep quotes from the page in the original language.
- For each block: a short conclusion + specific observations.
- Hyphen "-" only. Em dashes are forbidden.`
    }
  },

  {
    id: "feed",
    number: "04",
    icon: "🛒",
    ru: {
      nav: "Заголовки товаров в фиде",
      title: "Оптимизация заголовков товаров в фиде",
      subtitle: "Google Merchant Center, Shopping и Performance Max",
      description: "Аудит текущих заголовков фида и их переписывание по выбранной структуре: только атрибуты со страниц товаров, без нарушений политики Merchant Center. Результат - готовый .xlsx файл.",
      when: "При подключении нового фида, слабой видимости товаров в Shopping и PMax или когда заголовки не совпадают с тем, что ищут покупатели.",
      steps: [
        "Скопируйте промт и вставьте в новый чат Claude.",
        "Заполните подсвеченные поля: ссылка на магазин, фид или список заголовков с Item ID, поисковые запросы (например, выгрузка Search terms).",
        "Claude проверит текущие заголовки и покажет 6 форматов на реальном товаре. Выберите формат и приоритет цифрами.",
        "Получите .xlsx файл с новыми заголовками, затем выберите перепроверку: по сайту, по политике или обе."
      ],
      needs: ["Веб-поиск", "Создание файлов", "Фид в .xlsx или .csv"],
      prompt: `РОЛЬ
Выступи как senior-специалист по Shopping фидам, оптимизирующий
заголовки товаров для Google Merchant Center и кампаний
Performance Max / Shopping.

ВВОДНЫЕ
Ссылка на бренд/магазин: [ВСТАВИТЬ ССЫЛКУ]
Товарный фид или список заголовков: [ПРИЛОЖИТЬ ФАЙЛ ИЛИ ВСТАВИТЬ ТЕКСТ]
Поисковые запросы / ключевые слова: [ПРИЛОЖИТЬ ФАЙЛ ИЛИ ВСТАВИТЬ ТЕКСТ]
Рынок и язык: [определи по ссылке, если не указано здесь]

===============================================================
ШАГ 1 - ИССЛЕДОВАНИЕ И ДИАГНОСТИКА (сделай это первым, затем остановись)
===============================================================
1. Открой ссылку и детально изучи сайт и страницы товаров.
   Не пиши на основе общих знаний о категории.
2. Для каждого товара из файла собери проверяемые атрибуты с его
   собственной страницы:
   - бренд
   - тип товара / категория
   - ключевая характеристика или формат (капсулы, порошок, полоски,
     гель, флакон)
   - активный ингредиент и дозировка, если указаны
   - атрибуты варианта (вкус, цвет, размер, объём, вес, количество,
     размер упаковки, дозировка, пол, возрастная группа - где применимо)
   - заявленная аудитория и сценарий использования, если они есть
     на странице
   - уникальные свойства товара (без сахара, веганский, проверен третьей
     стороной, запатентованный компонент, без пероксида и подобное)
   Укажи, откуда на сайте взят каждый атрибут. Если атрибута нет на
   странице, отметь его как отсутствующий - никогда не выводи его из
   названия товара, URL, изображения или соседнего варианта.

3. АУДИТ ТЕКУЩИХ ЗАГОЛОВКОВ
   Пройди товар за товаром и опиши, что не так с текущими заголовками.
   Оформи таблицей: Item ID | Текущий заголовок | Символы | Проблемы
   Проверь:
   - длину в символах и что обрезается в видимой части
   - отсутствие бренда
   - отсутствующие или неверные атрибуты варианта
   - атрибуты, не подтверждённые страницей товара
   - рекламные формулировки или формулировки, нарушающие политику
   - почти одинаковые заголовки у вариантов без отличающего атрибута
   - пробелы по ключевым словам относительно предоставленных запросов
   - отсутствие разделителей сегментов, из-за чего атрибуты сливаются
     в сплошной текст
   Затем кратко подведи 3-5 самых частых проблем по всему фиду.

===============================================================
4. ОБЯЗАТЕЛЬНЫЙ ЭТАП ВЫБОРА - его нельзя пропустить
===============================================================
   Ты должен задать мне оба вопроса ниже и затем остановиться.
   Завершить ход, не задав их, - ошибка. Не предполагай, не выбирай
   по умолчанию и не "рекомендуй и продолжай" ни по одному вопросу.
   Не пиши в этом ходе ни одного оптимизированного заголовка.

   Задай оба вопроса нумерованными списками, чтобы я мог ответить
   только цифрами. Никогда не проси меня печатать, вставлять или
   описывать что-либо.
   Если в интерфейсе есть интерактивные варианты выбора, используй их
   для обоих вопросов. Если нет - дай обычные нумерованные списки,
   но задай вопросы в любом случае.

   Вопрос A - структура заголовка. Предложи шесть форматов ниже. Покажи
   каждый на одном и том же реальном товаре из фида с количеством
   символов, чтобы я увидел реальный результат до выбора. Если формат
   нельзя построить для этого каталога, потому что нужного атрибута нет
   на страницах товаров, скажи об этом вместо выдуманного примера.

     1. Category Keyword | Format | Count | Brand
        Начинается с запроса в том виде, как его ищут. Лучше всего
        для небрендового спроса.

     2. Problem/Outcome Keyword | Product Type | Format | Brand
        Начинается с того, что клиент хочет решить. Самое сильное
        совпадение с намерением и самый высокий риск по политике -
        формулировка результата должна подтверждаться на сайте и не
        должна подразумевать лечение, излечение или гарантированный
        результат.

     3. Brand | Product Name | Active Ingredient + Strength | Format | Count
        Максимум структурированных деталей. Самый длинный из шести.
        Лучше всего там, где выбор определяют ингредиент и дозировка.

     4. Brand | Product Type | For [Audience] | Key Attribute | Size
        Только если аудитория прямо указана на странице товара.
        Никогда не выводи аудиторию из изображений или тона.

     5. Product Type | For [Use Case] | Variant | Brand
        Только если сценарий использования прямо указан на странице
        товара.

     6. Relevant Keyword | Key Variant Info | Product Uniqueness | Brand
        Key Variant Info - вкус, вариант или количество, в зависимости
        от того, что реально определяет выбор для этого товара, и только
        если это есть на странице. Product Uniqueness - одно проверяемое
        отличительное свойство, а не рекламное заявление. Бренд
        завершает заголовок.
        Пример ожидаемого результата:
        Teeth Whitening Strips | 14 Strips | Hydroxyapatite Enamel
        Protection | XWhite

   Вопрос B - приоритет оптимизации:
     1. Покрытие ключевых слов - вынести вперёд запросы из файла
     2. Полнота атрибутов - максимум структурированных деталей для матчинга
     3. Различие вариантов - сделать каждый вариант явно отличимым
     4. Сбалансированно

5. ОСТАНОВИСЬ. Заверши ход после вопросов. Не переписывай заголовки,
   пока я не отвечу на оба вопроса.

===============================================================
ШАГ 2 - ПЕРЕПИСЫВАНИЕ ЗАГОЛОВКОВ (только после моего подтверждения)
===============================================================
Применяй выбранный формат последовательно ко всему фиду.
Этот шаг выдай файлом, а не текстом в чате. См. ФОРМАТ ВЫВОДА ниже.

ПРАВИЛА РАЗДЕЛИТЕЛЕЙ - для любого формата
- Разделяй элементы заголовка вертикальной чертой.
- Ровно один пробел до и один после каждой черты: " | ".
- Никогда не сливай два элемента в сплошной текст. Каждый элемент
  выбранного формата - отдельный сегмент.
- Не начинай и не заканчивай заголовок чертой. Никаких пустых сегментов
  и двойных черт.
- Если элемент недоступен для товара, убери элемент вместе с его чертой.
  Не оставляй пробел или заглушку.
- Внутри одного сегмента слова не разделяются - черта делит элементы,
  а не слова. Дозировка остаётся со своим ингредиентом
  ("Hydroxyapatite 500mg"), единица - со своим числом ("14 Strips").
- Черты учитываются в лимите символов.

ПРАВИЛА ITEM ID - критично
- Копируй каждый item ID из файла дословно. Символ в символ, включая
  регистр, префиксы, дефисы и ведущие нули.
- Никогда не генерируй заново, не перенумеровывай, не переформатируй,
  не сортируй и не выдумывай ID.
- В результате должно быть ровно столько же строк, сколько во входных
  данных, в том же порядке.
- Если ID отсутствует, дублируется или неоднозначен в исходном файле,
  отметь это отдельно. Не угадывай.
- Не трогай GTIN, MPN, SKU и любые другие идентификаторы.

ПРАВИЛА КОНТЕНТА
- Каждое слово в заголовке должно подтверждаться на странице этого
  товара.
- Если нужного атрибута нет на сайте, не используй его и добавь товар
  в список "нужно подтверждение клиента". Не заполняй пробел.
- Выноси самую важную информацию вперёд. Считай, что на мобильном
  надёжно видны только первые 35-40 символов, поэтому первый сегмент
  несёт ключевую информацию.
- Не превышай 150 символов. Для большинства товаров цель - 70-100.
- Каждый вариант должен отличаться от соседних реальным атрибутом,
  а не порядком сегментов.
- Ключевые слова: отражай предоставленные запросы там, где они правдиво
  соответствуют товару. Никогда не вставляй ключ, который неверно
  описывает товар.
- Заголовки должны быть описательными, а не продающими. Заголовок -
  это спецификация, а не рекламный текст.

ЗАПРЕЩЕНО В ЗАГОЛОВКАХ (политика Merchant Center)
- Рекламный текст: sale, discount, %, free shipping, best price, offer,
  buy now, limited time
- Превосходные степени и непроверяемые заявления: best, no. 1,
  strongest, fastest
- Заявления о здоровье, медицине или лечении, а также формулировки,
  подразумевающие излечение, диагноз или гарантированный результат
- Названия брендов конкурентов
- Эмодзи, ALL CAPS, восклицательные знаки, двойные пробелы,
  повторяющаяся пунктуация
- Слова на другом языке, если это не язык рынка

ТЕХНИЧЕСКАЯ ПРОВЕРКА (выполни до вывода, а не после)
- Проверь количество символов каждого заголовка программно.
- Проверь каждый item ID по исходному файлу программно и убедись,
  что количество строк совпадает.
- Проверь форматирование разделителей программно: по одному пробелу
  с каждой стороны черты, нет черты в начале и в конце, нет двойных
  черт, нет пустых сегментов, количество сегментов соответствует
  выбранному формату.
- Только дефис "-". Длинное и среднее тире запрещены.
- Title Case: каждое слово с заглавной буквы, кроме служебных (to, and,
  a, an, the, of, for, in, on, with, at, by, or). Единицы измерения -
  в общепринятой форме (ml, g, mg, kg, cm).
- Убедись, что в результате нет двух одинаковых заголовков.

ФОРМАТ ВЫВОДА
- Подготовь заголовки файлом. По умолчанию .xlsx, чтобы с таблицей
  можно было сразу работать. Не вставляй полную таблицу в чат.
- Обязательные колонки в таком порядке:
    Item ID | Current Title | New Title | Chars
- Добавляй колонки там, где они несут реальную информацию. Не раздувай
  таблицу, но и не урезай её. Используй подходящие из: Format Applied,
  Keyword Used, Attributes Added, Attributes Omitted, Flag, Notes.
- Список "нужно подтверждение клиента" и проблемы с ID включи в файл -
  на отдельном листе или под таблицей.
- В чате дай только короткое резюме: какой формат применён, сколько
  заголовков изменено, диапазон символов и количество товаров,
  требующих подтверждения. Больше ничего.
- Не создавай других документов или материалов, если я не попрошу.

===============================================================
ШАГ 3 - ПРЕДЛОЖИ ДВЕ ПЕРЕПРОВЕРКИ (сразу после файла)
===============================================================
После выдачи файла всегда предлагай два варианта нумерованным списком
и дай мне выбрать один, оба или ни одного:

  1. Перепроверить все заголовки по информации на сайте
  2. Перепроверить все заголовки на соответствие политике Merchant
     Center и Google Ads

Используй интерактивные варианты выбора, если они есть в интерфейсе,
обычные нумерованные списки - если нет, но предлагай всегда. Никогда
не запускай эти проверки молча и не предполагай, что я их хочу.
Дождись моего выбора.

КАК ПРОВОДИТЬ ПЕРЕПРОВЕРКУ
Относись к выбранной проверке как к настоящему аудиту, а не
формальности. Иди заголовок за заголовком, страница товара за
страницей, а не по общему впечатлению.

  Проверка 1 - точность по сайту: вернись на каждую страницу товара
  и подтверди каждый сегмент заголовка - вкус, размер, объём,
  количество, упаковку, дозировку, цвет, формат, аудиторию, сценарий
  использования, заявление об уникальности. Отметь всё, что нельзя
  найти на странице конкретного товара.

  Проверка 2 - политика: проверь каждый заголовок на соответствие
  требованиям Merchant Center к заголовкам и политике Google Ads,
  включая рекламный текст, превосходные степени, заявления о здоровье
  и лекарствах и региональные регуляторные ограничения.

РЕЗУЛЬТАТ ПЕРЕПРОВЕРКИ
Не ограничивайся списком проблем и предложенными заменами.
Подготовь новую версию файла с исправленными заголовками на месте,
в той же структуре колонок. Добавь колонку Changed, отмечающую каждую
изменённую строку. Не объясняй, что и почему изменено. Неизменённые
заголовки остаются точно такими же, без пометок.
Повтори полную техническую проверку исправленной версии, включая
проверку item ID, количества строк и форматирования разделителей.
В чате укажи только, сколько заголовков изменено и в рамках какой
проверки.`
    },
    en: {
      nav: "Feed product titles",
      title: "Product title optimisation for the feed",
      subtitle: "Google Merchant Center, Shopping and Performance Max",
      description: "An audit of current feed titles and a rewrite in the chosen structure: only attributes from product pages, no Merchant Center policy violations. Output is a ready .xlsx file.",
      when: "When onboarding a new feed, when products get weak visibility in Shopping and PMax, or when titles don't match what shoppers search for.",
      steps: [
        "Copy the prompt and paste it into a new Claude chat.",
        "Fill in the highlighted fields: store link, feed or title list with Item IDs, search terms (for example, a Search terms export).",
        "Claude audits the current titles and renders 6 formats on a real product. Pick the format and priority with numbers.",
        "Get an .xlsx file with the new titles, then choose a re-check: against the site, against policy, or both."
      ],
      needs: ["Web search", "File creation", "Feed as .xlsx or .csv"],
      prompt: `ROLE
Act as a senior Shopping feed specialist optimising product titles for
Google Merchant Center and Performance Max / Shopping campaigns.

INPUTS
Brand/store link: [INSERT LINK]
Product feed or title list: [ATTACH FILE OR PASTE TEXT]
Search terms / keywords: [ATTACH FILE OR PASTE TEXT]
Market and language: [take from the link unless stated here]

===============================================================
STEP 1 - RESEARCH AND DIAGNOSIS (do this first, then stop)
===============================================================
1. Open the provided link and study the site and product pages in detail.
   Do not write from general category knowledge.
2. For every product in the file, collect the verifiable attributes from
   its own product page:
   - brand
   - product type / category
   - key characteristic or format (capsules, powder, strips, gel, bottle)
   - active ingredient and strength where stated
   - variant attributes (flavour, colour, size, volume, weight, count,
     pack size, strength, gender, age group where applicable)
   - stated audience and stated use case, if present on the page
   - unique product properties (sugar free, vegan, third party tested,
     patented component, non-peroxide, and similar)
   Note where on the site each attribute comes from. If an attribute is
   not stated on the page, record it as missing - never infer it from the
   product name, the URL, an image or a sibling variant.

3. AUDIT THE CURRENT TITLES
   Go product by product and report what is wrong with the existing
   titles. Present as a table: Item ID | Current title | Chars | Issues
   Check for:
   - character length and what gets truncated in the visible portion
   - missing brand
   - missing or wrong variant attributes
   - attributes not supported by the product page
   - promotional or policy-violating wording
   - near-duplicate titles across variants with no differentiating attribute
   - keyword gaps against the provided search terms
   - absence of segment separators, so attributes run together as prose
   Then summarise the 3-5 most common problems across the whole feed.

===============================================================
4. MANDATORY SELECTION GATE - this step cannot be skipped
===============================================================
   You must ask me both questions below and then stop. Ending the turn
   without asking them is a failed response. Do not assume, default to,
   or recommend-and-proceed on either answer. Do not write a single
   optimised title in this turn.

   Ask both questions as numbered lists so I can answer with numbers
   only. Never ask me to type, paste or describe anything.
   If this interface has interactive selection options, use them for both
   questions. If it does not, present plain numbered lists - but ask
   either way.

   Question A - title structure. Offer the six formats below. Render each
   one on the same real product from the feed, with the character count,
   so I can see the actual result before choosing. If a format cannot be
   built for this catalogue because a required attribute is absent from
   the product pages, say so instead of rendering an invented example.

     1. Category Keyword | Format | Count | Brand
        Leads with the term as it appears in search. Best for
        non-branded demand.

     2. Problem/Outcome Keyword | Product Type | Format | Brand
        Leads with what the customer is trying to solve. Strongest
        intent match, highest policy risk - the outcome wording must be
        traceable to the site and must not imply treatment, cure or a
        guaranteed result.

     3. Brand | Product Name | Active Ingredient + Strength | Format | Count
        Maximum structured detail. Longest of the six. Best where
        ingredient and dosage drive the decision.

     4. Brand | Product Type | For [Audience] | Key Attribute | Size
        Only usable where the audience is explicitly stated on the
        product page. Never infer audience from imagery or tone.

     5. Product Type | For [Use Case] | Variant | Brand
        Only usable where the use case is explicitly stated on the
        product page.

     6. Relevant Keyword | Key Variant Info | Product Uniqueness | Brand
        Key variant info means flavour, variant or count - whichever is
        the actual decision driver for that product, included only if
        present on the page. Product uniqueness means one verifiable
        differentiating property, not a promotional claim. Brand closes
        the title.
        Example of the intended result:
        Teeth Whitening Strips | 14 Strips | Hydroxyapatite Enamel
        Protection | XWhite

   Question B - optimisation priority:
     1. Keyword coverage - front-load the terms from the search terms file
     2. Attribute completeness - maximise structured detail for matching
     3. Variant differentiation - make every variant clearly distinct
     4. Balanced

5. STOP HERE. End your turn after asking. Do not rewrite titles until I
   have answered both questions.

===============================================================
STEP 2 - REWRITE THE TITLES (only after I confirm)
===============================================================
Apply the chosen format consistently across the whole feed.
Deliver this step as a file, not as chat text. See OUTPUT FORMAT below.

SEPARATOR RULES - applies to every format
- Separate the elements of a title with a pipe character.
- Exactly one space before and one space after every pipe: " | ".
- Never run two elements together as prose. Each element in the chosen
  format is its own segment.
- Do not open or close a title with a pipe. No empty segments, no double
  pipes.
- If an element is unavailable for a product, drop the element and its
  pipe entirely. Do not leave a gap or a placeholder.
- Within a single segment, keep the words unseparated - the pipe divides
  elements, not words. Strength stays with its ingredient
  ("Hydroxyapatite 500mg"), a unit stays with its number ("14 Strips").
- Pipes count toward the character limit.

ITEM ID RULES - critical
- Copy every item ID verbatim from the provided file. Character for
  character, including case, prefixes, dashes and leading zeros.
- Never regenerate, renumber, reformat, sort or invent an ID.
- The output must contain exactly the same number of rows as the input,
  in the same order.
- If an ID is missing, duplicated or ambiguous in the source file, flag
  it separately. Do not guess.
- Do not touch GTIN, MPN, SKU or any other identifier.

CONTENT RULES
- Every word in a title must be verifiable on that product's own page.
- If a needed attribute is missing from the site, leave it out and add
  the product to a "needs client confirmation" list. Do not fill the gap.
- Front-load the most important information. Assume only the first
  35-40 characters are reliably visible on mobile, so the first segment
  carries the decisive information.
- Stay within 150 characters. Target 70-100 for most products.
- Each variant must be distinguishable from its siblings by a real
  attribute, not by segment order.
- Keywords: reflect the provided search terms where they match the
  product truthfully. Never insert a keyword that misdescribes the item.
- Keep titles descriptive, not persuasive. A title is a specification,
  not ad copy.

FORBIDDEN IN TITLES (Merchant Center policy)
- Promotional text: sale, discount, %, free shipping, best price, offer,
  buy now, limited time
- Superlatives and unverifiable claims: best, no. 1, strongest, fastest
- Health, medical or treatment claims, and any wording implying a cure,
  diagnosis or guaranteed result
- Competitor brand names
- Emoji, ALL CAPS, exclamation marks, double spaces, repeated punctuation
- Foreign-language words unless that is the market language

TECHNICAL CHECK (run before output, not after)
- Verify the character count of every title programmatically.
- Verify every item ID against the source file programmatically and
  confirm the row count matches.
- Verify separator formatting programmatically: single space each side of
  every pipe, no leading or trailing pipe, no double pipes, no empty
  segments, and the segment count consistent with the chosen format.
- Hyphen "-" only. Em dash and en dash are forbidden.
- Title Case: capitalise the first letter of every word except
  connectors (to, and, a, an, the, of, for, in, on, with, at, by, or).
  Keep unit abbreviations in their conventional form (ml, g, mg, kg, cm).
- Confirm no two titles in the output are identical.

OUTPUT FORMAT
- Prepare the titles as a file. Default to .xlsx so the table can be
  worked with directly. Do not paste the full table into the chat.
- Mandatory columns, in this order:
    Item ID | Current Title | New Title | Chars
- Add further columns wherever they carry real information. Do not pad
  the table, but do not strip it down either. Use whichever of these
  apply: Format Applied, Keyword Used, Attributes Added, Attributes
  Omitted, Flag, Notes.
- Include the "needs client confirmation" list and any flagged ID
  problems in the file, on a separate sheet or below the table.
- In the chat, give only a short summary: which format was applied, how
  many titles changed, character range, and the count of products needing
  confirmation. Nothing else.
- Create no other documents or materials unless I ask.

===============================================================
STEP 3 - OFFER THE TWO RE-CHECKS (immediately after the file)
===============================================================
After delivering the file, always offer these two options as a numbered
list, and let me choose either, both or neither:

  1. Re-check all titles against the information on the site
  2. Re-check all titles against Merchant Center and Google Ads policy

Use interactive selection options if this interface has them, plain
numbered lists if it does not - but always offer. Never run these checks
silently or assume I want them. Wait for my choice.

HOW TO RUN A RE-CHECK
Treat the chosen check as a real audit, not a formality. Go title by
title, product page by product page, not by impression.

  Check 1 - site accuracy: revisit each product page and confirm every
  segment of the title - flavour, size, volume, count, pack, strength,
  colour, format, audience, use case, uniqueness claim. Flag anything
  that cannot be traced to that specific product page.

  Check 2 - policy: review every title against Merchant Center title
  requirements and Google Ads policy, including promotional text,
  superlatives, health and medicines claims, and market-specific
  regulatory restrictions.

OUTPUT OF A RE-CHECK
Do not just list the problems and suggest replacements.
Produce a new version of the file with the corrected titles in place, in
the same column structure. Add a Changed column marking every row that
was modified. Do not explain what was changed or why. Titles that were
not modified stay exactly as they were, unmarked.
Re-run the full technical check, including the item ID verification, the
row count and the separator formatting, on the corrected version.
In the chat, state only how many titles changed and under which check.`
    }
  }
];
