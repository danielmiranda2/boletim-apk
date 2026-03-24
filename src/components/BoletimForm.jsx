import React, { useRef } from 'react'
import './Form.css'

// 🔹 LISTAS PARA COMBO
const PRESBITEROS = [
  'Pb. Adelmir Cardoso',
  'Pb. Jadir Soares',
  'Pb. Carlos Emerich',
  'Pb. Rogério Felício',
]

const DIACONOS = [
  'Diác. Jorge Nicolau',
  'Diác. Rui Nicolau',
  'Diác. Adilson Inácio',
  'Diác. Arnaldo Alves',
]

// ─── UI BASE ─────────────────────────────────────────

const Card = ({ title, children }) => (
  <div className="card">
    <div className="card-title">{title}</div>
    {children}
  </div>
)

const Field = ({ label, hint, children }) => (
  <div className="field">
    <label>
      {label}
      {hint && <span className="field-hint"> — {hint}</span>}
    </label>
    {children}
  </div>
)

const Row = ({ children }) => <div className="fields-row">{children}</div>

// ─── PAGE 1 ─────────────────────────────────────────

const LiturgiaCulto = ({ prefix, label, data, onChange, showSaudacao, showPosLudium }) => {
  const f = (field) => `${prefix}_${field}`
  const val = (field) => data[f(field)] || ''
  const set = (field) => (e) => onChange(f(field), e.target.value)

  return (
    <Card title={label}>
      <Field label="Pré-lúdio">
        <input value={val('preludium')} onChange={set('preludium')} />
      </Field>

      <div className="subsection-title">Ato de Adoração</div>
      <Field label="Leitura">
        <input value={val('adoracao_leitura')} onChange={set('adoracao_leitura')} />
      </Field>
      <Field label="Itens">
        <textarea rows={3} value={val('adoracao_itens')} onChange={set('adoracao_itens')} />
      </Field>

      <div className="subsection-title">Ato de Contrição</div>
      <Field label="Leitura">
        <input value={val('contricao_leitura')} onChange={set('contricao_leitura')} />
      </Field>
      <Field label="Itens">
        <textarea rows={3} value={val('contricao_itens')} onChange={set('contricao_itens')} />
      </Field>

      <div className="subsection-title">Louvor e Gratidão</div>
      <Field label="Leitura">
        <input value={val('louvor_leitura')} onChange={set('louvor_leitura')} />
      </Field>
      <Field label="Itens">
        <textarea rows={3} value={val('louvor_itens')} onChange={set('louvor_itens')} />
      </Field>

      {showSaudacao && (
        <>
          <div className="subsection-title">Saudação</div>
          <Field label="Cântico">
            <input value={val('saudacao')} onChange={set('saudacao')} />
          </Field>

          <Field label="Equipe de Louvor">
            <input value={val('equipe_louvor')} onChange={set('equipe_louvor')} />
          </Field>
        </>
      )}

      <div className="subsection-title">Momento Missionário</div>
      <Field label="Oração">
        <input value={val('momento_missionario')} onChange={set('momento_missionario')} />
      </Field>

      {/* 🔥 EDIFICAÇÃO FIXA */}
      <div className="subsection-title">Edificação</div>
      <Row>
        <Field label="Oração">
          <div className="field-static">Oração por Iluminação</div>
        </Field>

        <Field label="Mensagem">
          <input value={val('edificacao_mensagem')} onChange={set('edificacao_mensagem')} />
        </Field>
      </Row>

      {/* 🔥 INTERCESSÃO FIXA */}
      <div className="subsection-title">Oração Intercessória</div>
      <Field label="">
        <div className="field-static">
          Oração Intercessória<br />
          Bênção Apostólica<br />
          Amém Tríplice
        </div>
      </Field>

      {showPosLudium && (
        <>
          <div className="subsection-title">Pós-lúdio</div>
          <Field label="">
            <input value={val('posludium')} onChange={set('posludium')} />
          </Field>
        </>
      )}
    </Card>
  )
}

const Page1 = ({ data, onChange }) => (
  <div className="page-content">
    <Card title="Data do Boletim">
      <Field label="Linha de data completa">
        <input
          value={data.dataLinha || ''}
          onChange={(e) => onChange('dataLinha', e.target.value)}
        />
      </Field>
    </Card>

    <div className="two-col-cards">
      <LiturgiaCulto prefix="mat" label="Culto Matutino" data={data} onChange={onChange} />
      <LiturgiaCulto prefix="vesp" label="Culto Vespertino" data={data} onChange={onChange} showSaudacao showPosLudium />
    </div>
  </div>
)

// ─── PAGE 2 (COM SELECT) ─────────────────────────────

const EscalaTable = ({ label, rows, field, columns, onArrayChange, options }) => (
  <div className="escala-block">
    <div className="escala-title">{label}</div>

    <table className="escala-table">
      <thead>
        <tr>
          <th>Data</th>
          {columns.map(c => <th key={c.key}>{c.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td>
              <input
                value={row.data || ''}
                onChange={e => onArrayChange(field, i, 'data', e.target.value)}
              />
            </td>

            {columns.map(c => (
              <td key={c.key}>
                <select
                  value={row[c.key] || ''}
                  onChange={e => onArrayChange(field, i, c.key, e.target.value)}
                >
                  <option value="">Selecione</option>
                  {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const Page2 = ({ data, onChange, onArrayChange }) => (
  <div className="page-content">
    <Card title="Escalas">
      <EscalaTable
        label="Presbíteros"
        rows={data.presbiteros}
        field="presbiteros"
        columns={[{ key: 'nome', label: 'Nome' }]}
        onArrayChange={onArrayChange}
        options={PRESBITEROS}
      />

      <EscalaTable
        label="Diáconos"
        rows={data.diaconos}
        field="diaconos"
        columns={[{ key: 'nome', label: 'Nome' }]}
        onArrayChange={onArrayChange}
        options={DIACONOS}
      />

      <EscalaTable
        label="Junta Diaconal"
        rows={data.juntaDiaconal}
        field="juntaDiaconal"
        columns={[
          { key: 'col1', label: 'Responsável 1' },
          { key: 'col2', label: 'Responsável 2' },
        ]}
        onArrayChange={onArrayChange}
        options={DIACONOS}
      />
    </Card>
  </div>
)

// ─── PAGE 3 ─────────────────────────────────────────

const Page3 = ({ data, onChange, onImageUpload, pastoralImage }) => {
  const fileRef = useRef()

  return (
    <div className="page-content">
      <Card title="Pastoral">
        <Field label="Imagem">
          <input type="file" onChange={e => onImageUpload(e.target.files[0])} />
        </Field>

        <Field label="Título">
          <input value={data.pastoralTitulo || ''} onChange={e => onChange('pastoralTitulo', e.target.value)} />
        </Field>

        <Field label="Texto">
          <textarea rows={10} value={data.pastoralTexto || ''} onChange={e => onChange('pastoralTexto', e.target.value)} />
        </Field>
      </Card>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────

const BoletimForm = ({ data, activeTab, onChange, onArrayChange, onImageUpload, pastoralImage }) => {
  return (
    <div className="form-root">
      {activeTab === 1 && <Page1 data={data} onChange={onChange} />}
      {activeTab === 2 && <Page2 data={data} onChange={onChange} onArrayChange={onArrayChange} />}
      {activeTab === 3 && <Page3 data={data} onChange={onChange} onImageUpload={onImageUpload} pastoralImage={pastoralImage} />}
    </div>
  )
}

export default BoletimForm
