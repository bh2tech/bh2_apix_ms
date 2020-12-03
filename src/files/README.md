## Layout do Arquivo CSV

O arquivo foi criado com um conceito *transposto* para não ser necessário gerar tipos de registro para determinados tipos de linha. Por exemplo, informações de **Transacao** e **Receita**, elas ocorrem mais de uma vez e cada uma contém quantidade de campos diferentes, a ideia é criar um arquivo simples e fácil de montar através de [consultas](https://github.com/bh2tech/bh2_apix_ms/blob/master/src/arquivos/query.sql) em um banco de dados.

Para saber quais informações deve gerar no arquivo consulte a referência logo abaixo em [*Campos do CSV*](#ancora1).

**Formato:** 

  .csv

**Conteúdo:** 

  [NOME DO CAMPO];[VALOR 1];[VALOR 2];[VALOR 3];...

**OBS:** *O nome do campo é obrigatório, os valores são preenchidos conforme os campos abaixo.*

<a id="ancora1"></a>
## Campos do CSV  

**Referência:** [APIX001.xlsx](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Remessa_informacoes_Pix/APIX001.xlsx)

[TipoArquivo](#ancora2) =>  
DtArquivo =>  
Ano =>  
Mes =>  
ISPB =>  
NomeResp =>  
EmailResp =>  
TelResp =>  
[TipoEnvio](#ancora3) =>  
  
Perc50TempoExpUsuarioInter =>  
Perc99TempoExpUsuarioInter =>  
Perc50TempoExpUsuarioIntra =>  
Perc99TempoExpUsuarioIntra =>  
Perc99TempoUsuarioConsulta =>  
Perc99TempoEnvioRegistro =>  
Perc99TempoExpUsuarioRegistro =>   
Perc99TempoExpUsuarioExclusao =>  
Perc99TempoNotificacaoPortabilidade =>  
Perc99TempoEnvioPortabilidade =>  
IndiceDisponibilidade =>  
  
Transacao[] =>  
QtdTransacoes =>  
ValorTransacoes =>  
[DetalhamentoTransacoes](#ancora4) =>  
  
QtdDevolucoes =>  
ValorDevolucoes =>  
  
Receita[] =>  
ValorReceita =>   
[FonteReceita](#ancora5) =>  
  
QtdConsultas =>   

## Exemplo de arquivo CSV

```code
TipoArquivo;APIX001
DtArquivo;2020-12-02  
Ano;2020  
Mes;12  
ISPB;1234  
NomeResp;Jose da Silva  
EmailResp;jose@silva.com  
TelResp;1199999999  
TipoEnvio;S  
Perc50TempoExpUsuarioInter;5.2  
Perc99TempoExpUsuarioInter;5.2  
Perc50TempoExpUsuarioIntra;5.2  
Perc99TempoExpUsuarioIntra;5.2  
Perc99TempoUsuarioConsulta;5.2  
Perc99TempoEnvioRegistro;5.2  
Perc99TempoExpUsuarioRegistro;5.2  
Perc99TempoExpUsuarioExclusao;5.2  
Perc99TempoNotificacaoPortabilidade;5.2  
Perc99TempoEnvioPortabilidade;5.2  
QtdConsultas;1250  
IndiceDisponibilidade;99.85  
Transacao;10;200.00;2  
Transacao;20;400.00;1  
Transacao;5;100.00;5  
Devolucao;10;250.00  
Receita;1624.25;1  
Receita;2321.56;2  
```
## Domínios
<a id="ancora2"></a>
- 1) **TipoArquivo**  

        APIX001 => Envio recorrente  
        APIX002 => Envio sob demanda  
<a id="ancora3"></a>
- 2) **TipoEnvio**  

        I => Novas informações  
        S => Alteração de informações enviadas previamente  
<a id="ancora4"></a>
- 3) **DetalhamentoTransacoes**

        1 => Transações liquidadas dentro de uma mesma instituição (caso 1 da Figura 1) sem tratamento por suspeita de fraude (NR).  
        2 => Transações liquidadas dentro de uma mesma instituição (caso 1 da Figura 1) após tratamento por suspeita de fraude (NR).        
        3 => Transações envolvendo clientes de uma mesma instituição (caso 1 da Figura 1) rejeitadas após tratamento por suspeita de fraude (NR).  
        4 => Transações envolvendo clientes de instituições diferentes e rejeitadas após tratamento por suspeita de fraude (NR).  
        5 => Transaçoes liquidadas dentro de um mesmo participante liquidante no SPI (caso 2 da Figura 1) (NR).          
<a id="ancora5"></a>
- 4) **FonteReceita**

        1 => Iniciação de transações por pessoa jurídica.        
        2 => Recebimento de transações por pessoa jurídica.        
        3 => Recebimento de transações por pessoa física.




