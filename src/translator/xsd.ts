const Xsd2JsonSchema = require('xsd2jsonschema').Xsd2JsonSchema;
const xs2js = new Xsd2JsonSchema();

const XML_SCHEMA = `<?xml version='1.0' encoding='UTF-8'?>
<xs:schema xmlns:xs='http://www.w3.org/2001/XMLSchema'>

  <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
  <!-- +  BANCO CENTRAL DO BRASIL                                           + -->
  <!-- +  Documento 1201						    						+ -->
  <!-- +  Versão 1.0.5							  							+ -->
  <!-- +  Publicado em Outubro/2020			                    			+ -->
  <!-- +  Atualizado em 09/12/2020                                          + -->
  <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
	<!-- ******************************* -->
	<!-- Definicao dos elementos simples -->
	<!-- ******************************* -->

	<!-- tipos APIX001 -->
	<xs:element name="APIX001" type="tipoAPIX001" />
	<xs:element name="Transacoes" type="tipoTransacoes">
		<xs:unique name="idTransacao"> <!-- NR v.1.0.1 -->
			<xs:selector xpath="./Transacao" /> 
			<xs:field xpath="DetalhamentoTransacoes" /> 
		</xs:unique>
	</xs:element>
	<xs:element name="Devolucoes" type="tipoDevolucao" />
	<xs:element name="Receitas" type="tipoReceitas">
		<xs:unique name="idReceita"> <!-- NR v.1.0.1 -->
			<xs:selector xpath="./Receita" /> 
			<xs:field xpath="FonteReceita" /> 
		</xs:unique>
	</xs:element>
	<xs:element name="TemposTransacoes" type="tipoTempoTransacao" />
	<xs:element name="TemposDict" type="tipoTempoDict" />
	<xs:element name="ConsultasDict" type="tipoConsultasDict" />
	<xs:element name="Disponibilidade" type="tipoDisponibilidade" />

	<!-- ****************** -->
	<!-- Definicao de tipos -->
	<!-- ****************** -->

	<!-- Documento APIX001 -->
	<xs:complexType name="tipoAPIX001">
		<xs:sequence>
			<xs:element ref="Transacoes" minOccurs="1" maxOccurs="1" />
			<xs:element ref="Devolucoes" minOccurs="1" maxOccurs="1" />
			<xs:element ref="Receitas" minOccurs="1" maxOccurs="1" />
			<xs:element ref="TemposTransacoes" minOccurs="1" maxOccurs="1" />
			<xs:element ref="TemposDict" minOccurs="1" maxOccurs="1" />
			<xs:element ref="ConsultasDict" minOccurs="1" maxOccurs="1" />
			<xs:element ref="Disponibilidade" minOccurs="1" maxOccurs="1" />
		</xs:sequence>
		<xs:attribute name="DtArquivo" type="tipoDataMesAnoDia" use="required" />
		<xs:attribute name="Ano" type="tipoAno" use="required" />
		<xs:attribute name="Mes" type="tipoMes" use="required" />
		<xs:attribute name="ISPB" type="tipoCNPJ8" use="required" />
		<xs:attribute name="NomeResp" type="tipoNomeResp" use="required" />
		<xs:attribute name="EmailResp" type="tipoEmailResp" use="required" />
		<xs:attribute name="TelResp" type="tipoTelResp" use="required" />
		<xs:attribute name="TipoEnvio" type="tipoRemessa"  use="required" />
	</xs:complexType>

	<!-- Transacoes -->
	<xs:complexType name="tipoTransacoes">
		<xs:sequence>
			<xs:element name="Transacao" type="tipoTransacao" minOccurs="5" maxOccurs="5" /> <!-- NR v.1.0.3 -->
		</xs:sequence>
	</xs:complexType>

	<xs:complexType name="tipoTransacao">
		<xs:sequence>
			<xs:element name="QtdTransacoes" type="tipoQuantidadeComZero" />
			<xs:element name="ValorTransacoes" type="tipoValorComZero" />
			<xs:element name="DetalhamentoTransacoes" type="tipoDetalhamentoTransacao" />
		</xs:sequence>
	</xs:complexType>

	<!-- Devolucoes -->
	<xs:complexType name="tipoDevolucao">
		<xs:attribute name="QtdDevolucoes" type="tipoQuantidadeComZero" use="required" />
		<xs:attribute name="ValorDevolucoes" type="tipoValorComZero" use="required" />
	</xs:complexType>

	<!-- Receitas -->
	<xs:complexType name="tipoReceitas">
		<xs:sequence>
			<xs:element name="Receita" type="tipoReceita" minOccurs="3" maxOccurs="3"/>
		</xs:sequence>
	</xs:complexType>

	<xs:complexType name="tipoReceita">
		<xs:sequence>
			<xs:element name="ValorReceita" type="tipoValorComZero" />
			<xs:element name="FonteReceita" type="tipoFonteReceita" />
		</xs:sequence>
	</xs:complexType>

	<!-- TemposTransacoes -->
	<xs:complexType name='tipoTempoTransacao'>
		<xs:attribute name='Perc50TempoExpUsuarioInter' type='tipoValorTempo' use='required' />
		<xs:attribute name='Perc99TempoExpUsuarioInter' type='tipoValorTempo' use='required' />
		<xs:attribute name='Perc50TempoExpUsuarioIntra' type='tipoValorTempo' use='required' />
		<xs:attribute name='Perc99TempoExpUsuarioIntra' type='tipoValorTempo' use='required' />
	</xs:complexType>

	<!-- TemposDict -->
	<xs:complexType name='tipoTempoDict'>
		<xs:attribute name='Perc99TempoUsuarioConsulta' type='tipoValorTempo' use='required' />
		<xs:attribute name='Perc99TempoEnvioRegistro' type='tipoValorTempo' use='required' />
		<xs:attribute name='Perc99TempoExpUsuarioRegistro' type='tipoValorTempo' use='required' />
		<xs:attribute name='Perc99TempoExpUsuarioExclusao' type='tipoValorTempo' use='required' />
		<xs:attribute name='Perc99TempoNotificacaoPortabilidade' type='tipoValorTempo' use='required' />
		<xs:attribute name='Perc99TempoEnvioPortabilidade' type='tipoValorTempo' use='required' />
	</xs:complexType>

	<!-- ConsultasDict -->
	<xs:complexType name='tipoConsultasDict'>
		<xs:attribute name='QtdConsultas' type='tipoQuantidadeComZero'  use='required' />
	</xs:complexType>

	<!-- Disponibilidade -->
	<xs:complexType name='tipoDisponibilidade'>
		<xs:attribute name='IndiceDisponibilidade' type='tipoPorcentagemComZero' 
			use='required' />
	</xs:complexType>

	<!-- Definicao de tipos para atributos especificos -->
	<xs:simpleType name='tipoFonteReceita'>
		<xs:restriction base='xs:integer'>
			<xs:whiteSpace value='collapse' />
			<xs:pattern value='0?[1-3]' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoDetalhamentoTransacao'>
		<xs:restriction base='xs:integer'>
			<xs:whiteSpace value='collapse' />
			<xs:pattern value='0?[1-5]' /> <!-- NR v.1.0.2 -->
		</xs:restriction>
	</xs:simpleType>

	<!-- Definicao de tipos genericos -->
	<xs:simpleType name='tipoData'>
		<xs:restriction base='xs:date'>
			<xs:maxExclusive value='21500101' />
			<xs:minExclusive value='19001231' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoValor'>
		<xs:restriction base='xs:decimal'>
			<xs:totalDigits value='15' />
			<xs:fractionDigits value='2' />
			<xs:maxExclusive value='1000000000000000' />
			<xs:minExclusive value='0' />
		</xs:restriction>
	</xs:simpleType>
	
	<xs:simpleType name='tipoValorTempo'>
		<xs:restriction base='xs:decimal'>
			<xs:totalDigits value='8' /> <!-- NR v.1.0.6 -->
			<xs:fractionDigits value='2' /> <!-- NR v.1.0.6 -->
			<xs:maxExclusive value='1000000' /> <!-- NR v.1.0.6 --> <!-- NR v.1.0.5 --> 
			<xs:minInclusive value='0' /> <!-- NR v.1.0.1 -->
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoValorComZero'>
		<xs:restriction base='xs:decimal'>
			<xs:totalDigits value='15' />
			<xs:fractionDigits value='2' />
			<xs:maxExclusive value='1000000000000000' />
			<xs:minInclusive value='0' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoPorcentagemComZero'>
		<xs:restriction base='xs:decimal'>
			<xs:totalDigits value='5' /> <!-- NR v.1.0.4 -->
			<xs:fractionDigits value='2' />
			<xs:maxInclusive value='100' /> <!-- NR v.1.0.4 -->
			<xs:minInclusive value='0' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoQuantidade'>
		<xs:restriction base='xs:integer'>
			<xs:minInclusive value='1' />
			<xs:maxExclusive value='1000000000000' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoQuantidadeComZero'>
		<xs:restriction base='xs:integer'>
			<xs:minInclusive value='0' />
			<xs:maxExclusive value='1000000000000' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoCNPJ8'>
		<xs:restriction base='xs:string'>
			<xs:whiteSpace value='collapse' />
			<xs:pattern value='[0-9]{8}' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoCNPJ14'>
		<xs:restriction base='xs:string'>
			<xs:whiteSpace value='collapse' />
			<xs:pattern value='[0-9]{14}' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoDataMesAno'>
		<xs:restriction base='xs:gYearMonth'>
			<xs:whiteSpace value='collapse' />
			<xs:minInclusive value='200001' />
			<xs:maxExclusive value='205001' />
		</xs:restriction>
	</xs:simpleType>
	
	
	<xs:simpleType name='tipoAno'>
		<xs:restriction base='xs:gYear'>
			<xs:whiteSpace value='collapse' />
			<xs:minInclusive value='2020' />
			<xs:maxExclusive value='2080' />
		</xs:restriction>
	</xs:simpleType>
	
	<xs:simpleType name='tipoMes'>
		<xs:restriction base='xs:integer'>
			<xs:whiteSpace value='collapse' />
			<xs:minInclusive value='1' />
			<xs:maxInclusive value='12' />
		</xs:restriction>
	</xs:simpleType>
	
	<xs:simpleType name='tipoDataMesAnoDia'>
		<xs:restriction base='xs:date'>
			<xs:whiteSpace value='collapse' />
			<xs:minInclusive value='20000101' />
			<xs:maxExclusive value='20500101' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoSimNao'>
		<xs:restriction base='xs:string'>
			<xs:whiteSpace value='collapse' />
			<xs:pattern value='S|N' />
		</xs:restriction>
	</xs:simpleType>


	<!-- Definicao de campos do cabecalho -->
	<xs:simpleType name='tipoNomeResp'>
		<xs:restriction base='xs:string'>
			<xs:whiteSpace value='collapse' />
			<xs:pattern value='[^\|"]+' />
			<xs:maxLength value='200' />
			<xs:minLength value='1' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoEmailResp'>
		<xs:restriction base='xs:string'>
			<xs:whiteSpace value='collapse' />
			<xs:pattern
				value="[A-Za-z0-9_]+([-+.'][A-Za-z0-9_]+)*@[A-Za-z0-9_]+([-.][A-Za-z0-9_]+)*\.[A-Za-z0-9_]+([-.][A-Za-z0-9_]+)*" />
			<xs:maxLength value='100' />
			<xs:minLength value='1' />
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name='tipoTelResp'>
		<xs:restriction base='xs:string'>
			<xs:whiteSpace value='collapse' />
			<xs:pattern value='[^\r\n\|"]+' />
			<xs:maxLength value='14' />
			<xs:minLength value='1' />
		</xs:restriction>
	</xs:simpleType>

        <xs:simpleType name="tipoRemessa">
                 <xs:restriction base="xs:string">
                 	<xs:whiteSpace value="collapse" />
                        <xs:enumeration value="I"/>
                        <xs:enumeration value="S"/>
                 </xs:restriction>
        </xs:simpleType>

</xs:schema>`;

const convertedSchemas = xs2js.processAllSchemas({
	schemas: { 'APIX.xsd': XML_SCHEMA }
});

export const parse = () => {
	const jsonSchema = convertedSchemas['APIX.xsd'].getJsonSchema();
	return JSON.stringify(jsonSchema, null, 2);
}
