import * as Joi from "@hapi/joi";

export const data = Joi.object({
    TipoEnvio: Joi.string()
        .required()
        .valid("I", "S")
        .description(`
    Tipo de Envio:
        I => Novas informações
        S => Alteração de informações enviadas previamente
    `),
    TipoArquivo: Joi.string()
        .required()
        .valid("APIX001", "APIX002")
        .description(`
    Tipo de Arquivo:
        APIX001 => Envio recorrente
        APIX002 => Envio sob demanda`),
    DtArquivo: Joi.string()
        .required()
        .max(10)
        .min(10)
        .example("2012-12-13")
        .description("Data do Arquivo"),
    Ano: Joi.string()
        .required()
        .max(4)
        .min(4)
        .example("1999")
        .description("Ano de Referência"),
    Mes: Joi.string()
        .required()
        .max(2)
        .min(2)
        .example("12")
        .description("Mês de Referência"),
    ISPB: Joi.string()
        .required()
        .max(8)
        .example("str1234")
        .description("Nome do Responsável pelo Documento"),
    NomeResp: Joi.string()
        .required()
        .max(200)
        .example("str1234")
        .description("Nome do Responsável pelo Documento"),
    EmailResp: Joi.string()
        .required()
        .max(100)
        .example("str1234")
        .description("E-mail do Responsável pelo Documento"),
    TelResp: Joi.string()
        .required()
        .max(14)
        .example("str1234")
        .description("Telefone do Responsável pelo Documento"),
    Perc50TempoExpUsuarioInter: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 50 (mediana) dos tempos (em segundos) detalhados na seção 3.1.2.1 do Manual de Tempos do Pix (Versão 2.0). (NR)
        Diferença entre os marcos de tempo t6a e t0’ definidos no referido manual (t6a – t0’).
        `),
    Perc99TempoExpUsuarioInter: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 99 dos tempos (em segundos) detalhados na seção 3.1.2.1 do Manual de Tempos do Pix (Versão 2.0). (NR)
        Diferença entre os marcos de tempo t6a e t0’ definidos no referido manual (t6a – t0’).
        `),
    Perc50TempoExpUsuarioIntra: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 50 (mediana) dos tempos (em segundos) detalhados na seção 3.1.2.2 do Manual de Tempos do Pix (Versão 2.0). (NR)
        Diferença entre os marcos de tempo t6a e t0’ definidos no referido manual (t6a – t0’).
        `),
    Perc99TempoExpUsuarioIntra: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 99 dos tempos (em segundos) detalhados na seção 3.1.2.2 do Manual de Tempos do Pix (Versão 2.0). (NR)
        Diferença entre os marcos de tempo t6a e t0’ definidos no referido manual (t6a – t0’).
        `),
    Perc99TempoUsuarioConsulta: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 99 dos tempos (em segundos) detalhados na seção 3.2.2.1 do Manual de Tempos do Pix (Versão 2.0). (NR)
        PSP com acesso direto ao DICT: Etapas 4 a 15 do fluxo detalhado na seção 8.1 do Manual Operacional do DICT (Versão 2.0).
        PSP com acesso indireto ao DICT: Etapas 4 a 19 do fluxo detalhado na seção 8.2 do Manual Operacional do DICT (Versão 2.0).
        `),
    Perc99TempoEnvioRegistro: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 99 dos tempos (em segundos) detalhados na seção 3.2.2.1 do Manual de Tempos do Pix (Versão 2.0). (NR)
        PSP com acesso direto ao DICT: Etapas 4 a 5 do fluxo detalhado na seção 3.1 do Manual Operacional do DICT (Versão 2.0).
        PSP com acesso indireto ao DICT: Etapas 4 a 5 do fluxo detalhado na seção 3.2 do Manual Operacional do DICT (Versão 2.0).
        `),
    Perc99TempoExpUsuarioRegistro: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 99 dos tempos (em segundos) detalhados na seção 3.2.2.1 do Manual de Tempos do Pix (Versão 2.0). (NR)
        PSP com acesso direto ao DICT: Etapas 6 a 15 do fluxo detalhado na seção 3.1 do Manual Operacional do DICT (Versão 2.0).
        PSP com acesso indireto ao DICT: Etapas 6 a 19 do fluxo detalhado na seção 3.2 do Manual Operacional do DICT (Versão 2.0).
        `),
    Perc99TempoExpUsuarioExclusao: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 99 dos tempos (em segundos) detalhados na seção 3.2.2.1 do Manual de Tempos do Pix (Versão 2.0). (NR)
        PSP com acesso direto ao DICT: Etapas 4 a 13 do fluxo detalhado na seção 4.1 do Manual Operacional do DICT (Versão 2.0).
        PSP com acesso indireto ao DICT: Etapas 4 a 17 do fluxo detalhado na seção 4.2 do Manual Operacional do DICT (Versão 2.0).
        `),
    Perc99TempoNotificacaoPortabilidade: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 99 dos tempos (em segundos) detalhados na seção 3.2.2.2 do Manual de Tempos do Pix (Versão 2.0). (NR)
        PSP doador com acesso direto ao DICT: Etapas 1 a 2 dos fluxos detalhados nas seções 5.3 e 6.3  do Manual Operacional do DICT (Versão 2.0).
        PSP doador com acesso indireto ao DICT: Etapas 1 a 6 do fluxo detalhado nas seções 5.4 e 6.4 do Manual Operacional do DICT (Versão 2.0).
        `),
    Perc99TempoEnvioPortabilidade: Joi.number()
        .required()
        .positive()
        .allow(0.0)
        .precision(1)
        .example(5.2)
        .description(`Percentil 99 dos tempos (em segundos)detalhados na seção 3.2.2.3 do Manual de Tempos do Pix (Versão 2.0). (NR)
        PSP doador com acesso direto ao DICT: Etapas 8 a 12 (portabilidade) e 8 a 19 (reinvindicação) a 2 dos fluxos detalha-dos nas seções 5.3 e 6.3  do Manual Ope-racional do DICT (Versão 2.0).
        PSP doador com acesso indireto ao DICT: Etapas 10 a 14 (portabilidade) e 10 a 25 (reinvindicação) do fluxo deta-lhado nas seções 5.4 e 6.4 do Manual Operacional do DICT (Versão 2.0).
        `),
    QtdConsultas: Joi.number()
        .required()
        .positive()
        .allow(0)
        .example(5)
        .description("Quantidade de consultas à base interna do participante"),
    IndiceDisponibilidade: Joi.number()
        .required()
        .positive()
        .allow(0)
        .precision(2)
        .example(99.85)
        .description("Índice de disponibilidade"),
    Transacoes: Joi.array()
        .items(
            Joi.object({
                QtdTransacoes: Joi.number()
                    .example(10)
                    .required()
                    .positive()
                    .allow(0),
                ValorTransacoes: Joi.number()
                    .precision(2)
                    .example(125.60)
                    .required()
                    .positive()
                    .allow(0),
                DetalhamentoTransacoes: Joi.number()
                    .required()
                    .valid(1, 2, 3, 4, 5)
                    .description(`
                1 => Transações liquidadas dentro de uma mesma instituição (caso 1 da Figura 1) sem tratamento por suspeita de fraude (NR)
                2 => Transações liquidadas dentro de uma mesma instituição (caso 1 da Figura 1) após tratamento por suspeita de fraude (NR)
                3 => Transações envolvendo clientes de uma mesma instituição (caso 1 da Figura 1) rejeitadas após tratamento por suspeita de fraude (NR)
                4 => Transações envolvendo clientes de instituições diferentes e rejeitadas após tratamento por suspeita de fraude (NR)
                5 => Transaçoes liquidadas dentro de um mesmo participante liquidante no SPI (caso 2 da Figura 1) (NR)
                `)
            }).label("ItemTransacao")
        ).min(5).max(5).required()
        .label("Transacoes"),
    Devolucao: Joi.object({
        QtdDevolucoes: Joi.number()
            .example(10)
            .required()
            .positive()
            .allow(0),
        ValorDevolucoes: Joi.number()
            .precision(2)
            .example(125.60)
            .required()
            .positive()
            .allow(0),
    }).required()
        .label("Devolucao"),
    Receitas: Joi.array()
        .items(Joi.object({
            ValorReceita: Joi.number()
                .precision(2)
                .example(125.60)
                .required()
                .positive()
                .allow(0),
            FonteReceita: Joi.number()
                .required()
                .valid(1, 2, 3)
                .description(`
            1 => Iniciação de transações por pessoa jurídica
            2 => Recebimento de transações por pessoa jurídica
            3 => Recebimento de transações por pessoa física
            `),
        }).label("ItemReceita")
        ).min(3).max(3).required()
        .label("Receitas")
}).label("Dados");