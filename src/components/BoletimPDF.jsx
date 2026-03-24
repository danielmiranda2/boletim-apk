import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

// ─── Colors ──────────────────────────────────────────────────────────────────
const C = {
  greenDark: '#1a5c28',
  greenMed: '#2d7a3a',
  greenAccent: '#6ab043',
  greenLight: '#e8f5e9',
  greenBorder: '#c8e6c9',
  text: '#222222',
  textMed: '#444444',
  textLight: '#666666',
  white: '#ffffff',
  offWhite: '#f9f9f9',
  lightGray: '#f0f0f0',
  borderGray: '#dddddd',
}

// ─── Fixed content ───────────────────────────────────────────────────────────
const AGENDA = {
  domingo: ['09:00  Culto Matutino', '09:45  Escola Bíblica Dominical', '19:00  Culto Vespertino'],
  terca: '20:00 Célula de Oração (lares)',
  quinta: '19:30 Estudo Bíblico',
}
const ENDERECO = 'Estrada Carvalho Ramos nº. 01\nJardim Jerusalém, Campo Grande, RJ\nCEP 23073-540'
const AMIGO_VISITANTE = 'Ficamos felizes com a sua presença.\n\nVolte a participar conosco. Receba o nosso carinho e saiba que você será sempre bem-vindo!'

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    color: C.text,
  },

  // Top decorative bar
  topBar: {
    height: 8,
    backgroundColor: C.greenDark,
    flexDirection: 'row',
  },
  topBarAccent: {
    width: 60,
    backgroundColor: C.greenAccent,
    marginLeft: 'auto',
  },
  topBarAccent2: {
    width: 20,
    backgroundColor: C.greenMed,
  },

  // Content area
  content: {
    paddingHorizontal: 28,
    flex: 1,
  },

  // ── Page 1 ──

  // Header
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'flex-start',
    gap: 16,
  },
  headerLeft: {
    width: 130,
    borderRight: `2pt solid ${C.greenAccent}`,
    paddingRight: 12,
  },
  churchLogoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  churchCross: {
    width: 32,
    height: 32,
    backgroundColor: C.greenDark,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  churchCrossText: {
    color: C.white,
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
  },
  churchNameLines: {
    flex: 1,
  },
  churchLine1: {
    fontSize: 7,
    color: C.textLight,
  },
  churchLine2: {
    fontSize: 7,
    color: C.textLight,
  },
  churchLine3: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: C.greenDark,
    marginTop: 1,
  },
  headerRight: {
    flex: 1,
  },
  boletimTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 28,
    color: C.greenDark,
    letterSpacing: -0.5,
  },
  boletimSubtitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 13,
    color: C.greenDark,
    marginTop: -2,
  },
  headerDivider: {
    height: 2,
    backgroundColor: C.greenAccent,
    marginVertical: 3,
  },
  dateLine: {
    fontSize: 8,
    color: C.textMed,
  },

  // Banner
  banner: {
    height: 72,
    backgroundColor: '#8b1a1a',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: C.white,
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    letterSpacing: 2,
  },

  // Liturgy columns
  liturgyRow: {
    flexDirection: 'row',
    gap: 14,
    flex: 1,
  },
  liturgyCol: {
    flex: 1,
  },
  liturgyHeader: {
    backgroundColor: C.greenDark,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  liturgyHeaderText: {
    color: C.white,
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    letterSpacing: 1,
  },
  liturgySectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    color: C.text,
    marginTop: 6,
    marginBottom: 2,
  },
  liturgyItem: {
    fontSize: 8,
    color: C.textMed,
    paddingLeft: 8,
    marginBottom: 1,
    lineHeight: 1.4,
  },
  liturgyPreludium: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 8,
    color: C.textMed,
    marginBottom: 4,
  },

  // ── Page 2 ──

  // Escalas
  escalasTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    color: C.text,
    paddingVertical: 14,
  },
  escalasRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
  },
  escalasCol: {
    flex: 1,
  },
  escalasHeader: {
    backgroundColor: C.greenDark,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  escalasHeaderText: {
    color: C.white,
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    letterSpacing: 1,
  },
  escalasSubheader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: C.greenAccent,
    marginBottom: 4,
  },
  escalasRow2: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 3,
    alignItems: 'center',
  },
  escalasDate: {
    fontSize: 8,
    color: C.textMed,
    width: 30,
  },
  escalasName: {
    fontSize: 8,
    color: C.text,
    flex: 1,
  },

  // Junta Diaconal table
  juntaTable: {
    flex: 1.5,
  },
  juntaRow: {
    flexDirection: 'row',
    borderBottom: `0.5pt solid ${C.borderGray}`,
    paddingVertical: 3,
  },
  juntaRowAlt: {
    backgroundColor: C.lightGray,
  },
  juntaCell: {
    flex: 1,
    fontSize: 8,
    color: C.text,
    paddingHorizontal: 4,
  },
  juntaHeaderCell: {
    flex: 1,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: C.white,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  juntaHeader: {
    backgroundColor: C.greenDark,
    flexDirection: 'row',
    marginBottom: 2,
  },

  // Alvos section
  alvosHeader: {
    backgroundColor: C.greenDark,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  alvosHeaderText: {
    color: C.white,
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  alvosRow: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  alvosCol: {
    flex: 1,
  },
  alvosTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: C.greenDark,
    textAlign: 'center',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  alvosText: {
    fontSize: 8,
    color: C.text,
    textAlign: 'justify',
    lineHeight: 1.5,
  },
  amigoBox: {
    backgroundColor: C.greenLight,
    padding: 8,
    borderRadius: 2,
  },
  amigoTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: C.greenDark,
    textAlign: 'center',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  amigoText: {
    fontSize: 8,
    color: C.text,
    textAlign: 'justify',
    lineHeight: 1.5,
  },

  // ── Page 3 ──

  pastoralImageBox: {
    height: 130,
    backgroundColor: '#2d5a27',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 14,
    marginBottom: 12,
  },
  pastoralImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pastoralOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  pastoralBigTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 36,
    color: C.white,
    letterSpacing: 4,
    zIndex: 1,
  },
  pastoralDivider: {
    height: 2,
    backgroundColor: C.greenAccent,
    marginHorizontal: 28,
    marginBottom: 4,
  },
  pastoralMeta: {
    alignItems: 'center',
    paddingHorizontal: 28,
    marginBottom: 14,
  },
  pastoralFullTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: C.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  pastoralAutor: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: C.text,
    textAlign: 'center',
  },
  pastoralTextRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 28,
    flex: 1,
  },
  pastoralTextCol: {
    flex: 1,
  },
  pastoralText: {
    fontSize: 9,
    color: C.text,
    textAlign: 'justify',
    lineHeight: 1.7,
  },

  // ── Shared Footer ──
  footer: {
    paddingHorizontal: 28,
    paddingBottom: 10,
  },
  footerDivider: {
    height: 1,
    backgroundColor: C.borderGray,
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: 'row',
    gap: 14,
  },
  footerCol: {
    flex: 1,
  },
  footerHeader: {
    backgroundColor: C.greenDark,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginBottom: 5,
  },
  footerHeaderText: {
    color: C.white,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5,
  },
  footerDayLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: C.text,
    marginBottom: 2,
    marginTop: 2,
  },
  footerItem: {
    fontSize: 7.5,
    color: C.textMed,
    marginBottom: 1,
  },
  footerAddress: {
    fontSize: 8,
    color: C.text,
    lineHeight: 1.5,
  },
  footerPageLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `0.5pt solid ${C.borderGray}`,
    paddingTop: 4,
    marginTop: 6,
    paddingHorizontal: 28,
    paddingBottom: 6,
  },
  footerPageText: {
    fontSize: 7.5,
    color: C.textLight,
  },
})

// ─── Shared Footer ────────────────────────────────────────────────────────────
const PageFooter = ({ data, pageNum }) => (
  <>
    <View style={s.footer}>
      <View style={s.footerDivider} />
      <View style={s.footerRow}>
        <View style={[s.footerCol, { flex: 1.6 }]}>
          <View style={s.footerHeader}>
            <Text style={s.footerHeaderText}>AGENDA SEMANAL</Text>
          </View>
          <Text style={s.footerDayLabel}>DOMINGO</Text>
          {AGENDA.domingo.map((item, i) => (
            <Text key={i} style={s.footerItem}>{item}</Text>
          ))}
          <Text style={s.footerDayLabel}>TERÇA-FEIRA</Text>
          <Text style={s.footerItem}>{AGENDA.terca}</Text>
          <Text style={s.footerDayLabel}>QUINTA-FEIRA</Text>
          <Text style={s.footerItem}>{AGENDA.quinta}</Text>
        </View>
        <View style={[s.footerCol, { flex: 1 }]}>
          <View style={s.footerHeader}>
            <Text style={s.footerHeaderText}>NOSSO ENDEREÇO</Text>
          </View>
          <Text style={s.footerAddress}>{ENDERECO}</Text>
        </View>
      </View>
    </View>
    <View style={s.footerPageLine}>
      <Text style={s.footerPageText}>Boletim — {data.dataLinha || ''}</Text>
      <Text style={s.footerPageText}>Pág. {pageNum}</Text>
    </View>
  </>
)

// ─── Liturgy text helpers ─────────────────────────────────────────────────────
const renderLiturgyItems = (text) => {
  if (!text) return null
  return text.split('\n').filter(Boolean).map((item, i) => (
    <Text key={i} style={s.liturgyItem}>{item}</Text>
  ))
}

const LiturgySection = ({ title, leitura, itens }) => (
  <>
    <Text style={s.liturgySectionTitle}>{title}</Text>
    {leitura ? <Text style={s.liturgyItem}>{leitura}</Text> : null}
    {renderLiturgyItems(itens)}
  </>
)

// ─── Page 1 ──────────────────────────────────────────────────────────────────
const Page1 = ({ data }) => (
  <Page size="A4" style={s.page}>
    {/* Top bar */}
    <View style={s.topBar}>
      <View style={s.topBarAccent} />
      <View style={s.topBarAccent2} />
    </View>

    <View style={s.content}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <View style={s.churchLogoBox}>
            <View style={s.churchCross}>
              <Text style={s.churchCrossText}>✝</Text>
            </View>
            <View style={s.churchNameLines}>
              <Text style={s.churchLine1}>Igreja</Text>
              <Text style={s.churchLine2}>Presbiteriana de</Text>
              <Text style={s.churchLine3}>Jardim Jerusalém</Text>
            </View>
          </View>
        </View>
        <View style={s.headerRight}>
          <Text style={s.boletimTitle}>Boletim</Text>
          <Text style={s.boletimSubtitle}>Dominical</Text>
          <View style={s.headerDivider} />
          <Text style={s.dateLine}>{data.dataLinha || ''}</Text>
        </View>
      </View>

      {/* Banner */}
      <View style={s.banner}>
        <Text style={s.bannerText}>✝  CULTO DOMINICAL</Text>
      </View>

      {/* Liturgy columns */}
      <View style={s.liturgyRow}>
        {/* Matutino */}
        <View style={s.liturgyCol}>
          <View style={s.liturgyHeader}>
            <Text style={s.liturgyHeaderText}>CULTO MATUTINO</Text>
          </View>
          {data.mat_preludium ? (
            <Text style={s.liturgyPreludium}>Pré-lúdio: {data.mat_preludium}</Text>
          ) : null}
          <LiturgySection title="Ato de Adoração" leitura={data.mat_adoracao_leitura} itens={data.mat_adoracao_itens} />
          <LiturgySection title="Ato de Contrição" leitura={data.mat_contricao_leitura} itens={data.mat_contricao_itens} />
          <LiturgySection title="Louvor e Gratidão" leitura={data.mat_louvor_leitura} itens={data.mat_louvor_itens} />
          <Text style={s.liturgySectionTitle}>Momento Missionário</Text>
          <Text style={s.liturgyItem}>{data.mat_momento_missionario}</Text>
          <Text style={s.liturgySectionTitle}>Edificação</Text>
          {data.mat_edificacao_oracao ? <Text style={s.liturgyItem}>Oração por {data.mat_edificacao_oracao}</Text> : null}
          {data.mat_edificacao_mensagem ? <Text style={s.liturgyItem}>Mensagem: {data.mat_edificacao_mensagem}</Text> : null}
          <Text style={s.liturgySectionTitle}>Oração Intercessória</Text>
          {renderLiturgyItems(data.mat_oracao_intercessoria)}
        </View>

        {/* Vespertino */}
        <View style={s.liturgyCol}>
          <View style={s.liturgyHeader}>
            <Text style={s.liturgyHeaderText}>CULTO VESPERTINO</Text>
          </View>
          {data.vesp_preludium ? (
            <Text style={s.liturgyPreludium}>Pré-lúdio: {data.vesp_preludium}</Text>
          ) : null}
          <LiturgySection title="Ato de Adoração" leitura={data.vesp_adoracao_leitura} itens={data.vesp_adoracao_itens} />
          <LiturgySection title="Ato de Contrição" leitura={data.vesp_contricao_leitura} itens={data.vesp_contricao_itens} />
          <LiturgySection title="Louvor e Gratidão" leitura={data.vesp_louvor_leitura} itens={data.vesp_louvor_itens} />
          {data.vesp_saudacao ? (
            <>
              <Text style={s.liturgySectionTitle}>Saudação Comunitária</Text>
              <Text style={s.liturgyItem}>{data.vesp_saudacao}</Text>
            </>
          ) : null}
          {data.vesp_equipe_louvor ? (
            <>
              <Text style={s.liturgySectionTitle}>Equipe de Louvor</Text>
              <Text style={s.liturgyItem}>{data.vesp_equipe_louvor}</Text>
            </>
          ) : null}
          <Text style={s.liturgySectionTitle}>Momento Missionário</Text>
          <Text style={s.liturgyItem}>{data.vesp_momento_missionario}</Text>
          <Text style={s.liturgySectionTitle}>Edificação</Text>
          {data.vesp_edificacao_oracao ? <Text style={s.liturgyItem}>Oração por {data.vesp_edificacao_oracao}</Text> : null}
          {data.vesp_edificacao_mensagem ? <Text style={s.liturgyItem}>Mensagem: {data.vesp_edificacao_mensagem}</Text> : null}
          <Text style={s.liturgySectionTitle}>Oração Intercessória</Text>
          {renderLiturgyItems(data.vesp_oracao_intercessoria)}
          {data.vesp_posludium ? (
            <Text style={[s.liturgyPreludium, { marginTop: 6 }]}>Pós-lúdio: {data.vesp_posludium}</Text>
          ) : null}
        </View>
      </View>
    </View>

    <PageFooter data={data} pageNum={1} />
  </Page>
)

// ─── Page 2 ──────────────────────────────────────────────────────────────────
const Page2 = ({ data }) => (
  <Page size="A4" style={s.page}>
    <View style={s.topBar}>
      <View style={s.topBarAccent} />
      <View style={s.topBarAccent2} />
    </View>

    <View style={s.content}>
      <Text style={s.escalasTitle}>Escalas de Aux. Litúrgicos</Text>

      {/* Escalas row */}
      <View style={s.escalasRow}>
        {/* Presbíteros */}
        <View style={s.escalasCol}>
          <View style={s.escalasHeader}>
            <Text style={s.escalasHeaderText}>PRESBÍTEROS</Text>
          </View>
          <Text style={s.escalasSubheader}>Cultos Vespertinos</Text>
          {(data.presbiteros || []).map((row, i) => (
            <View key={i} style={s.escalasRow2}>
              <Text style={s.escalasDate}>{row.data}</Text>
              <Text style={s.escalasName}>{row.nome}</Text>
            </View>
          ))}
        </View>

        {/* Diáconos */}
        <View style={s.escalasCol}>
          <View style={s.escalasHeader}>
            <Text style={s.escalasHeaderText}>DIÁCONOS</Text>
          </View>
          <Text style={s.escalasSubheader}>Cultos Matutinos</Text>
          {(data.diaconos || []).map((row, i) => (
            <View key={i} style={s.escalasRow2}>
              <Text style={s.escalasDate}>{row.data}</Text>
              <Text style={s.escalasName}>{row.nome}</Text>
            </View>
          ))}
        </View>

        {/* Junta Diaconal */}
        <View style={s.juntaTable}>
          <View style={s.escalasHeader}>
            <Text style={s.escalasHeaderText}>JUNTA DIACONAL</Text>
          </View>
          <View style={s.juntaHeader}>
            <Text style={[s.juntaHeaderCell, { width: 32 }]}> </Text>
            <Text style={s.juntaHeaderCell}>Nome</Text>
            <Text style={s.juntaHeaderCell}>Nome</Text>
          </View>
          {(data.juntaDiaconal || []).map((row, i) => (
            <View key={i} style={[s.juntaRow, i % 2 === 1 ? s.juntaRowAlt : {}]}>
              <Text style={[s.juntaCell, { width: 32, color: '#666' }]}>{row.data}</Text>
              <Text style={s.juntaCell}>{row.col1}</Text>
              <Text style={s.juntaCell}>{row.col2}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Alvos */}
      <View style={s.alvosHeader}>
        <Text style={s.alvosHeaderText}>ALVOS DE NOSSAS ORAÇÕES</Text>
      </View>

      <View style={s.alvosRow}>
        {/* Col 1: Saúde + Conversão + Igreja */}
        <View style={s.alvosCol}>
          <Text style={s.alvosTitle}>Saúde</Text>
          <Text style={s.alvosText}>{data.oracaoSaude || ''}</Text>
          <Text style={[s.alvosTitle, { marginTop: 10 }]}>Conversão</Text>
          <Text style={s.alvosText}>{data.oracaoConversao || ''}</Text>
          <Text style={[s.alvosTitle, { marginTop: 10 }]}>Igreja</Text>
          <Text style={s.alvosText}>{data.oracaoIgreja || ''}</Text>
        </View>

        {/* Col 2: Missionários + Intercessão + Outros */}
        <View style={s.alvosCol}>
          <Text style={s.alvosTitle}>Missionários</Text>
          <Text style={s.alvosText}>{data.oracaoMissionarios || ''}</Text>
          <Text style={[s.alvosTitle, { marginTop: 10 }]}>Intercessão</Text>
          <Text style={s.alvosText}>{data.oracaoIntercessao || ''}</Text>
          <Text style={[s.alvosTitle, { marginTop: 10 }]}>Outros</Text>
          <Text style={s.alvosText}>{data.oracaoOutros || ''}</Text>
        </View>

        {/* Col 3: Amigo Visitante (fixed) */}
        <View style={[s.alvosCol, { maxWidth: 130 }]}>
          <View style={s.amigoBox}>
            <Text style={s.amigoTitle}>Amigo Visitante</Text>
            <Text style={s.amigoText}>{AMIGO_VISITANTE}</Text>
          </View>
        </View>
      </View>
    </View>

    <PageFooter data={data} pageNum={2} />
  </Page>
)

// ─── Page 3 ──────────────────────────────────────────────────────────────────
const splitText = (text) => {
  if (!text) return ['', '']
  const words = text.split(' ')
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

const Page3 = ({ data, pastoralImage }) => {
  const [col1, col2] = splitText(data.pastoralTexto)
  return (
    <Page size="A4" style={s.page}>
      <View style={s.topBar}>
        <View style={s.topBarAccent} />
        <View style={s.topBarAccent2} />
      </View>

      {/* Image block */}
      <View style={s.pastoralImageBox}>
        {pastoralImage ? (
          <>
            <Image src={pastoralImage} style={s.pastoralImage} />
            <View style={s.pastoralOverlay} />
          </>
        ) : null}
        <Text style={s.pastoralBigTitle}>{data.pastoralTitulo || 'TÍTULO'}</Text>
      </View>

      {/* Title + author */}
      <View style={s.pastoralMeta}>
        <Text style={s.pastoralFullTitle}>{data.pastoralTituloCompleto || ''}</Text>
        <View style={s.pastoralDivider} />
        <Text style={s.pastoralAutor}>{data.pastoralAutor || ''}</Text>
      </View>

      {/* Two-column text */}
      <View style={s.pastoralTextRow}>
        <View style={s.pastoralTextCol}>
          <Text style={s.pastoralText}>{col1}</Text>
        </View>
        <View style={{ width: 1, backgroundColor: C.borderGray, marginVertical: 4 }} />
        <View style={s.pastoralTextCol}>
          <Text style={s.pastoralText}>{col2}</Text>
        </View>
      </View>

      <PageFooter data={data} pageNum={3} />
    </Page>
  )
}

// ─── Document ────────────────────────────────────────────────────────────────
const BoletimPDF = ({ data, pastoralImage }) => (
  <Document>
    <Page1 data={data} />
    <Page2 data={data} />
    <Page3 data={data} pastoralImage={pastoralImage} />
  </Document>
)

export default BoletimPDF
