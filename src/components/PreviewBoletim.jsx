import React from 'react'
import './Preview.css'

const Section = ({ title, children }) => (
  <div className="p-section">
    <div className="p-section-title">{title}</div>
    {children}
  </div>
)

const PreviewBoletim = ({ data }) => {
  const avisos = (data.avisos || '')
    .split('\n')
    .map(a => a.trim())
    .filter(Boolean)

  return (
    <div className="preview-a5">
      {/* Header */}
      <div className="p-header">
        <div className="p-church-name">{data.nomeIgreja || 'Nome da Igreja'}</div>
        {data.subtituloIgreja && (
          <div className="p-church-sub">{data.subtituloIgreja}</div>
        )}
      </div>

      <div className="p-divider-gold" />

      {/* Date */}
      <div className="p-title-block">
        <div className="p-culto-label">Culto Dominical</div>
        <div className="p-culto-date">{data.data || '—'}</div>
      </div>

      <div className="p-divider-thin" />

      {/* Hinos */}
      <div className="p-hinos-row">
        {data.hino1 && (
          <div className="p-hino">
            <div className="p-hino-label">1º Hino</div>
            <div className="p-hino-value">{data.hino1}</div>
          </div>
        )}
        {data.hino2 && (
          <div className="p-hino">
            <div className="p-hino-label">2º Hino</div>
            <div className="p-hino-value">{data.hino2}</div>
          </div>
        )}
        {data.hino3 && (
          <div className="p-hino">
            <div className="p-hino-label">3º Hino</div>
            <div className="p-hino-value">{data.hino3}</div>
          </div>
        )}
      </div>

      {data.leituraBiblica && (
        <Section title="Leitura Bíblica">
          <div className="p-text">{data.leituraBiblica}</div>
        </Section>
      )}

      {data.oracao && (
        <Section title="Oração">
          <div className="p-text-light">{data.oracao}</div>
        </Section>
      )}

      <div className="p-divider-thin" />

      {/* Pregação */}
      {(data.pregacaoTitulo || data.pregador || data.textoBiblico) && (
        <Section title="Pregação">
          <div className="p-pregacao-box">
            {data.pregacaoTitulo && (
              <div className="p-pregacao-titulo">{data.pregacaoTitulo}</div>
            )}
            <div className="p-pregacao-meta-row">
              {data.pregador && (
                <span>
                  <span className="p-meta-label">Pregador: </span>
                  <span className="p-meta-value">{data.pregador}</span>
                </span>
              )}
              {data.textoBiblico && (
                <span>
                  <span className="p-meta-label">Texto: </span>
                  <span className="p-meta-value">{data.textoBiblico}</span>
                </span>
              )}
            </div>
          </div>
        </Section>
      )}

      <div className="p-divider-thin" />

      {data.versiculoOferta && (
        <Section title="Oferta">
          <div className="p-text-italic">"{data.versiculoOferta}"</div>
        </Section>
      )}

      {avisos.length > 0 && (
        <Section title="Avisos">
          {avisos.map((aviso, i) => (
            <div key={i} className="p-aviso">
              <span className="p-aviso-bullet">›</span>
              <span>{aviso}</span>
            </div>
          ))}
        </Section>
      )}

      {/* Footer */}
      <div className="p-footer">
        <div className="p-divider-thin" />
        {data.versiculoSemana && (
          <div className="p-versiculo">"{data.versiculoSemana}"</div>
        )}
        {data.enderecoIgreja && (
          <div className="p-endereco">{data.enderecoIgreja}</div>
        )}
      </div>
    </div>
  )
}

export default PreviewBoletim
