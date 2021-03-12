[![Build status](https://ci.appveyor.com/api/projects/status/wgy38suhse2fj5ot?svg=true)](https://ci.appveyor.com/project/LiquidAssContainer/ahj-sse-ws-dashboard-frontend)

# Cloud Dashboard (frontend)

[Развёрнутый сайт](https://ahj-cloud-dashboard.herokuapp.com).

[GitHub Pages](https://liquidasscontainer.github.io/ahj_sse-ws_dashboard_frontend).

[Репозиторий с бэкендом](https://github.com/LiquidAssContainer/ahj_sse-ws_dashboard_backend).

В целом всё работает, некоторые вещи были реализованы под конец, когда я про них вообще забывал. Поэтому, например, код для смены статуса у `instance` вышел достаточно некрасивым ¯\\\_(ツ)_/¯

Стоит отметить использование строки `user` со значением `'admin'`, которая используется как идентификатор и вместо которой (в более серьёзном проекте) было бы использование cookie с нормальным механизмом авторизации.
