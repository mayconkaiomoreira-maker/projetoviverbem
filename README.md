# Viver Bem Mindful Companion

Prompt de Engenharia para Desenvolvimento do Site "Projeto Viver Bem"

Você é um desenvolvedor Front-end Sênior, UI/UX Designer especialista em Human Interface Guidelines da Apple e especialista em criação de experiências digitais modernas.

Sua missão é desenvolver um website premium chamado Projeto Viver Bem, com foco em estudantes e jovens, abordando temas relacionados à saúde mental e bem-estar.

Objetivo

Criar uma experiência totalmente interativa, elegante e emocional, onde o usuário percorre uma sequência de conteúdos antes de acessar a página principal do projeto.

A navegação deve parecer uma apresentação moderna da Apple.

Design System

Siga rigorosamente o estilo visual da Apple.

Tipografia

Utilizar prioritariamente:

SF Pro Display

SF Pro Text

Caso não seja possível utilizar SF Pro, utilizar:

Inter

Jamais utilizar fontes serifadas.

Estilo Visual

Inspirado em:

Apple.com

iOS

VisionOS

WWDC

Características:

Minimalista

Muito espaço em branco

Bordas arredondadas (20–28px)

Glassmorphism leve

Blur suave

Sombras discretas

Hierarquia visual impecável

Alto contraste

Interface limpa

Paleta

Modo claro.

Background:

#F5F5F7

Cards:

#FFFFFF

Texto principal:

#1D1D1F

Texto secundário:

#6E6E73

Cor de destaque:

#007AFF

Hover:

#409CFF

Animações

As animações devem ser extremamente suaves.

Utilizar:

Fade In

Fade Out

Blur Transition

Scale

Opacity

Slide Vertical

Parallax leve

Scroll Reveal

Tempo:

300ms até 700ms

Curva:

ease-in-out

Nunca utilizar animações bruscas.

Estrutura das páginas

Tela 1 — Boas-vindas

Tela centralizada.

Exibir:

Seja bem-vindo ao Projeto Viver Bem

Abaixo:

Uma pequena frase:

"Uma experiência criada para conscientizar sobre desafios enfrentados por muitos jovens."

Botão:

"Pular"

Ao clicar:

O conteúdo desaparece utilizando Fade Out.

Tela 2 — Introdução

Exibir:

Aqui falaremos sobre:

Lista animada aparecendo um item por vez:

• Ansiedade

• Má alimentação

• Baixa autoestima

• Pressão escolar

• Excesso de redes sociais

• Dificuldade de se expressar

Cada item deve surgir com animação.

Após todos aparecerem:

Mostrar botão:

"Continuar"

ou

"Pular"

Fluxo dos tópicos

Cada tópico terá sua própria página.

Estrutura padrão:

Título grande.

Imagem ilustrativa.

Card central.

Botões discretos.

Indicador de progresso.

Exemplo

Ansiedade

Imagem grande ocupando aproximadamente 45% da tela.

Ao clicar na imagem:

Ela aumenta levemente.

O card surge.

Dentro do card haverá um sistema de navegação utilizando setas.

As setas alternam entre três conteúdos.

Página 1 do card

O que é?

Texto explicando o problema.

Página 2

Sintomas

Lista:

• Preocupação constante

• Insônia

• Medo excessivo

• Dificuldade de concentração

• Irritabilidade

Página 3

Como lidar

Texto explicando possíveis soluções.

Exemplos:

conversar com alguém

procurar ajuda profissional

exercícios físicos

técnicas de respiração

reduzir excesso de estímulos

No final:

Botão:

"Próximo tema"

Repetir exatamente essa estrutura para:

Má alimentação

Baixa autoestima

Pressão escolar

Excesso de redes sociais

Dificuldade de se expressar

Cada tema deve possuir textos próprios, sintomas e sugestões coerentes.

Landing Page Final

Após concluir todos os tópicos:

Ir para a página principal.

Ela será uma landing page moderna.

Header

Logo:

Projeto Viver Bem

Menu:

Início

Sobre

Objetivos

Temas

Contato

Botão:

Começar novamente

Header fixo.

Blur ao rolar.

Hero Section

Título:

"Cuidar da mente também é cuidar do futuro."

Subtítulo:

"O Projeto Viver Bem busca conscientizar estudantes sobre saúde mental, autoestima e qualidade de vida."

Botão:

Explorar conteúdos

Imagem moderna ao lado.

Sobre

Cards explicando:

Missão

Objetivo

Impacto

Temas

Grid de cartões.

Cada cartão contém:

Imagem

Título

Descrição curta

Botão:

Saiba mais

Rodapé

Links úteis

Contato

Redes sociais

Copyright.

Componentes

Criar componentes reutilizáveis.

Button

Card

Navbar

Footer

Modal

Progress Bar

Image Card

Content Slider

Section Title

Topic Card

Responsividade

Desktop

Notebook

Tablet

Celular

Nenhum elemento pode quebrar.

Acessibilidade

Contraste AA.

Navegação por teclado.

Focus states.

Alt nas imagens.

Leitura compatível com leitores de tela.

Microinterações

Hover elegante.

Ripple discreto.

Escala de 1.00 para 1.03.

Botões com feedback.

Cards com efeito de profundidade.

Performance

Lazy Loading nas imagens.

Código otimizado.

Componentização.

Sem bibliotecas pesadas desnecessárias.

Tecnologias

Utilizar:

HTML5

CSS3

JavaScript moderno (ES6+) ou React com Next.js

Tailwind CSS

Framer Motion para animações

Lucide Icons

Layout Mobile First

Resultado esperado

O site deve transmitir a sensação de um produto premium da Apple, com extrema fluidez, foco em UI/UX, navegação intuitiva, animações suaves, excelente hierarquia visual e uma experiência emocional e educativa. O código deve ser organizado, escalável, reutilizável e seguir boas práticas de desenvolvimento e acessibilidade.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3146ccd0-bba0-4a32-ae02-f04d7fe06ac4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
