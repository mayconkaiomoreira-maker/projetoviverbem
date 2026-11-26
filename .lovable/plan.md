# Deixar o site mais rápido e estável

## O que foi encontrado
- A página do Projeto tenta carregar **7 vídeos ao mesmo tempo** (o player grande + 6 miniaturas que são, na verdade, vídeos inteiros). Somando o vídeo antigo, são cerca de **34 MB** em formato .mov, que muitos celulares e navegadores lidam mal.
- A ilustração dos rostinhos no topo pesa **1,3 MB** e aparece logo na primeira tela.
- As 10 fotos da galeria têm entre 200 e 300 KB cada.
- Só existe uma medição real de visitante até agora: o primeiro carregamento levou **cerca de 5 segundos** só para o servidor responder. É pouco dado, então essa parte ainda precisa ser confirmada.

## O que vou fazer
1. **Vídeos**
   - Converter os 7 vídeos para MP4 leve (versão web, cerca de 3 a 5 vezes menor).
   - Criar uma foto de capa para cada vídeo e usar essas fotos nas miniaturas, no lugar dos vídeos.
   - O vídeo só começa a baixar quando a pessoa aperta o play.
2. **Imagens**
   - Reduzir a ilustração dos rostinhos de 1,3 MB para menos de 100 KB, em formato moderno.
   - Gerar versões menores das fotos da galeria (cerca de 60 a 100 KB cada). A foto grande só carrega quando é aberta.
3. **Primeira abertura**
   - Dar prioridade ao que aparece primeiro na tela.
   - Deixar fontes e animações sem travar a exibição da página.
4. **Conferência**
   - Medir o tempo de abertura e o peso total da página antes e depois, no celular e no computador.
   - Checar os registros do site publicado para ver se há erros que fazem ele "não carregar".

## Detalhes técnicos
- ffmpeg: H.264 + faststart, cerca de 720p, CRF 26. Poster JPG/WebP extraído do segundo 1. `preload="none"` + `poster`. Novos assets via lovable-assets e remoção dos .mov antigos depois que os novos estiverem em uso.
- student-marks.png → WebP redimensionado para 2x a largura exibida (cerca de 880px). Fotos da galeria → WebP de cerca de 800px como miniatura, com o original no lightbox.
- Revisar a dica de preload da fonte e o `fetchpriority` da imagem do topo. Verificar o TTFB nos logs do servidor publicado.
- Validar com Playwright (viewport 393x706): bytes transferidos e tempo de carregamento.
