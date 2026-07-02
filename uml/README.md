# Оценка PRO v2 — UML диаграммы (PlantUML)

Набор диаграмм для системы автоматизации оценки недвижимости **Оценка PRO v2**.

## Файлы

| Файл | Тип | Описание |
|------|-----|----------|
| `01_use_case.puml` | Use Case | Прецеденты: оценщик, клиент, банк |
| `02_class_diagram.puml` | Class | Классы: Заявка, Аналог, Расчёт, ФСО, Отчёт |
| `03_sequence_appraisal.puml` | Sequence | Последовательность полного цикла оценки |
| `04_activity_workflow.puml` | Activity | Рабочий процесс (с дорожками по ролям) |
| `05_state_request.puml` | State | Состояния заявки: НОВАЯ → ГОТОВА |
| `06_component_diagram.puml` | Component | Архитектура приложения |

## Как открыть

### Вариант 1 — VS Code
Установите расширение **PlantUML** (jebbs.plantuml), откройте `.puml` файл и нажмите `Alt+D`.

### Вариант 2 — Онлайн
Откройте [plantuml.com/plantuml/uml](https://www.plantuml.com/plantuml/uml/) и вставьте содержимое файла.

### Вариант 3 — CLI
```bash
java -jar plantuml.jar *.puml
```

### Вариант 4 — Docker
```bash
docker run -v $(pwd):/work think/plantuml *.puml
```

## Генерация в PNG/SVG
```bash
java -jar plantuml.jar -tsvg *.puml    # SVG (векторный)
java -jar plantuml.jar -tpng *.puml    # PNG
java -jar plantuml.jar -tpdf *.puml    # PDF
```
