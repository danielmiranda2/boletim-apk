import React, { useState, useCallback, useEffect, useRef } from 'react'
import { pdf } from '@react-pdf/renderer'
import BoletimForm from './components/BoletimForm'
import BoletimPDF from './components/BoletimPDF'
import './App.css'

function gerarDataProximoDomingo() {
  const hoje = new Date()

  // 0 = domingo
  const diaSemana = hoje.getDay()

  // dias até o próximo domingo
  const diasAteDomingo = (7 - diaSemana) % 7 || 7

  const proximoDomingo = new Date(hoje)
  proximoDomingo.setDate(hoje.getDate() + diasAteDomingo)

  const dia = proximoDomingo.getDate()

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const mes = meses[proximoDomingo.getMonth()]
  const ano = proximoDomingo.getFullYear()

  return `Rio de Janeiro, ${dia} de ${mes} de ${ano} | Nº 1890 | ANO XXXIV`
}

export const defaultData = {
  dataLinha: gerarDataProximoDomingo(),

  // Matutino
  mat_preludium: '',
  mat_adoracao_leitura: 'Romanos 8. 1-11 (Alternada)',
  mat_adoracao_itens: 'Oração de Adoração\nHino 11 – Trindade Santíssima',
  mat_contricao_leitura: 'Romanos 8. 12-13 (Liturgente)',
  mat_contricao_itens: 'Oração Silenciosa de Confissão\nOração Audível de Gratidão pelo perdão\nHino 074 · Sinceridade',
  mat_louvor_leitura: 'Romanos 8. 15-17 (Todos)',
  mat_louvor_itens: 'Recolhimento dos Dízimos e Ofertas\nHino 061 · Ações de Graças\nOração de Cons. dos Dízimos e Ofertas',
  mat_momento_missionario: 'Oração pelo Rev. Renato Prates e sua esposa',
  mat_edificacao_oracao: 'Iluminação',
  mat_edificacao_mensagem: 'Rev. Fábio dos Anjos',
  mat_oracao_intercessoria: 'Oração Intercessória\nBênção Apostólica\nAmém Tríplice',

  // Vespertino
  vesp_preludium: 'Instrumental',
  vesp_adoracao_leitura: 'João 17.1 -11 (alternada)',
  vesp_adoracao_itens: 'Oração de Adoração\nHino 104 · Plena Paz',
  vesp_contricao_leitura: 'João 17.14-17(Liturgente)',
  vesp_contricao_itens: 'Oração Silenciosa de Confissão\nOração Audível de Gratidão pelo perdão\nHino 071 · Contrição e Confissão',
  vesp_louvor_leitura: 'Romanos 17. 22-23 (Todos)',
  vesp_louvor_itens: 'Recolhimento dos Dízimos e Ofertas\nHino 061 · Ações de Graças\nOração de Louvor e Cons. dos Dízimos e Ofertas',
  vesp_saudacao: 'Cântico "É o teu povo"',
  vesp_equipe_louvor: 'Cânticos Espirituais',
  vesp_momento_missionario: 'Oração pelo Rev. Renato Prates e sua esposa',
  vesp_edificacao_oracao: 'Iluminação',
  vesp_edificacao_mensagem: 'Rev. Fábio dos Anjos',
  vesp_oracao_intercessoria: 'Oração Intercessória\nBênção Apostólica\nAmém Tríplice',
  vesp_posludium: 'Instrumental',

  // Página 2
  presbiteros: [
    { data: '05-01', nome: 'Pb. Adelmir Cardoso' },
    { data: '12-01', nome: 'Pb. Jadir Soares' },
    { data: '19-01', nome: 'Pb. Carlos Emerich' },
    { data: '26-01', nome: 'Pb. Rogério Felício' },
  ],
  diaconos: [
    { data: '05-01', nome: 'Diác. Jorge Nicolau' },
    { data: '12-01', nome: 'Diác. Rui Nicolau' },
    { data: '19-01', nome: 'Diác. Adilson Inácio' },
    { data: '26-01', nome: 'Diác. Arnaldo Alves' },
  ],
  juntaDiaconal: [
    { data: '05-01', col1: 'Jorge Nicolau', col2: 'Jorge Nicolau' },
    { data: '12-01', col1: 'Rui Nicolau', col2: 'Rui Nicolau' },
    { data: '19-01', col1: 'Adilson Inácio', col2: 'Adilson Inácio' },
    { data: '26-01', col1: 'Arnaldo Alves', col2: 'Arnaldo Alves' },
  ],

  oracaoSaude: '',
  oracaoConversao: '',
  oracaoIgreja: '',
  oracaoMissionarios: '',
  oracaoIntercessao: '',
  oracaoOutros: '',

  // Página 3
  pastoralTitulo: '',
  pastoralTituloCompleto: '',
  pastoralAutor: '',
  pastoralTexto: '',
}

function App() {
  const [data, setData] = useState(defaultData)
  const [activeTab, setActiveTab] = useState(1)
  const [pastoralImage, setPastoralImage] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  // 🔥 CORREÇÃO PROFISSIONAL
  const lastScrollRef = useRef(0)

  useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY

    if (currentScroll > lastScrollRef.current && currentScroll > 80) {
      setHideHeader(true)
    } else {
      setHideHeader(false)
    }

    lastScrollRef.current = currentScroll
  }

  window.addEventListener('scroll', handleScroll)

  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  const podeGerar =
    data.pastoralTitulo &&
    data.pastoralTituloCompleto &&
    data.pastoralAutor &&
    data.pastoralTexto

  const handleChange = useCallback((field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
    setGenerated(false)
  }, [])

  const handleArrayChange = useCallback((field, index, subfield, value) => {
    setData(prev => {
      const arr = [...prev[field]]
      arr[index] = { ...arr[index], [subfield]: value }
      return { ...prev, [field]: arr }
    })
    setGenerated(false)
  }, [])

  const handleImageUpload = useCallback((base64) => {
    setPastoralImage(base64)
    setGenerated(false)
  }, [])

  const handleGenerate = useCallback(async () => {
    setGenerating(true)
    setGenerated(false)

    try {
      const blob = await pdf(
        <BoletimPDF data={data} pastoralImage={pastoralImage} />
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'boletim-dominical.pdf'
      link.click()
      URL.revokeObjectURL(url)

      setGenerated(true)
    } catch (err) {
      console.error(err)
      alert('Erro ao gerar PDF')
    } finally {
      setGenerating(false)
    }
  }, [data, pastoralImage])

  return (
    <div className="app">
      {/* HEADER */}
      <header className={`app-header ${hideHeader ? 'hidden' : ''}`}>
        <div className="app-header-left">
          <span className="app-cross">✝</span>
          <div>
            <div className="app-title">Boletim Dominical</div>
            <div className="app-subtitle">
              Igreja Presbiteriana de Jardim Jerusalém
            </div>
          </div>
        </div>

        {generated && !generating && (
          <span className="badge-success">✓ PDF gerado!</span>
        )}
      </header>

      {/* TABS */}
      <nav className="tab-bar">
        {[
          { id: 1, label: 'Liturgia' },
          { id: 2, label: 'Escalas & Orações' },
          { id: 3, label: 'Pastoral' },
        ].map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-number">{index + 1}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* BODY */}
      <main className="app-body">
        <BoletimForm
          data={data}
          activeTab={activeTab}
          onChange={handleChange}
          onArrayChange={handleArrayChange}
          onImageUpload={handleImageUpload}
          pastoralImage={pastoralImage}
        />
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <button
  className="btn-gerar"
  onClick={handleGenerate}
  disabled={generating}
>⬇ Gerar PDF</button>
      </footer>
    </div>
  )
}

export default App
