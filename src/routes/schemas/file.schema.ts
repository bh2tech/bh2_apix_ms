import * as Joi from "@hapi/joi";

export const uploadFile = Joi.object({
    Arquivo: Joi.any()
        .meta({ swaggerType: "file" })
        .required()
        .description(`Arquivo com informações de Transações, Devoluções e Receitas no formato CSV \r\n
        Layout do Arquivo:
            
            Formato: .csv
            Conteúdo: [NOME DO CAMPO];[VALOR 1];[VALOR 2];[VALOR 3];...

            ** OBS: O nome do campo é obrigatório, os valores são preenchidos conforme os campos abaixo: **

        Campos: 

            Referência: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Remessa_informacoes_Pix/APIX001.xlsx

            TipoArquivo => (Ver domínio 1)
            DtArquivo => 
            Ano => 
            Mes => 
            ISPB => 
            NomeResp => 
            EmailResp => 
            TelResp => 
            TipoEnvio => (Ver domínio 2)

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
                DetalhamentoTransacoes => (Ver domínio 3)

            QtdDevolucoes =>
            ValorDevolucoes =>

            Receita[] =>
                ValorReceita => 
                FonteReceita => (Ver domínio 4)
                
            QtdConsultas => 

        Exemplo de arquivo CSV:
            TipoArquivo;APIX001
            DtArquivo;2020-12-12
            Ano;2020
            Mes;12
            ISPB;1234 
            NomeResp;Jose da Silva 
            EmailResp;jose@silva.com
            TelResp;1234
            TipoEnvio;I 
            Perc50TempoExpUsuarioInter;10
            Perc99TempoExpUsuarioInter;10
            Perc50TempoExpUsuarioIntra;10
            Perc99TempoExpUsuarioIntra;10
            Perc99TempoUsuarioConsulta;10
            Perc99TempoEnvioRegistro;10
            Perc99TempoExpUsuarioRegistro;10
            Perc99TempoExpUsuarioExclusao;10
            Perc99TempoNotificacaoPortabilidade;10
            Perc99TempoEnvioPortabilidade;10
            QtdConsultas;10
            IndiceDisponibilidade;10
            Transacao;100;1250.21;1
            Transacao;100;1250.21;2
            Devolucao;100;300.00
            Receita;100;1
            Receita;100;3

        1) Domínio TipoArquivo:
            APIX001 => Envio recorrente
            APIX002 => Envio sob demanda            
        
        2) Domínio TipoEnvio:
            I => Novas informações
            S => Alteração de informações enviadas previamente
        
        3) Domínio DetalhamentoTransacoes:
            1 => Transações liquidadas dentro de uma mesma instituição (caso 1 da Figura 1) sem tratamento por suspeita de fraude (NR)
            2 => Transações liquidadas dentro de uma mesma instituição (caso 1 da Figura 1) após tratamento por suspeita de fraude (NR)
            3 => Transações envolvendo clientes de uma mesma instituição (caso 1 da Figura 1) rejeitadas após tratamento por suspeita de fraude (NR)
            4 => Transações envolvendo clientes de instituições diferentes e rejeitadas após tratamento por suspeita de fraude (NR)
            5 => Transaçoes liquidadas dentro de um mesmo participante liquidante no SPI (caso 2 da Figura 1) (NR)
        
        4) Domínio FonteReceita:
            1 => Iniciação de transações por pessoa jurídica
            2 => Recebimento de transações por pessoa jurídica
            3 => Recebimento de transações por pessoa física
        `)
}).label("APIXUpload");

