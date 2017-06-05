# generator-totvs-dev

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

> Generator for Totvs Web Developers

## Instalação

Primeiro, instale os módulos do [Yeoman](http://yeoman.io),  [generator-totvs-dev](https://github.com/devtotvs/generator-totvs-dev) e [Bower](https://bower.io/) usando o  [npm](https://www.npmjs.com/) (estamos assumindo que você já tenha instalado e se familiarizado com [node.js](https://nodejs.org/) e o [git](https://git-scm.com/downloads)).

```bash
npm install -g bower
npm install -g yo
npm install -g generator-totvs-dev
```

Segundo, gere sua nova aplicação usando o generator:

```bash
mkdir meu-projeto && cd meu-projeto
yo totvs-dev
```

Terceiro, baixe as bibliotecas do [TOTVS HTML Framework](http://tdn.totvs.com/display/THF) e do [Kendo UI](http://docs.telerik.com/kendo-ui/intro/installation/bower-install) que devem ser instalados manualmente por conta das suas licenças comerciais. Os termos de cada licença deve ser respeitado pelos desenvolvedores.

Salve os arquivos na pasta ***meu-projeto\src\app\js\libs***.

## Configurações

Caso não sejam instaladas as dependências de forma automática, verifique se sua rede não exige a configuração do proxy para o Bower, caso tenha dúvidas consulte a página oficial sobre o arquivo [.bowerrc](https://bower.io/docs/config/#bowerrc-specification).

As propriedades que precisam ser informadas no arquivo .bowerrc são "proxy" e "https-proxy".

Após a configuração execute do bower para instalar as dependências manualmente.

```bash
bower install
```

Se tiver dificuldades em instalar o pacote angular-hotkeys configure seu git para que o mesmo use o protocolo https em vez do protocolo git.

```bash
git config --global url."https://".insteadOf git://
```

Lei mais sobre as [configurações do git](https://git-scm.com/docs/git-config) na página oficial.

## Generator

Ao executar o generator algumas perguntas devem ser preenchidas antes da aplicação ser gerada.

 1. **Your project name:** Nome do projeto
 2. **Project title:** Título para o seu projeto
 3. **Project description:** Descrição do seu projeto
 4. **Current version:** Versão do projeto
 5. **Repository:** Repositório que será hospedado o projeto
 6. **Home page:** Home page do projeto
 7. **Single Page Application:** Modelo da aplicação será um SPA (Single Page Application)
 8. **Create samples:** Exemplos que serão gerados junto com a aplicação
    - CRUD
    - Dashboard
 9. **Proxy for install dependencies:** Especifique um proxy se estiver em uma rede fechada

## Screenshots

CRUD (SPA)
![SPA][spa-crud]

Dashboard (SPA)
![SPA][spa-dashboard]

Menu (Tab)
![Menu][menu]

CRUD (Tab)
![Menu][menu-crud]

Dashboard (Tab)
![Menu][menu-dashboard]

## Copyright

Copyright © 2016 TOTVS

## Licença

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-image]:https://badge.fury.io/js/generator-totvs-dev.svg
[npm-url]:https://npmjs.org/package/generator-totvs-dev
[travis-image]:https://travis-ci.org/devtotvs/generator-totvs-dev.svg?branch=master
[travis-url]:https://travis-ci.org/devtotvs/generator-totvs-dev
[daviddm-image]:https://david-dm.org/devtotvs/generator-totvs-dev.svg?theme=shields.io
[daviddm-url]:https://david-dm.org/devtotvs/generator-totvs-dev
[spa-crud]:https://raw.githubusercontent.com/devtotvs/generator-totvs-dev/master/screenshots/spa002-crud.png
[spa-dashboard]:https://raw.githubusercontent.com/devtotvs/generator-totvs-dev/master/screenshots/spa002-dashboard.png
[menu]:https://raw.githubusercontent.com/devtotvs/generator-totvs-dev/master/screenshots/menu001.png
[menu-crud]:https://raw.githubusercontent.com/devtotvs/generator-totvs-dev/master/screenshots/menu002-crud.png
[menu-dashboard]:https://raw.githubusercontent.com/devtotvs/generator-totvs-dev/master/screenshots/menu002-dashboard.png
