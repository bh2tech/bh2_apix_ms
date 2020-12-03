import * as XSD from "../translator/xsd";
import * as Boom from "@hapi/boom";

const csv = require("csvtojson");

export default class FileService {
  constructor() {
  }

  async uploadFile(payload: any) {
    const { hapi } = payload.Arquivo;

    if (hapi.filename.substring(hapi.filename.length - 4).toLowerCase() != ".csv")
      throw Boom.badData("Formato do arquivo não é válido, favor enviar um arquivo no formato 'CSV'.");

    const contentCsv = payload.Arquivo._data.toString("binary");

    let data: any = {
      Devolucao: {},
      Transacoes: [],
      Receitas: []
    };

    await csv({ noheader: true, output: "json", delimiter: ";" })
      .fromString(contentCsv)
      .subscribe(async (csvRow) => {
        data.TipoArquivo = csvRow.field1 == 'TipoArquivo' ? csvRow.field2 : data.TipoArquivo;
        data.DtArquivo = csvRow.field1 == 'DtArquivo' ? csvRow.field2 : data.DtArquivo;
        data.Ano = csvRow.field1 == 'Ano' ? csvRow.field2 : data.Ano;
        data.Mes = csvRow.field1 == 'Mes' ? csvRow.field2 : data.Mes;
        data.ISPB = csvRow.field1 == 'ISPB' ? csvRow.field2 : data.ISPB;
        data.NomeResp = csvRow.field1 == 'NomeResp' ? csvRow.field2 : data.NomeResp;
        data.EmailResp = csvRow.field1 == 'EmailResp' ? csvRow.field2 : data.EmailResp;
        data.TelResp = csvRow.field1 == 'TelResp' ? csvRow.field2 : data.TelResp;
        data.TipoEnvio = csvRow.field1 == 'TipoEnvio' ? csvRow.field2 : data.TipoEnvio;
        data.Perc50TempoExpUsuarioInter = csvRow.field1 == 'Perc50TempoExpUsuarioInter' ? csvRow.field2 : data.Perc50TempoExpUsuarioInter;
        data.Perc99TempoExpUsuarioInter = csvRow.field1 == 'Perc99TempoExpUsuarioInter' ? csvRow.field2 : data.Perc99TempoExpUsuarioInter;
        data.Perc50TempoExpUsuarioIntra = csvRow.field1 == 'Perc50TempoExpUsuarioIntra' ? csvRow.field2 : data.Perc50TempoExpUsuarioIntra;
        data.Perc99TempoExpUsuarioIntra = csvRow.field1 == 'Perc99TempoExpUsuarioIntra' ? csvRow.field2 : data.Perc99TempoExpUsuarioIntra;
        data.Perc99TempoUsuarioConsulta = csvRow.field1 == 'Perc99TempoUsuarioConsulta' ? csvRow.field2 : data.Perc99TempoUsuarioConsulta;
        data.Perc99TempoEnvioRegistro = csvRow.field1 == 'Perc99TempoEnvioRegistro' ? csvRow.field2 : data.Perc99TempoEnvioRegistro;
        data.Perc99TempoExpUsuarioRegistro = csvRow.field1 == 'Perc99TempoExpUsuarioRegistro' ? csvRow.field2 : data.Perc99TempoExpUsuarioRegistro;
        data.Perc99TempoExpUsuarioExclusao = csvRow.field1 == 'Perc99TempoExpUsuarioExclusao' ? csvRow.field2 : data.Perc99TempoExpUsuarioExclusao;
        data.Perc99TempoNotificacaoPortabilidade = csvRow.field1 == 'Perc99TempoNotificacaoPortabilidade' ? csvRow.field2 : data.Perc99TempoNotificacaoPortabilidade;
        data.Perc99TempoEnvioPortabilidade = csvRow.field1 == 'Perc99TempoEnvioPortabilidade' ? csvRow.field2 : data.Perc99TempoEnvioPortabilidade;
        data.QtdConsultas = csvRow.field1 == 'QtdConsultas' ? csvRow.field2 : data.QtdConsultas;
        data.IndiceDisponibilidade = csvRow.field1 == 'IndiceDisponibilidade' ? csvRow.field2 : data.IndiceDisponibilidade;
        data.Devolucao.QtdDevolucoes = csvRow.field1 == 'Devolucao' ? csvRow.field2 : data.Devolucao.QtdDevolucoes;
        data.Devolucao.ValorDevolucoes = csvRow.field1 == 'Devolucao' ? csvRow.field3 : data.Devolucao.ValorDevolucoes;

        if (csvRow.field1 == 'Transacao')
          data.Transacoes.push({
            QtdTransacoes: csvRow.field2,
            ValorTransacoes: csvRow.field3,
            DetalhamentoTransacoes: csvRow.field4
          });

        if (csvRow.field1 == 'Receita')
          data.Receitas.push({
            ValorReceita: csvRow.field2,
            FonteReceita: csvRow.field3,
          });
      });

    const xmlFile = this.generateXml(data);
    return xmlFile;
  }

  async demoFile(query: any) {
    const content = `<?xml version="1.0" encoding="utf-8"?>
  <${query.TipoArquivo} DtArquivo="2012-12-13" Ano="1999" Mes="1234" ISPB="str1234" NomeResp="str1234" EmailResp="str1234" TelResp="str1234" TipoEnvio="I">
    <Transacoes>
      <Transacao>
        <QtdTransacoes>1234</QtdTransacoes>
        <ValorTransacoes>123.45</ValorTransacoes>
        <DetalhamentoTransacoes>1234</DetalhamentoTransacoes>
      </Transacao>
      <Transacao>
        <QtdTransacoes>1234</QtdTransacoes>
        <ValorTransacoes>123.45</ValorTransacoes>
        <DetalhamentoTransacoes>1234</DetalhamentoTransacoes>
      </Transacao>
      <Transacao>
        <QtdTransacoes>1234</QtdTransacoes>
        <ValorTransacoes>123.45</ValorTransacoes>
        <DetalhamentoTransacoes>1234</DetalhamentoTransacoes>
      </Transacao>
      <Transacao>
        <QtdTransacoes>1234</QtdTransacoes>
        <ValorTransacoes>123.45</ValorTransacoes>
        <DetalhamentoTransacoes>1234</DetalhamentoTransacoes>
      </Transacao>
    </Transacoes>
    <Devolucoes QtdDevolucoes="1234" ValorDevolucoes="123.45" />
    <Receitas>
      <Receita>
        <ValorReceita>123.45</ValorReceita>
        <FonteReceita>1234</FonteReceita>
      </Receita>
      <Receita>
        <ValorReceita>123.45</ValorReceita>
        <FonteReceita>1234</FonteReceita>
      </Receita>
      <Receita>
        <ValorReceita>123.45</ValorReceita>
        <FonteReceita>1234</FonteReceita>
      </Receita>
    </Receitas>
    <TemposTransacoes Perc50TempoExpUsuarioInter="123.45" Perc99TempoExpUsuarioInter="123.45" Perc50TempoExpUsuarioIntra="123.45" Perc99TempoExpUsuarioIntra="123.45" />
    <TemposDict Perc99TempoUsuarioConsulta="123.45" Perc99TempoEnvioRegistro="123.45" Perc99TempoExpUsuarioRegistro="123.45" Perc99TempoExpUsuarioExclusao="123.45" Perc99TempoNotificacaoPortabilidade="123.45" Perc99TempoEnvioPortabilidade="123.45" />
    <ConsultasDict QtdConsultas="1234" />
    <Disponibilidade IndiceDisponibilidade="123.45" />
    </${query.TipoArquivo}>`;

    return content;
  }

  async create(data: any) {
    return this.generateXml(data);
  }

  async schema() {
    return XSD.parse();
  }

  private generateXml(data: any) {
    let content = `<?xml version="1.0" encoding="utf-8"?>\r\n`
    content += `<${data.TipoArquivo} DtArquivo="${data.DtArquivo}" Ano="${data.Ano}" Mes="${data.Mes}" ISPB="${data.ISPB}" NomeResp="${data.NomeResp}" EmailResp="${data.EmailResp}" TelResp="${data.TelResp}" TipoEnvio="${data.TipoEnvio}">\r\n`;
    content += `  <Transacoes>\r\n`;
    for (const item of data.Transacoes) {
      content += `    <Transacao>\r\n`;
      content += `      <QtdTransacoes>${item.QtdTransacoes}</QtdTransacoes>\r\n`;
      content += `      <ValorTransacoes>${item.ValorTransacoes}</ValorTransacoes>\r\n`;
      content += `      <DetalhamentoTransacoes>${item.DetalhamentoTransacoes}</DetalhamentoTransacoes>\r\n`;
      content += `    </Transacao>\r\n`;
    }
    content += `  </Transacoes>\r\n`;
    content += `  <Devolucoes QtdDevolucoes="${data.Devolucao.QtdDevolucoes}" ValorDevolucoes = "${data.Devolucao.ValorDevolucoes}" />\r\n`;
    content += `  <Receitas>\r\n`;
    for (const item of data.Receitas) {
      content += `    <Receita>\r\n`;
      content += `      <ValorReceita>${item.ValorReceita}</ValorReceita>\r\n`;
      content += `      <FonteReceita>${item.FonteReceita}</FonteReceita>\r\n`;
      content += `     </Receita>\r\n`;
    }
    content += `  </Receitas>\r\n`;
    content += `  <TemposTransacoes Perc50TempoExpUsuarioInter="${data.Perc50TempoExpUsuarioInter}" Perc99TempoExpUsuarioInter="${data.Perc99TempoExpUsuarioInter}" Perc50TempoExpUsuarioIntra="${data.Perc50TempoExpUsuarioIntra}" Perc99TempoExpUsuarioIntra="${data.Perc99TempoExpUsuarioIntra}" />\r\n`;
    content += `  <TemposDict Perc99TempoUsuarioConsulta="${data.Perc99TempoUsuarioConsulta}" Perc99TempoEnvioRegistro="${data.Perc99TempoEnvioRegistro}" Perc99TempoExpUsuarioRegistro="${data.Perc99TempoExpUsuarioRegistro}" Perc99TempoExpUsuarioExclusao="${data.Perc99TempoExpUsuarioExclusao}" Perc99TempoNotificacaoPortabilidade="${data.Perc99TempoNotificacaoPortabilidade}" Perc99TempoEnvioPortabilidade="${data.Perc99TempoEnvioPortabilidade}" />\r\n`;
    content += `  <ConsultasDict QtdConsultas="${data.QtdConsultas}" />\r\n`;
    content += `  <Disponibilidade IndiceDisponibilidade="${data.IndiceDisponibilidade}" />\r\n`;
    content += `</${data.TipoArquivo}>`;
    return content;
  }
}
