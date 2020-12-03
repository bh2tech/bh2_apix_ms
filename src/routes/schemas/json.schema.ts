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
    TelResp: Joi.string
        ().required()
        .max(14)
        .example("str1234")
        .description("Telefone do Responsável pelo Documento"),
    Perc50TempoExpUsuarioInter: Joi.number()
        .required()
        .precision(1)
        .example(5.2)
        .description("Percentil 50 do tempo relacionado à experiência do usuário pagador (transações liquidadas entre diferentes participantes)."),
    Perc99TempoExpUsuarioInter: Joi.number()
        .required()
        .precision(1)
        .example(5.2)
        .description("Percentil 99 do tempo relacionado à experiência do usuário pagador (transações liquidadas entre diferentes participantes)."),
    Perc50TempoExpUsuarioIntra: Joi.number()
        .required()
        .precision(1)
        .example(5.2)
        .description("Percentil 50 do tempo relacionado à experiência do usuário pagador (transações liquidadas dentro de uma mesma instituição)."),
    Perc99TempoExpUsuarioIntra: Joi.number()
        .required()
        .precision(1)
        .example(5.2)
        .description("Percentil 99 do tempo relacionado à experiência do usuário pagador (transações liquidadas dentro de uma mesma instituição)."),
    Perc99TempoUsuarioConsulta: Joi.number()
        .required()
        .precision(1)
        .example(5.2)
        .description("Percentil 99 do tempo do usuário pagador na consulta ao DICT"),
    Perc99TempoEnvioRegistro: Joi.number()
        .required()
        .precision(1)
        .example(5.2)
        .description("Percentil 99 do tempo para envio do código para e-mail ou número de telefone celular no registro de chave"),
    Perc99TempoExpUsuarioRegistro: Joi.number()
        .required()
        .precision(1)
        .example(5.2)
        .description("Percentil 99 do tempo relacionado à experiência do usuário pagador no registro de chave"),
    Perc99TempoExpUsuarioExclusao: Joi.number()
        .required()
        .precision(1)
        .example(5.2)
        .description("Percentil 99 do tempo relacionado à experiência do usuário pagador na exclusão de chave"),
    Perc99TempoNotificacaoPortabilidade: Joi.number()
        .precision(1)
        .required()
        .example(5.2)
        .description("Percentil 99 do tempo decorrido entre o recebimento (acknowledge) no DICT e a notificação ao usuário doador em ambiente logado (processo de portabilidade ou de reivindicação de posse)"),
    Perc99TempoEnvioPortabilidade: Joi.number()
        .precision(1)
        .required()
        .example(5.2)
        .description("Percentil 99 do tempo decorrido entre a ação do usuário (confirmação ou cancelamento) e o envio da informação para o DICT (processo de portabilidade ou de reivindicação de posse)"),
    QtdConsultas: Joi.number()
        .max(12)
        .required()
        .example(5)
        .description("Quantidade de consultas à base interna do participante"),
    IndiceDisponibilidade: Joi.number()
        .required()
        .precision(2)
        .example(99.85)
        .description("Índice de disponibilidade"),
    Transacoes: Joi.array()
        .items(
            Joi.object({
                QtdTransacoes: Joi.number()
                    .max(12)
                    .example(10)
                    .required(),
                ValorTransacoes: Joi.number()
                    .precision(2)
                    .example(125.60)
                    .required(),
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
        ).required()
        .label("Transacoes"),
    Devolucao: Joi.object({
        QtdDevolucoes: Joi.number()
            .max(12)
            .example(10)
            .required(),
        ValorDevolucoes: Joi.number()
            .precision(2)
            .example(125.60)
            .required(),
    }).required()
        .label("Devolucao"),
    Receitas: Joi.array()
        .items(Joi.object({
            ValorReceita: Joi.number()
                .precision(2)
                .example(125.60)
                .required(),
            FonteReceita: Joi.number()
                .required()
                .valid(1, 2, 3)
                .description(`
            1 => Iniciação de transações por pessoa jurídica
            2 => Recebimento de transações por pessoa jurídica
            3 => Recebimento de transações por pessoa física
            `),
        }).label("ItemReceita")
        ).required()
        .label("Receitas")
}).label("Dados");