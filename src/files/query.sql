/* dummy query */

select 'TipoArquivo;APIX001' union all
select 'DtArquivo;'|| to_char(now(), 'YYYY-MM-DD') union all
select 'Ano;' || to_char(now(), 'YYYY') union all 
select 'Mes;' || to_char(now(), 'MM') union all
select 'ISPB;1234' union all 
select 'NomeResp;Jose da Silva' union all
select 'EmailResp;jose@silva.com' union all
select 'TelResp;1199999999' union all
select 'TipoEnvio;S' union all
select 'Perc50TempoExpUsuarioInter;' || (select count(1) from schema.table t) union all
select 'Perc99TempoExpUsuarioInter;' || (select count(1) from schema.table t) union all
select 'Perc50TempoExpUsuarioIntra;' || (select count(1) from schema.table t) union all
select 'Perc99TempoExpUsuarioIntra;' || (select count(1) from schema.table t) union all
select 'Perc99TempoUsuarioConsulta;' || (select count(1) from schema.table t) union all
select 'Perc99TempoEnvioRegistro;' || (select count(1) from schema.table t) union all
select 'Perc99TempoExpUsuarioRegistro;' || (select count(1) from schema.table t) union all
select 'Perc99TempoExpUsuarioExclusao;' || (select count(1) from schema.table t) union all
select 'Perc99TempoNotificacaoPortabilidade;' || (select count(1) from schema.table t) union all
select 'Perc99TempoEnvioPortabilidade;' || (select count(1) from schema.table t) union all
select 'QtdeConsultas;' || (select count(1) from schema.table t) union all
select 'IndiceDisponibilidade;' || (select count(1) from schema.table t) union all
select 'Transacao;' || count(1) || ';' || sum(1) || ';1' from schema.table t group by 1 union all
select 'Transacao;' || count(1) || ';' || sum(1) || ';2' from schema.table t group by 2 union all
select 'Transacao;' || count(1) || ';' || sum(1) || ';5' from schema.table t group by 5 union all
select 'Devolucao;' || count(1) || ';' || sum(1) from schema.table t union all
select 'Receita;' || sum(1) || ';1' from schema.table t group by 1 union all
select 'Receita;' || sum(1) || ';2'  from schema.table t group by 2