# Corrige — protótipo OMR local

Abra `index.html` em Chrome, Edge ou Firefox. Não precisa instalar dependências, criar conta ou conectar à internet.

1. Confira as 20 respostas do gabarito fixo do simulado. A edição está bloqueada.
2. Use **Testar exemplo** para experimentar uma leitura real de uma imagem sintética.
3. Imprima o cartão em A4, escala 100%, sem cabeçalhos ou rodapés. Pode salvar como PDF na janela de impressão.
4. Preencha os círculos inteiros com caneta escura. Fotografe o papel plano, iluminado uniformemente, com os quatro quadrados visíveis e o título para cima.
5. Escolha uma imagem ou use Fotografar no celular. A captura usa o aplicativo de câmera do dispositivo quando disponível; no computador pode abrir o seletor de arquivos.
6. Confira o alinhamento. Se necessário, ajuste manualmente clicando nos centros dos quatro quadrados, na ordem indicada.
7. Confira todas as respostas. Amarelo indica leitura pendente. Selecione uma alternativa ou Em branco e marque Revisado. Confirme o resultado.
8. Exporte CSV antes de fechar a aba. A exportação usa ponto e vírgula, UTF-8 com BOM e proteção contra fórmulas em campos de texto.

Os nomes são digitados; não há reconhecimento de escrita. O cartão deve ser o modelo desta aplicação. O alinhamento usa transformação de perspectiva; papel curvado, sombras, reflexos, rasuras e desfoque podem produzir erros mesmo em respostas sem alerta. A conferência humana é obrigatória. Não use os limiares experimentais como probabilidades estatísticas.

Fotos ficam somente na memória do navegador. Não há envio, serviços externos, telemetria ou armazenamento persistente. Atualizar ou fechar a página perde os dados. Exportações baixadas permanecem no dispositivo. Não publique fotos ou CSV de estudantes.

## Hospedagem estática gratuita

O protótipo não exige servidor de processamento. Para publicar, envie `index.html`, `style.css`, `engine.js` e `app.js` para uma hospedagem estática. No GitHub Pages gratuito, crie um repositório público, envie os quatro arquivos à raiz, abra Settings → Pages e selecione Deploy from a branch, branch main, pasta raiz. Use HTTPS. Publique apenas os arquivos do aplicativo, nunca os resultados da turma. Também pode continuar usando o arquivo local sem hospedagem.

Documentação oficial consultada em 05/11/2026: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site e https://docs.github.com/en/pages/quickstart.

## Verificação

Com Node instalado, execute `node teste.cjs` na pasta. O teste verifica a transformação e a leitura sobre imagens sintéticas: marcas, branco e dupla marcação. Testes sintéticos não substituem validação com sua impressora e fotos reais. Faça um piloto com cartões de respostas conhecidas antes de corrigir uma turma.

Na entrega, passaram as verificações de sintaxe JavaScript e os testes de leitura sintética, incluindo perspectiva e marca fraca. A prévia automatizada do navegador não abriu no ambiente de criação; impressão, captura no celular e interação visual precisam ser conferidas no seu dispositivo. A aplicação contém o botão Testar exemplo para essa primeira conferência.
